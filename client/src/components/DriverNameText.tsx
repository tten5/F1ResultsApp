import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import {
	searchDriverByNameUrl
} from '../api';
import requestInstance from '../api/requestInstance';
import { IDriver } from '../utils/types';

export default function DriverNameText(props: any) {
	const [checked, setChecked] = useState(true);
	const [alert, setAlert] = useState('')
	const [list, setList] = useState<IDriver[]>([])
	const [currentVal, setCurrentVal] = useState('');

	const handleSetAlert = (newValue: string) => {
		setAlert(newValue)
	}

	const handleSetList = (newValue: IDriver[]) => {
		setList([...newValue])
	}

	const handleSetChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		console.log({
			driverName: formData.get('driverName'),
			isLastName: checked,
		});
		fetchData(props, searchDriverByNameUrl(), formData, handleSetAlert, handleSetList);

	};

	const handleChange = (event: SelectChangeEvent) => {
		const index = Number(event.target.value)
		const driver = list[index]
		console.log(driver, index)
		props.setValue(driver._id);	// will be the driver id	
		props.setOneTarget(driver)

		const fullname = props.sort == "firstname" ? `${driver.firstname}, ${driver.lastname}` : `${driver.lastname}, ${driver.firstname}`
		console.log("Full name is", fullname)
		console.log("target.value", event.target.value)
		setCurrentVal(event.target.value as string) // will take the text of correspond value
	};

	return (
		<div style={{display:"inline-block"}}>
		<FormControl component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1, minWidth: 120 }}>
			<TextField
				required
				id="driver-name-text"
				label="Driver"
				name="driverName"
				defaultValue={"driver"}
			/>

			{alert != '' ? <h4>{alert}</h4> : <></>}


			<FormControlLabel
				control={<Checkbox checked={checked} onChange={handleSetChecked} color="primary" name='isLastName' />}
				label="Search by lastname"
			/>

			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Search
			</Button>
		</FormControl>
			{list.length != 0 ?
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id="driver-name-select-label">Driver</InputLabel>
					<Select
						labelId="driver-name-select-label"
						id="driver-name-select"
						value={currentVal}
						label="Driver"
						onChange={handleChange}
					>
						{list.map((item: IDriver, index: number) => {
							if (item.firstname != '_') {
								return (
									<MenuItem key={index} value={index}>
										{props.sort == "firstname" ? item.firstname : item.lastname}, {props.sort == "firstname" ? item.lastname : item.firstname}
									</MenuItem>
								)
							}
						})}
					</Select>
				</FormControl>
				: <></>}
		</div>
	);
}


const fetchData = async (props: any,
	url: string, formData: FormData,
	handleSetAlert: (arg: string) => void,
	handleSetList: (arg: IDriver[]) => void ) => {
	try {
		const response = await requestInstance.post(url, formData, {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = response.data

		handleSetAlert('')
		console.log("DriverList", data)
		const list = data.list
		handleSetList(list)
		
	} catch (error:any) {
		if (error.response.status == 404) {
			handleSetAlert('No driver to be found, try capitalize the name')
		}
		if (error.response.status == 400) {
			handleSetAlert('PLease provide driver name')
		}
		console.error('Error fetching driver', error);
	}
};