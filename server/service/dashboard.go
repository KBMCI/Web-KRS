package service

import "web-krs/model"

type dashboadService struct {
	userService model.UserService
	planService model.PlanService
}

func NewDashboardService(userService model.UserService, planService model.PlanService) model.DashboardService {
	return &dashboadService{
		userService: userService,
		planService: planService,
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
