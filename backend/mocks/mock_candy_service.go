package mocks

import . "github.com/miopeciclope/candy-shop/backend/models"

type MockCandyService struct{}

func (c *MockCandyService) GetAllCandy() ([]Candy, error) {
	return []Candy{
		{
			Name:  "candyTest",
			Candy: "Dadinho",
			Eaten: 5,
			Date:  "1994-02-15",
		},
	}, nil
}
