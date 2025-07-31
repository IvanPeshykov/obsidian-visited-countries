import React from 'react';

interface CircularProgressBarProps {
	progress: number; // value from 0 to 100
	size?: number;
	strokeWidth?: number;
	circleOneStroke?: string;
	circleTwoStroke?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
																	 progress,
																	 size = 120,
																	 strokeWidth = 10,
																	 circleOneStroke = '#8a8585',
																	 circleTwoStroke = '#F4A61F'
																 }) => {
	const center = size / 2;
	const radius = center - strokeWidth / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (progress / 100) * circumference;

	return (
		<svg width={size} height={size}>
			<circle
				cx={center}
				cy={center}
				r={radius}
				stroke={circleOneStroke}
				strokeWidth={strokeWidth}
				fill="none"
			/>
			<circle
				cx={center}
				cy={center}
				r={radius}
				stroke={circleTwoStroke}
				strokeWidth={strokeWidth}
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				transform={`rotate(-90 ${center} ${center})`}
			/>
			<text
				x={center}
				y={center}
				textAnchor="middle"
				dominantBaseline="central"
				fontSize="20"
				fontWeight="bold"
				color="#fff"
				fill="#fff"
			>
			</text>
		</svg>
	);
};

export default CircularProgressBar;
