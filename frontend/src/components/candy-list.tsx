import { useEffect, useState } from "react"
import { Candy } from "../models/candy-model"
import { getAllCandy } from "../utils/api-utils"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const CandyList = () => {
  const [candyList, setCandyList] = useState<Candy[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data, loading, error } = useSelector((state: RootState) => state.candyReducer);
  console.log(data, loading, error)

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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const columns: GridColDef[] = [
    {
      field: "name", headerName: "Client Name", flex: 1, align: 'center', headerAlign: 'center'
    },
    {
      field: "candy", headerName: "Candy Name", flex: 1, align: 'center', headerAlign: 'center'
    },
    {
      field: "eaten", headerName: "Amount Eaten", width: 150, align: 'center', headerAlign: 'center'
    },
    {
      field: "date", headerName: "Date", width: 150, align: 'center', headerAlign: 'center', valueGetter: (params) => formatDate(params)
    },
  ]

  return (
    <>
      {candyList && candyList.length > 0 &&
        <Box
          sx={{
            height: 700,
            width: 900,
            backgroundColor: "white",
            borderRadius: 5,
            '& .MuiDataGrid-root': {
              overflow: 'auto',
              borderRadius: 5,
            },
            '& .MuiDataGrid-columnHeaders': {
              position: 'relative',
            },
            '& .MuiDataGrid-footerContainer': {
              position: 'relative'
            },
          }}
        >
          <DataGrid
            rows={candyList.map((row, index) => ({ id: index, ...row, date: new Date(row.date) }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 50, 100]}
            sx={{
              borderRadius: '5px',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <Button variant="contained" onClick={() => console.log('user')}>
              Aggregate by User
            </Button>
          </Box>
        </Box>
      }
    </>
  )
}

export default CandyList
