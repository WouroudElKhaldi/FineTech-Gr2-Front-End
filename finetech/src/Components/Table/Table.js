import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid , GridToolbar} from '@mui/x-data-grid';

const TableComponent = ({ data , wid}) => {
  const [userData, setUserData] = useState(data);
  const [columns, setColumns] = useState([]); // Provide a default empty array
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setUserData(data);

      if (userData.length > 0) {
        const visibleFields = Object.keys(userData[0]);
        setColumns(visibleFields.map((field) => ({ field, headerName: field , editable: true , flex : 1})));
      } else {
        setColumns([]);
      }

      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, [userData, data]); // Include 'data' in the dependencies array

  return (
    <>
    <Box sx={{height: 707 , mt: '3rem', ml: '1rem'}}>
      <DataGrid 
      columns={columns} 
      rows={userData}
      getRowId={row=> row.id}
      pageSizeOptions={[5, 10, 20, 100]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }} 
      sx={
        {
          marginBottom: '4rem' ,
          width: wid,
          bgcolor: '#212936', 
          border : 0, 
          '& .MuiToolbar-root , .MuiInputBase-input , .MuiDataGrid-columnHeaderTitleContainer , .MuiDataGrid-cell':{
            color: 'white'
          }, '& .MuiButtonBase-root .MuiSvgIcon-root ,  .MuiSvgIcon-root':{
            color: '#2D99EF'
          }, '& .MuiDataGrid-root , .MuiDataGrid-colCell, .MuiDataGrid-root , .MuiDataGrid-cell':{
            maxHeight: '100px !important'
          }, '& .MuiInputBase-root , & .MuiInputBase-input':{
            color: '#000'
          }, '& .MuiDataGrid-row Mui-selected , &.MuiDataGrid-row Mui-hovered':{
            bgcolor: '#17456E'
          }, '& .MuiDataGrid-row':{
            height: '90px !important',
            maxHeight: '90px !important'
          } , '& .Mui-hovered':{
            bgcolor: '#444654 !important'
          }, '& .Mui-selected':{
            bgcolor: '#17456E'
          }, '& .MuiDataGrid-columnHeaders , & .MuiDataGrid-toolbarContainer , & .MuiDataGrid-footerContainer':{
            height: '90px !important',
            maxHeight: '90px !important' , 
          }, '& .MuiDataGrid-columnHeaderTitleContainer':{
            color: '#2D99EF !important'
          }}
        }/>
    </Box>
    </>
  );  
};

export default TableComponent;
