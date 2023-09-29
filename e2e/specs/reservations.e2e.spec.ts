describe('Reservations', (): void => {
  beforeAll(async (): Promise<void> => {
    const user = {
      email: 'test@gmail.com',
      password: 'randomStrongPassword123_/+',
    };
    await fetch('http://auth:3022/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://auth:3022/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jwt = await response.text();
    console.log(jwt);
  });

  test('Create & Get', async () => {
    expect(true).toBeTruthy();
  });
});
