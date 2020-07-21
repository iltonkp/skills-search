import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jon Due',
      email: 'jomdue@spms.min-saude.pt',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user where the email domain is not valid', async () => {
    await expect(
      createUser.execute({
        name: 'teste',
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an exist email', async () => {
    await createUser.execute({
      name: 'Jom Due',
      email: 'jomdue@spms.min-saude.pt',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Jom Due',
        email: 'jomdue@spms.min-saude.pt',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
