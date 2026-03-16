// Mock data for C2C Market
export const getMarketList = async () => {
    return [
        { id: 101, type: 'buy', user: 'TraderAlpha', amount: '1,000 - 50,000', price: '1.00', currency: 'MP', payment_methods: ['Bank'] },
        { id: 102, type: 'sell', user: 'CryptoKing', amount: '500 - 10,000', price: '0.99', currency: 'MP', payment_methods: ['Alipay'] },
        { id: 103, type: 'buy', user: 'FastPay', amount: '100 - 5,000', price: '1.01', currency: 'MP', payment_methods: ['WeChat'] },
    ];
};

export const getOrderDetail = async (id) => {
    return {
        id: id,
        status: id === '101' ? 'pending' : 'completed', // Simple mock logic
        amount: 2000,
        price: 1.00,
        total_price: 2000,
        seller_name: 'TraderAlpha',
        seller_account: '6212 2688 **** 8888',
        seller_bank: '招商銀行',
        pay_time_limit: 900 // seconds
    };
};
