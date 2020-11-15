package ui

import (
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func NewUi(r *httprouter.Router) {
	r.GET("/api/v2/wines", listWines())
}

func listWines() func(w http.ResponseWriter, rq *http.Request, _ httprouter.Params) {
	return func(w http.ResponseWriter, rq *http.Request, _ httprouter.Params) {
		w.Header().Add("Content-Type", "application/json")
		result := listWinesResponse{
			Wines: []wineDto{},
		}
		body, _ := json.Marshal(result)
		_, _ = w.Write(body)
		w.WriteHeader(http.StatusOK)
	}
}

type listWinesResponse struct {
	Wines []wineDto `json:"wines"`
}

type wineDto struct {
}
