package persistence_test

import (
	"github.com/jaedle/vinotheque/service/adapter/persistence"
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
			err := repo.Save("1")
			Expect(err).NotTo(HaveOccurred())

			Expect(repo.Size()).To(Equal(1))
		})

	})



})
