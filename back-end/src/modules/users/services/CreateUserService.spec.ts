describe('CreateUser', () => {

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

})
