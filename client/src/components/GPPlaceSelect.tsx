import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	getAllGPPlacesUrl
} from '../api';
import requestInstance from '../api/requestInstance';

export default function GPPlaceSelect(props: any) {
	const [data, setData] = useState<string[]>([]);

	useEffect(() => {
		const fetchGPPlaces = async () => {
			try {
				const response = await requestInstance.get(getAllGPPlacesUrl())
				setData(response.data.list)
			} catch (error) {
				console.error('Error fetching grandprix places:', error);
			}
		};

		fetchGPPlaces();
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		const place = event.target.value as string
		console.log(place)
		props.setValue(place);	
	};
	
	console.log("GPPlaceList: ", data)
	const list = data

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id="grandprix-place-select-label">Place</InputLabel>
			<Select
				labelId="grandprix-place-select-label"
				id="grandprix-place-select"
				value={props.value}
				label="Place"
				onChange={handleChange}
			>
				{list.map((item: string, index: number) => (
					
					<MenuItem key={index} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
