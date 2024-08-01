const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

router.post('/', async (req, res) => {
  const { name, color } = req.body;
  const group = new Group({ name, color });
  await group.save();
  res.status(201).send(group);
});

router.get('/', async (req, res) => {
  const groups = await Group.find();
  res.send(groups);
});

module.exports = router;
