
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'horizontalBar',
  responsive: 'true',
  data: {
    labels: ["SASS/Less", "JavaScript ES6", "React", "Angular 6", "BackboneJS", "NodeJS"],
    datasets: [{
      label: 'Experience',
      data: [100, 90, 80, 60, 50, 30],
      backgroundColor: [
        '#6c468e',
        '#e16479',
        '#e09535',
        '#10b798',
        '#0086ae',
        '#005198'
      ]
    }]
  },
  options: {
    legend: {
      display: false
    },
    layout: {
      padding: {
        left: 50,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

