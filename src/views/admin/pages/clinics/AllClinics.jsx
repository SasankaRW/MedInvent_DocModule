import React from "react";
import "../../../../Components/MyComponents/Container/Container.css";
import Container from "../../../../Components/MyComponents/Container/Container";
import Paper from "@mui/material/Paper";
import ClinicsTable from "./ClinicsTable";

export default function AllClinics() {
  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="All Clinics">
        <ClinicsTable />
      </Container>
    </Paper>
  );
}
