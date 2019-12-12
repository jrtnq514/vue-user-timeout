export default Vue => {
  return new Vue({
    data() {
      return {
        mergedOptions: null,
        timerInterval: null,
        startTime: null,
        currentTime: null,
        elapsedTime: null,
        isActive: false,
        isInitialized: false,
      };
    },
    methods: {
      init(options) {
        const defaultOptions = {
          timeout: 60000, // 10 min
          updateInterval: 500, // .5 sec
          events: ['resize', 'scroll', 'keydown', 'mousemove', 'click'],
          startOnload: false,
          destroyOnTimeout: true,
        };

        this.mergedOptions = {
          ...defaultOptions,
          ...options,
        };

        // eslint-disable-next-line no-underscore-dangle
        this._addListeners()
          .then(() => {
            this.$emit('timeout-initialized');
            // start the time
            this.isInitialized = true;
            if (this.mergedOptions.startOnload) {
              this.start();
            }
          })
          .catch(() => {
            this.$emit(
              'timeout-error',
              "init() - Couldn't initialize timeout instance."
            );
          });
      },

      start() {
        // prevent start being called while it's already running
        if (this.isActive || !this.isInitialized) {
          this.$emit('timeout-warning', 'Timeout has already been started.');
          return;
        }
        if (this.startTime === null) {
          this.startTime = Date.now();
        }
        this.isActive = true;
        this.timerInterval = setInterval(() => {
          this.currentTime = Date.now();
          this.elapsedTime = this.currentTime - this.startTime;
          if (this.elapsedTime >= this.mergedOptions.timeout) {
            // emit event
            this.$emit('timeout-completed');
            this.stop();
            if (this.mergedOptions.destroyOnTimeout) {
              this.destroy();
            }
          }
        }, this.mergedOptions.updateInterval);
        this.$emit('timeout-started');
      },

      reset() {
        if (!this.isInitialized) {
          this.$emit(
            'timeout-warning',
            "reset() - Timeout hasn't been initialized."
          );
          return;
        }
        this.stop();
        if (!this.mergedOptions.destroyOnTimeout) {
          this.start();
        }
        this.$emit('timeout-reset');
      },

      stop() {
        if (!this.isActive || !this.isInitialized) {
          this.$emit(
            'timeout-warning',
            "stop() - Timeout hasn't been initialized or hasn't been started."
          );
          return;
        }
        clearInterval(this.timerInterval);
        this.startTime = null;
        this.isActive = false;
        this.$emit('timeout-stopped');
      },

      pause() {
        if (!this.isActive || !this.isInitialized) {
          this.$emit(
            'timeout-warning',
            "pause() - Timeout hasn't been initialized or hasn't been started."
          );
          return;
        }
        clearInterval(this.timerInterval);
        this.isActive = false;
        this.$emit('timeout-paused');
      },

      destroy() {
        return new Promise((resolve, reject) => {
          if (!this.isInitialized) {
            this.$emit(
              'timeout-warning',
              "destroy() - Timeout hasn't been initialized."
            );
            reject();
          }
          try {
            if (this.isActive) {
              this.stop();
            }
            this.mergedOptions.events.forEach(evnt => {
              document.removeEventListener(evnt, this.reset);
            });
            this.mergedOptions = null;
            this.isInitialized = false;
            this.$emit('timeout-destroyed');
            resolve();
          } catch (err) {
            this.$emit(
              'timeout-error',
              "destroy() - Couldn't destroy timeout instance."
            );
            reject(err);
          }
        });
      },

      // eslint-disable-next-line no-underscore-dangle
      _addListeners() {
        return new Promise((resolve, reject) => {
          try {
            this.mergedOptions.events.forEach(evnt => {
              document.addEventListener(evnt, this.reset);
            });
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      },
    },
  });
};
