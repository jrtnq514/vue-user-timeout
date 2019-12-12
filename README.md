# vue-user-timeout
#### A simple plugin to help with timeouts.

[![codecov](https://codecov.io/gh/jrtnq514/vue-user-timeout/branch/master/graph/badge.svg)](https://codecov.io/gh/jrtnq514/vue-user-timeout)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/vue-user-timeout.svg)](https://badge.fury.io/js/vue-user-timeout)

## Getting started
Install
```
npm install --save vue-user-timeout
```
Add plugin to your entry file
```javascript
import VueUserTimeout from 'vue-user-timeout'

Vue.use(VueUserTimeout, [options])
```

## Usage

Can be accessed through `this` or `Vue`
```javascript
this.$vueUserTimeout
// or
Vue.$vueUserTimeout
```

## Basic Example

Add plugin to your entry file
```javascript
import VueUserTimeout from 'vue-user-timeout'

// options are optional
Vue.use(VueUserTimeout, {
  timeout: 60000, // 10 min
  updateInterval: 500, // .5 sec
  events: ['resize', 'scroll', 'keydown', 'mousemove', 'click'],
  startOnload: false,
  destroyOnTimeout: true
})
```

Start the timeout after user authentication
```javascript
this.$vueUserTimeout.start()
```
Set a listener on the timeout-completed [event](#events) and set the callback to un-authenticate the user
```javascript
this.$vueUserTimeout.$on('timeout-completed', <callback>)
```
Make sure to remove the listener when done
```javascript
this.$vueUserTimeout.$off('timeout-completed', <callback>)
```
Optionally you could use the `$once` method
```javascript
this.$vueUserTimeout.$once('timeout-completed', <callback>)
```

## Methods
**init()** - Initializes the user timeout using the default [options](#options). Also adds event listeners for resetting the timeout. *This is automatically called when the plugin is added, but can be called manually if the instance is ever destroyed.* 
```javascript
this.$vueUserTimeout.init([options])
```
**start()** - Starts the user timeout interval.
```javascript
this.$vueUserTimeout.start()
```
**reset()** - Resets the timeout and elapsed time to zero. It will automatically start again if `destroyOnTimeout` is false.
```javascript
this.$vueUserTimeout.reset()
```
**stop()** - Stops the timeout and sets the elapsed time to zero.
```javascript
this.$vueUserTimeout.stop()
```
**pause()** - Pauses the timeout and keeps the current elapsed time.
```javascript
this.$vueUserTimeout.pause()
```
**destroy()** - Removes all event listeners and clears any options passed in on Init. `init()` maybe called again after `destroy`.
```javascript
this.$vueUserTimeout.destroy()
```

## Properties
| property | type | description |
|:-----------------|------------------|--------------------|
| **mergedOptions** | `Object` | Object containing options. User provided options override the default. |
| **startTime** | `Number` | Unix timestamp set on start. |
| **currentTime** | `Number` | Unix timestamp set at every updateInterval. |
| **elapsedTime** | `Number` | Difference between currentTime and startTime in milliseconds. |
| **isActive** | `Boolean` | `true` if the timer is currently running |
| **isInitialized** | `Boolean` | `true` if the timeout has been initialized. |

## Options
| property | description | default | values |
|:------------|-------------|---------------|-------------------|
| **timeout** | Time in milliseconds before timeout event. | 60000ms (10 min) | `Number`<br>*Min*: must be greater than (>) `updateInterval`<br> *Max*: must be less than or equal to (<=) `Number.MAX_SAFE_INTEGER` |
| **updateInterval** | How often to check if the timeout has been exceeded in milliseconds. | 500ms | `Number`<br>*Min*: must be greater than (>) 100ms<br> *Max*: must be less than (<) `timeout`  |
| **events** | Array of events that will reset the timeout. *Events are currently listened for on `document`*. | `['resize', 'scroll', 'keydown', 'click', 'mousemove']` | `Array<String>`<br> |
| **startOnload** | When `true` the timeout will start once the plugin has been loaded. | `false` | `Boolean` |
| **destroyOnTimeout** | When `true` all listeners will be removed upon completion of the timeout event. *They can be added again using `init()`*. | `true` | `Boolean` |

## Events
Use the `$on`, `$off`, or `$once` methods to set listeners 

| event | description |
|:----------------------|-------------|
| `timeout-initialized` | $vueUserTimeout has been initialized and is ready to use. |
| `timeout-completed` | The timeout has completed. |
| `timeout-started` | The timeout has started. |
| `timeout-stopped` | The timeout has been stopped. On start it will begin from 0.  |
| `timeout-reset` | The timeout has been stopped. On start it will begin from 0. If `destroyOnTimeout` is false it will have started the timeout. |
| `timeout-paused` | The timeout has been paused. On start it will continue where it left off. |
| `timeout-destroyed` | $vueUserTimeout listeners have been removed and options reset. |

## Caveats
You cannot call timeout methods on button click if 'click' is a reset event.

### Possible Features
- [ ] Ability to target specific elements to listen for events
- [ ] Directive to be added to elements
- [ ] Store (Vuex) integration
- [ ] SessionStorage support
- [ ] Warning option/event
