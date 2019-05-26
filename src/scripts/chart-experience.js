 Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
  color: '#000000',
  font: {
    size: 20}
});

var canvas = document.getElementById("myChart");
var myChart = new Chart(canvas, {
  type: 'doughnut',
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
        '#0078E0'
      ]
    }]
  },
  options: {
    legend: {
      display: false,
      position: 'bottom'
    },
    layout: {
      padding: {
        left: 50,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    title: {
      display: false,
      text: 'Code Experience'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    maintainAspectRatio: false,
  }
});