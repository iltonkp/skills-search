import { Request, Response } from 'express';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'CreateUser' });
  }
}

export default UsersController;
