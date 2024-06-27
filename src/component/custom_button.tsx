"use client";
import { Button } from "@mui/material";
import React from "react";

function CustomButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button
      color="secondary"
      variant="contained"
      size="small"
      sx={{ color: "white" }}
      onClick={onClick}
    >
      Start
    </Button>
  );
}

export default CustomButton;
