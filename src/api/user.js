// Mock data for User & Wallet
export const getUserProfile = async () => {
    return {
        uid: '885421',
        username: 'MPay_User',
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        kyc_level: 2,
        security_score: 85
    };
};

export const getWalletBalance = async () => {
    return {
        available: 15420, // 154.20
        frozen: 2000,     // 20.00
        currency: 'MP',
        history: [
            { id: 1, type: 'deposit', amount: 5000, time: '2025-12-01 12:30', status: 'success' },
            { id: 2, type: 'transfer', amount: -200, time: '2025-12-02 09:15', status: 'success' },
            { id: 3, type: 'bounty_lock', amount: -2000, time: '2025-12-03 14:00', status: 'frozen' },
        ]
    };
};
