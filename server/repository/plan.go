package repository

import (
	"errors"
	"web-krs/model"

	"gorm.io/gorm"
)

type planRepository struct {
	database *gorm.DB
}

func NewPlanRepository(database *gorm.DB) model.PlanRepository {
	return &planRepository{
		database: database,
	}
}

func (p *planRepository) Create(user *model.User, plan *model.Plan) (*model.Plan, error) {
	plans, err := p.Fetch()
	if err != nil {
		return nil, err
	}
	duplicatePlan := CheckDuplicatePlan(plans, plan.Kelas)
	if duplicatePlan == nil {
		if err := p.database.Create(&plan).Error; err != nil {
			return nil, err
		}
		return plan, nil
	}

	for _, userPlan := range duplicatePlan.Users {
		if userPlan.ID == user.ID {
			return nil, errors.New("user has added the plan")
		}
	}
	p.database.Model(&duplicatePlan).Association("Users").Append(user)

	return plan, nil
}

func (p *planRepository) Fetch() ([]*model.Plan, error) {
	var planList []*model.Plan

	err := p.database.Preload("Users").Preload("Kelas").Find(&planList).Error
	if err != nil {
		return nil, err
	}

	return planList, nil
}

func (p *planRepository) FindByIdPlan(idPlan uint) (*model.Plan, error) {
	var plan *model.Plan

	err := p.database.Find(&plan, idPlan).Error
	if err != nil {
		return nil, err
	}

	return plan, nil
}

func (p *planRepository) FindByIdUser(idUser uint) ([]*model.Plan, error) {
	var user model.User

	err := p.database.Model(&model.User{}).Preload("Plans.Kelas.JadwalKelas").Preload("Plans.Kelas.Matkul").Find(&user, idUser).Error
	if err != nil {
		return nil, err
	}

	return user.Plans, err
}

func (p *planRepository) CountAllPlan() (int64, error) {
	var plan int64

	err := p.database.Model(&model.Plan{}).Count(&plan).Error

	if err != nil {
		return 0, err
	}

	return plan, nil
}

func (p *planRepository) DeletePlan(user *model.User, plan *model.Plan) error {
	var currentPlan *model.Plan

	err := p.database.Model(&user).Association("Plans").Delete(plan)
	if err != nil {
		return err
	}

	p.database.Model(&model.Plan{}).Preload("Users").Find(&currentPlan, plan.ID)
	if len(currentPlan.Users) == 0 {
		err := p.database.Delete(&plan).Error
		if err != nil {
			return err
		}
	}

	return nil
}

func CheckDuplicatePlan(currentPlan []*model.Plan, kelas []*model.Kelas) *model.Plan {
	for _, curPlan := range currentPlan {
		count := 0

		if len(curPlan.Kelas) != len(kelas) {
			continue
		}

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
