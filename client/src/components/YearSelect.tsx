import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { config } from '../config';

export default function YearSelect(props:any) {

  const handleChange = (event: SelectChangeEvent) => {
    props.setValue(event.target.value as string);
  };

  let yearList: string[] = []
  for (let i = config.db.yearStart; i <= config.db.yearEnd; i++) {
    yearList.push(String(i))
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={props.value}
          label="Year"
          onChange={handleChange}
      > 
        {yearList.map((item, index) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
          
        </Select>
      </FormControl>
  );
}
