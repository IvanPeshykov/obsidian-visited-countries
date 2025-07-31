import React, {useEffect, useRef, useState} from 'react';
import MapSvg from './MapSvg';
import VisitedCountries from './main';
import Stats from "./Stats";

interface MapProps {
	plugin: VisitedCountries;
}

const Map = ({ plugin }: MapProps) => {
	const [countries, setCountries] = useState<Set<string>>(new Set(plugin.data.visitedCountries));
	const ref = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });
	const [mapMode, setMapMode] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setSize({ width, height });
		});

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	// Update and save plugin data when countries change
	useEffect(() => {
		plugin.data = { ...plugin.data, visitedCountries: Array.from(countries) };
		plugin.savePluginData()
	}, [countries]);

	return (
		<div ref={ref} className={`countries-map`}>
				{mapMode ? <MapSvg countries={countries} setCountries={setCountries} size={size} /> : <Stats countries={countries} setCountries={setCountries}/>}
				<button onClick={() => setMapMode(prev => !prev)} className='switch-button'>{mapMode ? "To statistics view" : "To map view"}</button>
		</div>
	);
};

export default Map;
