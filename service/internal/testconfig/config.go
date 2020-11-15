package testconfig

import (
	"github.com/jaedle/vinotheque/service/internal/adapter/persistence"
	"github.com/jaedle/vinotheque/service/internal/domain"
)

func WineRepository() domain.WineRepository {
	result, err := persistence.NewWineRepository("root:password@tcp(localhost:3307)/database")
	if err != nil {
		panic(err)
	}

	return result
}
