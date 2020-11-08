package domain_test

import (
	"github.com/jaedle/vinotheque/service/domain"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Wine", func() {
	It("creates", func() {
		wine := domain.NewWine("1")

		Expect(wine.GetId()).To(Equal("1"))
	})
})
