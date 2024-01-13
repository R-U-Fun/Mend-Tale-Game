import React from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from 'recharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function PieCharts(props) {

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
        <PieChart width={350} height={350}>
			<Pie
				data={data}
				labelLine={true}
				label={true}
				innerRadius={40}
				outerRadius={100}
				fill="#8884d8"
				dataKey="value"
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Tooltip />
			<Legend />
        </PieChart>
    );
}
