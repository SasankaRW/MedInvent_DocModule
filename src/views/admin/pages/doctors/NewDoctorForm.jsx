import React from "react";
import Container from "../../../../Components/MyComponents/Container";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function NewDoctorForm() {
  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="New Doctor">
        <form style={{ margin: "50px 0px" }}>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
                <TextField
                  label="Doctor Name"
                  placeholder="First Name"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Doctor Name"
                  placeholder="Last Name"
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
