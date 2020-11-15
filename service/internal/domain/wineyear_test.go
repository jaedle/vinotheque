package domain_test

import (
	"github.com/jaedle/vinotheque/service/internal/domain"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("WineYear", func() {
	It("creates", func() {
		res, err := domain.WineYearOf(1997)

		Expect(err).NotTo(HaveOccurred())
		Expect(res.Value()).To(Equal(1997))
	})

	It("fails on invalid input", func() {
		assertCreationFails(1898)
		assertCreationSucceds(1900)
		assertCreationSucceds(1995)
		assertCreationSucceds(2030)
		assertCreationFails(2031)
	})
})

func assertCreationSucceds(year int) {
	_, err := domain.WineYearOf(year)
	Expect(err).NotTo(HaveOccurred())
}

func assertCreationFails(year int) {
	_, err := domain.WineYearOf(year)
	Expect(err).To(HaveOccurred())
}
