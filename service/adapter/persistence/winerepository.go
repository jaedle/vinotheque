package persistence

import (
	"database/sql"
	"github.com/jaedle/vinotheque/service/domain"
)
import _ "github.com/go-sql-driver/mysql"

const tableQuery = `
CREATE TABLE wines (
	id varchar(255) primary key,
	name varchar(255)
);
`

type WineRepository struct {
	sql *sql.DB
}

func (r *WineRepository) Ping() error {
	return r.sql.Ping()
}

func (r *WineRepository) Size() (int, error) {
	var size int
	row := r.sql.QueryRow("SELECT COUNT(id) FROM wines")
	if err := row.Err(); err != nil {
		return -1, err
	}
	err := row.Scan(&size)

	return size, err
}

func (r *WineRepository) Save(w *domain.Wine) error {
	_, err := r.sql.Exec("INSERT INTO wines (`id`, `name`) VALUES (?, ?)", w.GetId().Value(), w.GetName().Value())
	return err
}

func (r *WineRepository) Clear() error {
	if err := r.dropTable(); err != nil {
		return err
	}

	return r.createTable()
}

func (r *WineRepository) dropTable() error {
	_, err := r.sql.Exec("DROP TABLE IF EXISTS wines")
	return err
}

func (r *WineRepository) createTable() error {
	_, err := r.sql.Exec(tableQuery)
	return err
}

func (r *WineRepository) Load(id *domain.WineId) (*domain.Wine, error) {
	res := r.sql.QueryRow("SELECT `id`, `name` FROM `wines` WHERE `id` = ?", id.Value())

	var result string
	var name string
	err := res.Scan(&result, &name)
	if err != nil {
		return nil, err
	}

	return toWine(result, name), nil
}

func (r *WineRepository) LoadAll() ([]*domain.Wine, error) {
	q, err := r.sql.Query("SELECT `id`, `name` FROM `wines`")
	if err != nil {
		return nil, err
	}
	defer q.Close()

	var result []*domain.Wine
	for q.Next() {
		var id string
		var name string
		if err := q.Scan(&id, &name); err != nil {
			return nil, err
		}
		result = append(result, toWine(id, name))
	}

	return result, nil
}

func toWine(id string, name string) *domain.Wine {
	return domain.NewWine(domain.WineIdOf(id), domain.WineNameOf(name))
}

func NewWineRepository(con string) (*WineRepository, error) {
	sql, err := sql.Open("mysql", con)

	return &WineRepository{
		sql: sql,
	}, err
}
