package request

type UserRequest struct {
	ID            int     `json:"id"`
	Email         string  `json:"email" binding:"email" gorm:"unique;notnull"`
	Nama          string  `json:"nama" gorm:"type:varchar(100)" binding:"required"`
	ProgramStudi  string  `json:"program_studi" gorm:"type:varchar(30)" binding:"required"`
	Nim           string  `json:"nim" gorm:"type:varchar(20)" binding:"required"`
	Password      string  `json:"password" gorm:"type:varchar(100)" binding:"required"`
	VerifPassword string  `json:"confirm_password" gorm:"type:varchar(100)" binding:"required"`
	Role          string  `json:"role" gorm:"type:enum('admin', 'user');not null" binding:"required"`
}

type UserLoginRequest struct {
	Email         string `json:"email" binding:"email" gorm:"unique;notnull"`
	Password      string `json:"password" gorm:"type:varchar(100)" binding:"required"`
}

type UserUpdateRequest struct {
	ID            int     `json:"id"`
	Email         string  `json:"email" binding:"email" gorm:"unique;notnull"`
	Nama          string  `json:"nama" gorm:"type:varchar(100)" binding:"required"`
	ProgramStudi  string  `json:"program_studi" gorm:"type:varchar(30)" binding:"required"`
	Nim           string  `json:"nim" gorm:"type:varchar(20)" binding:"required"`
	Role          string  `json:"role" gorm:"type:enum('admin', 'user');not null" binding:"required"`
}

type ForgotPasswordRequest struct {
	Email         string `json:"email" binding:"email" gorm:"unique;notnull"`
	Password      string  `json:"password" gorm:"type:varchar(100)" binding:"required"`
	VerifPassword string  `json:"confirm_password" gorm:"type:varchar(100)" binding:"required"`
}