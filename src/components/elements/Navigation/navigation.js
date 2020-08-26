import * as logo from "../../../assets/images/misc/ninja-icon.png";
import anime from 'animejs';
export default {
    data() {
        return {
            route: this.$route,
            store: this.$store,
            logo,
            headerIsOpen: true,
            drawerIsOpen: null,
            routes: []
        };
    },
    mounted() {
        const { store, route } = this;
        const { getters } = store;
        // get routes from store
        this.routes = getters._getRoutes();
        // set and watch header state
        this.store.watch(getters._headerIsOpen, val => {
            this.setHeader(val);
        });
        this.setHeader(route.path !== '/', true);
        // set and watch drawer state
        this.drawerIsOpen = getters._drawerIsOpen();
        this.store.watch(getters._drawerIsOpen, val => {
            this.setDrawer(val);
        });
    },
    methods: {
        setHeader(val, instant = false) {
            this.headerIsOpen = val;
            this.store.commit('setHeader', val);
            // only animate if it's not mobile
            if (!this.store.getters._getIsMobile()) {
                anime({
                    targets: document.querySelector('#animateme'),
                    padding: val ? '40px' : '15px',
                    backgroundColor: val ? '#596673' : '#2f2f2f',
                    duration: instant ? 0 : 500,
                });
                anime({
                    targets: document.querySelector('.left-link'),
                    opacity: val ? 1 : 0,
                    duration: instant ? 0 : 250,
                });
            }
        },
        setDrawer(val) {
            this.drawerIsOpen = val;
            this.store.commit('setDrawerState', val);
        }
    }
};
//# sourceMappingURL=navigation.js.map