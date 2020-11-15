package domain

type Wine struct {
	id   *WineId
	name *WineName
}

func NewWine(id *WineId, name *WineName) *Wine {
	res := &Wine{
		id: id,
	}
	res.SetName(name)
	return res
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

type WineId struct {
	string string
}

func WineIdOf(id string) *WineId {
	return &WineId{string: id}
}

func (w *WineId) Value() string {
	return w.string
}

type WineName struct {
	value string
}

func (n *WineName) Value() string {
	return n.value
}

func WineNameOf(n string) *WineName {
	return &WineName{value: n}
}
