package persistence_test

import (
	"github.com/jaedle/vinotheque/service/adapter/persistence"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Persistence", func() {
	It("pings database", func() {
		repo := persistence.New("root:password@tcp(localhost:3307)/database")

		err := repo.Ping()

		Expect(err).NotTo(HaveOccurred())
	})

	It("fails on failing connection", func() {
		repo := persistence.New("root:wrong-password@tcp(localhost:3307)/database")

		err := repo.Ping()

		Expect(err).To(HaveOccurred())
	})
})
