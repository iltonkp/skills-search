import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const email_domain = email.substring(email.lastIndexOf('@') + 1);

    if (email_domain !== process.env.EMAIL_DOMAIN) {
      throw new AppError(
        `This email is invalid. You must inform an email with ${process.env.EMAIL_DOMAIN} domain`,
      );
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}
export default CreateUserService;
