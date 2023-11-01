package model

type (
	DashboardService interface {
		GetDashboard(idUser uint) (*User, []*Plan, error)
	}
)
