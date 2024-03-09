import * as React from "react";
import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import Button from "./MyComponents/Button/Button";

import { useState } from "react";
import { ResultItem } from "./ResultItem/ResultItem";
import { SearchBar } from "./SearchBar";
import { InputAdornment, OutlinedInput } from "@mui/material";

export default function ClinicSearchModal({
  setVisitingClinics,
  visitingClinics,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchQuery, setSearchQuery] = useState("");
  let dataFiltered = filterData(searchQuery, clinics);

  const [selectedItem, setSelectedItem] = useState(null);
  const [docFee, setDocFee] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  function handleAddClinic() {
    setVisitingClinics(() => [
      ...visitingClinics,
      { clinicName: selectedItem, doctorFee: docFee },
    ]);
    dataFiltered = [];
    setDocFee(null);
    setSelectedItem(null);
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
            {selectedItem === null && (
              <div
                style={{
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: 20,
                }}
              >
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <div className="p-2 mt-3">
                  {dataFiltered.map((d) => (
                    <div onClick={() => handleSelectItem(d)} key={d.id}>
                      <ResultItem item={d} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedItem && (
              <div className="text-center">
                <div className="lead">
                  Enter doctor's fee for {selectedItem}
                </div>
                <OutlinedInput
                  value={docFee}
                  onChange={(e) => setDocFee(e.target.value)}
                  type="number"
                  size="small"
                  placeholder="Enter fee"
                  className="mt-3 rounded-5"
                  startAdornment={
                    <InputAdornment position="start"> Rs.</InputAdornment>
                  }
                />

                <div className="mt-4">
                  <Button text="Add Clinic" onClick={handleAddClinic} />
                </div>
              </div>
            )}
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

const clinics = [
  "Bright Horizon Clinics",
  "PrimeCare Health Solutions",
  "Vista Health Clinic",
  "Serenity Wellness Center",
  "Peak Health Medical Group",
  "Riverbend Family Practice",
  "UrbanWell Clinics",
  "Summit Health Services",
  "Harmony Wellness Clinic",
  "Beacon Medical Associates",
];

const filterData = (query, data) => {
  if (!query) {
    return [];
  } else {
    return data.filter((d) => d.toLowerCase().includes(query));
  }
};
