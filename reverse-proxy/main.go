package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func main() {
	http.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(200)
	})

	proxy("/api/", "http://localhost:8080/")
	proxy("/", "http://localhost:4200/")

	log.Fatal(http.ListenAndServe(":8000", nil))
}

func proxy(route string, target string) {
	remote, err := url.Parse(target)
	if err != nil {
		panic(err)
	}

	proxy := httputil.NewSingleHostReverseProxy(remote)
	http.HandleFunc(route, func(w http.ResponseWriter, req *http.Request) {
		req.Host = req.URL.Host
		proxy.ServeHTTP(w, req)
	})
}
