import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PieChart() {
		const options = {
			animationEnabled: true,
			data: [{
				type: "pie",
                radius:  "80%", 
				dataPoints: [
					{ y: 13, label: "Direct" },
					{ y: 39, label: "Organic Search" },
					{ y: 9, label: "Paid Search" },
					{ y: 5, label: "Referral" },
					{ y: 5, label: "Referral2" },
					{ y: 24, label: "Social" }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
		);
	}