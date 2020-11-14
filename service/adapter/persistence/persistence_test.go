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
			repo, err := persistence.New("root:password@tcp(localhost:3307)/database")
			Expect(err).NotTo(HaveOccurred())

			Expect(repo.Ping()).NotTo(HaveOccurred())
		})

		It("fails on connection problem", func() {
			repo, err := persistence.New("root:wrong-password@tcp(localhost:3307)/database")
			Expect(err).NotTo(HaveOccurred())

			Expect(repo.Ping()).To(HaveOccurred())
		})
	})

	Context("persists wine", func() {
		var repo *persistence.Repository

		BeforeEach(func() {
			var err error
			repo, err = persistence.New("root:password@tcp(localhost:3307)/database")
			Expect(err).NotTo(HaveOccurred())

			err = repo.Clear()
			Expect(err).NotTo(HaveOccurred())
		})

		It("is empty on creation", func() {
			Expect(repo.Size()).To(Equal(0))
		})

		It("persists wine", func() {
			Expect(repo.Save(domain.NewWine("1"))).NotTo(HaveOccurred())

			Expect(repo.Size()).To(Equal(1))
			Expect(repo.Load("1")).To(Equal(domain.NewWine("1")))
		})

		It("persists wines", func() {
			Expect(repo.Save(domain.NewWine("1"))).NotTo(HaveOccurred())
			Expect(repo.Save(domain.NewWine("2"))).NotTo(HaveOccurred())
			Expect(repo.Save(domain.NewWine("3"))).NotTo(HaveOccurred())

			Expect(repo.Size()).To(Equal(3))
		})

		It("fails on loading wine with unknnown id", func() {
			Expect(repo.Save(domain.NewWine("1"))).NotTo(HaveOccurred())

			res, err := repo.Load("2")
			Expect(err).To(HaveOccurred())
			Expect(res).To(BeNil())
		})
	})

})
