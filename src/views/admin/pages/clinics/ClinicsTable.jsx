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
import MyModal from "../../../../Components/MyComponents/MyModal";
import { DeleteItemModal } from "../../../../Components/MyComponents/DeleteItemModal";
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

const rows = [
  { name: "Medicare Clinic", location: "Katubedda", mobileNo: "0771234567" },
  { name: "XYZ Clinic", location: "Kandy", mobileNo: "0812345678" },
  { name: "City Medical Center", location: "Galle", mobileNo: "0912345678" },
  { name: "Sunrise Hospital", location: "Negombo", mobileNo: "0312345678" },
  {
    name: "Greenview Clinic",
    location: "Anuradhapura",
    mobileNo: "0256789012",
  },
  { name: "Golden Gate Hospital", location: "Matara", mobileNo: "0412345678" },
  { name: "Pristine Healthcare", location: "Jaffna", mobileNo: "0212345678" },
  {
    name: "Sunset Medical Center",
    location: "Trincomalee",
    mobileNo: "0267890123",
  },
  { name: "Wellness Hospital", location: "Batticaloa", mobileNo: "0356789012" },
  { name: "Lakeview Clinic", location: "Ratnapura", mobileNo: "0456789012" },
  {
    name: "Oceanview Hospital",
    location: "Hambantota",
    mobileNo: "0556789012",
  },
  {
    name: "Hilltop Medical Center",
    location: "Badulla",
    mobileNo: "0656789012",
  },
  { name: "Central Hospital", location: "Kegalle", mobileNo: "0712345678" },
  { name: "Northern Clinic", location: "Mannar", mobileNo: "0812345678" },
  {
    name: "Southern Medical Center",
    location: "Mullaitivu",
    mobileNo: "0956789012",
  },
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
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row" style={{ width: 200 }}>
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.mobileNo}</TableCell>
                <TableCell align="left">
                  <div className="d-flex justify-content-end">
                    <MyModal
                      icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                    >
                      <PharmacyNClinicDetailsModal row={row} type="clinic" />
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
