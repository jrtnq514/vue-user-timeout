import UserTimeout from '../../src/lib/userTimeout';

const Vue = require('vue/dist/vue');

let userTimeout = UserTimeout(Vue);

beforeEach(() => {
  userTimeout = UserTimeout(Vue);
});

describe('User timeout Vue instance', () => {
  test('is Vue object', () => {
    expect(userTimeout instanceof Vue).toBe(true);
  });

  describe('init()', () => {
    test('init() - merge options', () => {
      const options = {
        timeout: 6000,
        updateInterval: 1000,
        events: ['resize', 'scroll', 'keydown', 'mousemove'],
      };
      const expectedMergedOptions = {
        timeout: 6000,
        updateInterval: 1000,
        events: ['resize', 'scroll', 'keydown', 'mousemove'],
        startOnload: false,
        destroyOnTimeout: true,
      };
      userTimeout.init(options);
      expect(userTimeout.mergedOptions).toMatchObject(expectedMergedOptions);
    });

    test('init() - event emit', done => {
      userTimeout.$on('timeout-initialized', () => {
        expect(true).toBe(true);
        done();
      });
      userTimeout.init();
    });

    test('init() - autostart', done => {
      userTimeout.$on('timeout-started', () => {
        expect(userTimeout.isActive).toBe(true);
        done();
      });
      userTimeout.init({ startOnload: true });
    });
  });

  describe('start()', () => {
    beforeEach(() => {
      userTimeout.init();
    });

    test('start() - event emit', done => {
      userTimeout.$on('timeout-started', () => {
        expect(true).toBe(true);
        done();
      });
      userTimeout.start();
    });

    test('start() - duplicate starts', done => {
      userTimeout.$on('timeout-warning', msg => {
        expect(msg).toBe('Timeout has already been started.');
        done();
      });
      userTimeout.start();
      userTimeout.start();
    });
  });

  describe('reset()', () => {
    beforeEach(() => {
      userTimeout.init({ startOnload: true });
    });

    test('reset() - event emit', done => {
      userTimeout.$on('timeout-reset', () => {
        expect(true).toBe(true);
        done();
      });
      userTimeout.reset();
    });

    test('reset() - reset on event', done => {
      userTimeout.$on('timeout-reset', () => {
        expect(true).toBe(true);
        done();
      });
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', false, true);
      document.dispatchEvent(evt);
    });

    test('reset() - not initialized', done => {
      userTimeout.destroy();
      userTimeout.$on('timeout-warning', msg => {
        expect(msg).toBe("reset() - Timeout hasn't been initialized.");
        done();
      });
      userTimeout.reset();
    });
  });

  describe('stop()', () => {
    beforeEach(() => {
      userTimeout.init({ startOnload: true });
    });

    test('stop() - event emit', done => {
      userTimeout.$on('timeout-stopped', () => {
        expect(true).toBe(true);
        done();
      });
      userTimeout.stop();
    });

    test('stop() - not initialized', done => {
      userTimeout.destroy();
      userTimeout.$on('timeout-warning', msg => {
        expect(msg).toBe(
          "stop() - Timeout hasn't been initialized or hasn't been started."
        );
        done();
      });
      userTimeout.stop();
    });

    test('stop() - not active', done => {
      userTimeout.$on('timeout-warning', msg => {
        expect(msg).toBe(
          "stop() - Timeout hasn't been initialized or hasn't been started."
        );
        done();
      });
      userTimeout.stop();
      userTimeout.stop();
    });
  });

  describe('pause()', () => {
    beforeEach(() => {
      userTimeout.init({ startOnload: true });
    });

    test('pause() - event emit', done => {
      userTimeout.$on('timeout-paused', () => {
        expect(true).toBe(true);
        done();
      });
      userTimeout.pause();
    });

    test('pause() - not initialized', done => {
      userTimeout.destroy();
      userTimeout.$on('timeout-warning', msg => {
        expect(msg).toBe(
          "pause() - Timeout hasn't been initialized or hasn't been started."
        );
        done();
      });
      userTimeout.pause();
    });

    test('pause() - not active', done => {
      userTimeout.$on('timeout-warning', msg => {
        expect(msg).toBe(
          "pause() - Timeout hasn't been initialized or hasn't been started."
        );
        done();
      });
      userTimeout.pause();
      userTimeout.pause();
    });
  });

  describe('destroy()', () => {
    beforeEach(() => {
      userTimeout.init();
    });

    test('destroy() - event emit', done => {
      userTimeout.$on('timeout-destroyed', () => {
        expect(true).toBe(true);
        done();
      });
      userTimeout.destroy();
    });

    test('destroy() - not initialized', done => {
      userTimeout.destroy();
      userTimeout.$on('timeout-warning', msg => {
        expect(msg).toBe("destroy() - Timeout hasn't been initialized.");
        done();
      });
      userTimeout.destroy();
    });

    test('destroy() - values reset', done => {
      userTimeout.$on('timeout-destroyed', () => {
        expect(userTimeout.mergedOptions).toBe(null);
        expect(userTimeout.isInitialized).toBe(false);
        done();
      });
      userTimeout.destroy();
    });
  });

  // describe('Timeout complete', () => {
  //   beforeEach(() => {
  //     userTimeout.init({ timeout: 500, updateInterval: 100 });
  //   });
  //
  //   test('event emit', (done) => {
  //     userTimeout.$on('timeout-completed', () => {
  //       expect(true).toBe(true);
  //       done();
  //     });
  //     userTimeout.start();
  //
  //     userTimeout.$on('timeout-error', (msg) => {
  //       console.log(msg)
  //       expect(true).toBe(true);
  //       done();
  //     });
  //   });
  //
  // });
});
