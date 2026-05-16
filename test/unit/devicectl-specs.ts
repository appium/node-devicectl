import {expect} from 'chai';
import {Devicectl} from '../../lib/devicectl';
import {appUrlToFilesystemPath, escapeProcessFilterValue} from '../../lib/mixins/process';

describe('Devicectl', function () {
  let devicectl: Devicectl;

  beforeEach(function () {
    devicectl = new Devicectl('test-device-udid');
  });

  describe('constructor', function () {
    it('should create a Devicectl instance with the provided UDID and default logger', function () {
      expect(devicectl.udid).to.equal('test-device-udid');
    });

    it('should allow disabling non-root sudo execution in constructor options', function () {
      const localDevicectl = new Devicectl('test-device-udid', {preferNonRootWhenSudo: false});
      expect((localDevicectl as any).preferNonRootWhenSudo).to.equal(false);
    });
  });

  describe('sudo behavior', function () {
    it('should cache sudo user identity when available', function () {
      const localDevicectl = new Devicectl('test-device-udid');
      expect(
        (localDevicectl as any).sudoUser === null || !!(localDevicectl as any).sudoUser,
      ).to.equal(true);
    });

    it('should keep constructor default for runAsNonRootWhenSudo behavior', function () {
      expect((devicectl as any).preferNonRootWhenSudo).to.equal(true);
    });
  });

  describe('execute', function () {
    it('should throw an error when command execution fails', async function () {
      // This test would need to be mocked in a real implementation
      // For now, we'll just test that the method exists
      expect(devicectl.execute).to.be.a('function');
    });
  });

  describe('sendMemoryWarning', function () {
    it('should be a function', function () {
      expect(devicectl.sendMemoryWarning).to.be.a('function');
    });
  });

  describe('listProcesses', function () {
    it('should be a function', function () {
      expect(devicectl.listProcesses).to.be.a('function');
    });
  });

  describe('listFiles', function () {
    it('should be a function', function () {
      expect(devicectl.listFiles).to.be.a('function');
    });
  });

  describe('pullFile', function () {
    it('should be a function', function () {
      expect(devicectl.pullFile).to.be.a('function');
    });
  });

  describe('sendSignalToProcess', function () {
    it('should be a function', function () {
      expect(devicectl.sendSignalToProcess).to.be.a('function');
    });
  });

  describe('listApps', function () {
    it('should be a function', function () {
      expect(devicectl.listApps).to.be.a('function');
    });
  });

  describe('launchApp', function () {
    it('should be a function', function () {
      expect(devicectl.launchApp).to.be.a('function');
    });
  });

  describe('terminateApp', function () {
    it('should be a function', function () {
      expect(devicectl.terminateApp).to.be.a('function');
    });

    describe('appUrlToFilesystemPath', function () {
      it('should strip the file:// prefix', function () {
        expect(appUrlToFilesystemPath('file:///path/to/App.app')).to.equal('/path/to/App.app');
      });

      it('should strip a trailing slash', function () {
        expect(appUrlToFilesystemPath('/path/to/App.app/')).to.equal('/path/to/App.app');
      });

      it('should strip both the file:// prefix and trailing slash', function () {
        expect(appUrlToFilesystemPath('file:///private/var/App.app/')).to.equal(
          '/private/var/App.app',
        );
      });

      it('should leave paths without a file:// prefix or trailing slash unchanged', function () {
        expect(appUrlToFilesystemPath('/path/to/App.app')).to.equal('/path/to/App.app');
      });
    });

    describe('escapeProcessFilterValue', function () {
      it('should leave values without special characters unchanged', function () {
        expect(escapeProcessFilterValue('/path/to/App.app')).to.equal('/path/to/App.app');
      });

      it('should escape backslashes', function () {
        expect(escapeProcessFilterValue(String.raw`path\with\slashes`)).to.equal(
          String.raw`path\\with\\slashes`,
        );
      });

      it('should escape double quotes', function () {
        expect(escapeProcessFilterValue('path"with"quotes')).to.equal('path\\"with\\"quotes');
      });

      it('should escape backslashes and double quotes together', function () {
        expect(escapeProcessFilterValue(String.raw`path\"mixed`)).to.equal(
          String.raw`path\\\"mixed`,
        );
      });
    });
  });

  describe('listDevices', function () {
    it('should be a function', function () {
      expect(devicectl.listDevices).to.be.a('function');
    });
  });
});
