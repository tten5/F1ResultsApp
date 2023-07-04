import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function DriverInputSelect(props: any) {
	const [currentVal, setCurrentVal] = useState('');
	const [checked, setChecked] = useState(false);

	const handleChange = (event: SelectChangeEvent) => {
		const value = event.target.value as string
		props.setValue(value);
		setCurrentVal(value)
	};

	const handleSetChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		
		if (!checked) {
			if (currentVal == "List") {
				props.setSort('firstname')
			}
		} else {
			props.setSort('')
		}

		setChecked(event.target.checked)
	}

	let list = ["List", "Text"]

	return (
		<FormControl sx={{ m: 1, minWidth: 150 }}>
			<InputLabel id="driver-input-select-label">Input Method</InputLabel>
			<Select
				labelId="driver-input-select-label"
				id="driver-input-select"
				value={props.value}
				label="Input Method"
				onChange={handleChange}
			>
				{list.map((item, index) => (
					<MenuItem key={index} value={item}>{item}</MenuItem>
				))}

			</Select>
		{currentVal == 'List' ? <FormControlLabel control={<Checkbox onChange={handleSetChecked} />} label="Sort DriverList by firstname" /> : <></>}

		</FormControl>

	);
}
