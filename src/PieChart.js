import React from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from 'recharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function PieCharts(props) {

	let data = props.data;

    let COLORS = ['rgba(0,0,0,0.2)', '#ffc107', '#0dcaf0', '#198754', '#0d6efd', '#dc3545', '#6c757d'];

    return (
        <PieChart width={350} height={350}>
			<Pie
				data={data}
				labelLine={true}
				label={true}
				innerRadius={30}
				outerRadius={100}
				fill="#8884d8"
				dataKey="value"
				startAngle={90}
				endAngle={450}
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
