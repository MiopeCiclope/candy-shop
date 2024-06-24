import { Candy } from "../models/candy-model"
import { Response } from "../models/response-model"

const getAllCandy = (): Promise<Response<Candy[]>> =>
  fetch('/api/candy')
    .then(response => response.json())
    .then(response => {
      if (!response.isSuccessful) {
        throw new Error("Error fetching candy");
      }
      return response;
    })

export { getAllCandy }
