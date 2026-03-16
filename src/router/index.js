import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/components/layout/MainLayout.vue';
import HomeView from '../views/HomeView.vue';
import { textConfig } from '@/constants/textConfig';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView,
                    meta: { titleKey: 'Home_PageTitle' }
                },
                {
                    path: 'task',
                    name: 'task',
                    component: () => import('@/views/task/TaskView.vue'),
                    meta: { titleKey: 'Task_PageTitle' }
                },
                {
                    path: 'task/detail',
                    name: 'task-detail',
                    component: () => import('@/views/task/TaskDetailView.vue'),
                    meta: { titleKey: 'Task_PageTitle' } // Fallback or separate key
                },
                {
                    path: 'market',
                    name: 'market',
                    component: () => import('@/views/market/MarketView.vue'),
                    meta: { titleKey: 'Market_PageTitle' }
                },
                {
                    path: 'market/detail',
                    name: 'order-detail',
                    component: () => import('@/views/order/OrderDetailView.vue'),
                    meta: { titleKey: 'Market_PageTitle' } // Fallback
                },
                {
                    path: 'wallet',
                    name: 'wallet',
                    component: () => import('@/views/wallet/WalletView.vue'),
                    meta: { titleKey: 'Wallet_PageTitle' }
                },
                {
                    path: 'my',
                    name: 'my',
                    component: () => import('@/views/my/MyView.vue'),
                    meta: { titleKey: 'My_PageTitle' }
                }
            ]
        },
        {
            path: '/wallet/third-auth',
            name: 'third-party-auth',
            component: () => import('@/views/wallet/ThirdPartyAuthView.vue'),
            meta: { titleKey: 'ThirdPartyAuth_PageTitle' }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name === 'home') {
        document.title = textConfig.web_title;
    } else if (to.meta.titleKey && textConfig[to.meta.titleKey]) {
        document.title = `${textConfig[to.meta.titleKey]} - ${textConfig.web_title}`;
    } else {
        document.title = textConfig.web_title;
    }
    next();
});

export default router;
