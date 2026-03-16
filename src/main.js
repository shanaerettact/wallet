import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Global styles
import './style.css';
import 'vant/lib/index.css';

// Vant components (Global registration for simplicity as requested 'VANT is fastest way')
import { Button, Tabbar, TabbarItem, Icon, NavBar, Grid, GridItem, Cell, CellGroup } from 'vant';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Register generic Vant components - can also use auto-import plugin usually but keeping it explicit here
app.use(Button);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);
app.use(NavBar);
app.use(Grid);
app.use(GridItem);
app.use(Cell);
app.use(CellGroup);

app.mount('#app');
