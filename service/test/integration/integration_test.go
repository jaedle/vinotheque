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

const port = 8337
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
	})

	BeforeEach(func() {
		var err error
		winelist, err = ioutil.TempFile("", "")
		Expect(err).NotTo(HaveOccurred())
		assertServiceNotRunning()
	})

	AfterEach(func() {
		if session != nil {
			session.Kill()
		}
		assertServiceNotRunning()

		if winelist != nil {
			_ = os.Remove(winelist.Name())
		}
	})

	AfterSuite(func() {
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
  id: a43b6c80-91c0-4e06-8fd7-bfafea949865
- name: Wodden Pinot Noir
  id: c71d4699-dd29-4fb6-8509-e57f947835be
`), os.ModePerm)
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
		Expect(string(body)).To(Equal(`{"wines":[{"id":"a43b6c80-91c0-4e06-8fd7-bfafea949865","name":"Great Shiraz"},{"id":"c71d4699-dd29-4fb6-8509-e57f947835be","name":"Wodden Pinot Noir"}]}`))
	})

	It("finds wine by id", func() {
		command := exec.Command(artifact)
		command.Env = append(command.Env, fmt.Sprintf("PORT=%d", port))
		command.Env = append(command.Env, fmt.Sprintf("WINES=%s", winelist.Name()))

		var err error
		err = ioutil.WriteFile(winelist.Name(), []byte(`wines:
- name: Great Shiraz
  id: a43b6c80-91c0-4e06-8fd7-bfafea949865
- name: Wodden Pinot Noir
  id: c71d4699-dd29-4fb6-8509-e57f947835be
`), os.ModePerm)
		Expect(err).ShouldNot(HaveOccurred())

		session, err = Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())

		awaitStartup()

		resp, err := http.Get(url("/api/wines/" + "c71d4699-dd29-4fb6-8509-e57f947835be"))
		Expect(err).ShouldNot(HaveOccurred())
		defer resp.Body.Close()
		Expect(resp.StatusCode).To(Equal(http.StatusOK))
		Expect(resp.Header.Get("Content-Type")).To(Equal("application/json"))

		body, err := ioutil.ReadAll(resp.Body)
		Expect(err).ShouldNot(HaveOccurred())
		Expect(string(body)).To(Equal(`{"id":"c71d4699-dd29-4fb6-8509-e57f947835be","name":"Wodden Pinot Noir"}`))
	})

	It("finds wine by id fails on unknown id", func() {
		command := exec.Command(artifact)
		command.Env = append(command.Env, fmt.Sprintf("PORT=%d", port))
		command.Env = append(command.Env, fmt.Sprintf("WINES=%s", winelist.Name()))

		var err error
		err = ioutil.WriteFile(winelist.Name(), []byte(`wines:
- name: Great Shiraz
  id: a43b6c80-91c0-4e06-8fd7-bfafea949865
- name: Wodden Pinot Noir
  id: c71d4699-dd29-4fb6-8509-e57f947835be
`), os.ModePerm)
		Expect(err).ShouldNot(HaveOccurred())

		session, err = Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())

		awaitStartup()

		resp, err := http.Get(url("/api/wines/" + "asdf4699-dd29-4fb6-8509-e57f947835be"))
		Expect(err).ShouldNot(HaveOccurred())
		defer resp.Body.Close()
		Expect(resp.StatusCode).To(Equal(http.StatusNotFound))
	})

	It("finds wine by bottle", func() {
		command := exec.Command(artifact)
		command.Env = append(command.Env, fmt.Sprintf("PORT=%d", port))
		command.Env = append(command.Env, fmt.Sprintf("WINES=%s", winelist.Name()))

		var err error
		err = ioutil.WriteFile(winelist.Name(), []byte(`wines:
- name: Great Shiraz
  id: a43b6c80-91c0-4e06-8fd7-bfafea949865
  bottles: ['1','3']
- name: Wodden Pinot Noir
  id: c71d4699-dd29-4fb6-8509-e57f947835be
  bottles: ['2','5','7']
`), os.ModePerm)
		Expect(err).ShouldNot(HaveOccurred())

		session, err = Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())

		awaitStartup()

		resp, err := http.Get(url("/api/wines/byBottle/2"))
		Expect(err).ShouldNot(HaveOccurred())
		defer resp.Body.Close()
		Expect(resp.StatusCode).To(Equal(http.StatusOK))
		Expect(resp.Header.Get("Content-Type")).To(Equal("application/json"))

		body, err := ioutil.ReadAll(resp.Body)
		Expect(err).ShouldNot(HaveOccurred())
		Expect(string(body)).To(Equal(`{"id":"c71d4699-dd29-4fb6-8509-e57f947835be"}`))
	})

	It("fails on missing bottle", func() {
		command := exec.Command(artifact)
		command.Env = append(command.Env, fmt.Sprintf("PORT=%d", port))
		command.Env = append(command.Env, fmt.Sprintf("WINES=%s", winelist.Name()))

		var err error
		err = ioutil.WriteFile(winelist.Name(), []byte(`wines:
- name: Great Shiraz
  id: a43b6c80-91c0-4e06-8fd7-bfafea949865
  bottles: ['1','3']
- name: Wodden Pinot Noir
  id: c71d4699-dd29-4fb6-8509-e57f947835be
  bottles: ['2','5','7']
`), os.ModePerm)
		Expect(err).ShouldNot(HaveOccurred())

		session, err = Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())

		awaitStartup()

		resp, err := http.Get(url("/api/wines/byBottle/77"))
		Expect(err).ShouldNot(HaveOccurred())
		defer resp.Body.Close()
		Expect(resp.StatusCode).To(Equal(http.StatusNotFound))
	})

})

func awaitStartup() {
	Eventually(func() bool {
		get, err := http.Get(url(healthEndpoint))
		if err != nil {
			return false
		}
		return get.StatusCode == http.StatusOK
	}, waitStartup, pollIntervalStartup).Should(Equal(true), "service must be healthy")
}

func assertServiceNotRunning() {
	Eventually(func() bool {
		_, err := http.Get(url(healthEndpoint))
		return err != nil
	}, waitStartup, pollIntervalStartup).Should(Equal(true), "service did not shut down")
}

func url(route string) string {
	return fmt.Sprintf("http://localhost:%d%s", port, route)
}
