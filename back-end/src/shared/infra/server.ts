import express, { Request, Response } from 'express';

const app = express();

app.get('/', (request: Request, response: Response) => {
  return response.json({
    'Version-API': '0.1',
    Author: 'Ilton Karly Prazeres dos Santos',
  });
});

app.listen('3333', () => {
  console.log('servidor starded');
});
