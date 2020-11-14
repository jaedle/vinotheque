package domain

func NewWine(id *WineId) *Wine {
	return &Wine{
		id: id,
	}
}

type Wine struct {
	id *WineId
}

func (w *Wine) GetId() *WineId {
	return w.id
}

type WineId struct {
	id string
}

func NewWineId(id string) *WineId {
	return &WineId{id: id}
}

func (w *WineId) Value() string {
	return w.id
}
