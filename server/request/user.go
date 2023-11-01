package request

type UserRequest struct {
	ID             int    `json:"id"`
	ProgramStudiID uint   `json:"id_program_studi" binding:"required"`
	Email          string `json:"email" binding:"email,required"`
	Nama           string `json:"nama" binding:"required"`
	Nim            string `json:"nim" binding:"required"`
	Password       string `json:"password" binding:"required"`
	VerifPassword  string `json:"confirm_password" binding:"required"`
	Role           string
}

type UserLoginRequest struct {
	Email    string `json:"email" binding:"email"`
	Password string `json:"password" binding:"required"`
}

type UserUpdateRequest struct {
	ProgramStudiID uint   `form:"id_program_studi" binding:"required"`
	Nama           string `form:"nama" binding:"required"`
	Nim            string `form:"nim" binding:"required"`
	Image          string
}

type ForgotPasswordRequest struct {
	Email         string `json:"email" binding:"email"`
	Password      string `json:"password" binding:"required"`
	VerifPassword string `json:"confirm_password" binding:"required"`
}
