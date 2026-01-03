import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { codes } from '../../src/constants';

interface MultipleSelectProps {
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
}

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

function getStyles(code: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(code)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({
  selectedValues,
  setSelectedValues,
}: MultipleSelectProps) {
  const theme = useTheme();
  //const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[] | string>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      // On autofill we may get a stringified value.
      typeof value === 'string' ? value.split(',') : (value as string[])
    );
  };

  return (
    <div>
      <FormControl sx={{ height: 100, width: 300, mt: 3 }}>
        <InputLabel id="demo-multiple-name-label">Diagnoses Codes</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnoses Codes" />}
          MenuProps={MenuProps}
        >
          {codes.map((code: string) => (
            <MenuItem
              key={code}
              value={code}
              style={getStyles(code, selectedValues, theme)}
            >
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
