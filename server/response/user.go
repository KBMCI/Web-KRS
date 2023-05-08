package response

import "web-krs/model"

type UserResponse struct {
	ID            uint   `json:"id"`
	Email         string `json:"email"`
	Nama          string `json:"nama"`
	ProgramStudi  string `json:"program_studi"`
	Nim           string `json:"nim"`
	Password      string `json:"password"`
	VerifPassword string `json:"confirm_password"`
	Role          string `json:"role"`
	Matkuls       []model.Matkul `json:"matkuls"`
}
