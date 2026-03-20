import {expect} from 'chai';
import {Devicectl} from '../../lib/devicectl';

describe('manual sudo execution e2e', function () {
  it('runs devicectl as original non-root user under sudo', async function () {
    if (process.env.CI ||
      process.platform !== 'darwin' ||
      !process.geteuid ||
      process.geteuid() !== 0 ||
      !process.env.SUDO_UID ||
      !process.env.SUDO_GID
    ) {
      this.skip();
      return;
    }

    const devicectl = new Devicectl('');
    const result = await devicectl.execute(['list', 'devices'], {
      noDevice: true,
      asJson: true,
    });

    expect(result.stdout).to.be.a('string');
    expect(result.stdout.length).to.be.greaterThan(0);
  });
});
