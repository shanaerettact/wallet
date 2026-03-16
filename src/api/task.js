// Mock data for Bounty Tasks
export const getTaskList = async () => {
    return [
        { id: 201, title: '註冊交易所並KYC', reward: 500, fee_rate: 0.15, status: 'open', tags: ['高額', '急'] },
        { id: 202, title: '下載 App 試玩 5 分鐘', reward: 50, fee_rate: 0.05, status: 'open', tags: ['簡單'] },
        { id: 203, title: '邀請 3 位好友', reward: 300, fee_rate: 0.10, status: 'full', tags: [] },
    ];
};

export const getTaskDetail = async (id) => {
    return {
        id: id,
        title: '註冊交易所並KYC',
        description: '使用我的連結註冊某某交易所，並完成等級一身份驗證。需上傳審核通過截圖。',
        reward: 500,
        fee_rate: 0.15,
        requirements: [
            '必須是新用戶',
            '必須完成 KYC',
            '不能使用虛擬機'
        ],
        time_limit: '24小時'
    };
};
