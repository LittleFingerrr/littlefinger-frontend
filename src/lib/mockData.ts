export interface MetricCard {
    title: string;
    value: string;
    icon: string;
}

export interface Disbursement {
    date: string;
    amount: string;
    recipients: string;
    status: 'completed' | 'pending' | 'failed';
}

export const dashboardMetrics: MetricCard[] = [
    {
        title: 'Total Vault Balance',
        value: 'NaN',
        icon: 'wallet',
    },
    {
        title: 'Next Payout Date',
        value: 'NSS',
        icon: 'clock',
    },
    {
        title: 'Active Members',
        value: 'NaN',
        icon: 'users',
    },
];

export const recentDisbursements: Disbursement[] = [
    {
        date: 'May 14 2023',
        amount: '$16,700.00',
        recipients: '38',
        status: 'completed',
    },
    {
        date: 'May 14 2023',
        amount: '$16,700.00',
        recipients: '38',
        status: 'completed',
    },
    {
        date: 'May 14 2023',
        amount: '$16,700.00',
        recipients: '38',
        status: 'completed',
    },
    {
        date: 'May 14 2023',
        amount: '$16,700.00',
        recipients: '38',
        status: 'completed',
    },
    {
        date: 'May 14 2023',
        amount: '$16,700.00',
        recipients: '38',
        status: 'completed',
    },
    {
        date: 'May 13 2023',
        amount: '$14,200.00',
        recipients: '32',
        status: 'completed',
    },
    {
        date: 'May 12 2023',
        amount: '$18,500.00',
        recipients: '45',
        status: 'completed',
    },
    {
        date: 'May 11 2023',
        amount: '$12,800.00',
        recipients: '28',
        status: 'completed',
    },
    {
        date: 'May 10 2023',
        amount: '$21,300.00',
        recipients: '52',
        status: 'completed',
    },
    {
        date: 'May 9 2023',
        amount: '$15,600.00',
        recipients: '35',
        status: 'completed',
    },
];
