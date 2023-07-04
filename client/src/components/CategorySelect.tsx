import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CategorySelect(props:any) {

  const handleChange = (event: SelectChangeEvent) => {
    props.setValue(event.target.value as string);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={props.value}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={'year'}>By Year</MenuItem>
          <MenuItem value={'driver'}>By Driver</MenuItem>
          <MenuItem value={'team'}>By Team</MenuItem>
          <MenuItem value={'grandprix'}>By Grand Prix</MenuItem>
        </Select>
      </FormControl>
  );
}
