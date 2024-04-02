import React from "react";
import { FormControl,FormGroup,InputLabel,input } from "@mui/material";

export default function Form() {
    return (
        <div>
            <FormGroup>
                <FormControl>
                <InputLabel>doc name</InputLabel>
                <input type="text" name="doc_name" />
                </FormControl>
                
            </FormGroup>
        </div>
    )
}