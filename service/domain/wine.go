package domain

func NewWine(id *WineId, name *WineName) *Wine {
	res := &Wine{
		id: id,
	}
	res.SetName(name)
	return res
}

type Wine struct {
	id   *WineId
	name *WineName
}

func (w *Wine) GetId() *WineId {
	return w.id
}

func (w *Wine) SetName(n *WineName) {
	w.name = n
}

func (w *Wine) GetName() *WineName {
	return w.name
}
