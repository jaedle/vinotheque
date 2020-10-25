package main

import (
	"encoding/json"
	"github.com/ghodss/yaml"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

type model struct {
	Wines []interface{} `json:"wines"`
}

type wineInternal struct {
	Id      string   `json:"id"`
	Bottles []string `json:"bottles"`
}

type byBottleResponse struct {
	Id string `json:"id"`
}

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

	j, err := yaml.YAMLToJSON(wines)
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}

	var m model
	err = json.Unmarshal(j, &m)
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}

	http.HandleFunc("/api/wines", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		_, _ = w.Write(j)
		w.WriteHeader(200)
	})

	http.HandleFunc("/api/wines/", func(w http.ResponseWriter, r *http.Request) {
		segments := strings.Split(r.URL.Path, "/")

		var result interface{}
		for _, wine := range m.Wines {
			current, _ := json.Marshal(wine)
			var withId wineInternal
			_ = json.Unmarshal(current, &withId)
			if withId.Id == segments[len(segments)-1] {
				result = wine
				break
			}
		}

		if result == nil {
			w.WriteHeader(404)
			return
		} else {
			w.Header().Add("Content-Type", "application/json")
			marshal, _ := json.Marshal(result)
			_, _ = w.Write(marshal)
			w.WriteHeader(200)
		}
	})

	http.HandleFunc("/api/wines/byBottle/", func(w http.ResponseWriter, r *http.Request) {
		segments := strings.Split(r.URL.Path, "/")
		bottle := segments[len(segments)-1]

		var result *wineInternal
		for _, wine := range m.Wines {
			current, _ := json.Marshal(wine)
			var withId wineInternal
			_ = json.Unmarshal(current, &withId)
			for _, current := range withId.Bottles {
				if current == bottle {
					result = &withId
					break
				}
			}
		}
		if result == nil {
			w.WriteHeader(404)
			return
		} else {
			w.Header().Add("Content-Type", "application/json")
			marshal, _ := json.Marshal(byBottleResponse{Id: result.Id})
			_, _ = w.Write(marshal)
		}
	})

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
