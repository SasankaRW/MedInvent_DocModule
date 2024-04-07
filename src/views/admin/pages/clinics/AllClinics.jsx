import React, { useEffect } from "react";
import "../../../../Components/Container/Container.css";
import Container from "../../../../Components/Container/Container";
import Paper from "@mui/material/Paper";
import ClinicsTable from "./ClinicsTable";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import { useAlert } from "../../../../Contexts/AlertContext";

export default function AllClinics() {
  const [clinics, setClinics] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/select")
      .then((res) => {
        setClinics(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert("error", "Error loading clinics");
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
      <Container title="All Clinics">
        <ClinicsTable
          clinics={clinics}
          setIsLoading={setIsLoading}
          setClinics={setClinics}
        />
      </Container>
    </Paper>
  );
}
