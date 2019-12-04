# vue-user-timeout
A simple plugin to help with timeouts.



## Getting started
Install
```
npm install --save vue-user-timeout
```
Add plugin to your entry file
```
import VueUserTimeout from 'vue-user-timeout'

Vue.use(VueUserTimeout, [options])
```

## Usage


## Methods

## Options
| property | description | default | values |
|:------------|-------------|---------------|-------------------|
| **timeout** | Time in milliseconds before timeout event. | 60000ms (10 min) | `Number`<br>*Min*: must be greater than (>) `updateInterval`<br> *Max*: must be less than or equal to (<=) `Number.MAX_SAFE_INTEGER` |
| **updateInterval** | How often to check if the timeout has been exceeded in milliseconds. | 500ms | `Number`<br>*Min*: must be greater than (>) 100ms<br> *Max*: must be less than (<) `timeout`  |
| **events** | Array of events that will reset the timeout. *Events are currently listened for on `document`*. | `['resize', 'scroll', 'keydown', 'click', 'mousemove']` | `Array<String>`<br> |
| **startOnload** | When `true` the timeout will start once the plugin has been loaded. | `false` | `Boolean` |
| **destroyOnTimeout** | When `true` all listeners will be removed upon completion of the timeout event. *They can be added again using `init()`*. | `true` | `Boolean` |

## Events

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
