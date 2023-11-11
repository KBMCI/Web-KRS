package service

import "web-krs/model"

type dashboadService struct {
	userService         model.UserService
	fakultasService     model.FakultasService
	programStudiService model.ProgramStudiService
	matkulService       model.MatkulService
	kelasService        model.KelasService
	planService         model.PlanService
}

func NewDashboardService(userService model.UserService, fakultasService model.FakultasService, programStudiService model.ProgramStudiService, matkulService model.MatkulService, kelasService model.KelasService, planService model.PlanService) model.DashboardService {
	return &dashboadService{
		userService:         userService,
		fakultasService:     fakultasService,
		programStudiService: programStudiService,
		matkulService:       matkulService,
		kelasService:        kelasService,
		planService:         planService,
	}
}

func (d *dashboadService) GetDashboard(idUser uint) (*model.User, []*model.Plan, error) {

	user, err := d.userService.ReadByID(int(idUser))
	if err != nil {
		return nil, nil, err
	}

	plans, err := d.planService.GetByIdUser(idUser)
	if err != nil {
		return nil, nil, err
	}

	return user, plans, nil
}

func (d *dashboadService) GetDashboardAdmin() (*model.DashboardAdmin, error) {
	user, err := d.userService.CountAllUser()
	if err != nil {
		return nil, err
	}

	fakultas, err := d.fakultasService.CountAllFakultas()
	if err != nil {
		return nil, err
	}

	programStudi, err := d.programStudiService.CountAllProgramStudi()
	if err != nil {
		return nil, err
	}

	matkul, err := d.matkulService.CountAllMatkul()
	if err != nil {
		return nil, err
	}

	kelas, err := d.kelasService.CountAllKelas()
	if err != nil {
		return nil, err
	}

	plan, err := d.planService.CountAllPlan()
	if err != nil {
		return nil, err
	}

	return &model.DashboardAdmin{
		User:         user,
		Fakutas:      fakultas,
		ProgramStudi: programStudi,
		Matkul:       matkul,
		Kelas:        kelas,
		Plan:         plan,
	}, nil
}
