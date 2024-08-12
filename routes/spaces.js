const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Space = require('../models/Space');

// Create space
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSpace = new Space({
      name,
      description,
      creator: req.user.id,
      members: [req.user.id],
    });
    const space = await newSpace.save();
    res.json(space);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all spaces
router.get('/', async (req, res) => {
  try {
    const spaces = await Space.find().sort({ createdAt: -1 }).populate('creator', 'username');
    res.json(spaces);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get space by ID
router.get('/:id', async (req, res) => {
  try {
    const space = await Space.findById(req.params.id).populate('creator', 'username').populate('members', 'username');
    if (!space) {
      return res.status(404).json({ msg: 'Space not found' });
    }
    res.json(space);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Space not found' });
    }
    res.status(500).send('Server error');
  }
});

// Update space
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    let space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ msg: 'Space not found' });
    }
    if (space.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    space.name = name;
    space.description = description;
    await space.save();
    res.json(space);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Space not found' });
    }
    res.status(500).send('Server error');
  }
});

// Delete space
router.delete('/:id', auth, async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ msg: 'Space not found' });
    }
    if (space.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await space.remove();
    res.json({ msg: 'Space removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Space not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
