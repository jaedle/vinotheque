package ui_test

import (
	"github.com/jaedle/vinotheque/service/internal/adapter/ui.go"
	"github.com/jaedle/vinotheque/service/internal/domain"
	"github.com/jaedle/vinotheque/service/internal/testconfig"
	"github.com/julienschmidt/httprouter"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"net/http"
	"net/http/httptest"
)

var _ = Describe("Ui", func() {
	var repo domain.WineRepository
	var router *httprouter.Router

	BeforeSuite(func() {
		repo = testconfig.WineRepository()
		router = httprouter.New()
		ui.NewUi(router, repo)
	})

	BeforeEach(func() {
		Expect(repo.Clear()).NotTo(HaveOccurred())
	})

	Context("GET /api/v2/wines", func() {
		It("returns wines", func() {
			id1 := domain.WineIdOf("a-wine-id")
			name1 := domain.WineNameOf("a-wine-name")
			wine1 := domain.NewWine(id1, name1)
			_ = repo.Save(wine1)
			id2 := domain.WineIdOf("another-wine-id")
			name2 := domain.WineNameOf("another-wine-name")
			wine2 := domain.NewWine(id2, name2)
			_ = repo.Save(wine2)

			res := get(router, "/api/v2/wines")

			Expect(res.Code).To(Equal(http.StatusOK))
			Expect(res.Header().Get("Content-Type")).To(Equal("application/json"))
			Expect(res.Body.String()).To(MatchJSON(`{
			"wines":[
				{"id": "a-wine-id", "name": "a-wine-name"},
				{"id": "another-wine-id", "name": "another-wine-name"}
			]}`),
			)
		})
	})

})

func get(router *httprouter.Router, url string) *httptest.ResponseRecorder {
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	res := httptest.NewRecorder()
	router.ServeHTTP(res, req)

	return res
}
