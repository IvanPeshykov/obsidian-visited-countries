import React, {useRef, useState} from 'react';
import MapSvg from "./MapSvg";

const Map = () => {

	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const start = useRef({ x: 0, y: 0 });

	const onMouseDown = (e: React.MouseEvent) => {
		setDragging(true);
		start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (!dragging) return;
		setPos({
			x: e.clientX - start.current.x,
			y: e.clientY - start.current.y,
		});
	};

	const onMouseUp = () => setDragging(false);

	return (
		<div className='countries-map'>
			<MapSvg/>
		</div>
	);
};

export default Map;
