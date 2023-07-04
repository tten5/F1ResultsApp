import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	getYearlyBestDriverOfOneTeamUrl,
	getYearlyRakingOfOneDriverUrl,
	getYearlyRakingOfOneTeamUrl
} from '../api';
import { IDriver, resGetALL, validTarget } from '../utils/types';
import requestInstance from '../api/requestInstance';

export default function YearlySelect(props: any) {

	const handleChange = (event: SelectChangeEvent) => {
		const yearly = event.target.value as string
		console.log("Yearly", yearly)
		props.setValue(yearly);
		if (props.category === 'driver' && yearly === 'yearly-ranking') {
			fetchData(props, "driver-yearly-ranking", getYearlyRakingOfOneDriverUrl(props.target));
		}
		else if (props.category === 'team' && yearly === 'yearly-ranking') {
			fetchData(props, "team-yearly-ranking", getYearlyRakingOfOneTeamUrl(props.target));
		}
	};

	let list : any[] = []
	if (props.category == "driver") {
		list = ["yearly-ranking"]
	}

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id="yearly-select-label">Yearly</InputLabel>
			<Select
				labelId="yearly-select-label"
				id="yearly-select"
				value={props.value}
				label="Yearly"
				onChange={handleChange}
			>				
				{list.map((item: string, index: number) => (
					<MenuItem key={index} value={item}>{item}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}


const fetchData = async (props: any, type: string, url: string) => {
	try {
		console.log("Start fetch data")
		const response = await requestInstance.get(url)

		const data = response.data
		console.log("Table data is", data)
		const keyList = Object.keys(data.list[0])
		console.log("Column name is", keyList)
		let columns: any = []

		if (type === "driver-yearly-ranking") {
			for (let i = 0; i < keyList.length; i++) {
				let minWidth = 20

				if (keyList[i] == "team") {
					minWidth = 150
				}
				columns.push({
					id: keyList[i],
					label: keyList[i].toLocaleUpperCase(),
					minWidth: minWidth
				})
			}
		}
		else if (type === 'team-yearly-ranking') {
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
		}
		props.setColumns(columns)
		props.setRows(data.list)
	} catch (error) {
		console.error('Error fetching races:', error);
	}
};