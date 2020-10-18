package integration_test

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"time"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	. "github.com/onsi/gomega/gexec"
)

const port = 8080
const waitStartup = 10 * time.Second
const pollIntervalStartup = 100 * time.Millisecond
const healthEndpoint = "/api/health"

var _ = Describe("Integration", func() {
	var artifact string
	var winelist *os.File
	var session *Session

	BeforeSuite(func() {
		var err error
		artifact, err = Build("github.com/jaedle/vinotheque/service")
		Expect(err).ShouldNot(HaveOccurred())
		winelist, err = ioutil.TempFile("", "")
		Expect(err).NotTo(HaveOccurred())
	})

	AfterEach(func() {
		if session != nil {
			session.Kill()
		}
	})

	AfterSuite(func() {
		if winelist != nil {
			_ = os.Remove(winelist.Name())
		}
		CleanupBuildArtifacts()
	})

	It("starts service", func() {
		command := exec.Command(artifact)
		command.Env = append(command.Env, fmt.Sprintf("PORT=%d", port))
		command.Env = append(command.Env, fmt.Sprintf("WINES=%s", winelist.Name()))
		var err error
		session, err = Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())

		awaitStartup()
	})

	It("fails on missing port", func() {
		var err error
		command := exec.Command(artifact)
		session, err = Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())

		Eventually(session).Should(Exit(1))
	})

	It("fails on missing wine list", func() {
		var err error
		command := exec.Command(artifact)
		command.Env = append(command.Env, fmt.Sprintf("PORT=%d", port))

		session, err = Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())

		Eventually(session).Should(Exit(1))
	})

	It("returns dummy list of wine", func() {
		command := exec.Command(artifact)
		command.Env = append(command.Env, fmt.Sprintf("PORT=%d", port))
		command.Env = append(command.Env, fmt.Sprintf("WINES=%s", winelist.Name()))

		var err error
		err = ioutil.WriteFile(winelist.Name(), []byte(`wines:
- name: Great Shiraz
- name: Wodden Pinot Noir`), os.ModePerm)
		Expect(err).ShouldNot(HaveOccurred())

		session, err = Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())

		awaitStartup()

		resp, err := http.Get(url("/api/wines"))
		Expect(err).ShouldNot(HaveOccurred())
		defer resp.Body.Close()
		Expect(resp.StatusCode).To(Equal(http.StatusOK))
		Expect(resp.Header.Get("Content-Type")).To(Equal("application/json"))

		body, err := ioutil.ReadAll(resp.Body)
		Expect(err).ShouldNot(HaveOccurred())
		Expect(string(body)).To(Equal(`{"wines":[{"name":"Great Shiraz"},{"name":"Wodden Pinot Noir"}]}`))
	})
})

func awaitStartup() bool {
	return Eventually(func() bool {
		get, err := http.Get(url(healthEndpoint))
		if err != nil {
			return false
		}
		return get.StatusCode == http.StatusOK
	}, waitStartup, pollIntervalStartup).Should(Equal(true), "service must be healthy")
}

func url(route string) string {
	return fmt.Sprintf("http://localhost:%d%s", port, route)
}
