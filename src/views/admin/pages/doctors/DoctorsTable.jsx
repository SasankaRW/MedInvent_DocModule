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
import { useState } from "react";
import MyModal from "../../../../Components/MyComponents/MyModal";
import { DeleteItemModal } from "../../../../Components/MyComponents/DeleteItemModal";
import { DoctorDetailsModal } from "../../../../Components/DoctorDetailsModal";

const columns = [
  { id: "name", label: "Name", minWidth: 200 },
  {
    id: "specialty",
    label: "Specialty",
    minWidth: 200,
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
    minWidth: 50,
    align: "right",
  },
];

const rows = [
  {
    name: "Dr. John Smith",
    specialty: "Cardiology",
    mobileNo: "123-456-7890",
  },
  {
    name: "Dr. Lisa White",
    specialty: "Dermatology",
    mobileNo: "098-765-4321",
  },
  {
    name: "Dr. Mark Johnson",
    specialty: "Neurology",
    mobileNo: "456-789-1230",
  },
  {
    name: "Dr. Sarah Brown",
    specialty: "Pediatrics",
    mobileNo: "321-654-0987",
  },
  {
    name: "Dr. Emily Davis",
    specialty: "General Surgery",
    mobileNo: "234-567-8910",
  },
  {
    name: "Dr. Alex Green",
    specialty: "Orthopedics",
    mobileNo: "543-210-9876",
  },
  {
    name: "Dr. Samantha Blue",
    specialty: "Psychiatry",
    mobileNo: "678-123-4567",
  },
  {
    name: "Dr. Michael Orange",
    specialty: "Gastroenterology",
    mobileNo: "987-654-3210",
  },
  {
    name: "Dr. Olivia Black",
    specialty: "Ophthalmology",
    mobileNo: "132-465-7980",
  },
  {
    name: "Dr. Ethan Gray",
    specialty: "Pulmonology",
    mobileNo: "564-738-2910",
  },
];

export default function DoctorsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row" style={{ width: 200 }}>
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 200 }} align="left">
                  {row.specialty}
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  {row.mobileNo}
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  <div className="d-flex justify-content-end">
                    <MyModal
                      icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                    >
                      <DoctorDetailsModal doctor={row} />
                    </MyModal>
                    <MyModal icon={<DeleteOutlineIcon fontSize="small" />}>
                      <DeleteItemModal item={row} />
                    </MyModal>
                    <IconButton style={{ padding: "0px 5px" }}>
                      <BorderColorOutlinedIcon fontSize="small" />
                    </IconButton>
                  </div>
                </TableCell>
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
