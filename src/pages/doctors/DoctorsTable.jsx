import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const columns = [
  { id: "name", label: "Name", minWidth: 200 },
  {
    id: "speciality",
    label: "speciality",
    minWidth: 150,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "mobileNo",
    label: "Mobile Number",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "",
    minWidth: 170,
    align: "right",
  },
];

function createData(name, speciality, mobileNo) {
  return { name, speciality, mobileNo };
}

const rows = [
  createData("Dr Stephen Strange", "Cardiologist", "0771234567"),
  createData("Dr John Doe", "Neurologist", "0887654321"),
  createData("Dr Jane Smith", "Pediatrician", "0998765432"),
  createData("Dr Emily Brown", "Dermatologist", "0112345678"),
  createData("Dr Michael Johnson", "Orthopedic Surgeon", "0223456789"),
  createData("Dr Sarah Williams", "Psychiatrist", "0334567890"),
  createData("Dr David Wilson", "Oncologist", "0445678901"),
  createData("Dr Olivia Garcia", "Gynecologist", "0556789012"),
  createData("Dr William Martinez", "Endocrinologist", "0667890123"),
  createData("Dr Sophia Rodriguez", "Urologist", "0778901234"),
  createData("Dr Ethan Taylor", "Ophthalmologist", "0889012345"),
];

export default function DoctorsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "actions" ? (
                          <>
                            <IconButton style={{ fontSize: 10 }}>
                              <RemoveRedEyeOutlinedIcon />
                            </IconButton>
                            <IconButton style={{ fontSize: 10 }}>
                              <DeleteOutlineIcon />
                            </IconButton>
                            <IconButton style={{ fontSize: 10 }}>
                              <BorderColorOutlinedIcon />
                            </IconButton>
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
