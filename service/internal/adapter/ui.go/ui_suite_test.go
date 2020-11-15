package ui_test

import (
	"testing"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func TestUi(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Ui Suite")
}
