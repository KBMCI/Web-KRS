package service

import (
	"web-krs/model"
)

type planService struct {
	planRepository  model.PlanRepository
	kelasRepository model.KelasRepository
	userRepository  model.UserRepository
}

func NewPlanService(plan model.PlanRepository, kelas model.KelasRepository, user model.UserRepository) model.PlanService {
	return &planService{
		planRepository:  plan,
		kelasRepository: kelas,
		userRepository:  user,
	}
}

func (p *planService) StorePlan(idUser uint, idKelas []uint) ([]*model.Kelas, error) {
	user, err := p.userRepository.ReadByID(int(idUser))
	if err != nil {
		return nil, err
	}

	kelas, err := p.kelasRepository.FindBySomeID(idKelas)
	if err != nil {
		return nil, err
	}

	plan := model.Plan{
		Users: []*model.User{user},
		Kelas: kelas,
	}

	newplan, err := p.planRepository.Create(user, &plan)
	if err != nil {
		return nil, err
	}

	return newplan.Kelas, nil
}

func (p *planService) GetByIdUser(idUser uint) ([]*model.Plan, error) {
	plans, err := p.planRepository.FindByIdUser(idUser)
	if err != nil {
		return nil, err
	}

	return plans, nil
}

func (p *planService) DestroyPlan(idUser uint, idPlan uint) error {
	user, err := p.userRepository.ReadByID(int(idUser))
	if err != nil {
		return err
	}

	plan, err := p.planRepository.FindByIdPlan(idPlan)
	if err != nil {
		return err
	}

	if err := p.planRepository.DeletePlan(user, plan); err != nil{
		return err
	}

	return nil
}
