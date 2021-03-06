var gaugeOptions = {

	chart: {
		type: 'solidgauge',
		backgroundColor: "#0f0f11",
	},
	pane: {
		center: ['50%', '60%'],
		size: '68%',
		startAngle: -90,
		endAngle: 90,
		background: {
			backgroundColor: '#C7D7F4',
			innerRadius: '60%',
			outerRadius: '100%',
			shape: 'arc'
		}
	},

	tooltip: {
		enabled: false
	},
	xAxis: {
		visible: false
	},

	// the value axis
	yAxis: {
		stops: [
			//			[0.1, '#55BF3B'], // green
			//			[0.5, '#DDDF0D'], // yellow
			//			[0.9, '#DF5353'] // red

			[0.1, '#2075D0'],
			[0.5, '#2075D0'],
			[0.9, '#2075D0']
		],
		lineWidth: 0,
		minorTickInterval: null,
		tickPixelInterval: 400,
		tickWidth: 0,
		title: {
			y: -60
		},
		labels: {
			y: 16,
			enable: false,
		},
	},
	credits: {
		enabled: false
	},
	plotOptions: {
		solidgauge: {
			dataLabels: {
				y: 10,
				borderWidth: 0,
				useHTML: true
			}
		},
		borderWidth: 0
	},
	label: {
		enable: false
	}
};
$(function() {
	showEnergy(11.2, 11.5);
});

function showEnergy(param1, param2) {

	// 平均能效
	$('#container_energy_ave').highcharts(Highcharts.merge(gaugeOptions, {
		yAxis: {
			min: 11,
			max: 12,
			title: {
				text: param1,
				style: {
					color: '#2985F2',
					fontSize: 24
				}
			},
			labels: {
				y: 10,
				enabled: false,
			}
		},
		title: {
			text: '平均能效',
			style: {
				color: '#A0A0A0',
				fontSize: 14
			},
			align: 'center',
			x: 0,
			verticalAlign: 'bottom',
			y: -35
		},

		credits: {
			enabled: false
		},

		series: [{
			name: '',
			data: [param1],

			tooltip: {
				valueSuffix: ''
			}
		}]

	}));
	//即时能效
	$('#container_energy_imme').highcharts(Highcharts.merge(gaugeOptions, {
		yAxis: {
			min: 10.5,
			max: 13,
			title: {
				text: param2,
				style: {
					color: '#2985F2',
					fontSize: 24
				},
			},
			labels: {
				y: 16,
				enabled: false,
			}
		},
		title: {
			text: '即时能效',
			style: {
				color: '#A0A0A0',
				fontSize: 14
			},
			align: 'center',
			x: 0,
			verticalAlign: 'bottom',
			y: -35
		},
		credits: {
			enabled: false
		},

		series: [{
			name: '',
			data: [param2],
			//			dataLabels: {
			//				format: '<div style="text-align:center"><span style="font-size:25px;color:#2883EC">{y:.1f}</div>'
			//			},
			tooltip: {
				valueSuffix: ''
			}
		}]

	}));

}