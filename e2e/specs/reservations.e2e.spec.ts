describe('Reservations', (): void => {
  beforeAll(async (): Promise<void> => {
    const user: {
      email: string;
      password: string;
    } = {
      email: 'zubaku92@gmail.com',
      password: 'strongPassword123!!!',
    };
    await fetch('http://auth:30021', {
      method: 'POST',
      body: JSON.stringify({
        user,
      }),
    });
  });

  test('Create', () => {});
});
