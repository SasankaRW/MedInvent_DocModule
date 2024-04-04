import React, { useEffect } from "react";
import "../../../../Components/Container/Container.css";
import Container from "../../../../Components/Container/Container";
import Loader from "../../../../Components/Loader/Loader";
import Paper from "@mui/material/Paper";
import PharmaciesTable from "./PharmaciesTable";
import axios from "axios";

export default function AllPharmacies() {
  const [pharmacies, setPharmacies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/select")
      .then((res) => {
        setPharmacies(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error getting pharmacy data" + " Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <Container title="All Pharmacies">
          <PharmaciesTable
            pharmacies={pharmacies}
            setIsLoading={setIsLoading}
            setPharmacies={setPharmacies}
          />
        </Container>
      )}
    </Paper>
  );
}
