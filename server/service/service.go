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
	Fakultas    model.FakultasService
	ProgramStudi model.ProgramStudiService
}

func Init(repository *repository.Repository) *Service {
	instUSer := NewUserService(repository.User)
	instFakultas := NewFakultasService(repository.Fakultas)
	instProgramStudi := NewProgramStudiService(repository.ProgramStudi)
	instMatkul := NewMatkulService(repository.Matkul)
	instKelas := NewKelasService(repository.Kelas)
	instJamKelas := NewJamKelasService(repository.JamKelas)
	instPlan := NewPlanService(repository.Plan, repository.Kelas, repository.User)
	instRandomKrs := NewRandomKrsService(repository.User, repository.Matkul, repository.Kelas)
	instPlanningKrs := NewPlanningKrsService(instRandomKrs)
	instDashboard := NewDashboardService(instUSer, instFakultas, instProgramStudi, instMatkul, instKelas, instPlan)

	return &Service{
		Matkul:    instMatkul,
		Kelas:     instKelas,
		JamKelas:  instJamKelas,
		Plan:      instPlan,
		User:      instUSer,
		RandomKrs: instRandomKrs,
		PlanningKrs: instPlanningKrs,
		Dashboard:   instDashboard,
		Fakultas: instFakultas,
		ProgramStudi: instProgramStudi,
	}
}
