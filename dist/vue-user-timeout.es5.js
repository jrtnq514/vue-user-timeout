function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

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
        get: function get() {
          return userTimeout;
        },
      },
    });
  } // Logic to determine how to include the plugin

  if (
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ==
    'object'
  ) {
    module.exports = plugin;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return plugin;
    });
  } else if (window.Vue && typeof window !== 'undefined') {
    Vue.use(plugin, options);
  }
})();
