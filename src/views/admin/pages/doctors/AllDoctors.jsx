import React, { useEffect } from "react";
import "./AllDoctors.css";
import Container from "../../../../Components/Container/Container";
import Paper from "@mui/material/Paper";
import DoctorsTable from "./DoctorsTable";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import { useAlert } from "../../../../Contexts/AlertContext";
import config from "../../../../config";

export default function AllDoctors() {
  const [doctors, setDoctors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.baseURL}/doctor/get/alldoctors`)
      .then((res) => {
        setDoctors(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert("error", "Error loading doctors");
        console.log("Error getting clinic data" + " Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="All Doctors">
        <DoctorsTable
          doctors={doctors}
          setIsLoading={setIsLoading}
          setDoctors={setDoctors}
        />
      </Container>
    </Paper>
  );
}
