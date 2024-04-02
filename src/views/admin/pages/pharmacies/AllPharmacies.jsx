import React from "react";
import "../../../../Components/Container/Container.css";
import Container from "../../../../Components/Container/Container";
import Paper from "@mui/material/Paper";
import PharmaciesTable from "./PharmaciesTable";

export default function AllPharmacies() {
  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="All Pharmacies">
        <PharmaciesTable />
      </Container>
    </Paper>
  );
}
