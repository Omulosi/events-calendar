"use client";

import { Checkbox } from "@mui/material";
import BlankCheckBoxIcon from "@components/icons/BlankCheckBoxIcon";
import CheckBoxIcon from "@components/icons/CheckBoxIcon";
import React from "react";

const AppCheckBox = (props) => {
  return (
    <Checkbox
      {...props}
      disableRipple
      checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />}
      icon={<BlankCheckBoxIcon fontSize="small" color="disabled" />}
    />
  );
};

export default AppCheckBox;
