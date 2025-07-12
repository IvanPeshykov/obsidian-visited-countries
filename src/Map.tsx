import React, { useEffect, useState } from 'react';
import MapSvg from './MapSvg';
import VisitedCountries from './main';

interface MapProps {
	plugin: VisitedCountries;
}

const Map = ({ plugin }: MapProps) => {
	const [countries, setCountries] = useState<Set<string>>(new Set(plugin.data.visitedCountries));

	useEffect(() => {
		plugin.data = { ...plugin.data, visitedCountries: Array.from(countries) };
		plugin.savePluginData()
	}, [countries]);

	return (
		<div className='countries-map'>
			<MapSvg
				countries={countries}
				setCountries={setCountries}
			/>
		</div>
	);
};

export default Map;
