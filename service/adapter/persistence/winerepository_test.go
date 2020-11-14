package persistence_test

import (
	"github.com/jaedle/vinotheque/service/adapter/persistence"
	"github.com/jaedle/vinotheque/service/domain"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Persistence", func() {
	Context("database health check", func() {
		It("does not fail if ok", func() {
			repo, err := persistence.NewWineRepository("root:password@tcp(localhost:3307)/database")
			Expect(err).NotTo(HaveOccurred())

			Expect(repo.Ping()).NotTo(HaveOccurred())
		})

		It("fails on connection problem", func() {
			repo, err := persistence.NewWineRepository("root:wrong-password@tcp(localhost:3307)/database")
			Expect(err).NotTo(HaveOccurred())

			Expect(repo.Ping()).To(HaveOccurred())
		})
	})

	Context("persists wine", func() {
		var repo *persistence.WineRepository

		BeforeEach(func() {
			var err error
			repo, err = persistence.NewWineRepository("root:password@tcp(localhost:3307)/database")
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
			Expect(repo.Save(domain.NewWine(domain.NewWineId(aWineId)))).NotTo(HaveOccurred())

			Expect(repo.Size()).To(Equal(1))
			Expect(repo.Load(domain.NewWineId(aWineId))).To(Equal(domain.NewWine(domain.NewWineId(aWineId))))
		})

		It("persists wines", func() {
			Expect(repo.Save(domain.NewWine(domain.NewWineId(aWineId)))).NotTo(HaveOccurred())
			Expect(repo.Save(domain.NewWine(domain.NewWineId("2")))).NotTo(HaveOccurred())
			Expect(repo.Save(domain.NewWine(domain.NewWineId("3")))).NotTo(HaveOccurred())

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
