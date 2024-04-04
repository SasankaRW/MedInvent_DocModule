import * as React from "react";
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

export default function PharmaciesTable({
  pharmacies,
  setIsLoading,
  setPharmacies,
}) {
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
            {(rowsPerPage > 0
              ? pharmacies.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : pharmacies
            ).map((row) => (
              <TableRow key={row.name} hover>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  {row.PharmacyTempAddress.city},{" "}
                  {row.PharmacyTempAddress.district}
                </TableCell>
                <TableCell align="left">{row.contactNo}</TableCell>
                <TableCell align="left">
                  <div className="d-flex justify-content-end">
                    <MyModal
                      icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                    >
                      <PharmacyNClinicDetailsModal row={row} type="pharmacy" />
                    </MyModal>
                    <MyModal icon={<DeleteOutlineIcon fontSize="small" />}>
                      <DeleteItemModal
                        item={row}
                        setIsLoading={setIsLoading}
                        setPharmacies={setPharmacies}
                        pharmacies={pharmacies}
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
        count={pharmacies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
