package response

import "web-krs/model"

type UserResponse struct {
	ID            uint   `json:"id"`
	Email         string `json:"email"`
	Nama          string `json:"nama"`
	ProgramStudi  string `json:"program_studi"`
	Nim           string `json:"nim"`
	Password      string `json:"password"`
	Role          string `json:"role"`
	Image		  string `json:"image"`
	Matkuls       []model.Matkul `json:"matkuls"`
}

func ConvertToUserResponse(u *model.User) UserResponse {
	return UserResponse{
		ID: u.ID,
		Nim: u.Nim,
		Nama: u.Nama,
		Email: u.Email,
		Password: u.Password,
		ProgramStudi: u.ProgramStudi,
		Role: u.Role,
		Image: u.Image,
		Matkuls: u.Matkuls,
	}
	
}
