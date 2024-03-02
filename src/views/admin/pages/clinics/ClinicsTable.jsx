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
    id: "location",
    label: "Location",
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

function createData(name, location, mobileNo) {
  return { name, location, mobileNo };
}

const rows = [
  createData("Medicare Clinic", "Katubedda", "0771234567"),
  createData("XYZ Clinic", "Kandy", "0812345678"),
  createData("City Medical Center", "Galle", "0912345678"),
  createData("Sunrise Hospital", "Negombo", "0312345678"),
  createData("Greenview Clinic", "Anuradhapura", "0256789012"),
  createData("Golden Gate Hospital", "Matara", "0412345678"),
  createData("Pristine Healthcare", "Jaffna", "0212345678"),
  createData("Sunset Medical Center", "Trincomalee", "0267890123"),
  createData("Wellness Hospital", "Batticaloa", "0356789012"),
  createData("Lakeview Clinic", "Ratnapura", "0456789012"),
  createData("Oceanview Hospital", "Hambantota", "0556789012"),
  createData("Hilltop Medical Center", "Badulla", "0656789012"),
  createData("Central Hospital", "Kegalle", "0712345678"),
  createData("Northern Clinic", "Mannar", "0812345678"),
  createData("Southern Medical Center", "Mullaitivu", "0956789012"),
];

export default function ClinicsTable() {
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
