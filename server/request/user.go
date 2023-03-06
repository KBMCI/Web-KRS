package request

type UserRequest struct {
	ID           int    `json:"id"`
	Email        string `json:"email" binding:"required,email" gorm:"unique;notnull"`
	Nama         string `json:"nama" binding:"required"`
	ProgramStudi string `json:"program_studi" binding:"required"`
	Nim          string `json:"nim" binding:"required"`
	Password     string `json:"password" binding:"required"`
	Role         string `json:"role" binding:"required"`
}