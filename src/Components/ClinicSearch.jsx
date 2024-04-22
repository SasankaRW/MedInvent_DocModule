import * as React from "react";
import { useState, useEffect } from "react";
import { ResultItem } from "./ResultItem/ResultItem";
import { SearchBar } from "./SearchBar";
import axios from "axios";
import config from "../config";
import { useAlert } from "../Contexts/AlertContext";
import Loader2 from "./Loader2/Loader2";

export default function ClinicSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clinics, setClinics] = useState([]);
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    if (searchQuery.length < 3) {
      return;
    }
    setIsLoading(true);
    axios
      .get(`${config.baseURL}/clinic/get/getByName/${searchQuery}`)
      .then((res) => {
        setClinics(res.data.data);
      })
      .catch((err) => {
        showAlert("error", "Error loading clinics");
        console.log("Error getting clinic data. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, showAlert]);

  return (
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
        type="clinic"
      />
      {isLoading && (
        <div className="mt-4">
          <Loader2 />
        </div>
      )}
      {!isLoading && clinics.length === 0 && (
        <div className="mt-4 text-muted d-flex justify-content-center">
          No clinics found
        </div>
      )}
      {!isLoading && clinics.length > 0 && (
        <div className="p-2 mt-3">
          {clinics.map((d) => (
            <ResultItem item={d} type="clinic" key={d.clinic_id} />
          ))}
        </div>
      )}
    </div>
  );
}
