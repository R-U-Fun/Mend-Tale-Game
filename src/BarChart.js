import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Rectangle } from 'recharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function BarCharts(props) {

	let data = props.data;
    
    let COLORS = ['#ffc107', '#0d6efd', '#dc3545', '#6c757d', '#198754', '#0dcaf0'];

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
