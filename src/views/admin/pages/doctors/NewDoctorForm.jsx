import React from "react";
import Container from "../../../../Components/MyComponents/Container";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DateField } from '@mui/x-date-pickers/DateField';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


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
                <h4>Doctor name</h4>
                <TextField
                  label="First Name"
                  placeholder="First Name"
                  variant="outlined"
                  fullWidth
                  margin ='10px'
                />

                <TextField
                  label="Middle Name"
                  placeholder="middle Name"
                  variant="outlined"
                  fullWidth
                  margin ='10px'
                />
                
                <TextField
                  label="Last Name"
                  placeholder="Last Name"
                  variant="outlined"
                  fullWidth
                  margin ='10px'
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
              <h4>Contact Number</h4>
                <TextField
                  label="Contact Number"
                  placeholder="Contact Number"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
                <h4>Gender</h4>
                <input type='radio' name='Gender' value= "Male"/> Male
                <input type='radio' name='Gender' value= "Female"/> Female<br/>
               
            </div>
          </Grid>
          <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
              <h4>Date of birth</h4>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField']}>
                    <DateField label="Birth date" />
                 </DemoContainer>
              </LocalizationProvider>
              
              
              </div>
            </Grid>
          <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
              <h4>Email address</h4>
                <TextField
                  label="email"
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
              <h4>Medical License Number</h4>
                <TextField
                  label="Medical License Number"
                  placeholder="Medical License Number"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
              <h4>Note</h4>
                <TextField
                  label="note"
                  placeholder="note"
                  variant="outlined"
                  fullhight
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ marginRight: "150px" }}>
              <h4>Specialty</h4>
                <TextField
                  label="Specialty"
                  placeholder="Specialty"
                  variant="outlined"
                  fullhight
                />
              </div>
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
            <h4 style={{ display: 'inline', paddingright:'100px' }}>Photo</h4>
            <Button variant="contained" style={{ marginLeft:'100px' }}>Upload</Button>

            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
            <Button variant="contained">Add  Doctor</Button>
            </Grid>
          </Grid>
          
          
        </form>
      </Container>
    </Paper>
  );
}
