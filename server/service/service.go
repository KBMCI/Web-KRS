package service

import (
	"web-krs/model"
	"web-krs/repository"
)

type Service struct {
	Matkul      model.MatkulService
	Kelas       model.KelasService
	JamKelas    model.JamKelasService
	Plan        model.PlanService
	User        model.UserService
	RandomKrs   model.RandomKrsService
	PlanningKrs model.PlanningKrsService
	Dashboard   model.DashboardService
}

func Init(repository *repository.Repository) *Service {
	instRandomKrs := NewRandomKrsService(repository.User, repository.Matkul, repository.Kelas)
	instMatkul := NewMatkulService(repository.Matkul)
	instPlan := NewPlanService(repository.Plan, repository.Kelas, repository.User)

	return &Service{
		Matkul:    NewMatkulService(repository.Matkul),
		Kelas:     NewKelasService(repository.Kelas),
		JamKelas:  NewJamKelasService(repository.JamKelas),
		Plan:      NewPlanService(repository.Plan, repository.Kelas, repository.User),
		User:      NewUserService(repository.User),
		RandomKrs: NewRandomKrsService(repository.User, repository.Matkul, repository.Kelas),
		// masih belum tau
		PlanningKrs: NewPlanningKrsService(instRandomKrs),
		Dashboard: NewDashboardService(instMatkul, instPlan),
	}
}
