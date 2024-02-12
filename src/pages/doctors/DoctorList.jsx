import React from "react";
import "./DoctorList.css";
import "../../Components/MyComponents/Container.css";

const docDetails = [
  {
    Name: "Nithila",
    Location: "katubedda",
    Number: "0777997689",
  },
  {
    Name: "Pramesh",
    Location: "Panadura",
    Number: "0777997689",
  },
  {
    Name: "Sasanka",
    Location: "Rathnapura",
    Number: "0777997689",
  },
  {
    Name: "Supun",
    Location: "katubedda",
    Number: "0777997689",
  },
];
const tableTitleDeatils = ["Name", "Location", "Number"];

export default function AllDoctors() {
  const headingSet = tableTitleDeatils.map((column, index) => {
    return (
      <td key={index} className="th-style">
        {column}
      </td>
    );
  });

  const detailDisplay = docDetails.map((detail, index) => {
    const indetail = tableTitleDeatils.map((column, index) => {
      return <td key={index}>{detail[column]}</td>;
    });
    return (
      <tr key={index} className="tr-style">
        {indetail}
      </tr>
    );
  });
  return (
    <div className="cont">
      <div className="cont-title">All Doctors</div>
      <div className="table-div">
        <table className="table-style">
          <thead>
            <tr className="th-style">{headingSet}</tr>
          </thead>
          <tbody>{detailDisplay}</tbody>
        </table>
      </div>
    </div>
  );
}
