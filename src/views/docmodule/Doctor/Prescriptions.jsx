import { InputLabel, Modal, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import Medicine from "../../../Components/Medicine/Medicine";
import styles from "../../docmodule/Clinic/NewAppointment.module.css";
import { useAlert } from "../../../Contexts/AlertContext";
import PrescriptionPreview from "../../../Components/PrescriptionPreview/PrescriptionPreview";
import Loader2 from "../../../Components/Loader2/Loader2";
import axios from "axios";
import config from "../../../config";

function Prescriptions() {
  const [presName, setPresName] = useState("");
  const [medicine, setMedicine] = useState([]);
  const [selectedMed, setSelectedMed] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { showAlert } = useAlert();

  function handlePresName(e) {
    setPresName(e.target.value);
  }

  function handleDelete(index) {
    const newMedicine = [...medicine];
    newMedicine.splice(index, 1);
    setMedicine(newMedicine);
  }

  function handleUpdate(index, updatedDrug) {
    const newMedicine = [...medicine];
    newMedicine[index] = updatedDrug;
    setMedicine(newMedicine);
  }

  function handleAddMedicine() {
    if (selectedMed === "") return;

    const isMedicineAlreadyAdded = medicine.some(
      (med) => med.name.toLowerCase() === selectedMed.toLowerCase()
    );

    if (isMedicineAlreadyAdded) {
      showAlert("error", "This medicine is already added.");
      return;
    }

    setMedicine((med) => [
      {
        name: selectedMed,
        qty: 0,
        frq: "3 Times Daily",
        mealTiming: "After",
        duration: 0,
      },
      ...med,
    ]);
    setSelectedMed("");
    setSearchTerm("");
  }

  function handleSendToPatient() {
    for (const med of medicine) {
      if (med.qty === 0 || med.duration === 0) {
        showAlert("error", "Quantity and duration must be greater than 0.");
        return;
      }
    }

    if (presName === "") {
      showAlert("error", "Prescription name is required.");
      return;
    }

    handleOpen();
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="shadow bg-white rounded-5 p-5 col-lg-11">
          <h5>Prescription</h5>
          <hr />
          <div className="my-4">
            <div className="d-flex align-items-end justify-content-between">
              <div>
                <InputLabel className="mb-2" value={"aefaef"}>
                  Prescription Name
                </InputLabel>
                <TextField
                  value={presName}
                  onChange={handlePresName}
                  InputProps={{
                    style: {
                      borderRadius: "50px",
                      padding: 0,
                      height: "40px",
                      width: "150%",
                    },
                  }}
                />
              </div>
              <div className="d-flex">
                <MedicineSearch
                  setSelectedMed={setSelectedMed}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <Button text="Add medicine" onClick={handleAddMedicine} />
              </div>
            </div>
            {medicine.length > 0 && (
              <div>
                <hr className="mt-5" />
                <div>
                  <div
                    className="row mt-4"
                    style={{ padding: "0 15px", margin: "10px 0" }}
                  >
                    <div className="col-2">Name</div>
                    <div className="col-2">Qty</div>
                    <div className="col-3">Frq</div>
                    <div className="col-2">Meal Timing</div>
                    <div className="col-2">Duration(days)</div>
                  </div>
                  <div className="my-4">
                    {medicine.map((drug, index) => (
                      <Medicine
                        key={`${drug.name}-${index}`}
                        drug={drug}
                        onDelete={() => handleDelete(index)}
                        onUpdate={(updatedDrug) =>
                          handleUpdate(index, updatedDrug)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {medicine.length > 0 && (
            <div className="d-flex justify-content-end">
              <Button text="Send to patient" onClick={handleSendToPatient} />
              <Modal open={open} onClose={handleClose}>
                <PrescriptionPreview
                  medicine={medicine}
                  setMedicine={setMedicine}
                  presName={presName}
                  setPresName={setPresName}
                  onClose={handleClose}
                />
              </Modal>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Prescriptions;

function MedicineSearch({ setSelectedMed, searchTerm, setSearchTerm }) {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectItem = (item) => {
    setSelectedMed(item);
    setSearchTerm(item);
    setShowResults(false);
  };

  useEffect(() => {
    if (!searchTerm) return;

    if (searchTerm.length < 2) {
      return;
    }
    setIsLoading(true);
    axios
      .get(`${config.baseURL}/medicine/get/getByName/${searchTerm}`)
      .then((res) => {
        setResults(res.data.data);
      })
      .catch((err) => {
        console.log("Error getting medicine data. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm]);

  return (
    <div>
      <TextField
        placeholder="Search for the medicine"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowResults(true);
        }}
        InputProps={{
          style: {
            borderRadius: "50px",
            padding: 0,
            height: "40px",
            marginRight: "10px",
            width: "300px",
          },
        }}
      />
      {searchTerm && showResults && (
        <div className={styles.results}>
          {isLoading ? (
            <p className="my-5">
              <Loader2 />
            </p>
          ) : results.length !== 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelectItem(item.name)}
                style={{ cursor: "pointer", padding: "0 10px" }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div>No result found</div>
          )}
        </div>
      )}
    </div>
  );
}
