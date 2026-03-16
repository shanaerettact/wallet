import axios from 'axios';

// Placeholder for API base URL, typically from env
// const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

// Mock data service
export const getHomeData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 200,
                msg: 'success',
                data: {
                    balance: {
                        total: 12580.00,
                        currency: 'USDT',
                        fiatEstimate: 89520.00,
                        todayProfit: 124.50,
                        todayProfitRate: 0.008,
                        available: 8200.00
                    },
                    transactions: [
                        { id: 1, type: 'C2C Buy', desc: 'C2C 买入 USDT', time: '2023-10-24 14:20', amount: 1200.00, status: 'completed', flow: 'in' },
                        { id: 2, type: 'Transfer', desc: '转账至 张三', time: '2023-10-24 10:05', amount: 50.00, status: 'success', flow: 'out' },
                        { id: 3, type: 'Top-up', desc: '账户充值', time: '2023-10-23 18:45', amount: 5000.00, status: 'arrived', flow: 'in' }
                    ]
                }
            });
        }, 500); // Simulate network delay
    });
};
