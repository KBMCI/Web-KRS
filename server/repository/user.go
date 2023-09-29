package repository

import (
	"web-krs/model"

	"gorm.io/gorm"
)

type userRepositoty struct {
	database *gorm.DB
}

func NewUserRepositoty(database *gorm.DB) model.UserRepository{
	return &userRepositoty{
		database: database,
	}
}

func (u *userRepositoty) Create(user *model.User) (*model.User, error){

	err:= u.database.Create(&user).Error

	if err != nil {
		return nil, err
	}
	return user, err
}

func (u *userRepositoty) ReadAll() ([]*model.User, error){
	
	var user []*model.User

	err := u.database.Preload("Matkuls").Find(&user).Error

	if err != nil {
		return nil, err
	}

	return user, err
}

func (u *userRepositoty) ReadByID(ID int) (*model.User, error){
	
	var user *model.User

	err := u.database.Preload("Matkuls.Kelas.JadwalKelas").First(&user, ID).Error

	if err != nil {
		return nil, err
	}

	return user, err
}

func (u *userRepositoty) FindByEmail(email string) (*model.User, error) {
	var user *model.User

	err := u.database.First(&user, "email = ?", email).Error

	if err != nil {
		return nil, err
	}

	return user, err
}

func (u *userRepositoty) Update(user *model.User) (*model.User, error){
	
	err := u.database.Model(&user).Preload("Matkuls.Kelas.JadwalKelas").Updates(&user).First(&user).Error

	if err != nil {
		return nil, err
	}

	return user,err

}

func (u *userRepositoty) Delete(user *model.User) (*model.User, error)  {
	
	err := u.database.Delete(&user).Error

	if err != nil {
		return nil, err
	}

	return user,err
}

func (u *userRepositoty) DeleteMatkul(userHasMatkuls *model.UserHasMatkuls, id uint) error  {
	
	err := u.database.Delete(&userHasMatkuls, id).Error

	if err != nil {
		return err
	}

	return nil
}

