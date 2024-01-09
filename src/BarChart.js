import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function BarChart() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				indexLabel: "{y}", //Shows y value on all Data Points
				dataPoints: [
					{ y: 71, label: "Direct"  },
					{ y: 55, label: "Direct"  },
					{ y: 50, label: "Direct"  },
					{ y: 65, label: "Direct"  },
					{ y: 92, label: "Direct"  },
					{ y: 36, label: "Direct"  }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
		);
	}