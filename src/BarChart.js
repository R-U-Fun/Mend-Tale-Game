import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Rectangle } from 'recharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useWindowSize from 'react-use/lib/useWindowSize';

export default function BarCharts(props) {
  let { width, height } = useWindowSize();

	let data = props.data;
    
    let COLORS = ['rgba(0,0,0,0.2)', '#ffc107', '#198754', '#0dcaf0', '#0d6efd', '#dc3545', '#6c757d'];

  return (
    <BarChart
        width={350}
        height={height-350}
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
