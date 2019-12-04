const userTimeout = {
  // properties
  Vue: null,
  mergedOptions: null,
  timerInterval: null,
  startTime: null,
  currentTime: null,
  active: false,

  // methods
  init: (Vue, options) => {
    userTimeout.Vue = Vue;
    const defaultOptions = {
      timeout: 10000, // 10 min
      updateInterval: 500, // 1 sec
      events: ['resize', 'scroll', 'keydown', 'click', 'mousemove'],
      startOnload: false,
      destroyOnTimeout: true,
    };

    if (options) {
      userTimeout.mergedOptions = {
        ...defaultOptions,
        ...options,
      };
      userTimeout.active = userTimeout.mergedOptions.startOnload;
    }

    userTimeout
      .addListeners()
      .then(() => {
        // start the time
        if (userTimeout.mergedOptions.startOnload) {
          userTimeout.start();
        }
      })
      .catch(() => {
        console.log('There was an error adding event listeners');
      });
  },

  addListeners: () => {
    return new Promise((resolve, reject) => {
      try {
        userTimeout.mergedOptions.events.forEach(evnt => {
          document.addEventListener(evnt, userTimeout.reset);
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },

  start: () => {
    if (userTimeout.startTime === null) {
      userTimeout.startTime = Date.now();
    }
    userTimeout.active = true;
    userTimeout.timerInterval = setInterval(() => {
      userTimeout.currentTime = Date.now();
      const elapsedTime = userTimeout.currentTime - userTimeout.startTime;
      console.log(`tick tick ${(elapsedTime / 1000).toFixed(3)}`);
      if (elapsedTime >= userTimeout.mergedOptions.timeout) {
        // emit event
        console.log(`your time is up ${(elapsedTime / 1000).toFixed(3)}`);
        userTimeout.stop();
        if (userTimeout.mergedOptions.destroyOnTimeout) {
          userTimeout.active = false;
          userTimeout.destroy();
        }
      }
    }, userTimeout.mergedOptions.updateInterval);
  },

  reset: () => {
    console.log('reset');
    userTimeout.stop();
    if (userTimeout.active) {
      userTimeout.start();
    }
  },

  stop: () => {
    clearInterval(userTimeout.timerInterval);
    userTimeout.startTime = null;
  },

  pause: () => {
    clearInterval(userTimeout.timerInterval);
    console.log(
      `currently paused at ${(
        (userTimeout.currentTime - userTimeout.startTime) /
        1000
      ).toFixed(3)}`
    );
  },

  destroy: () => {
    return new Promise((resolve, reject) => {
      try {
        userTimeout.mergedOptions.events.forEach(evnt => {
          document.removeEventListener(evnt, userTimeout.reset);
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
};

export default userTimeout;
