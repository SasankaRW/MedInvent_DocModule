import React, { useEffect } from "react";
import "../../../Components/Container/Container.css";
import Container from "../../../Components/Container/Container";
import Loader from "../../../Components/Loader/Loader";
import Paper from "@mui/material/Paper";
import PharmaciesTable from "./PharmaciesTable";
import axios from "axios";
import { useAlert } from "../../../Contexts/AlertContext";
import config from "../../../config";

export default function AllPharmacies() {
  const [pharmacies, setPharmacies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.baseURL}/pharmacy/get/allpharmacies`)
      .then((res) => {
        setPharmacies(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert("error", "Error loading pharmacies");
        console.log("Error getting pharmacy data" + " Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [showAlert]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="All Pharmacies">
        <PharmaciesTable
          pharmacies={pharmacies}
          setIsLoading={setIsLoading}
          setPharmacies={setPharmacies}
        />
      </Container>
    </Paper>
  );
}
