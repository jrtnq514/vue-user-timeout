import userTimeout from './lib/userTimeout';

const VueUserTimeout = {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options = {}) {
    console.log('VueUserTimeout Installed');
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$userTimeout = userTimeout;
    // eslint-disable-next-line no-param-reassign
    Vue.$userTimeout = userTimeout;
  },
};

// Logic to determine how to include the plugin
if (window.Vue && typeof window !== 'undefined') {
  // eslint-disable-next-line no-undef
  window.Vue.use(VueUserTimeout);
}

export default VueUserTimeout;
