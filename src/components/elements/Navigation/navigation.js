import * as logo from "../../../assets/images/misc/ninja-icon.png";
import anime from 'animejs';
export default {
    data() {
        return {
            logo: logo,
            headerIsOpen: null,
            store: this.$store
        };
    },
    created() {
        // get for init
        this.headerIsOpen = this.store.getters._headerIsOpen();
        // then watch for changes
        this.store.watch(this.store.getters._headerIsOpen, val => {
            this.setHeader(val);
        });
    },
    methods: {
        setHeader(val) {
            this.headerIsOpen = val;
            this.store.commit('setHeader', val);
            anime({
                targets: document.querySelector('#animateme'),
                padding: this.headerIsOpen ? '15px' : '40px',
                backgroundColor: this.headerIsOpen ? '#2f2f2f' : '#596673',
                duration: 500,
                easing: 'easeInOutQuart'
            });
            anime({
                targets: document.querySelector('.left-link'),
                opacity: this.headerIsOpen ? 0 : 1,
                duration: 500,
                easing: 'easeInOutQuart'
            });
        }
    }
};
//# sourceMappingURL=navigation.js.map