package mysql

import (
	"fmt"
	"log"
	"web-krs/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitGorm(userName, password, host, dbName string, port int) *gorm.DB {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", userName, password, host, port, dbName)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err.Error())
	}

	db.AutoMigrate(&model.User{})
	// db.Migrator().DropTable(&model.User{})
	
	return db
}
