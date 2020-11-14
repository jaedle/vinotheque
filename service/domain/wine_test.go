package domain_test

import (
	"github.com/jaedle/vinotheque/service/domain"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Wine", func() {
	It("creates", func() {
		wine := domain.NewWine(domain.NewWineId("1"))

		Expect(wine.GetId()).To(Equal(domain.NewWineId("1")))
	})
})
