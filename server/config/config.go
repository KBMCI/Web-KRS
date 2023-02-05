package config

import (
	"log"
	"os"
	"strconv"

	"web-krs/config/mysql"

	"gorm.io/gorm"
)

type (
	config struct {
	}

	Config interface {
		ServiceUserName() string
		ServicePassword() string
		ServiceHost() string
		ServicePort() int
		ServiceDBName() string
		Database() *gorm.DB
		ServerPort() int
	}
)

func NewConfig() Config {
	return &config{}
}

func (c *config) ServiceUserName() string {
	return os.Getenv("DB_USERNAME")
}

func (c *config) ServicePassword() string {
	return os.Getenv("DB_PASSWORD")
}

func (c *config) ServiceHost() string {
	return os.Getenv("DB_HOST")
}

func (c *config) ServicePort() int {
	port, err := strconv.Atoi(os.Getenv("DB_PORT"))
	if err != nil {
		log.Fatal(err)
	}
	return port
}

func (c *config) ServiceDBName() string {
	return os.Getenv("DB_DATABASE")
}

func (c *config) Database() *gorm.DB {
	return mysql.InitGorm(c.ServiceUserName(), c.ServicePassword(), c.ServiceHost(), c.ServiceDBName(), c.ServicePort())
}

func (c *config) ServerPort() int {
	port, err := strconv.Atoi(os.Getenv("SERVER_PORT"))

	if err != nil {
		log.Fatal(err)
	}
	return port
}