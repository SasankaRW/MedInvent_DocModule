import React from "react";
import Container from "../../Components/MyComponents/Container";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function NewPharmacyForm() {
  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="New Pharmacy">
        <form style={{ margin: "50px 0px" }}>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
                <TextField
                  label="Pharmacy Name"
                  placeholder="Pharmacy Name"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
                <TextField
                  label="Contact Number"
                  placeholder="Contact Number"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              item
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
