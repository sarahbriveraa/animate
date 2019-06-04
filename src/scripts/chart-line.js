var colors= ["#FBA22D", "#10b798", "#e16479", "#6c468e", "#0086ae", "#005198"];
var DATA_COUNT = 6;
var labels = ['Apples', 'Oranges', 'Grapes', 'Peaches', 'Strawberries', 'Pears'];

var chart = new Chart('myChart3', {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            backgroundColor: colors[0],
            borderColor: colors[0],
            data: Samples.numbers({
                count: DATA_COUNT,
                min: 0,
                max: 100
            }),
            datalabels: {
                align: 'start',
                anchor: 'start'
            }
        }, {
            backgroundColor: colors[1],
            borderColor: colors[1],
            data: Samples.numbers({
                count: DATA_COUNT,
                min: 0,
                max: 100
            })
        }, {
            backgroundColor: colors[2],
            borderColor: colors[2],
            data: Samples.numbers({
                count: DATA_COUNT,
                min: 0,
                max: 100
            }),
            datalabels: {
                align: 'end',
                anchor: 'end'
            }
        }]
    },
    options: {
        plugins: {
            datalabels: {
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                color: 'white',
                font: {
                    weight: 'bold'
                },
                formatter: Math.round
            }
        },
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
});
