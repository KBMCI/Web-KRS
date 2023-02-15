package repository

import (
	"web-krs/config"
	"web-krs/model"
)

type userRepositoty struct {
	Cfg config.Config
}

func NewUserRepositoty(cfg config.Config) model.UserRepository{
	return &userRepositoty{Cfg: cfg}
}

func (u *userRepositoty) Create(user model.User) (model.User, error){

	getCreate := u.Cfg.Database().Create(&user).Error

	return user, getCreate
}

func (u *userRepositoty) ReadAll() ([]model.User, error){
	
	var user []model.User

	getReadAll := u.Cfg.Database().Find(&user).Error

	return user, getReadAll
}

func (u *userRepositoty) ReadByID(ID int) (model.User, error){
	
	var user model.User

	getReadByID := u.Cfg.Database().Find(&user, ID).Error

	return user, getReadByID
}

func (u *userRepositoty) Update(user model.User) (model.User, error){
	
	getUpdate := u.Cfg.Database().Save(&user).Error

	return user,getUpdate

}

func (u *userRepositoty) Delete(user model.User) (model.User, error){
	
	getDelete := u.Cfg.Database().Delete(&user).Error

	return user,getDelete
}

