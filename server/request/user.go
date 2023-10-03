package request

type UserRequest struct {
	ID            int     `json:"id"`
	Email         string  `json:"email" binding:"email" gorm:"unique;notnull"`
	Nama          string  `json:"nama" gorm:"type:varchar(100)" binding:"required"`
	ProgramStudi  string  `json:"program_studi" gorm:"type:varchar(30)" binding:"required"`
	Nim           string  `json:"nim" gorm:"type:varchar(20)" binding:"required"`
	Password      string  `json:"password" gorm:"type:varchar(100)" binding:"required"`
	VerifPassword string  `json:"confirm_password" gorm:"type:varchar(100)" binding:"required"`
}

type UserLoginRequest struct {
	Email         string `json:"email" binding:"email" gorm:"unique;notnull"`
	Password      string `json:"password" gorm:"type:varchar(100)" binding:"required"`
}

type UserUpdateRequest struct {
	Nama          string  `form:"nama" binding:"required"`
	ProgramStudi  string  `form:"program_studi" binding:"required"`
	Nim           string  `form:"nim" binding:"required"`
	Image		  string
}

type ForgotPasswordRequest struct {
	Email         string `json:"email" binding:"email" gorm:"unique;notnull"`
	Password      string  `json:"password" gorm:"type:varchar(100)" binding:"required"`
	VerifPassword string  `json:"confirm_password" gorm:"type:varchar(100)" binding:"required"`
}