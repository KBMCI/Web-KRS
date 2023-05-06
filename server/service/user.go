package service

import (
	"web-krs/handler"
	"web-krs/model"
	"web-krs/request"
)

type userService struct {
	userRepository model.UserRepository
}

func NewUserService(repo model.UserRepository) *userService {
	return &userService{userRepository: repo}
}

func (s *userService) Register(userRequest *request.UserRequest) (*model.User, error) {
	user := &model.User{
		Email:        userRequest.Email,
		Nama:         userRequest.Nama,
		ProgramStudi: userRequest.ProgramStudi,
		Nim:          userRequest.Nim,
		Password:     userRequest.Password,
		Role:         userRequest.Role,
	}

	hash, _ := handler.HashPassword(user.Password)

	user2 := &model.User{
		Email:        userRequest.Email,
		Nama:         userRequest.Nama,
		ProgramStudi: userRequest.ProgramStudi,
		Nim:          userRequest.Nim,
		Password:     hash,
		Role:         userRequest.Role,
	}

	user, err := s.userRepository.Create(user2)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) UserHasMatkul(id uint, userHasMatkuls *model.UserHasMatkulReq) (*model.User, error)  {
	
	err := s.userRepository.DeleteMatkul(&model.UserHasMatkuls{}, id)
	if err != nil {
		return nil, err
	}

	addMatkul, err := s.userRepository.Update(&model.User{
		ID: id,
		Matkuls: userHasMatkuls.Matkuls,
	})

	if err != nil {
		return nil, err
	}

	return addMatkul, err
}

func (s *userService) ReadAll() ([]*model.User, error) {
	users, err := s.userRepository.ReadAll()
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (s *userService) ReadByID(ID int) (*model.User, error) {
	user, err := s.userRepository.ReadByID(ID)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) GetByEmail(email string) (*model.User, error) {
	user, err := s.userRepository.FindByEmail(email)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) Update(ID int, userRequest *request.UserRequest) (*model.User, error) {
	user, err := s.userRepository.ReadByID(ID)
	if err != nil {
		return nil, err
	}

	user.Email = userRequest.Email
	user.Nama = userRequest.Nama
	user.ProgramStudi = userRequest.ProgramStudi
	user.Nim = userRequest.Nim
	user.Password = userRequest.Password
	user.Role = userRequest.Role

	user, err = s.userRepository.Update(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) Delete(ID int) (*model.User, error) {
	user, err := s.userRepository.ReadByID(ID)
	if err != nil {
		return nil, err
	}

	user, err = s.userRepository.Delete(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}
