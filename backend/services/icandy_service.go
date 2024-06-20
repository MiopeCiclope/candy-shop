package services

import . "github.com/miopeciclope/candy-shop/backend/models"

type ICandyService interface {
	GetAllCandy() ([]Candy, error)
}
