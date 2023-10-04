package request

type UserRequest struct {
	ID            int     `json:"id"`
	Email         string  `json:"email" binding:"email"`
	Nama          string  `json:"nama" binding:"required"`
	ProgramStudi  string  `json:"program_studi" binding:"required"`
	Nim           string  `json:"nim" binding:"required"`
	Password      string  `json:"password" binding:"required"`
	VerifPassword string  `json:"confirm_password" binding:"required"`
	Role		  string
}

type UserLoginRequest struct {
	Email         string `json:"email" binding:"email"`
	Password      string `json:"password" binding:"required"`
}

type UserUpdateRequest struct {
	Nama          string  `form:"nama" binding:"required"`
	ProgramStudi  string  `form:"program_studi" binding:"required"`
	Nim           string  `form:"nim" binding:"required"`
	Image		  string
}

type ForgotPasswordRequest struct {
	Email         string `json:"email" binding:"email"`
	Password      string  `json:"password" binding:"required"`
	VerifPassword string  `json:"confirm_password" binding:"required"`
}