import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableComponent = ({
  data,
  isEdit,
  ForWhat,
  handleEditOpen,
  setSelectedRowData,
  handleOpenDelete,
}) => {
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(false);
  const buton = isEdit === true ? true : false;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEdit = (e, row) => {
    e.preventDefault();
    handleEditOpen();
    setSelectedRowData(row);
  };

  const handleDelete = (e, row) => {
    e.preventDefault();
    handleOpenDelete();
    setSelectedRowData(row);
  };

  let visibleFields;
  useEffect(() => {
    try {
        if (ForWhat === "transaction") {
          visibleFields = ["id", "type", "amount", "userName", "categoryName"];
        } else if (ForWhat === "users") {
          visibleFields = ["id", "firstName", "lastName", "role", "dob"];
        } else {
          visibleFields = Object.keys(data[0]);
        }
        if (buton === false) {
          setColumns(
            visibleFields.map((field) => ({
              field,
              headerName: field,
              flex: screenWidth > 900 ? 1 : 0,
            }))
          );
        } else {
          if (ForWhat === "users") {
            const updatedColumns = [
              ...visibleFields.map((field) => ({
                field,
                headerName: field,
                flex: screenWidth > 900 ? 1 : 0,
              })),
              {
                field: "Edit",
                headerName: "Edit",
                renderCell: (params) => (
                  <Grid
                    container
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={(e) => handleEdit(e, params.row)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                ),
              },
              {
                field: "Delete",
                headerName: "Delete",
                renderCell: (params) => (
                  <Grid
                    container
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={(e) => handleDelete(e, params.row)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ),
              },
            ];
            setColumns(updatedColumns);
          } else if (ForWhat === "transaction") {
            const updatedColumns = [
              ...visibleFields.map((field) => ({
                field,
                headerName: field,
                editable: true,
                flex: 1,
              })),
              {
                field: "Edit",
                headerName: "Edit",
                renderCell: (params) => (
                  <Grid
                    container
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={(e) => handleEdit(e, params.row)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                ),
              },
              {
                field: "Delete",
                headerName: "Delete",
                renderCell: (params) => (
                  <Grid
                    container
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={(e) => handleDelete(e, params.row)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ),
              },
            ];
            setColumns(updatedColumns);
          } else {
            const updatedColumns = [
              ...visibleFields.map((field) => ({
                field,
                headerName: field,
                editable: true,
                flex: 1,
              })),
              {
                field: "Edit",
                headerName: "Edit",
                renderCell: (params) => (
                  <Grid
                    container
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton onClick={(e) => handleEdit(e, params.row)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                ),
              },
              {
                field: "Delete",
                headerName: "Delete",
                renderCell: (params) => (
                  <Grid
                    container
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span>
                      <IconButton onClick={(e) => handleDelete(e, params.row)}>
                        <DeleteIcon />
                      </IconButton>
                    </span>
                  </Grid>
                ),
              },
            ];
            setColumns(updatedColumns);
          }
        }

      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, []);

  return (
    <>
      <Box sx={{ height: 707, mt: "3rem", mb: "3rem", fontFamily: "outfit" }}>
        <DataGrid
          columns={columns}
          rows={data}
          getRowId={(row) => row.id}
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
          sx={{
            marginBottom: "4rem",
            width: "98%",
            bgcolor: "#212936",
            border: 0,
            "& .MuiToolbar-root , .MuiInputBase-input , .MuiDataGrid-columnHeaderTitleContainer , .MuiDataGrid-cell":
              {
                color: "white",
              },
            "& .MuiButtonBase-root .MuiSvgIcon-root ,  .MuiSvgIcon-root": {
              color: "#2D99EF",
            },
            "& .MuiDataGrid-root , .MuiDataGrid-colCell, .MuiDataGrid-root , .MuiDataGrid-cell":
              {
                maxHeight: "100px !important",
              },
            "& .MuiInputBase-root , & .MuiInputBase-input": {
              color: "#000",
            },
            "& .MuiDataGrid-row Mui-selected , &.MuiDataGrid-row Mui-hovered": {
              bgcolor: "#17456E",
            },
            "& .MuiDataGrid-row": {
              height: "90px !important",
              maxHeight: "90px !important",
            },
            "& .Mui-hovered": {
              bgcolor: "#444654 !important",
            },
            "& .Mui-selected": {
              bgcolor: "#17456E",
            },
            "& .MuiDataGrid-columnHeaders , & .MuiDataGrid-toolbarContainer , & .MuiDataGrid-footerContainer":
              {
                height: "90px !important",
                maxHeight: "90px !important",
                fontSize: "1.2rem",
                mb: screenWidth < 500 ? "1rem" : "0",
              },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              color: "#2D99EF !important",
            },
            ".MuiDataGrid-cell": {
              width: "8rem",
            },
            "& .MuiSelect-select , & .MuiTablePagination-select , & .MuiSelect-standard MuiInputBase-input css-194a1fa-MuiSelect-select-MuiInputBase-input":
              {
                color: "#2D99EF !important",
              },
          }}
        />
      </Box>
    </>
  );
};

export default TableComponent;
