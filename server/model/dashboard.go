package model

type (
	DashboardAdmin struct {
		User         int64 `json:"user"`
		Fakutas      int64 `json:"fakultas"`
		ProgramStudi int64 `json:"program_studi"`
		Matkul       int64 `json:"matkul"`
		Kelas        int64 `json:"kelas"`
		Plan         int64 `json:"plan"`
	}

	DashboardService interface {
		GetDashboard(idUser uint) (*User, []*Plan, error)
		GetDashboardAdmin() (*DashboardAdmin, error)
	}
)
