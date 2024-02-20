import React from "react";
import Container from "../../Components/MyComponents/Container";
import Paper from "@mui/material/Paper";
import "./AddNewPharmacy.css";
import InputField from "../../Components/MyComponents/InputField";
import { Grid } from "@mui/material";

export default function NewPharmacyForm() {
  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="New Pharmacy">
        <form className="new-pharmacy-form">
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <div className="pharmacyLabel">
                <label className="label">Pharmacy Name</label>
                <InputField
                  label="Pharmacy Name"
                  placeholder="Enter pharmacy name"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="contactLabel">
                <label className="label">Contact Number</label>
                <InputField
                  label="Conatact Number"
                  placeholder="Enter the contact number"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>item</div>
            </Grid>
            <Grid item xs={6}>
              <div>item</div>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
}
