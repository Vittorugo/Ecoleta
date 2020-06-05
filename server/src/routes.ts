import express from 'express';
import knex from './database/connection';

const router = express.Router();

router.get('/items', async (req,res) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item =>{
    return {
      id: item.id,
      title: item.name,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return res.json({serializedItems});
});

router.post('/points', async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longetude,
    city,
    uf,
    items
  } = req.body;

  const trx = await knex.transaction();

  const ids = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longetude,
    city,
    uf
  });

  const point_id = ids[0];

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id,
    }
  })

  await trx('point_items').insert(pointItems);

  return res.json({sucess: true});
});

export default router;