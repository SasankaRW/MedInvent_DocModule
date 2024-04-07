import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";

export const SearchBar = ({ setSearchQuery, searchQuery, type }) => (
  <OutlinedInput
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
    }}
    variant="outlined"
    placeholder={`Search for a ${type}`}
    size="small"
    endAdornment={
      <InputAdornment position="end">
        <SearchIcon />
      </InputAdornment>
    }
    style={{ borderRadius: "20px", width: "400px" }}
  />
);
