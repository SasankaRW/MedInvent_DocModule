import * as React from "react";
import { useState } from "react";
import { ResultItem } from "./ResultItem/ResultItem";
import { SearchBar } from "./SearchBar";

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
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        type="clinic"
      />
      <div className="p-2 mt-3">
        {dataFiltered.map((d) => (
          <ResultItem item={d} type="clinic" />
        ))}
      </div>
    </div>
  );
}

const clinics = [
  { name: "Bright Horizon Clinics", address: "123 Main St, City, State, Zip" },
  {
    name: "PrimeCare Health Solutions",
    address: "123 Main St, City, State, Zip",
  },
  { name: "Vista Health Clinic", address: "123 Main St, City, State, Zip" },
  {
    name: "Serenity Wellness Center",
    address: "123 Main St, City, State, Zip",
  },
  {
    name: "Peak Health Medical Group",
    address: "123 Main St, City, State, Zip",
  },
  {
    name: "Riverbend Family Practice",
    address: "123 Main St, City, State, Zip",
  },
  { name: "UrbanWell Clinics", address: "123 Main St, City, State, Zip" },
  { name: "Summit Health Services", address: "123 Main St, City, State, Zip" },
  { name: "Harmony Wellness Clinic", address: "123 Main St, City, State, Zip" },
  {
    name: "Beacon Medical Associates",
    address: "123 Main St, City, State, Zip",
  },
];

const filterData = (query, data) => {
  if (!query) {
    return [];
  } else {
    return data.filter((d) => d.name.toLowerCase().includes(query));
  }
};
