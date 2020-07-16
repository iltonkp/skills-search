import express, { Request, Response } from 'express';
import routes from './routes';
import '@shared/infra/typeorm';

const app = express();

app.use(routes);

app.get('/', (request: Request, response: Response) => {
  return response.json({
    'Version-API': '0.1',
    Author: 'Ilton Karly Prazeres dos Santos',
  });
});

app.listen('3333', () => {
  console.log('servidor starded');
});
