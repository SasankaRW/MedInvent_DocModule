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
  {
    name: "Wallace, Garza and Hayes Pharmacy",
    location: "82938 Amber Isle\nRobinsonfurt, KS 88454",
    mobileNo: "801-037-6065x61887",
  },
  {
    name: "Henderson, Oneill and Martin Pharmacy",
    location: "PSC 2350, Box 5990\nAPO AP 73895",
    mobileNo: "560-280-5153x23846",
  },
  {
    name: "Ellison PLC Pharmacy",
    location: "93921 Lara Turnpike Suite 931\nMillerland, HI 20447",
    mobileNo: "878.907.6675x0636",
  },
  {
    name: "Burton, Ward and Campbell Pharmacy",
    location: "7684 Carpenter Hill\nJanetberg, NY 65506",
    mobileNo: "+1-636-538-1289x42820",
  },
  {
    name: "Mccormick and Sons Pharmacy",
    location: "667 Caleb Locks Apt. 165\nKennethfurt, TN 32698",
    mobileNo: "693.504.6403x946",
  },
  {
    name: "Ibarra-Fry Pharmacy",
    location: "6710 Richards Mountain Suite 609\nHallville, RI 51710",
    mobileNo: "(363)862-1570",
  },
  {
    name: "Robinson, Morton and Sloan Pharmacy",
    location: "38339 Gomez Point Suite 346\nSouth Jessicatown, VT 72861",
    mobileNo: "(064)205-0982x61113",
  },
  {
    name: "Hubbard, Morris and Tucker Pharmacy",
    location: "USS Flores\nFPO AE 86386",
    mobileNo: "(646)115-2172x429",
  },
  {
    name: "Thomas PLC Pharmacy",
    location: "07869 Timothy Lake\nJenniferbury, HI 01189",
    mobileNo: "232-155-6509x1946",
  },
  {
    name: "Giles-Jordan Pharmacy",
    location: "PSC 2731, Box 7239\nAPO AA 84788",
    mobileNo: "032.842.4070x9848",
  },
];

export default function PharmaciesTable() {
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
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.mobileNo}</TableCell>
                <TableCell align="left">
                  <div className="d-flex justify-content-end">
                    <MyModal
                      icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                    >
                      <PharmacyNClinicDetailsModal row={row} type="pharmacy" />
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
