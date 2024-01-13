import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Rectangle } from 'recharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function BarCharts(props) {

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
    <BarChart
        width={350}
        height={300}
        data={data}
        >
        <XAxis dataKey="name" />
        <Bar dataKey="value" label={{ position: 'top' }} >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
            ))}
        </Bar>
        <Tooltip fill="#000000"/>
    </BarChart>
  );
}
