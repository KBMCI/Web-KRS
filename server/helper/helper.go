package helper

import (
	"strings"
	"time"
)

func StringToHours(jam string) float64{
	hour, _ := time.ParseDuration(strings.Split(jam, ".")[0] + "h" + strings.Split(jam, ".")[1] + "m")
	return hour.Hours()
}

func RemoveDuplicateValues(slice []string) []string {
	keys := make(map[string]bool)
	list := []string{}

	for _, entry := range slice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}