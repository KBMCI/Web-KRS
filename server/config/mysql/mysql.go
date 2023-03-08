package mysql

import (
	"fmt"
	"log"
	"web-krs/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitGorm(username, password, host, database string, port int, ) *gorm.DB {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	// dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
	dsn := fmt.Sprintf(
			"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", 
			username, 
			password, 
			host, 
			port, 
			database,
	)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Cannot connect to database")
	}
	db.AutoMigrate(&model.User{}, &model.Matkul{}, &model.Kelas{})

	return db
  }

  


