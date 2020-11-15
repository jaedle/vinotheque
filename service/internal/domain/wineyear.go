package domain

import "fmt"

func WineYearOf(year int) (*WineYear, error) {
	if year < 1900 || year > 2030 {
		return nil, fmt.Errorf("wineyear must be between 1900 and 2030")
	}
	return &WineYear{
		value: year,
	}, nil
}

type WineYear struct {
	value int
}

func (y *WineYear) Value() int {
	return y.value
}
