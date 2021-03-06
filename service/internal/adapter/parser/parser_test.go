package parser_test

import (
	"github.com/jaedle/vinotheque/service/internal/adapter/parser"
	"github.com/jaedle/vinotheque/service/internal/domain"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Parser", func() {
	It("parses input", func() {
		res, err := parser.Parse(`wines:
  - id: 59145fbf-686c-4697-a5a1-3efa1771924f
    name: WineDto Name 1
    year: 1988
  - id: f6ad7a19-7db4-4cd6-a5fa-98ceab08b592
    name: WineDto Name 2
    year: 2000
`)
		Expect(err).ToNot(HaveOccurred())
		wine1 := domain.NewWine(
			domain.WineIdOf("59145fbf-686c-4697-a5a1-3efa1771924f"),
			domain.WineNameOf("WineDto Name 1"),
		)
		year, err := domain.WineYearOf(1988)
		Expect(err).NotTo(HaveOccurred())
		wine1.SetYear(year)

		wine2 := domain.NewWine(
			domain.WineIdOf("f6ad7a19-7db4-4cd6-a5fa-98ceab08b592"),
			domain.WineNameOf("WineDto Name 2"),
		)
		year2, err := domain.WineYearOf(2000)
		Expect(err).NotTo(HaveOccurred())
		wine2.SetYear(year2)

		Expect(res).To(Equal([]*domain.Wine{wine1, wine2}))
	})

	It("fails on empty input", func() {
		res, err := parser.Parse("")
		Expect(err).To(HaveOccurred())
		Expect(res).To(BeNil())
	})

	It("fails on malformed input", func() {
		res, err := parser.Parse(`wines:
  - id: 59145fbf-686c-4697-a5a1-3efa1771924f
    name: WineDto Name 1
mal: for: med`)
		Expect(err).To(HaveOccurred())
		Expect(res).To(BeNil())
	})
})
