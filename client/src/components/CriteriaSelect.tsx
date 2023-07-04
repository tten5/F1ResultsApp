import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { config } from '../config';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CriteriaSelect(props: any) {
	const [currentVal, setCurrentVal] = useState('');
	const [checked, setChecked] = useState(false);

	const handleChange = (event: SelectChangeEvent) => {
		const value = event.target.value as string
		props.setValue(value);
		setCurrentVal(value)
	};

	const handleSetChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		
		if (!checked) {
			if (currentVal == "Races") {
				props.setSort('place')
			} 
			else if (currentVal == "Drivers") {
				props.setSort('firstname')
			}
		} else {
			props.setSort('')
		}

		setChecked(event.target.checked)
	}

	let list = ["Races", "Drivers", "Teams"]

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id="criteria-select-label">Criteria</InputLabel>
			<Select
				labelId="criteria-select-label"
				id="criteria-select"
				value={props.value}
				label="Criteria"
				onChange={handleChange}
			>
				{list.map((item, index) => (
					<MenuItem key={index} value={item}>{item}</MenuItem>
				))}

			</Select>
		{currentVal == 'Races' ? <FormControlLabel control={<Checkbox onChange={handleSetChecked} />} label="Sort races by place" /> : <></>}
		{currentVal == 'Drivers' ? <FormControlLabel control={<Checkbox onChange={handleSetChecked} />} label="Sort driver by firstname" /> : <></>}

		</FormControl>

	);
}
