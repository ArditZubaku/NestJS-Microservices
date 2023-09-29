import { ping } from 'tcp-ping';

describe('Health', () => {
  test('Reservation', async () => {
    const res = await fetch('http://reservations:3021');
    expect(res.ok).toBeTruthy();
  });
  test('Auth', async () => {
    const res = await fetch('http://auth:3022');
    expect(res.ok).toBeTruthy();
  });

  // When calling done, we will signify that the test was successful
  test('Payments', (done) => {
    ping(
      {
        address: 'payments',
        port: 3024,
      },
      (error) => {
        if (error) fail();
        done();
      },
    );
  });

  test('Notifications', (done) => {
    ping(
      {
        address: 'notifications',
        port: 3025,
      },
      (error) => {
        if (error) fail();
        done();
      },
    );
  });
});
