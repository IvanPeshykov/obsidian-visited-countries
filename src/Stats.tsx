import React from 'react';
import CircularProgressBar from "./components/CircularProgressBar";
import CountriesList from "./CountriesList";

interface IProps {
	countries: Set<string>;
	setCountries: (countries: Set<string>) => void;
}

const Stats = ({countries, setCountries}: IProps) => {

	const worldPercent = (countries.size / 197) * 100;

	return (
		<div className='stats'>
			<h2 className='stats-title'>Statistics</h2>
			<div className='stats-container'>
				<div className={'stats-item'}>
					<h4>{countries.size}</h4>
					<h5>Countries</h5>
				</div>

				<CircularProgressBar progress={(countries.size / 197) * 100}/>
				<div className={'stats-item'}>
					<h4>{worldPercent.toFixed(1)}%</h4>
					<h5>World</h5>
				</div>
			</div>
			<CountriesList countries={countries} setCountries={setCountries}/>
		</div>
	);
};

export default Stats;
