import * as React from "react";
import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import Button from "./Button/Button";

import { useState } from "react";
import { ClinicSearch } from "./ClinicSearch";
import { SetDocFee } from "./SetDocFee";
import { SearchBar } from "./SearchBar";
import { ResultItem } from "./ResultItem/ResultItem";

export default function AddDoctorModal({}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedItem, setSelectedItem] = useState(null);

  let dataFiltered = filterData(searchQuery, doctors);

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  function handleAddClinic() {
    setSelectedItem(null);
    handleClose();
  }

  function onClick(d) {
    console.log(d);
    handleClose();
  }

  return (
    <div>
      <Button text="Add" onClick={handleOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              type="doctor"
            />
            <div
              className="mt-3"
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                scrollbarWidth: "thin",
              }}
            >
              {dataFiltered.map((d) => (
                <div onClick={() => onClick(d.name)}>
                  <ResultItem item={d.name} subHeading={d.specialty} />
                </div>
              ))}
            </div>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ModalContent = styled("div")(
  () => css`
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    color: black;
  `
);

const doctors = [
  { name: "Dr. Emily Watson", specialty: "Cardiology" },
  { name: "Dr. John Carter", specialty: "Emergency Medicine" },
  { name: "Dr. Sarah Lin", specialty: "Pediatrics" },
  { name: "Dr. Alex Johnson", specialty: "General Surgery" },
  { name: "Dr. Maria Gonzalez", specialty: "Family Medicine" },
  { name: "Dr. James Lee", specialty: "Neurology" },
  { name: "Dr. Lauren Smith", specialty: "Dermatology" },
  { name: "Dr. Michael Brown", specialty: "Orthopedics" },
  { name: "Dr. Jessica Patel", specialty: "Obstetrics & Gynecology" },
  { name: "Dr. William Davis", specialty: "Psychiatry" },
];

export const filterData = (query, data) => {
  if (!query) {
    return [];
  } else {
    return data.filter((d) => d.name.toLowerCase().includes(query));
  }
};
