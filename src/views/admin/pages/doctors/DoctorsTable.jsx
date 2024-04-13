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
import MyModal from "../../../../Components/MyModal";
import { DeleteItemModal } from "../../../../Components/DeleteItemModal";
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

export default function DoctorsTable({ doctors, setIsLoading, setDoctors }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage) => {
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
              ? doctors.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : doctors
            ).map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row" style={{ width: 200 }}>
                  {row.fname} {row.lname}
                </TableCell>
                <TableCell style={{ width: 200 }} align="left">
                  {row.specialization}
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  {row.contactNo}
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  <div className="d-flex justify-content-end">
                    <MyModal
                      icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                    >
                      <DoctorDetailsModal doctor={row} />
                    </MyModal>
                    <MyModal icon={<DeleteOutlineIcon fontSize="small" />}>
                      <DeleteItemModal
                        item={row}
                        setIsLoading={setIsLoading}
                        setItems={setDoctors}
                        items={doctors}
                        itemType="doctor"
                      />
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
        count={doctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
