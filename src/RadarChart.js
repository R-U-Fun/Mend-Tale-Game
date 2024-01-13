import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Legend, Tooltip } from 'recharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function RadarCharts(props) {

	let data = [
		{ name: 'Happy', 	value: 120 },
		{ name: 'Sad', 		value: 98 },
		{ name: 'Angry', 	value: 86 },
		{ name: 'Fear', 	value: 99 },
		{ name: 'Disgust', 	value: 85 },
		{ name: 'Love', 	value: 65 },
  	];

  	let COLORS = ['#ffe62b', '#2b4bff', '#ff2929', '#d429ff', '#4eff33', '#ff70b1'];

    return (
            <RadarChart width={300} height={400} outerRadius="70%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar name="Aaroophan" dataKey="value" fill="#0d6efd" fillOpacity={0.7} />
                <Legend />
			    <Tooltip />
            </RadarChart>
    );
  }
