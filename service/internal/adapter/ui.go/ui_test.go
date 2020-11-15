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
		ui.NewUi(router)
	})

	BeforeEach(func() {
		Expect(repo.Clear()).NotTo(HaveOccurred())
	})

	Context("GET /api/v2/wines", func() {
		It("returns wines", func() {
			res := get(router, "/api/v2/wines")

			Expect(res.Code).To(Equal(http.StatusOK))
			Expect(res.Header().Get("Content-Type")).To(Equal("application/json"))
			Expect(res.Body.String()).To(Equal(`{"wines":[]}`))
		})
	})

})

func get(router *httprouter.Router, url string) *httptest.ResponseRecorder {
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	res := httptest.NewRecorder()
	router.ServeHTTP(res, req)

	return res
}
