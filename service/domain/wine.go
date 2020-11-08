package domain

func NewWine(id string) *Wine {
	return &Wine{
		id: id,
	}
}

type Wine struct {
	id string
}

func (w *Wine) GetId() string {
	return w.id
}
