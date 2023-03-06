package request

type UserRequest struct {
	ID           int    `json:"id"`
	Email        string `json:"email" binding:"email" gorm:"unique;notnull"`
	Nama         string `json:"nama" gorm:"type:varchar(100)"`
	ProgramStudi string `json:"program_studi" gorm:"type:varchar(30)"`
	Nim          string `json:"nim" gorm:"type:varchar(20)"`
	Password     string `json:"password" gorm:"type:varchar(100)"`
	Role         string `json:"role" gorm:"type:varchar(5)"`
}