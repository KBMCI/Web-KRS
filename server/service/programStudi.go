package service

import (
	"web-krs/model"
	"web-krs/request"
)

type programStudiService struct {
	programStudiRepository model.ProgramStudiRepository
}

func NewProgramStudiService(programStudi model.ProgramStudiRepository) model.ProgramStudiService {
	return &programStudiService{
		programStudiRepository: programStudi,
	}
}

func (s *programStudiService) StoreProgramStudi(req *request.ProgramStudiRequest) (*model.ProgramStudi, error) {
	programstudi := &model.ProgramStudi{
		Nama:       req.Nama,
		FakultasID: req.FakultasID,
	}

	newProgramStudi, err := s.programStudiRepository.Create(programstudi)
	if err != nil {
		return nil, err
	}

	return newProgramStudi, nil
}

func (s *programStudiService) EditProgramStudi(id uint, req *request.ProgramStudiRequest) (*model.ProgramStudi, error) {
	newProgramStudi, err := s.programStudiRepository.UpdateByID(&model.ProgramStudi{
		ID:         id,
		Nama:       req.Nama,
		FakultasID: req.FakultasID,
	})

	if err != nil {
		return nil, err
	}

	return newProgramStudi, nil
}

func (s *programStudiService) GetByID(id uint) (*model.ProgramStudi, error) {
	programStudi, err := s.programStudiRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	return programStudi, nil
}

func (s *programStudiService) CountAllProgramStudi() (int64, error) {
	programStudi, err := s.programStudiRepository.CountAllProgramStudi()
	if err != nil {
		return 0, err
	}

	return programStudi, nil
}

func (s *programStudiService) DestroyProgramStudi(id uint) error {
	programStudi, err := s.programStudiRepository.FindByID(id)
	if err != nil {
		return err
	}

	_, err = s.programStudiRepository.Delete(programStudi)
	if err != nil {
		return err
	}

	return nil
}

func (s *programStudiService) FetchProgramStudi() ([]*model.ProgramStudi, error) {
	programStudis, err := s.programStudiRepository.Fetch()
	if err != nil {
		return nil, err
	}

	return programStudis, nil
}
