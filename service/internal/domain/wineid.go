package domain

type WineId struct {
	string string
}

func WineIdOf(id string) *WineId {
	return &WineId{string: id}
}

func (w *WineId) Value() string {
	return w.string
}
