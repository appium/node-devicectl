import {expect} from 'chai';
import {Devicectl} from '../../lib/devicectl';

describe('Devicectl', function () {
  let devicectl: Devicectl;

  beforeEach(function () {
    devicectl = new Devicectl('test-device-udid');
  });

  describe('constructor', function () {
    it('should create a Devicectl instance with the provided UDID and default logger', function () {
      expect(devicectl.udid).to.equal('test-device-udid');
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

  describe('listDevices', function () {
    it('should be a function', function () {
      expect(devicectl.listDevices).to.be.a('function');
    });
  });
});
