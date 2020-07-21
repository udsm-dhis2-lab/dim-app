import { DIMReport } from '../models/report.model';

export function getPieConfigOption(
    reports: Array<DIMReport>,
    config: Highcharts.Options,
    success: Array<DIMReport>,
    failure: Array<DIMReport>
): Highcharts.Options {
    return {
        ...config,
        title: {
            text: `Percentage of Success and Failure Data Exchange`,
        },
        subtitle: {
            text: `Data Exchange from <b>${reports[0]?.sourceSystemName}</b> to <b>${reports[0]?.destinationSystemName}</b> by date <b>${reports[0]?.sourceExchangeDate}</b>`,
        },
        series: [
            {
                data: [
                    {
                        y: success?.length,
                        name: 'success',
                        color: '#008000',
                    },
                    {
                        y: failure?.length,
                        name: 'success',
                        color: '#ff0000',
                    },
                ],
                type: 'pie',
            },
        ],
    };
}

export function getColumnConfigOption(
    reports: Array<DIMReport>,
    config: Highcharts.Options,
    success: Array<DIMReport>,
    failure: Array<DIMReport>
): Highcharts.Options {
    return {
        ...config,
        title: {
            text: `All, Success and Failure Number of Exchange Data`,
        },
        subtitle: {
            text: `Data Exchange from <b>${reports[0]?.sourceSystemName}</b> to <b>${reports[0]?.destinationSystemName}</b> by date <b>${reports[0]?.sourceExchangeDate}</b>`,
        },
        series: [
            {
                showInLegend: false,
                data: [
                    {
                        y: success?.length + failure?.length,
                        name: 'All',
                    },
                    {
                        y: success?.length,
                        name: 'Success',
                        color: '#008000',
                    },
                    {
                        y: failure?.length,
                        name: 'Failure',
                        color: '#ff0000',
                    },
                ],
                type: 'column',
            },
        ],
    };
}
