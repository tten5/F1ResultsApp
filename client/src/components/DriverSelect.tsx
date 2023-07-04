import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	getDriversInOneYearUrl,
	getDriversPtsInOneYearUrl,
	getParOfOneDriverInOneYearUrl
} from '../api';
import { IDriver, resGetALL, validTarget } from '../utils/types';
import requestInstance from '../api/requestInstance';

export default function DriverSelect(props: any) {
	const [data, setData] = useState<IDriver[]>([]);

	useEffect(() => {
		const fetchDrivers = async () => {
			try {
				if (props.sort === 'firstname') {
					const response = await requestInstance.get(getDriversInOneYearUrl(props.year, 'firstname'))
					setData(response.data.list)
				} 
				else {
					const response = await requestInstance.get(getDriversInOneYearUrl(props.year, ''))
					setData(response.data.list)
				}
			} catch (error) {
				console.error('Error fetching races:', error);
			}
		};

		fetchDrivers();
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		const driver = event.target.value as string
		props.setValue(driver);
		if (driver == 'All') {
			fetchData(props, "All", getDriversPtsInOneYearUrl(props.year));
		}
		else {
			fetchData(props, "One", getParOfOneDriverInOneYearUrl(driver, props.year));
		}
	};
	console.log(data)
	const list = data

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id="driver-select-label">Driver</InputLabel>
			<Select
				labelId="driver-select-label"
				id="driver-select"
				value={props.value}
				label="Driver"
				onChange={handleChange}
			>
				<MenuItem value={'All'}>All</MenuItem>
				
				{list.map((item: IDriver, index: number) => (
					<MenuItem key={index} value={String(item._id)}>{props.sort == "firstname" ? item.firstname : item.lastname }, {props.sort == "firstname" ? item.lastname : item.firstname}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}


const fetchData = async (props: any, type: string, url: string) => {
	try {
		const response = await requestInstance.get(url)

		const data = response.data
		console.log("Table data is", data)
		const keyList = Object.keys(data.list[0])
		console.log("Column name is", keyList)
		let columns: any = []

		if (type === "All") {
			for (let i = 1; i < keyList.length; i++) {
				let minWidth = 150

				if (keyList[i] == "laps" || keyList[i] == "pos") {
					minWidth = 10
				}
				columns.push({
					id: keyList[i],
					label: keyList[i].toLocaleUpperCase(),
					minWidth: minWidth
				})
			}
			props.setOneTarget({})

		}
		else if (type === 'One') {
			for (let i = 0; i < keyList.length; i++) {
				let minWidth = 150

				if (keyList[i] == "pos" || keyList[i] == "laps" || keyList[i] == "points") {
					minWidth = 50
				}
				columns.push({
					id: keyList[i],
					label: keyList[i].toLocaleUpperCase(),
					minWidth: minWidth
				})
			}
			props.setOneTarget(data.target)
			
		}
		props.setColumns(columns)
			props.setRows(data.list)
	} catch (error) {
		console.error('Error fetching drivers:', error);
	}
};