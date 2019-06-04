var DATA_COUNT = 6;
var labels = ['Apples', 'Oranges', 'Grapes', 'Peaches', 'Strawberries', 'Pears'];

var chart2 = new Chart('myChart2', {
	type: 'doughnut',
	data: {
		labels: labels,
		datasets: [{
			backgroundColor: ["#FBA22D", "#10b798", "#e16479", "#6c468e", "#0086ae", "#005198"],
			data: Samples.numbers({
				count: DATA_COUNT,
				min: 0,
				max: 100
			})
		}]
	},
	options: {
		layout: {
			padding: {
				left: 95,
				right: 95,
				top: 5,
				bottom: 5
			}
		},
		plugins: {
			datalabels: {
				clip: false,
				align: 'end',
				anchor: 'end',
				color: ["#FBA22D", "#10b798", "#e16479", "#6c468e", "#0086ae", "#005198"],
				font: {
					weight: 'bold'
				},
				font: function (context) {
					var w = context.chart.width;
					return {
						size: w < 512 ? 14 : 24,
						weight: 'bold'
					}
				},
				formatter: function (value, context) {
					return context.chart.data.labels[context.dataIndex];
				}
			}
		}
	}
});



