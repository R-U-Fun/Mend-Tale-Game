import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

export default function PieCharts(props) {

	let data = [
		{ name: 'Group A', value: 400 },
		{ name: 'Group B', value: 300 },
		{ name: 'Group C', value: 300 },
		{ name: 'Group D', value: 200 },
		{ name: 'Group E', value: 200 },
		{ name: 'Group F', value: 200 },
  	];


  	let COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    return (
        <PieChart width={350} height={250}>
          <Pie
            data={data}
            labelLine={true}
            label={true}
			innerRadius={40}
            outerRadius={100}
            fill="#8884d8"
			paddingAngle={1}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
    );
  }
