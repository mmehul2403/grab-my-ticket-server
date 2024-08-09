const mongoose = require("mongoose");

const SeatSchemaMongo = new mongoose.Schema({
  row: {
    type: String,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
});

module.exports = SeatSchemaMongo;
