import React from "react";
import "../../Components/MyComponents/Container.css";
import Container from "../../Components/MyComponents/Container";
import Paper from "@mui/material/Paper";
import PharmaciesTable from "./PharmacyTable";

export default function AllPharmacies() {
  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="All Pharmacies">
        <PharmaciesTable />
      </Container>
    </Paper>
  );
}
