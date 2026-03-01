const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  gender: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);