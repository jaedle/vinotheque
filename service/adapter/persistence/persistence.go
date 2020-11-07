package persistence

import "database/sql"
import _ "github.com/go-sql-driver/mysql"

type Repository struct {
	sql *sql.DB
}

func (r *Repository) Ping() error {
	return r.sql.Ping()
}

func New(con string) *Repository {
	sql, err := sql.Open("mysql", con)
	if err != nil {
		panic(err)
	}
	return &Repository{
		sql: sql,
	}
}
