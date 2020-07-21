/**
 *
 */
export const PieChartConfig: Highcharts.Options = {
    title: {
        text: '',
    },
    subtitle: {
        text: '',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                alignTo: 'plotEdges',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: 'black',
                },
            },
        },
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
    },
    series: [
        {
            data: [
                {
                    name: 'Success',
                    y: 0,
                    color: '#008000',
                },
                {
                    name: 'Failure',
                    y: 0,
                    color: '#ff0000',
                },
            ],
            type: 'pie',
        },
    ],
};
/**
 *
 */
export const ColumnChartConfig: Highcharts.Options = {
    title: {
        text: 'Browser market shares in January, 2013',
    },
    subtitle: {
        text: 'Browser market shares in January, 2019',
    },
    xAxis: {
        categories: ['All', 'Success', 'Failure'],
    },
    plotOptions: {
        column: {
            dataLabels: {
                enabled: true,
            },
        },
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    series: [
        {
            showInLegend: false,
            data: [
                {
                    name: 'All',
                    y: 33,
                },
                {
                    name: 'Success',
                    y: 21,
                    color: '#008000',
                },
                {
                    name: 'Failure',
                    y: 12,
                    color: '#ff0000',
                },
            ],
            type: 'column',
        },
    ],
};
