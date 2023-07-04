import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import CategorySelect from './components/CategorySelect';
import YearSelect from './components/YearSelect';
import RaceSelect from './components/RaceSelect';
import CriteriaSelect from './components/CriteriaSelect';
import ResultTable from './components/ResultTable';
import DriverSelect from './components/DriverSelect';
import TeamSelect from './components/TeamSelect';
import CollapsibleTable from './components/CollapsibleTable';
import DriverNameSelect from './components/DriverNameSelect';
import DriverInputSelect from './components/DriverInputSelect';
import DriverNameText from './components/DriverNameText';
import YearlySelect from './components/YearlySelect';
import TeamNameSelect from './components/TeamNameSelect';
import GPPlaceSelect from './components/GPPlaceSelect';

function App() {
	const [category, setCategory] = React.useState('');
	const handleSetCategory = (newValue: string) => {
		setCategory(newValue);
		setYear('');
		setCriteria('')
		setRace('')
		setDriver('')
		setTeam('')
		setSort('')
		setPlace('')
	};

	const [year, setYear] = React.useState('');
	const handleSetYear = (newYear: string) => {
		setYear(newYear);
		setCriteria('')
		setRace('')
		setDriver('')
		setTeam('')
	};

	const [criteria, setCriteria] = React.useState('');
	const handleSetCriteria = (newValue: string) => {
		setCriteria(newValue);
		setRace('')
		setDriver('')
		setTeam('')
		setSort('')
	};

	const [race, setRace] = React.useState('');
	const handleSetRace = (newValue: string) => {
		setRace(newValue);
		setDriver('')
		setTeam('')
		setYearly('')
	};
	
	const [driver, setDriver] = React.useState('');
	const handleSetDriver = (newValue: string) => {
		setDriver(newValue);
		setRace('')
		setTeam('')
		setYearly('')
	};

	const [team, setTeam] = React.useState('');
	const handleSetTeam = (newValue: string) => {
		setTeam(newValue);
		setDriver('')
		setRace('')
		setYearly('')
	};

	const [sort, setSort] = React.useState('');
	const handleSetSort = (newValue: string) => {
		setSort(newValue);
	};

	const [columns, setColumns] = useState<any>([]);
	const [rows, setRows] = useState<any>([]);
	const handleSetColumns = (newValue : any) => {
		setColumns(newValue);
	};
	const handleSetRows = (newValue: any) => {
		setRows(newValue);
	};

	const [teamPtsRows, setTeamPtsRows] = useState<any>([]);
	const handleSetTeamPtsRows = (newValue : any) => {
		setTeamPtsRows(newValue);
	};

	const [oneTarget, setOneTarget] = useState<any>({});
	const handleSetOneTarget = (newValue : any) => {
		setOneTarget(newValue);
	};

	const [yearly, setYearly] = useState('');
	const handleSetYearly = (newValue : any) => {
		setYearly(newValue);
	};

	const [place, setPlace] = React.useState('');
	const handleSetPlace = (newValue: string) => {
		setPlace(newValue);
		setYearly('')
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1> F1 Results App</h1>
				<p>
					An app to show F1 race results.
					<br></br>
					The data was last updated on June 28, 2023.
				</p>

			</header>
				
			<CategorySelect setValue={handleSetCategory} value={category} />
			{category === 'year' ? <YearSelect setValue={handleSetYear} value={year} /> : <></>}
			{category === 'year' && year != '' ?
				<CriteriaSelect setValue={handleSetCriteria} value={criteria} setSort={handleSetSort} /> : <></>}
			{category === 'year' && year != '' && criteria === 'Races' ?
				<RaceSelect key={sort}
					setValue={handleSetRace} value={race} year={year}
					setColumns={handleSetColumns} columns={columns}
					setRows={handleSetRows} rows={rows} sort={sort}
					setOneTarget={handleSetOneTarget} /> : <></>}
			{category === 'year' && year != '' && criteria === 'Drivers' ?
				<DriverSelect key={sort}
					setValue={handleSetDriver} value={driver} year={year}
					setColumns={handleSetColumns} columns={columns}
					setRows={handleSetRows} rows={rows} sort={sort}
					setOneTarget={handleSetOneTarget} /> : <></>}
			{category === 'year' && year != '' && criteria === 'Teams' ?
				<TeamSelect
					setValue={handleSetTeam} value={team} year={year}
					setColumns={handleSetColumns} columns={columns}
					setRows={handleSetRows} rows={rows}
					setOneTarget={handleSetOneTarget}
					setTeamPtsRows={handleSetTeamPtsRows} teamPtsRows={teamPtsRows} 
				/> : <></>}
			{category === 'year' && year != '' && criteria === 'Races' && race != '' ? <ResultTable columns={columns} rows={rows} oneTarget={oneTarget} /> : <></>}
			{category === 'year' && year != '' && criteria === 'Drivers' && driver != '' ? <ResultTable columns={columns} rows={rows} oneTarget={oneTarget}/> : <></>}
			{category === 'year' && year != '' && criteria === 'Teams' && team == 'All' ? <ResultTable columns={columns} rows={rows} oneTarget={oneTarget}/> : <></>}
			{category === 'year' && year != '' && criteria === 'Teams' && team != '' && team != 'All' ? <CollapsibleTable rows={teamPtsRows} oneTarget={oneTarget}/> : <></>}
			
			{category === 'driver' ?
				<DriverInputSelect setValue={handleSetCriteria} value={criteria} setSort={handleSetSort} /> : <></>}
			{category === 'driver' && criteria == 'List' ?
				<DriverNameSelect key={sort}
					setValue={handleSetDriver} value={driver}
					sort={sort}
					setOneTarget={handleSetOneTarget} /> : <></>}
			{category === 'driver' && criteria == 'Text' ?
				<DriverNameText 
					setValue={handleSetDriver} value={driver} 
					setOneTarget={handleSetOneTarget} /> : <></>}
			{category === 'driver' && criteria != '' && driver != '' ?
				<YearlySelect key={criteria} category={category}
					setValue={handleSetYearly} value={yearly}
					target={driver}
					setColumns={handleSetColumns} columns={columns}
					setRows={handleSetRows} rows={rows} /> : <></>}
			{category === 'driver' && driver != '' && yearly != '' ? <ResultTable key={criteria+driver} columns={columns} rows={rows} oneTarget={oneTarget}/> : <></>}

			{category === 'team' ?
				<TeamNameSelect 
					setValue={handleSetTeam} value={team}
					setOneTarget={handleSetOneTarget} /> : <></>}
			{category === 'team' && team != '' ?
				<YearlySelect key={team} category={category}
					setValue={handleSetYearly} value={yearly}
					target={team}
					setColumns={handleSetColumns} columns={columns}
					setRows={handleSetRows} rows={rows} /> : <></>}
			{category === 'team' && team != '' && yearly != '' ? <ResultTable key={yearly+team} columns={columns} rows={rows} oneTarget={oneTarget}/> : <></>}

			{category === 'grandprix' ?
				<GPPlaceSelect 
					setValue={handleSetPlace} value={place}
					/> : <></>}
			{category === 'grandprix' && place != '' ?
				<YearlySelect key={criteria} category={category}
					setValue={handleSetYearly} value={yearly}
					target={place}
					setColumns={handleSetColumns} columns={columns}
					setRows={handleSetRows} rows={rows} /> : <></>}
			{category === 'grandprix' && place != '' && yearly != '' ? <ResultTable key={yearly+place} columns={columns} rows={rows} oneTarget={oneTarget}/> : <></>}


		</div>
	);
}

export default App;

// : value === 'driver' ? <ByDriver />
// : value === 'team' <ByTeam />
// : value === 'grandprix' <G}

// setValue={handleSetRace} value={race} 

// 