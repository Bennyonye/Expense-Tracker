import { financialIcons, trendIcons } from '../utils/Icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: financialIcons.dashboard, // Access icon from financialIcons
        link: '/dashboard',
    },
    {
        id: 2,
        title: "View Transactions",
        icon: financialIcons.transactions, // Access icon from financialIcons
        link: "/transactions",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trendIcons.trendingUp, // Access icon from trendIcons
        link: "/incomes",
    },
    {
        id: 4,
        title: "Expenses",
        icon: financialIcons.expenses, // Access icon from financialIcons
        link: "/expenses",
    },
];
