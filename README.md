# vue-user-timeout
A simple plugin to help with timeouts.



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


## Methods
**init()** - Initializes the user timeout using the default options. Also adds event listeners for resetting the timeout.
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

## Options
| property | description | default | values |
|:------------|-------------|---------------|-------------------|
| **timeout** | Time in milliseconds before timeout event. | 60000ms (10 min) | `Number`<br>*Min*: must be greater than (>) `updateInterval`<br> *Max*: must be less than or equal to (<=) `Number.MAX_SAFE_INTEGER` |
| **updateInterval** | How often to check if the timeout has been exceeded in milliseconds. | 500ms | `Number`<br>*Min*: must be greater than (>) 100ms<br> *Max*: must be less than (<) `timeout`  |
| **events** | Array of events that will reset the timeout. *Events are currently listened for on `document`*. | `['resize', 'scroll', 'keydown', 'click', 'mousemove']` | `Array<String>`<br> |
| **startOnload** | When `true` the timeout will start once the plugin has been loaded. | `false` | `Boolean` |
| **destroyOnTimeout** | When `true` all listeners will be removed upon completion of the timeout event. *They can be added again using `init()`*. | `true` | `Boolean` |

## Events
| event | description |
|-----------------------|-------------|
| `timeout-initialized` | $vueUserTimeout has been initialized and is ready to use. |
| `timeout-completed` | The timeout has completed. |
| `timeout-started` | The timeout has started. |
| `timeout-stopped` | The timeout has been stopped. On start it will begin from 0.  |
| `timeout-reset` | The timeout has been stopped. On start it will begin from 0. If `destroyOnTimeout` is false it will have started the timeout. |
| `timeout-paused` | The timeout has been paused. On start it will continue where it left off. |
| `timeout-destroyed` | $vueUserTimeout listeners have been removed and options reset. |

## Caveats
You cannot call timeout methods on button click if 'click' is a reset event.

## TODO
- [ ] Listen for events. Handle only events user specifies
    * Click
    * Mouse move
    * etc
- [ ] Directive to be added to elements
- [ ] Store (Vuex) integration
- [ ] SessionStorage support
- [ ] Emit events/call a defined function that the user can extend/override
- [ ] Linting
- [ ] Tests
- [ ] Warning option/event
