const userTimeout = require('./lib/userTimeout');

// eslint-disable-next-line func-names
(function() {
  /**
   * Install plugin
   * @param Vue
   * @param options
   */
  // eslint-disable-next-line no-unused-vars
  function plugin(Vue, options) {
    if (plugin.installed) {
      return;
    }

    plugin.installed = true;
    // eslint-disable-next-line no-param-reassign
    Vue.$userTimeout = userTimeout;

    Object.defineProperties(Vue.prototype, {
      $userTimeout: {
        get() {
          return userTimeout;
        },
      },
    });
  }

  // Logic to determine how to include the plugin
  if (typeof exports === 'object') {
    module.exports = plugin;
    // eslint-disable-next-line no-undef
  } else if (typeof define === 'function' && define.amd) {
    // eslint-disable-next-line no-undef, func-names
    define([], function() {
      return plugin;
    });
  } else if (window.Vue && typeof window !== 'undefined') {
    // eslint-disable-next-line no-undef
    Vue.use(plugin, options);
  }
})();
