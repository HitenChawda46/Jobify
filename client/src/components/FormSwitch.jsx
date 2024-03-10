import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

export default function FormSwitch({
  list,
  defaultValue,
  onChange: OnInputChange,
}) {
  if (!list.length) {
    console.log("provide atleast one item");
    return;
  }
  const [type, setSwitchType] = useState(defaultValue || list[0].value);

  const handleOnChange = (event, newType) => {
    if (newType !== null) {
      setSwitchType(newType);
      OnInputChange(newType);
    }
  };
  const buttonStyle = {
    fontSize: "var(--small-text)",
    color: "var(--text-color) !important",
  };

  return (
    <ToggleButtonGroup
      value={type}
      exclusive
      onChange={handleOnChange}
      size="small"
      fullWidth
      sx={{
        marginBottom: "1rem",
      }}
    >
      {list.map((item) => (
        <ToggleButton key={item.value} sx={buttonStyle} value={item.value}>
          {item.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
