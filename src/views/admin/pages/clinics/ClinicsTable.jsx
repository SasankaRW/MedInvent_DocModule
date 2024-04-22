import { useState } from "react";
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
import MyModal from "../../../../Components/MyModal";
import { DeleteItemModal } from "../../../../Components/DeleteItemModal";
import { PharmacyNClinicDetailsModal } from "../../../../Components/PharmacyNClinicDetailsModal";
import { TableFooter } from "@mui/material";

const columns = [
  { id: "name", label: "Name", minWidth: 300 },
  {
    id: "location",
    label: "Location",
    minWidth: 250,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "mobileNo",
    label: "Mobile Number",
    minWidth: 50,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "",
    minWidth: 50,
    align: "right",
  },
];

export default function ClinicsTable({ clinics, setIsLoading, setClinics }) {
  //state management using useState hook
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //function to handle how many rows should be displayed per page
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
              ? clinics.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : clinics
            ).map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row" style={{ width: 200 }}>
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  {row.clinicAddress.city}, {row.clinicAddress.district}
                </TableCell>
                <TableCell align="left">{row.contactNo}</TableCell>
                <TableCell align="left">
                  <div className="d-flex justify-content-end">
                    <MyModal
                      icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                    >
                      <PharmacyNClinicDetailsModal row={row} type="clinic" />
                    </MyModal>
                    <MyModal icon={<DeleteOutlineIcon fontSize="small" />}>
                      <DeleteItemModal
                        item={row}
                        setIsLoading={setIsLoading}
                        setItems={setClinics}
                        items={clinics}
                        itemType="clinic"
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={clinics.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
