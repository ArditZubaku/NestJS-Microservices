describe('Reservations', (): void => {
  let jwt: string;
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
    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const res: Response = await fetch('http://reservations:3021/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({
        startDate: '12-12/2023',
        endDate: '12/24/2024',
        placeId: '12345',
        invoiceId: '499',
        charge: {
          amount: 5,
          card: {
            cvc: '413',
            exp_month: 12,
            exp_year: 2030,
            number: '4242 4242 4242 4242',
          },
        },
      }),
    });
    expect(res.ok).toBeTruthy();

    const reservation = await res.json();
    console.log(reservation);
  });
});
