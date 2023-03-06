package response

type UserResponse struct {
	ID           uint    `json:"id"`
	Email        string `json:"email"`
	Nama         string `json:"nama"`
	ProgramStudi string `json:"program_studi"`
	Nim          string `json:"nim"`
	Password     string `json:"password"`
	Role         string `json:"role"`
}
