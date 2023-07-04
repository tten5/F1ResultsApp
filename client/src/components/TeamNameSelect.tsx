import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	getAllDriversUrl, getAllTeamsUrl
} from '../api';
import { ITeam, resGetALL, validTarget } from '../utils/types';
import requestInstance from '../api/requestInstance';

export default function TeamNameSelect(props: any) {
	const [data, setData] = useState<ITeam[]>([]);
	const [currentVal, setCurrentVal] = useState('');

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const response = await requestInstance.get(getAllTeamsUrl())
				setData(response.data.list)
			} catch (error) {
				console.error('Error fetching teams:', error);
			}
		};

		fetchTeams();
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		const index = Number(event.target.value)
		const team = data[index]
		console.log(team, index)
		props.setValue(team._id);	// will be the team id	
		props.setOneTarget(team)

		console.log("target.value", event.target.value)
		setCurrentVal(event.target.value as string) // will take the text of correspond value
	};
	
	console.log("TeamList", data)
	const list = data

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id="team-name-select-label">Team</InputLabel>
			<Select
				labelId="team-name-select-label"
				id="team-name-select"
				value={currentVal}
				label="Team"
				onChange={handleChange}
			>
				{list.map((item: ITeam, index: number) => (
					
					<MenuItem key={index} value={index}>
						{item.t_name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
