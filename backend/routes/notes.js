const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.post('/', async (req, res) => {
  const { groupId, content } = req.body;
  const note = new Note({ groupId, content });
  await note.save();
  res.status(201).send(note);
});

router.get('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const notes = await Note.find({ groupId });
  res.send(notes);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const note = await Note.findByIdAndUpdate(id, { content }, { new: true });
      res.send(note);
    } catch (error) {
      res.status(500).send({ error: 'Failed to update note' });
    }
  });

module.exports = router;
