package main

import (
	"github.com/ghodss/yaml"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	port, ok := os.LookupEnv("PORT")
	if !ok {
		os.Exit(1)
	}

	winelist, ok := os.LookupEnv("WINES")
	if !ok {
		os.Exit(1)
	}

	http.HandleFunc("/api/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	wines, err := ioutil.ReadFile(winelist)
	if err != nil {
		os.Exit(1)
	}

	json, err := yaml.YAMLToJSON(wines)
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}

	http.HandleFunc("/api/wines", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(json)
		w.WriteHeader(200)
	})

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
