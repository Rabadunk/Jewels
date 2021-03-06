// Graph file for our graphs
Highcharts.setOptions({
  global: {
    useUTC: false
  }
});

Highcharts.chart('powerChart', {
  chart: {
    type: 'spline',
    backgroundColor: "white",
    animation: Highcharts.svg, // don't animate in old IE
    marginRight: 10,
    events: {
      load: function () {

        // set up the updating of the chart each second
        var series = this.series[0];
        setInterval(function () {
          var x = (new Date()).getTime(), // current time
            y = powerpoint;
          series.addPoint([x, y], true, true);
        }, 1000);
      }
    }
  },
  colorAxis: {
      lineColor: 'black',
      minorGridLineColor: 'black'
  },
  plotOptions: {
      spline: {
          color: '#61e294'
      }
  },
  title: {
    text: 'Power values over time',
    style: {
        "color": "black",
    }
  },
  xAxis: {
    type: 'datetime',
    tickPixelInterval: 150
  },
  yAxis: {
    title: {
      text: 'Power (Watts)'
    },
    plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
    }]
  },
  tooltip: {
    formatter: function () {
      return '<b>' + this.series.name + '</b><br/>' +
        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
        Highcharts.numberFormat(this.y, 2);
    }
  },
  legend: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  series: [{
    name: 'Power',
    data: (function () {
      // generate an array of random data
      var data = [],
        time = (new Date()).getTime(),
        i;

      for (i = -19; i <= 0; i += 1) {
        data.push({
          x: time + i * 1000,
          y: Math.random()
        });
      }
      return data;
    }())
  }]
});
