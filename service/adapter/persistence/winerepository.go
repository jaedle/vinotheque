package persistence

import (
	"database/sql"
	"github.com/jaedle/vinotheque/service/domain"
)
import _ "github.com/go-sql-driver/mysql"

const tableQuery = `
CREATE TABLE wines (
	id varchar(255) primary key
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
	_, err := r.sql.Exec("INSERT INTO wines (id) VALUES (?)", w.GetId().Value())
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
	res := r.sql.QueryRow("SELECT id FROM wines WHERE id = ?", id.Value())

	var result string
	err := res.Scan(&result)
	if err != nil {
		return nil, err
	}

	return toWine(result), nil
}

func (r *WineRepository) LoadAll() ([]*domain.Wine, error) {
	q, err := r.sql.Query("SELECT id FROM wines")
	if err != nil {
		return nil, err
	}
	defer q.Close()

	var result []*domain.Wine
	for q.Next() {
		var id string
		if err := q.Scan(&id); err != nil {
			return nil, err
		}
		result = append(result, toWine(id))
	}

	return result, nil
}

func toWine(result string) *domain.Wine {
	return domain.NewWine(domain.NewWineId(result))
}

func NewWineRepository(con string) (*WineRepository, error) {
	sql, err := sql.Open("mysql", con)

	return &WineRepository{
		sql: sql,
	}, err
}
