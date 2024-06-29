import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, css } from "@mui/material";
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import useCandies from '../useCandies';
import { Candy } from '../../models/candy-model';
import ControlButton from '../control-button/control-button';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 100px 8fr;
  grid-template-columns: repeat(3, auto);
  width: 900px;
`

const CandyList = () => {
  const [aggregateKey, setAggregateKey] = useState<keyof Candy | null>(null)
  const { candies, loading, error } = useCandies(aggregateKey)

  const columns: GridColDef[] = useMemo(() => {
    const aggregatedColumns: GridColDef[] = [
      { field: 'name', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'totalEaten', headerName: 'Total Eaten', flex: 1, align: 'center', headerAlign: 'center' },
    ]

    const standardColumns: GridColDef[] = [
      { field: 'name', headerName: 'Client Name', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'candy', headerName: 'Candy Name', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'eaten', headerName: 'Amount Eaten', width: 150, align: 'center', headerAlign: 'center' },
      { field: 'date', headerName: 'Date', width: 150, align: 'center', headerAlign: 'center' },
    ]

    return aggregateKey ? aggregatedColumns : standardColumns
  }, [aggregateKey]);

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error fetching candy</div>
  }

  return (
    <>
      {candies && candies.length > 0 &&
        <Wrapper>
          <ControlButton text="Raw Data" onClick={() => setAggregateKey(null)} isActive={aggregateKey === null} className={css`grid-area: 1 / 1 / 2 / 2`} />
          <ControlButton text="Aggregate by Client" onClick={() => setAggregateKey("name")} isActive={aggregateKey === "name"} className={css`grid-area: 1 / 1 / 2 / 2`} />
          <ControlButton text="Aggregate by Candy" onClick={() => setAggregateKey("candy")} isActive={aggregateKey === "candy"} className={css`grid-area: 1 / 1 / 2 / 2`} />
          <Box
            sx={{
              display: "grid",
              gridArea: "2 / 1 / 3 / 4",
              height: 800,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 5,
              overflow: "auto",
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
              rows={candies}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                },
              }}
              pageSizeOptions={[20, 50, 100]}
              sx={{
                borderRadius: '5px',
              }}
            />
          </Box>
        </Wrapper>
      }
    </>
  )
}

export default CandyList
