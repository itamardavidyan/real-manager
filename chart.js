$(document).ready(function () {
    var ctx = $("#myChart")[0].getContext('2d');
    var arr_data = [4, 7, 25, 20, 70, 50];
    var arr_bg = [];
    arr_data.forEach(function (value, i) {
        let gradient = ctx.createLinearGradient(0, 170 - value, 0, 200);
        gradient.addColorStop(0, 'rgba(48,71,159,1)');
        gradient.addColorStop(1, 'rgba(68,108,233,1)');
        arr_bg[i] = gradient;
    });

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["איומים", "מרחק ריצה", "שער נקי", "הופעה מלאה", "בישולים", "שערים"],
            datasets: [{
                data: arr_data,
                backgroundColor: arr_bg,
                borderColor: 'rgba(48,71,159,1)',
                borderWidth: 4
            }]
        },
        options: {
            // animation: {
            //     duration: 1,
            //     onComplete: function () {
            //         var controller = this.chart.controller;
            //         var chart = controller.chart;
            //         var xAxis = controller.scales['x-axis-0'];

            //         var numTicks = xAxis.ticks.length;
            //         var xOffsetStart = xAxis.width / numTicks;
            //         var halfBarWidth = (xAxis.width / (numTicks * 2));

            //         xAxis.ticks.forEach(function (value, index) {
            //             var xOffset = (xOffsetStart * index) + halfBarWidth;
            //             var yOffset = chart.height - 20;
            //             ctx.fillText(value, xOffset, yOffset);
            //         });

            //     }
            // },
            legend: {
                display: false
            },
            responsive: true,
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    // barPercentage: 1.0,
                    categoryPercentage: 1.0,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                    },
                    type: 'logarithmic'
                }]
            }
            // ticks: {display: false}
        }
    });
});