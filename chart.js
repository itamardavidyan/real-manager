$(document).ready(function () {
    // --> KS
    var titleColor = 'rgb(0, 18, 63)';
    var barColor = 'rgba(48,71,159,1)';
    var barGardientColor = 'rgba(68,108,233,1)';

    // --> MH
    // var titleColor = 'rgb(51, 134, 41)';
    // var barColor = 'rgba(28,127,42,1)';
    // var barGardientColor = 'rgba(22,190,45,1)';

    // --> HTA
    // var titleColor = 'rgb(229, 56, 41)';
    // var barColor = 'rgba(167,33,33,1)';
    // var barGardientColor = 'rgba(232,33,34,1)';

    // --> MTA
    // var titleColor = 'rgb(220, 241, 11)';
    // var barColor = 'rgba(215,200,38,1)';
    // var barGardientColor = 'rgba(237,219,24,1)';


    var ctx = $("#bars")[0].getContext('2d');
    var arr_data = [4, 7, 25, 20, 70, 50]; // represent the value of bars
    let max_value = Math.max(...arr_data);
    var arr_bg = []; // 
    arr_data.forEach(function (value, i) {
        let gradient = ctx.createLinearGradient(0, 170 - value, 0, 200);
        gradient.addColorStop(0, barColor);
        gradient.addColorStop(1, barGardientColor);
        arr_bg[i] = gradient;
    });
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["איומים", "מרחק ריצה", "שער נקי", "הופעה מלאה", "בישולים", "שערים"],
            datasets: [{
                data: arr_data,
                backgroundColor: arr_bg,
                borderColor: barColor,
                borderWidth: 4
            }]
        },
        options: {
            events: [], // disable re-render 
            animation: { // add captions
                duration: 1000,
                onProgress: function() { // change to onComplete to show the captions after the animation
                    let controller = this.chart.controller;
                    let chart = controller.chart;
                    let xAxis = controller.scales['x-axis-0'];

                    let numTicks = xAxis.ticks.length;
                    let xOffsetStart = xAxis.width / numTicks;
                    let halfBarWidth = xOffsetStart / 2;
                    let yOffset = chart.height - 20;

                    let meta = myChart.getDatasetMeta(0);

                    xAxis.ticks.forEach(function (value, index) {
                        let xOffset = (xOffsetStart * index) + halfBarWidth + 10;
                        ctx.font = '20pt BlenderConsensed';
                        ctx.fillStyle = 'white';
                        ctx.textAlign="center";

                        let lines = value.split(' ');
                        for (let j=0; j < lines.length ; j++ ) {
                            ctx.fillText(lines[lines.length - j - 1], xOffset, yOffset - j*20);
                        }

                        // --> enable if you want to show the score before the bars 
                        // let height = meta.data[index]._model.y;
                        // ctx.font = '20pt BlenderConsensed';
                        // ctx.fillStyle = 'rgb(0, 18, 63)';

                        // let text = arr_data[index] + " נק'";
                        // // ctx.fillText(text, xOffset, height - 5);
                    });
                },
                onComplete: function() { // --> show the scores after the bars loaded
                    let controller = this.chart.controller;
                    let xAxis = controller.scales['x-axis-0'];

                    let numTicks = xAxis.ticks.length;
                    let xOffsetStart = xAxis.width / numTicks;
                    let halfBarWidth = xOffsetStart / 2;

                    let meta = myChart.getDatasetMeta(0);

                    arr_data.forEach(function (value, index) {
                        let xOffset = (xOffsetStart * index) + halfBarWidth + 10;
                        let height = meta.data[index]._model.y;

                        ctx.font = '25pt BlenderConsensed';
                        ctx.fillStyle = titleColor;
                        ctx.textAlign="center";

                        const text = value + " נק'";
                        ctx.fillText(text, xOffset, height - 5);
                    });
                }
            },
            legend: {
                display: false // hide the main title
            },
            responsive: true,
            tooltips: {
                enabled: false // hide tooltips
            },
            scales: {
                xAxes: [{
                    categoryPercentage: 1.0,
                    gridLines: { // hide grid lines
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false // hide ticks
                    }
                }],
                yAxes: [{
                    gridLines: { // hide grid lines
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false, // hide ticks
                        max: max_value * 2 // crate space to score text
                    },
                    type: 'logarithmic' // logarithmic scale - there is option to linear scale (deafult)
                }]
            }
        }
    });
    
});