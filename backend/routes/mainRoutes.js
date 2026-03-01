const express = require('express');
const router = express.Router();
const Student = require('../models/students');

router.post('/', async (req, res) =>{
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get('/', async (req, res) =>{
    try {
        const student = await Student.find();
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message : "Student Deleted"});
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
})

module.exports = router;