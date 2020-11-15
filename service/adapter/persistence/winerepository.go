package persistence

import (
	"database/sql"
	"github.com/jaedle/vinotheque/service/domain"
)
import _ "github.com/go-sql-driver/mysql"

const tableQuery = `
CREATE TABLE wines (
	id varchar(255) primary key,
	name varchar(255) NOT NULL,
	year int NULL
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
	var year *int = nil
	if w.GetYear() != nil {
		value := w.GetYear().Value()
		year = &value
	}
	_, err := r.sql.Exec("INSERT INTO wines (`id`, `name`,`year`) VALUES (?, ?, ?)",
		w.GetId().Value(),
		w.GetName().Value(),
		year,
	)
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
	res := r.sql.QueryRow("SELECT `id`, `name`, `year` FROM `wines` WHERE `id` = ?", id.Value())

	var result string
	var name string
	var year *int
	err := res.Scan(&result, &name, &year)
	if err != nil {
		return nil, err
	}

	return toWine(result, name, year), nil
}

func (r *WineRepository) LoadAll() ([]*domain.Wine, error) {
	q, err := r.sql.Query("SELECT `id`, `name`, `year` FROM `wines`")
	if err != nil {
		return nil, err
	}
	defer q.Close()

	var result []*domain.Wine
	for q.Next() {
		var id string
		var name string
		var year *int
		if err := q.Scan(&id, &name, &year); err != nil {
			return nil, err
		}
		result = append(result, toWine(id, name, year))
	}

	return result, nil
}

func toWine(id string, name string, year *int) *domain.Wine {
	result := domain.NewWine(domain.WineIdOf(id), domain.WineNameOf(name))
	if year != nil {
		y, _ := domain.WineYearOf(*year)
		result.SetYear(y)
	}
	return result
}

func NewWineRepository(con string) (*WineRepository, error) {
	sql, err := sql.Open("mysql", con)

	return &WineRepository{
		sql: sql,
	}, err
}
