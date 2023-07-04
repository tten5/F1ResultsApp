import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	getAllDriversUrl
} from '../api';
import { IDriver, resGetALL, validTarget } from '../utils/types';
import requestInstance from '../api/requestInstance';

export default function DriverNameSelect(props: any) {
	const [data, setData] = useState<IDriver[]>([]);
	const [currentVal, setCurrentVal] = useState('');

	useEffect(() => {
		const fetchDrivers = async () => {
			try {
				if (props.sort === 'firstname') {
					const response = await requestInstance.get(getAllDriversUrl('firstname'))
					setData(response.data.list)
				} 
				else {
					const response = await requestInstance.get(getAllDriversUrl(''))
					setData(response.data.list)
				}
			} catch (error) {
				console.error('Error fetching races:', error);
			}
		};

		fetchDrivers();
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		const index = Number(event.target.value)
		const driver = data[index]
		console.log(driver, index)
		props.setValue(driver._id);	// will be the driver id	
		props.setOneTarget(driver)

		const fullname = props.sort == "firstname" ? `${driver.firstname}, ${driver.lastname}` : `${driver.lastname}, ${driver.firstname}`
		console.log("Full name is", fullname)
		console.log("target.value", event.target.value)
		setCurrentVal(event.target.value as string) // will take the text of correspond value
	};
	
	console.log("DriverList", data)
	const list = data

	return (
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
					)} 
				})}
			</Select>
		</FormControl>
	);
}
