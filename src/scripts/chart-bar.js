var colors= ["#FBA22D", "#10b798", "#e16479", "#6c468e", "#0086ae", "#005198"];
var DATA_COUNT = 6;
var labels = ['Apples', 'Oranges', 'Grapes', 'Peaches', 'Strawberries', 'Pears'];

Chart.helpers.merge(Chart.defaults.global, {
	aspectRatio: 4 / 3,
	tooltips: false,
	layout: {
		padding: {
			top: 25
		}
	},
	elements: {
		line: {
			fill: false
		}
	},
	plugins: {
		legend: false,
		title: false
	}
});

//construct

var chart1 = new Chart('myChart', {
	type: 'bar',
	data: {
		labels: labels,
		datasets: [{
			backgroundColor: colors[5],
			data: Samples.numbers({
				count: DATA_COUNT,
				min: 0,
				max: 50
			})
		}]
	},
	options: {
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				align: 'end',
				anchor: 'end',
				color: function (context) {
					return context.dataset.backgroundColor;
				},
				font: function (context) {
					var w = context.chart.width;
					return {
						size: w < 512 ? 12 : 14
					}
				},
				formatter: function (value, context) {
					return context.chart.data.labels[context.dataIndex];
				}
			}
		},
		scales: {
			xAxes: [{
				display: false,
				offset: true
			}],
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
});

