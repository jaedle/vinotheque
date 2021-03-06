package domain_test

import (
	"github.com/jaedle/vinotheque/service/internal/domain"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Wine", func() {
	const aWineName = "Great Riesling"
	const aWineId = "1"

	It("creates", func() {
		wine := domain.NewWine(domain.WineIdOf("1"), domain.WineNameOf("asdf"))

		Expect(wine.GetId()).To(Equal(domain.WineIdOf("1")))
		Expect(wine.GetName()).To(Equal(domain.WineNameOf("asdf")))
		Expect(wine.GetYear()).To(BeNil())
	})

	It("restores", func() {
		wine := domain.NewWine(domain.WineIdOf(aWineId), domain.WineNameOf(aWineName))
		wine.SetName(domain.WineNameOf(aWineName))

		restored := domain.NewWine(domain.WineIdOf(aWineId), domain.WineNameOf(aWineName))

		Expect(restored).To(Equal(wine))
	})

	It("updates name", func() {
		wine := domain.NewWine(domain.WineIdOf(aWineId), domain.WineNameOf(aWineName))

		wine.SetName(domain.WineNameOf("updated"))

		Expect(wine.GetName()).To(Equal(domain.WineNameOf("updated")))
	})

	It("updates year", func() {
		wine := domain.NewWine(domain.WineIdOf(aWineId), domain.WineNameOf(aWineName))

		year, _ := domain.WineYearOf(2010)
		wine.SetYear(year)

		Expect(wine.GetYear()).To(Equal(year))
	})

	Context("WineId", func() {
		It("creates", func() {
			Expect(domain.WineIdOf("1").Value()).To(Equal("1"))
		})
	})

	Context("WineName", func() {
		It("creates", func() {
			Expect(domain.WineNameOf(aWineName).Value()).To(Equal(aWineName))
		})
	})
})
