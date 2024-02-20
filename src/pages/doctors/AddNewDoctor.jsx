import React from "react";
import Container from "../../Components/MyComponents/Container";
import Paper from "@mui/material/Paper";

export default function NewDoctorForm() {
  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="New Doctor">
        <div>New Doctor</div>
      </Container>
    </Paper>
  );
}
