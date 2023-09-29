import { ping } from 'tcp-ping';

describe('Health', () => {
  test('Reservation', async (): Promise<void> => {
    const res: Response = await fetch('http://reservations:3021');
    expect(res.ok).toBeTruthy();
  });
  test('Auth', async (): Promise<void> => {
    const res: Response = await fetch('http://auth:3022');
    expect(res.ok).toBeTruthy();
  });

  // When calling done, we will signify that the test was successful
  test('Payments', (done: jest.DoneCallback): void => {
    ping(
      {
        address: 'payments',
        port: 3024,
      },
      (error: Error): void => {
        if (error) fail();
        done();
      },
    );
  });

  test('Notifications', (done: jest.DoneCallback): void => {
    ping(
      {
        address: 'notifications',
        port: 3025,
      },
      (error: Error): void => {
        if (error) fail();
        done();
      },
    );
  });
});
