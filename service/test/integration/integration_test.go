package integration_test

import (
	"os/exec"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	. "github.com/onsi/gomega/gexec"
)

var _ = Describe("Integration", func() {
	var artifact string
	var session *Session

	BeforeSuite(func() {
		var err error
		artifact, err = Build("github.com/jaedle/vinotheque/service")
		Expect(err).ShouldNot(HaveOccurred())
	})

	AfterSuite(func() {
		CleanupBuildArtifacts()
	})

	AfterEach(func() {
		if session != nil {
			session.Kill()
		}
	})

	It("executes service", func() {
		command := exec.Command(artifact)
		session, err := Start(command, GinkgoWriter, GinkgoWriter)
		Expect(err).ShouldNot(HaveOccurred())
		Eventually(session).Should(Exit(0))
	})
})
