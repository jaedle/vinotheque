package integration_test

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Integration", func() {
	It("should be a novel", func() {
		Expect(true).To(Equal(true))
	})
})
