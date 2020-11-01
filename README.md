# Vinotheque 

Manage your vinotheque! ;)

## Development

### Repository structure

```txt
.
├── .dependabot         dependabot configuration
├── .github             ci workflow configuration
├── certs               certificates for local https
├── deployments         recipies for deployments
├── e2e                 end-2-end tests based on testcafe
├── label-creator       cli-tool based on typescript to generate bottle labels
├── release             script to create github-release 
├── reverse-proxy       reverse proxy for local development based on caddy
├── service             restful-service written in go
├── tools               miscellaneous tools
└── ui                  web-ui based on angular
```


### Prerequisites

The project is meant to be developed on a mac.

- [task](https://github.com/go-task/task): a task runner
- [brew](https://brew.sh/): macos package manager
- [go](https://golang.org/)
- [nodejs](https://nodejs.org/en/)
- [Chrome](https://www.google.com/chrome/)

Please have a look at the  `.tool-versions` for the major versions of the proramming lanaguages. 

### local https

In order to develop you'll need https for local development.

[Reference](https://medium.com/@devahmedshendy/traditional-setup-run-local-development-over-https-using-caddy-964884e75232)

### Getting started

In order to get started please run the following commands:

```sh
task install # install dependencies for the project
task register-local-domain # register the domain vinotheque.foo.bar in your `/etc/hosts` file
task world # run all verifications (lint, format, tests, e2e-tests, ...)
```
