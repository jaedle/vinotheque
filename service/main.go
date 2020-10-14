package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	port, ok := os.LookupEnv("PORT")
	if !ok {
		os.Exit(1)
	}

	http.HandleFunc("/api/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/api/wines", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"wines":[{"name":"Great Shiraz"},{"name":"Wodden Pinor Noir"}]}`))
		w.WriteHeader(200)
	})

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
