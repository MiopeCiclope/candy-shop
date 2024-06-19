package models

type Response struct {
	IsSuccessful bool        `json:"isSuccessful"`
	Data         interface{} `json:"data"`
}
