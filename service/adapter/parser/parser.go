package parser

import (
	"fmt"
	"github.com/ghodss/yaml"
	"github.com/jaedle/vinotheque/service/domain"
)

type Import struct {
	Wines []WineDto `yaml:"wines"`
}

type WineDto struct {
	Id   string `yaml:"id"`
	Name string `yaml:"name"`
	Year int    `yaml:"year"`
}

func Parse(input string) ([]*domain.Wine, error) {
	if len(input) == 0 {
		return nil, fmt.Errorf("please provide an non empty input")
	}

	var i Import
	err := yaml.Unmarshal([]byte(input), &i)
	if err != nil {
		return nil, err
	}

	return toResult(i), nil
}

func toResult(i Import) []*domain.Wine {
	var result []*domain.Wine
	for _, current := range i.Wines {
		result = append(result, toWine(current))
	}
	return result
}

func toWine(current WineDto) *domain.Wine {
	result := domain.NewWine(
		domain.WineIdOf(current.Id),
		domain.WineNameOf(current.Name),
	)
	year, err := domain.WineYearOf(current.Year)
	if err != nil {
		panic(err)
	}
	result.SetYear(year)
	return result
}
