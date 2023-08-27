const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
