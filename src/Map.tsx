import React, {useEffect, useRef, useState} from 'react';
import MapSvg from './MapSvg';
import VisitedCountries from './main';

interface MapProps {
	plugin: VisitedCountries;
}

const Map = ({ plugin }: MapProps) => {
	const [countries, setCountries] = useState<Set<string>>(new Set(plugin.data.visitedCountries));
	const ref = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

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
				<MapSvg countries={countries} setCountries={setCountries} size={size} />
		</div>
	);
};

export default Map;
