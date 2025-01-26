import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { Checkbox, ListItemText } from "@mui/material";
// import { dark } from "@mui/material/styles/createPalette";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ data, handleChange, value, lable }) {
  const theme = useTheme("dark");

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel id="demo-multiple-name-label">{lable} </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={lable} />}
          MenuProps={MenuProps}
          size="small"
        >
          {" "}
          <MenuItem disabled value="">
            <em>{lable}</em>
          </MenuItem>
          {data &&
            data.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, value, theme)}
              >
                {/* <Checkbox checked={personName.indexOf(name) > -1} /> */}
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
