package repository

import (
	"errors"
	"web-krs/config"
	"web-krs/model"
)

type planRepository struct {
	cfg config.Config
}

func NewPlanRepository(cfg config.Config) model.PlanRepository {
	return &planRepository{cfg: cfg}
}

func (p *planRepository) Create(user *model.User, plan *model.Plan) (*model.Plan, error) {
	plans, err := p.Fetch() 
	if err != nil {
		return nil, err
	}
	duplicatePlan := CheckDuplicatePlan(plans, plan.Kelas)
	if duplicatePlan == nil {
		if err := p.cfg.Database().Create(&plan).Error; err != nil {
			return nil, err
		}
		return plan, nil
	}
	
	for _, userPlan := range duplicatePlan.Users {
		if userPlan.ID == user.ID {
			return nil, errors.New("user has added the plan")
		}
	}
	p.cfg.Database().Model(&duplicatePlan).Association("Users").Append(user)

	return plan, nil
}

func (p *planRepository) Fetch() ([]*model.Plan, error) {
	var planList []*model.Plan

	err := p.cfg.Database().Preload("Users").Preload("Kelas").Find(&planList).Error
	if err != nil {
		return nil, err
	}

	return planList, nil
}

func (p *planRepository) FindByIdUser(idUser uint) ([]*model.Plan, error) {
	var user model.User

	err := p.cfg.Database().Model(&model.User{}).Preload("Plans.Kelas.JadwalKelas").Preload("Plans.Kelas.Matkul").Find(&user, idUser).Error
	if err != nil {
		return nil, err
	}

	return user.Plans, err
}

func CheckDuplicatePlan(currentPlan []*model.Plan, kelas []*model.Kelas) *model.Plan {
	for _, curPlan := range currentPlan {
		count := 0
		for _, curKelas := range curPlan.Kelas {
			for _, newKelas := range kelas {
				if curKelas.ID == newKelas.ID {
					count++
				}
			}
		}
		if count == len(kelas) {
			return curPlan
		}
	}
	return nil
}