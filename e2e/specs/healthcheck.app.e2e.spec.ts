describe('Health', () => {
  test('Reservation', async () => {
    const res = await fetch('http://reservations:3021');
    expect(res.ok).toBeTruthy();
  });
  test('Auth', async () => {
    const res = await fetch('http://auth:3022');
    expect(res.ok).toBeTruthy();
  });
  //   test('Payments', async () => {
  //     const res = await fetch('http://payments:3021');
  //     expect(res.ok).toBeTruthy();
  //   });
  //   test('Notifications', async () => {
  //     const res = await fetch('http://notifications:3021');
  //     expect(res.ok).toBeTruthy();
  //   });
});
