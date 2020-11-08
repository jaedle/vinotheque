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
	_, err := r.sql.Exec("INSERT INTO wines (id) VALUES (?)", w.GetId())
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

func New(con string) (*Repository, error) {
	sql, err := sql.Open("mysql", con)

	return &Repository{
		sql: sql,
	}, err
}
