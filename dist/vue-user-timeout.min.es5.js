function _typeof(e) {
  return (_typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function(e) {
          return typeof e;
        }
      : function(e) {
          return e &&
            typeof Symbol === 'function' &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        })(e);
}
const userTimeout = require('./lib/userTimeout');

!(function() {
  function e(t, o) {
    e.installed ||
      ((e.installed = !0),
      (t.$userTimeout = userTimeout),
      Object.defineProperties(t.prototype, {
        $userTimeout: {
          get() {
            return userTimeout;
          },
        },
      }));
  }
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object'
    ? (module.exports = e)
    : typeof define === 'function' && define.amd
    ? define([], function() {
        return e;
      })
    : window.Vue && typeof window !== 'undefined' && Vue.use(e, options);
})();
