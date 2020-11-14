package persistence

import (
	"database/sql"
	"github.com/jaedle/vinotheque/service/domain"
)
import _ "github.com/go-sql-driver/mysql"

type Repository struct {
	sql *sql.DB
}

func (r *Repository) Ping() error {
	return r.sql.Ping()
}

func (r *Repository) Size() (int, error) {
	var size int
	row := r.sql.QueryRow("SELECT COUNT(id) FROM wines")
	if err := row.Err(); err != nil {
		return -1, err
	}
	err := row.Scan(&size)

	return size, err
}

func (r *Repository) Save(w *domain.Wine) error {
	_, err := r.sql.Exec("INSERT INTO wines (id) VALUES (?)", w.GetId().Value())
	return err
}

func (r *Repository) Clear() error {
	_, err := r.sql.Exec("DROP TABLE IF EXISTS wines")
	if err != nil {
		return err
	}

	_, err = r.sql.Exec(`
CREATE TABLE wines (
	id varchar(255) primary key
);
`)
	return err
}

func (r *Repository) Load(id *domain.WineId) (*domain.Wine, error) {
	res := r.sql.QueryRow("SELECT id FROM wines WHERE id = ?", id.Value())

	var result string
	err := res.Scan(&result)
	if err != nil {
		return nil, err
	}

	return toWine(result), nil
}

func toWine(result string) *domain.Wine {
	return domain.NewWine(domain.NewWineId(result))
}

func New(con string) (*Repository, error) {
	sql, err := sql.Open("mysql", con)

	return &Repository{
		sql: sql,
	}, err
}
