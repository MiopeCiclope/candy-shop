package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/go-resty/resty/v2"

	. "github.com/miopeciclope/candy-shop/backend/models"
)

type CandyService struct{}

var (
  ErrApiUrlNotSet          = errors.New("CANDY_API variable not set")
	ErrFailedToFetchData     = errors.New("failed to fetch data")
	ErrFailedToParseResponse = errors.New("failed to parse response")
)

func (c *CandyService) GetAllCandy() ([]Candy, error) {
	apiURL := os.Getenv("CANDY_API")
	if apiURL == "" {
		return nil, ErrApiUrlNotSet
	}

	client := resty.New()
	resp, err := client.R().
		SetHeader("Accept", "application/json").
		Get(apiURL)

	if err != nil {
		return nil, ErrFailedToFetchData
	}

	if resp.StatusCode() != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch data from external API: %s", resp.Status())
	}

	var data []Candy
	if err := json.Unmarshal(resp.Body(), &data); err != nil {
		return nil, ErrFailedToParseResponse
	}

	return data, nil
}
