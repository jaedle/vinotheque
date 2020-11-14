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
			wine := domain.NewWine(domain.NewWineId(aWineId))
			aSavedWine(repo, wine)

			Expect(repo.Size()).To(Equal(1))
			Expect(repo.Load(domain.NewWineId(aWineId))).To(Equal(domain.NewWine(domain.NewWineId(aWineId))))
		})

		It("persists wines", func() {
			aSavedWine(repo, aWine(aWineId))
			aSavedWine(repo, aWine("2"))
			aSavedWine(repo, aWine("3"))

			Expect(repo.Size()).To(Equal(3))
		})

		It("fails on loading wine with unknown id", func() {
			Expect(repo.Save(domain.NewWine(domain.NewWineId(aWineId)))).NotTo(HaveOccurred())

			res, err := repo.Load(domain.NewWineId(aMissingWineId))
			Expect(err).To(HaveOccurred())
			Expect(res).To(BeNil())
		})
	})

})

func aSavedWine(repo *persistence.WineRepository, wine *domain.Wine) bool {
	return Expect(repo.Save(wine)).NotTo(HaveOccurred())
}

func aWine(id string) *domain.Wine {
	return domain.NewWine(
		domain.NewWineId(id),
	)
}
