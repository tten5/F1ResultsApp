import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getGPInOneYearUrl, getWinnersInOneYearUrl, getParOfOneDriverUrl } from '../api';
import { IGrandPrix, resGetALL, validTarget } from '../utils/types';
import requestInstance from '../api/requestInstance';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function RaceSelect(props: any) {
	const [data, setData] = useState<IGrandPrix[]>([]);
	const [checked, setChecked] = useState(false);
	const [currentVal, setCurrentVal] = useState('');

	const handleSetChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		
		if (!checked) {
			fetchData(props, "All", getWinnersInOneYearUrl(props.year, 'true'));
		} else {
			fetchData(props, "All", getWinnersInOneYearUrl(props.year, ''));
		}

		setChecked(event.target.checked)
	}

	useEffect(() => {
		const fetchRaces = async () => {
			try {
				if (props.sort === 'place') {
					const response = await requestInstance.get(getGPInOneYearUrl(props.year, 'place'))
					setData(response.data.list)
				} 
				else {
					const response = await requestInstance.get(getGPInOneYearUrl(props.year, ''))
					setData(response.data.list)
				}
				
			} catch (error) {
				console.error('Error fetching races:', error);
			}
		};

		fetchRaces();
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		const race = event.target.value as string
		props.setValue(race);
		setCurrentVal(race)
		if (race == 'All') {
			fetchData(props, "All", getWinnersInOneYearUrl(props.year, ''));
		}
		else {
			fetchData(props, "One", getParOfOneDriverUrl(race));
		}
	};
	console.log(data)
	const list = data

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id="race-select-label">Race</InputLabel>
			<Select
				labelId="race-select-label"
				id="race-select"
				value={props.value}
				label="Race"
				onChange={handleChange}
			>
				<MenuItem value={'All'}>All</MenuItem>
				{list.map((item: IGrandPrix, index: number) => (
					<MenuItem key={index} value={String(item._id)}>{item.place}</MenuItem>
				))}
			</Select>
			{currentVal == 'All' ? <FormControlLabel control={<Checkbox onChange={handleSetChecked} />} label="Show top 3" /> : <></>}
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
		console.error('Error fetching races:', error);
	}
};