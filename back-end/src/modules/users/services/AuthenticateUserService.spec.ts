import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashprovider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to autehticate', async () => {
    const user = await createUserService.execute({
      name: 'Jom Due',
      email: 'jomdue@spms.min-saude.pt',
      password: '123456',
    });

    const response = await authenticateService.execute({
      email: 'jomdue@spms.min-saude.pt',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to autehticate with non existing user', async () => {
    await expect(
      authenticateService.execute({
        email: 'testeErrado@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autehticate with non wrong password', async () => {
    await createUserService.execute({
      name: 'Jom Due',
      email: 'jomdue@spms.min-saude.pt',
      password: '123456',
    });

    await expect(
      authenticateService.execute({
        email: 'jomdue@spms.min-saude.pt',
        password: 'senha Errada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
