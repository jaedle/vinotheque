package domain

type WineName struct {
	value string
}

func (n *WineName) Value() string {
	return n.value
}

func WineNameOf(n string) *WineName {
	return &WineName{value: n}
}
