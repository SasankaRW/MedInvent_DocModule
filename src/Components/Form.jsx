import React from "react";
import "./Form.css";

export default function Form({captions,detailList,title}) {

  const headingSet = captions.map((column, index) => {
    return <td key={index} className="th-style">{column}</td>;
  });

  const detailDisplay=detailList.map((detail,index)=>{
    const indetail=captions.map((column,index)=>{
      return <td key={index}>{detail[column]}</td>;
    });
    return <tr key={index} className="tr-style">{indetail}</tr>;
  });
  
  return (
    <div className="form"> 
      <div className="form-title">{title}</div>
        <div className="table-div">
          <table className="table-style">
            <thead>
              <tr className="th-style">
                {headingSet}
              </tr>
            </thead>
            <tbody>
                {detailDisplay}
            </tbody>
          </table>     
         </div>     
    </div>
  );
}
