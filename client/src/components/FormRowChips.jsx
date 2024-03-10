import React, { forwardRef, useImperativeHandle, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const FormRowChips = forwardRef(
  ({ name = "skills", labelText, skills: inputSkills }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [skills, setSkills] = useState(inputSkills || []);

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleAddSkill = () => {
      if (inputValue.trim() !== "" && !skills.includes(inputValue.trim())) {
        setSkills([...skills, inputValue.trim()]);
        setInputValue("");
      }
    };

    const handleDeleteSkill = (deletedSkill) => {
      const updatedSkills = skills.filter((skill) => skill !== deletedSkill);
      setSkills(updatedSkills);
    };

    useImperativeHandle(ref, () => {
      return {
        getState() {
          return skills;
        },
      };
    });

    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <TextField
          id={name}
          fullWidth
          className="forn-input-chip"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter atleast 3 skills"
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "Space") {
              e.preventDefault();
              handleAddSkill();
            }
          }}
          sx={{
            ".Mui-focused fieldset": {
              borderColor: "#000 !important",
            },
          }}
        />
        <Stack
          direction="row"
          spacing={1}
          marginTop={2}
          useFlexGap
          flexWrap="wrap"
          sx={{
            marginTop: skills.length ? "16px" : "0",
          }}
        >
          {skills.map((skill) => (
            <Chip
              name="skills"
              key={skill}
              label={skill}
              onKeyDown={(e) => {
                if (e.code === "Enter" || e.code === "Space") {
                  handleDeleteSkill(skill);
                }
              }}
              onDelete={() => handleDeleteSkill(skill)}
              sx={{
                fontSize: "1rem",
                color: "var(--text-color) !important",
              }}
            />
          ))}
        </Stack>
      </div>
    );
  }
);

export default FormRowChips;
