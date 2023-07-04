import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	getTeamsInOneYearUrl,
	getTeamsPtsInOneYearUrl,
	getParOfOneTeamInOneYearUrl
} from '../api';
import { ITeam, resGetALL, validTarget } from '../utils/types';
import requestInstance from '../api/requestInstance';

export default function TeamSelect(props: any) {
	const [data, setData] = useState<ITeam[]>([]);

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const response = await requestInstance.get(getTeamsInOneYearUrl(props.year))
				setData(response.data.list)
			} catch (error) {
				console.error('Error fetching races:', error);
			}
		};

		fetchTeams();
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		const team = event.target.value as string
		props.setValue(team);
		if (team == 'All') {
			fetchData(props, "All", getTeamsPtsInOneYearUrl(props.year));
		}
		else {
			fetchData(props, "One", getParOfOneTeamInOneYearUrl(team, props.year));
		}
	};
	console.log(data)
	const list = data

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id="team-select-label">Team</InputLabel>
			<Select
				labelId="team-select-label"
				id="team-select"
				value={props.value}
				label="Team"
				onChange={handleChange}
			>
				<MenuItem value={'All'}>All</MenuItem>
				
				{list.map((item: ITeam, index: number) => (
					<MenuItem key={index} value={String(item._id)}>{item.t_name}</MenuItem>
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
			props.setColumns(columns)
			props.setRows(data.list)
			props.setOneTarget({})

		}
		else if (type === 'One') {
			props.setOneTarget({ target: data.driverPts })
			props.setTeamPtsRows(data.list)
		}
	
	} catch (error) {
		console.error('Error fetching teams:', error);
	}
};