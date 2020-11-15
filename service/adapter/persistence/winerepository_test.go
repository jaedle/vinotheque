package persistence_test

import (
	"github.com/jaedle/vinotheque/service/adapter/persistence"
	"github.com/jaedle/vinotheque/service/domain"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

const connectionString = "root:password@tcp(localhost:3307)/database"
const notAuthorizedConnectionString = "root:wrong-password@tcp(localhost:3307)/database"

var _ = Describe("Persistence", func() {
	Context("database health check", func() {
		It("does not fail if ok", func() {
			repo, err := persistence.NewWineRepository(connectionString)
			Expect(err).NotTo(HaveOccurred())

			Expect(repo.Ping()).NotTo(HaveOccurred())
		})

		It("fails on connection problem", func() {
			repo, err := persistence.NewWineRepository(notAuthorizedConnectionString)
			Expect(err).NotTo(HaveOccurred())

			Expect(repo.Ping()).To(HaveOccurred())
		})
	})

	Context("persists wine", func() {
		var repo *persistence.WineRepository

		BeforeEach(func() {
			var err error
			repo, err = persistence.NewWineRepository(connectionString)
			Expect(err).NotTo(HaveOccurred())

			err = repo.Clear()
			Expect(err).NotTo(HaveOccurred())
		})

		It("is empty on creation", func() {
			Expect(repo.Size()).To(Equal(0))
		})

		const aWineId = "1"
		const aMissingWineId = "2"

		It("persists wine", func() {
			wine := domain.NewWine(domain.WineIdOf(aWineId), domain.WineNameOf("asdf"))
			aSavedWine(repo, wine)

			Expect(repo.Size()).To(Equal(1))
			Expect(repo.Load(domain.WineIdOf(aWineId))).To(Equal(domain.NewWine(domain.WineIdOf(aWineId), domain.WineNameOf("asdf"))))
		})

		It("persists wines", func() {
			wine1 := aWine(aWineId)
			wine2 := aWine("2")
			wine3 := aWine("3")
			aSavedWine(repo, wine1, wine2, wine3)

			Expect(repo.Size()).To(Equal(3))
		})

		It("fails on loading wine with unknown id", func() {
			aSavedWine(repo, aWine(aWineId))

			res, err := repo.Load(domain.WineIdOf(aMissingWineId))
			Expect(err).To(HaveOccurred())
			Expect(res).To(BeNil())
		})

		It("loads all wines", func() {
			wine1 := aWine(aWineId)
			wine2 := aWine("2")
			wine3 := aWine("3")
			aSavedWine(repo, wine1, wine2, wine3)

			res, err := repo.LoadAll()
			Expect(err).ToNot(HaveOccurred())
			Expect(len(res)).To(Equal(3))
			Expect(res).To(ConsistOf([]*domain.Wine{wine1, wine2, wine3}))
		})

		It("persists optional wine year", func() {
			wineWithYear := aWine(aWineId)
			year, _ := domain.WineYearOf(1988)
			wineWithYear.SetYear(year)
			wineWithoutYear := aWine("2")
			wineWithoutYear.SetYear(nil)

			aSavedWine(repo, wineWithYear, wineWithoutYear)

			wine, err := repo.Load(wineWithoutYear.GetId())
			Expect(err).NotTo(HaveOccurred())
			Expect(wine.GetYear()).To(BeNil())
			wine, err = repo.Load(wineWithYear.GetId())
			Expect(err).NotTo(HaveOccurred())
			Expect(wine.GetYear().Value()).To(Equal(1988))

		})

	})

})

func aSavedWine(repo *persistence.WineRepository, wines ...*domain.Wine) {
	for _, w := range wines {
		Expect(repo.Save(w)).NotTo(HaveOccurred())
	}
}

func aWine(id string) *domain.Wine {
	res := domain.NewWine(
		domain.WineIdOf(id),
		domain.WineNameOf("A name for "+id),
	)
	year, err := domain.WineYearOf(1999)
	Expect(err).NotTo(HaveOccurred())
	res.SetYear(year)
	return res
}
