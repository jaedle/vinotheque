package ui

import (
	"encoding/json"
	"github.com/jaedle/vinotheque/service/internal/domain"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

type context struct {
	repo domain.WineRepository
}

func NewUi(r *httprouter.Router, repo domain.WineRepository) {
	c := context{repo: repo}
	r.GET("/api/v2/wines", c.listWines())
}

func (c *context) listWines() func(w http.ResponseWriter, rq *http.Request, _ httprouter.Params) {
	return func(w http.ResponseWriter, rq *http.Request, _ httprouter.Params) {
		wines, _ := c.repo.LoadAll()
		w.Header().Add("Content-Type", "application/json")
		body, _ := json.Marshal(toListWineResponse(wines))
		_, _ = w.Write(body)
		w.WriteHeader(http.StatusOK)
	}
}

type listWinesResponse struct {
	Wines []wineDto `json:"wines"`
}

type wineDto struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func toListWineResponse(wines []*domain.Wine) *listWinesResponse {
	var result []wineDto
	for _, w := range wines {
		result = append(result, toWineDto(w))
	}

	return &listWinesResponse{Wines: result}
}

func toWineDto(wine *domain.Wine) wineDto {
	return wineDto{
		Id:   wine.GetId().Value(),
		Name: wine.GetName().Value(),
	}
}
