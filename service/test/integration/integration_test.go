package integration_test

import (
	"fmt"
	"net/http"
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
	var session *Session

	BeforeSuite(func() {
		var err error
		artifact, err = Build("github.com/jaedle/vinotheque/service")
		Expect(err).ShouldNot(HaveOccurred())
	})

	AfterEach(func() {
		if session != nil {
			session.Kill()
		}
	})

	AfterSuite(func() {
		CleanupBuildArtifacts()
	})

	It("starts service", func() {
		command := exec.Command(artifact)
		command.Env = append(command.Env, fmt.Sprintf("PORT=%d", port))
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
