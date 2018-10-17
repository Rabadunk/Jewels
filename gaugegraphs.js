var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'snow',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// The voltage gauge
var chartVolt = Highcharts.chart('container-voltage', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 30,
        title: {
            text: 'Voltage'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Volts',
        data: [80],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                   '<span style="font-size:12px;color:silver">V/s</span></div>'
        },
        tooltip: {
            valueSuffix: ' V/s'
        }
    }]

}));

// The current gauge
var chartCurrent = Highcharts.chart('container-current', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 600,
        title: {
            text: 'Current'
        }
    },

    series: [{
        name: 'Milliamps',
        data: [1],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                   '<span style="font-size:12px;color:silver">mA/s</span></div>'
        },
        tooltip: {
            valueSuffix: 'mA/s'
        }
    }]

}));

// The power gauge
var chartPower = Highcharts.chart('container-power', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 10,
        title: {
            text: 'Power'
        }
    },

    series: [{
        name: 'Watts',
        data: [1],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                   '<span style="font-size:12px;color:silver">W/s</span></div>'
        },
        tooltip: {
            valueSuffix: 'W/s'
        }
    }]

}));

// Bring life to the dials
setInterval(function () {
    // Voltage
    var point,
        newVal,
        inc;

    if (chartVolt) {
        point = chartVolt.series[0].points[0];

        point.update(voltagepoint);
    }

    // Current
    if (chartCurrent) {
        point = chartCurrent.series[0].points[0];
        inc = Math.random() - 0.5;
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 5) {
            newVal = point.y - inc;
        }

        point.update(currentpoint);
    }

    // Power
    if (chartPower) {
        point = chartPower.series[0].points[0];
        inc = Math.random() - 0.5;
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 5) {
            newVal = point.y - inc;
        }

        point.update(powerpoint);
    }
}, 2000);
