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

func (u *userRepositoty) Create(user *model.User) (*model.User, error){

	err:= u.Cfg.Database().Create(&user).Error

	if err != nil {
		return nil, err
	}
	return user, err
}

func (u *userRepositoty) ReadAll() ([]*model.User, error){
	
	var user []*model.User

	err := u.Cfg.Database().Find(&user).Error

	if err != nil {
		return nil, err
	}

	return user, err
}

func (u *userRepositoty) ReadByID(ID int) (*model.User, error){
	
	var user *model.User

	err := u.Cfg.Database().Find(&user, ID).Error

	if err != nil {
		return nil, err
	}

	return user, err
}

func (u *userRepositoty) Update(user *model.User) (*model.User, error){
	
	err := u.Cfg.Database().Save(&user).Error

	if err != nil {
		return nil, err
	}

	return user,err

}

func (u *userRepositoty) Delete(user *model.User) (*model.User, error)  {
	
	err := u.Cfg.Database().Delete(&user).Error

	if err != nil {
		return nil, err
	}

	return user,err
}

