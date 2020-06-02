import express from 'express';

const app = express();

app.get('/users', (req, res) => {
   res.json([
      'Victtor',
      'Hugo',
      'Ruth'
   ]);
});

app.listen(3333);