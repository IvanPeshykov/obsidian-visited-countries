import React from 'react';

interface CountriesListProps {
	countries: Set<string>;
	setCountries: (countries: Set<string>) => void;
}

const CountriesList: React.FC<CountriesListProps> = ({countries, setCountries}) => {
	if (countries.size === 0) {
		return <></>
	}

	return (
		<div className='countries-list'>
			<div className={'countries-list-header'}>
				<h4>Countries:</h4>
				<button onClick={() => setCountries(new Set())}>Clear</button>
			</div>

			<ul style={{listStyle: 'none', padding: 0, margin: 0}}>
				{[...countries].sort().map((country) => (
					<li
						className='countries-list-item'
						onClick={() => {
							const newCountries = new Set(countries);
							newCountries.delete(country);
							setCountries(newCountries);
						}}
						key={country}
					>
						{country}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CountriesList;
