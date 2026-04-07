import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Global styles
import './style.css';
import 'vant/lib/index.css';

// Vant components
import { Button, Tabbar, TabbarItem, Icon, NavBar, Grid, GridItem, Cell, CellGroup, Popup } from 'vant';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Register Vant components
app.use(Button);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);
app.use(NavBar);
app.use(Grid);
app.use(GridItem);
app.use(Cell);
app.use(CellGroup);
app.use(Popup);

// Initialize theme store early so dark class is applied before first render
import { useThemeStore } from './stores/theme';
const themeStore = useThemeStore(pinia);
// applyTheme is called inside the store constructor, so dark class is set immediately

app.mount('#app');
