package service

import (
	"web-krs/model"
)

type planningKrsService struct {
	randomService model.RandomKrsService
}

func NewPlanningKrsService(randomService model.RandomKrsService) model.PlanningKrsService {
	return &planningKrsService{
		randomService: randomService,
	}
}

func (p *planningKrsService) Suggestion(idUser uint, idKelas []uint) ([][]model.RandomKrs, error) {
	RandomAllKrs, err := p.randomService.FetchRandomKrs(idUser)
	if err != nil {
		return nil, err
	}
	
	newRandom := [][]model.RandomKrs{}
	for _, randomKrs := range RandomAllKrs {
		jmlSama := 0

		for _, kelas := range randomKrs {
			for _, id := range idKelas {
				if kelas.ID == id {
					jmlSama++
				}
			}
		}

		if jmlSama == len(idKelas) {
			newRandom = append(newRandom, randomKrs)
		}
		
	}	

	return newRandom, nil
}
