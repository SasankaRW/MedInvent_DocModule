import * as React from "react";
import { useState } from "react";
import { ResultItem } from "./ResultItem/ResultItem";
import { SearchBar } from "./SearchBar";
import { filterData, clinics } from "./AddClinicModal";

export function ClinicSearch({ handleSelectedItem }) {
  const [searchQuery, setSearchQuery] = useState("");
  let dataFiltered = filterData(searchQuery, clinics);
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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="p-2 mt-3">
        {dataFiltered.map((d) => (
          <div onClick={() => handleSelectedItem(d)} key={d}>
            <ResultItem item={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
