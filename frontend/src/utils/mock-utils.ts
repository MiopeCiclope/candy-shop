import { delay, http, HttpResponse } from "msw"

export const handlers = [
    http.get('/api/candy', async () => {
      await delay(50)
      return HttpResponse.json({
        isSuccessful: true,
        data: [
          {
            name: "client1",
            candy: "Dadinho",
            eaten: 5,
            date: "1994-02-15",
          },
          {
            name: "client1",
            candy: "Batom",
            eaten: 2,
            date: "1994-02-15",
          },
          {
            name: "client2",
            candy: "Dadinho",
            eaten: 4,
            date: "1994-02-15",
          },
          {
            name: "client2",
            candy: "Batom",
            eaten: 9,
            date: "1994-02-15",
          }
        ]
      })
    })
  ]
