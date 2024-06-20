package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	. "github.com/miopeciclope/candy-shop/backend/models"
	"github.com/miopeciclope/candy-shop/backend/router"
	"github.com/stretchr/testify/assert"

	. "github.com/miopeciclope/candy-shop/backend/mocks"
)

type TestCase struct {
	url            string
	expectedStatus int
	expectedBody   Response
}

func assertRequestOutput(t *testing.T, testCase TestCase) *bytes.Buffer {
	gin.SetMode(gin.TestMode)

	candyService := &MockCandyService{}
	apiRouter := router.SetupRouter(candyService)

	req, err := http.NewRequest(http.MethodGet, testCase.url, nil)
	assert.NoError(t, err)

	recorder := httptest.NewRecorder()
	apiRouter.ServeHTTP(recorder, req)

	assert.Equal(t, testCase.expectedStatus, recorder.Code)
	return recorder.Body
}

func TestGetStatus(t *testing.T) {
	testCase := TestCase{
		url:            "/api/status",
		expectedStatus: http.StatusOK,
		expectedBody: Response{
			IsSuccessful: true,
			Data:         "I'm running",
		},
	}

	expectedBodyJSON, err := json.Marshal(testCase.expectedBody)
	assert.NoError(t, err)

	response := assertRequestOutput(t, testCase)
	assert.JSONEq(t, string(expectedBodyJSON), response.String())
}

func TestGetCandy(t *testing.T) {
	testCase := TestCase{
		url:            "/api/candy",
		expectedStatus: http.StatusOK,
		expectedBody: Response{
			IsSuccessful: true,
			Data: []Candy{
				{
					Name:  "candyTest",
					Candy: "Dadinho",
					Eaten: 5,
					Date:  "1994-02-15",
				},
			},
		},
	}

	expectedBodyJSON, err := json.Marshal(testCase.expectedBody)
	assert.NoError(t, err)

	response := assertRequestOutput(t, testCase)
	assert.JSONEq(t, string(expectedBodyJSON), response.String())
}
