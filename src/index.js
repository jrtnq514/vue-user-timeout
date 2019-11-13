

const UserTimeout = {

  plugin(Vue, options) {
    console.log('plugin installed');

    // Handle options


    // Define instance properties


    // Add directives

  }
};


// Logic to determine how to include the plugin
if (typeof exports == "object") {
  module.exports = UserTimeout
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return plugin })
} else if (window.Vue && typeof window !== 'undefined') {
  Vue.use(UserTimeout, options)
}