import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Legend, Tooltip } from 'recharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sound, { LoadedSound, LoadingSound } from './Sound';

export default function RadarCharts(props) {

	let data = props.data;

    return (
      <><LoadedSound/>
            <RadarChart width={300} height={400} outerRadius="70%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar name="Aaroophan" dataKey="value" fill="#0d6efd" fillOpacity={0.7} />
                <Legend />
			    <Tooltip />
            </RadarChart>
      </>
    );
  }
