package domain

type WineRepository interface {
	Save(w *Wine) error
	Clear() error
	Load(id *WineId) (*Wine, error)
	LoadAll() ([]*Wine, error)
}
