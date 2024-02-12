import React from "react";
import "../../Components/MyComponents/Container.css";
import './AddNewPharmacy.css';
import InputField from '../../Components/MyComponents/InputField';


export default function NewPharmacyForm() {
  return (
    <div className="cont">
      <div className="cont-title">New Pharmacy</div>
      
      <div className="labelContainer">
      <div className="pharmacyLabel">
        <label className="label">Pharmacy Name</label>
        <InputField label="Pharmacy Name" placeholder="Enter pharmacy name" />
      </div>

      <div className="contactLabel">
        <label className="label">Contact Number</label>
        <InputField label="Conatact Number" placeholder="Enter the contact number" />
      </div>
      </div>

    </div>
  );
}
