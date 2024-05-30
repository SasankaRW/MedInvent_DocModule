import { useState } from "react";
import Button from "../Button/Button";
import styles from "./PrescriptionPreview.module.css";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import config from "../../config";
import { useAlert } from "../../Contexts/AlertContext";
import Loader2 from "../Loader2/Loader2";
import { useAuth } from "../../Contexts/AuthContext";

export default function PrescriptionPreview({ medicine, presName, onClose }) {
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [patientNic, setPatientNic] = useState("");

  const { showAlert } = useAlert();
  const { user } = useAuth();

  const isEmptyObject = (obj) => Object.keys(obj).length === 0;

  function findPatient() {
    if (patientNic === "") {
      showAlert("error", "Please enter a NIC number");
      return;
    }

    setIsLoading(true);
    axios
      .get(
        `${config.baseURL}/PatientUser/get/PatientUser/details/nic/${patientNic}`
      )
      .then((res) => {
        if (
          !res.data.data.success &&
          res.data.data.message === "Patient not found"
        ) {
          showAlert("error", "Patient not found");
        } else if (!res.data.success) {
          showAlert("error", res.data.message);
        } else {
          setPatient(res.data.data);
        }
      })
      .catch((err) => {
        showAlert("error", "Error loading profile data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSendToPatient() {
    const presData = {
      doctor_id: user.id,
      patient_id: patient.userID,
      medicine: medicine,
      name: presName,
    };

    showAlert("success", "Prescription sent to patient successfully");
    onClose();
  }

  return (
    <Box
      sx={style}
      className={!isEmptyObject && "col-lg-8 col-xl-6 col-md-10 col-11"}
    >
      <div className="row">
        {isEmptyObject(patient) ? (
          <div className={styles.userSearch}>
            <h5>Enter patient's NIC number</h5>
            <TextField
              value={patientNic}
              onChange={(e) => setPatientNic(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: "10px",
                  padding: 0,
                  height: "40px",
                  width: "100%",
                  backgroundColor: "white",
                  marginTop: "20px",
                  marginBottom: "30px",
                },
              }}
            />
            {isLoading ? (
              <div>
                <Loader2 />
              </div>
            ) : (
              <Button text="Search" onClick={findPatient} />
            )}
          </div>
        ) : (
          <>
            <div className={styles.userDetails}>
              <div>
                <div className="text-muted">Patient's name</div>
                <div>
                  <b>
                    {patient.Fname} {patient.Lname}
                  </b>
                </div>
              </div>

              <div>
                <div className="text-muted">NIC</div>
                <div>
                  <b>{patient.nic}</b>
                </div>
              </div>

              <div>
                <div className="text-muted">Mobile number</div>
                <div>
                  <b>{patient.mobileNo}</b>
                </div>
              </div>
            </div>
            <hr className="my-3" />
            <h5>
              <b>Prescription: {presName}</b>
            </h5>
            <br />
            <br />
            {medicine.map((med, index) => (
              <div key={index} className={styles.med}>
                <div className="col-2">
                  <b>{med.name}</b>
                </div>
                <div className="col-2">{med.qty} tabs</div>
                <div className="col-2">{med.frq}</div>
                <div className="col-2">
                  {med.mealTiming}{" "}
                  {(med.mealTiming === "After" ||
                    med.mealTiming === "Before") &&
                    "Meals"}
                </div>
                <div className="col-2">{med.duration} days</div>
              </div>
            ))}
            <div className="d-flex justify-content-end mt-4">
              <Button text="Send to patient" onClick={handleSendToPatient} />
            </div>
          </>
        )}
      </div>
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};
