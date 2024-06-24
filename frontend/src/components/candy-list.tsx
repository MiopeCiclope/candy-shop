import { useEffect, useState } from "react"
import { Candy } from "../models/candy-model"
import { getAllCandy } from "../utils/api-utils"

const CandyList = () => {
  const [candyList, setCandyList] = useState<Candy[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    getAllCandy()
      .then((response) => {
        setCandyList(response.data)
      })
      .catch(err => setErrorMessage(err))
      .finally(() => setIsLoading(false))

  }, [])

  if (isLoading) {
    return <div>loading...</div>
  }

  if (errorMessage) {
    return <div>Error fetching candy</div>
  }

  return (
    <div>
      {candyList.length > 0 &&
        candyList.map((candy, index) =>
          <span key={index}>
            {candy.candy}<br />
          </span>)
      }
    </div>
  )
}

export default CandyList
