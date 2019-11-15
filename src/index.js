const userTimeout = require('./lib/userTimeout');

(function() {
  /**
   * Install plugin
   * @param Vue
   * @param options
   */
  function plugin(Vue, axios) {
    if (plugin.installed) {
      return;
    }
    plugin.installed = true;

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
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return plugin;
    });
  } else if (window.Vue && typeof window !== 'undefined') {
    Vue.use(plugin, options);
  }
})();
