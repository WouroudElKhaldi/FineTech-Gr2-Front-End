import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import Grid from '@mui/material/Unstable_Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Table.module.css'

const TableTransComponent = ({ data , wid , isEdit}) => {
  const [userData, setUserData] = useState(data);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const buton = isEdit === true ? true : false ;

  useEffect(() => { 
    try {
      setUserData(data);

      if (userData.length > 0) {
        const visibleFields = Object.keys(userData[0]);
          if(buton === false){
            setColumns(visibleFields.map((field) => ({ field, headerName: field , editable: true , flex : 1})));
          }else {
          const updatedColumns = [
            ...visibleFields.map((field) => ({ field, headerName: field, editable: true, flex: 1 })),
            {
              field: 'Edit',
              headerName: 'Edit',
              renderCell: (params) => (
                <Grid container md={12}>
                  <button
                    onClick={() => {
                      setSelectedRowId(params.id);
                      setIsEditModalOpen(true);
                      console.log(selectedRowId , isDeleteModalOpen)
                    }}
                    className={styles.btn}
                    ><EditIcon/></button>
                  </Grid>
              ),
            },
            {
              field: 'Delete',
              headerName: 'Delete',
              renderCell: (params) => (
                <Grid container md={12}>
                  <button
                    onClick={() => {
                      setSelectedRowId(params.id);
                      setIsDeleteModalOpen(true)
                      console.log(selectedRowId )
                    }}
                    className={styles.btn}
                    ><DeleteIcon/></button>
                  </Grid>
              ),
            }
          ];
          setColumns(updatedColumns)
          }
      } else {
        setColumns([]);
      }

      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, [userData, data]); 

  return (
    <>
    <Box sx={{height: 707 , mt: '3rem', mb: '3rem'}}>
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
            fontSize: '1.2rem'
          }, '& .MuiDataGrid-columnHeaderTitleContainer':{
            color: '#2D99EF !important'
          }}
        }/>
    </Box>
    </>
  );  
};

export default TableTransComponent;
