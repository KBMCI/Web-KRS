package response

import (
	"web-krs/model"
	"web-krs/repository"
)

type (
	RandomKrsResponse struct {
		IsSaved   bool `json:"is_saved"`
		RandomKrs []model.RandomKrs `json:"random_krs"`
	}
)

func ConvertFormatRandomKrsToReponseRandomKrs(planService model.PlanService ,idUser uint, randomKrsList [][]model.RandomKrs) []*RandomKrsResponse {
	var responseList []*RandomKrsResponse

	plans, err := planService.GetByIdUser(idUser)
	if err != nil {
		return nil
	}

	for _, randomKrs := range randomKrsList {
		var kelasList []*model.Kelas
		for _, kelas := range randomKrs {
			kelasList = append(kelasList, &model.Kelas{ID: kelas.ID})
		}

		responseList = append(responseList, &RandomKrsResponse{
			IsSaved:   false,
			RandomKrs: randomKrs,
		})

		if repository.CheckDuplicatePlan(plans, kelasList) != nil {
			responseList[len(responseList) - 1].IsSaved = true
		}

	}

	return responseList
}