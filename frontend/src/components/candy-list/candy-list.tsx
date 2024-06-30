import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import styled from '@emotion/styled';
import { useMemo } from 'react';
import useCandies from '../useCandies';
import { Candy } from '../../models/candy-model';
import useIsMobile from '../../hooks/useIsMobile';

const Wrapper = styled.div`
  grid-area: 2 / 1 / 3 / 4;

  @media (max-width: 768px)
    grid-area: 1 / 1 / 2 / 4;
  }
`

const StyledBox = styled(Box)`
  height: 760px;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  overflow: auto;

  @media (max-width: 768px) {
    height: 550px !important;
  }

  .MuiDataGrid-root {
    overflow: auto;
    border-radius: 5px;
  }

  .MuiDataGrid-columnHeaders {
    position: relative;
  }

  .MuiDataGrid-footerContainer {
    position: relative;
  }

  .MuiDataGrid-columnHeaderTitle {
    white-space: normal !important;
    line-height: 1.5;
  }
`;

const MessageContainer = styled.div`
  grid-area: 2 / 1 / 3 / 4;
`

interface CandyListProps {
  aggregateKey: keyof Candy | null
}

const CandyList = ({ aggregateKey }: CandyListProps) => {
  const { candies, loading, error } = useCandies(aggregateKey)
  const isMobile = useIsMobile()

  const columns: GridColDef[] = useMemo(() => {
    const aggregatedColumns: GridColDef[] = [
      { field: 'name', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'totalEaten', headerName: 'Total Eaten', flex: 1, align: 'center', headerAlign: 'center' },
    ]

    const standardColumns: GridColDef[] = [
      { field: 'name', headerName: 'Client Name', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'candy', headerName: 'Candy Name', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'eaten', headerName: 'Amount Eaten', flex: 1, align: 'center', headerAlign: 'center' },
      { field: 'date', headerName: 'Date', flex: 1, align: 'center', headerAlign: 'center' },
    ]

    return aggregateKey ? aggregatedColumns : standardColumns
  }, [aggregateKey]);

  const mappedColumns = columns.map(column => ({
    ...column,
    sortable: !isMobile,
    filterable: !isMobile,
    disableColumnMenu: isMobile,
  }));

  if (loading) {
    return <MessageContainer>loading...</MessageContainer>
  }

  if (error) {
    return <MessageContainer>Error fetching candy</MessageContainer>
  }

  return (
    <Wrapper>
      {candies && candies.length > 0 &&
        <StyledBox>
          <DataGrid
            rows={candies}
            columns={mappedColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: isMobile ? 100 : 20 },
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            sx={{
              borderRadius: '5px',
            }}
          />
        </StyledBox>
      }
    </Wrapper>
  )
}

export default CandyList
