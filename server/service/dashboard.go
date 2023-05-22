package service

import "web-krs/model"

type dashboadService struct {
	matkulService model.MatkulService
	planService model.PlanService
}


func NewDashboardService(matkulService model.MatkulService, planService model.PlanService) model.DashboardService {
	return &dashboadService{
		matkulService: matkulService,
		planService: planService,
	}
}

func (d *dashboadService) GetDashboard(idUser uint) ([]*model.Matkul, []*model.Plan, error) {
	matkuls, err := d.matkulService.FetchMatkul()
	if err != nil {
		return nil, nil, err
	}

	plans, err := d.planService.GetByIdUser(idUser)
	if err != nil {
		return nil, nil, err
	}

	return matkuls, plans, nil
}