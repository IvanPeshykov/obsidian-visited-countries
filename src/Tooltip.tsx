import React from 'react';

interface TooltipProps {
	visible: boolean;
	x: number;
	y: number;
	text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, x, y, text }) => {
	if (!visible) return null;

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				background: '#222',
				color: '#fff',
				padding: '8px 15px',
				borderRadius: 4,
				pointerEvents: 'none',
				zIndex: 1000,
				fontSize: 13,
				whiteSpace: 'nowrap',
			}}
		>
			{text}
		</div>
	);
};

export default Tooltip;
