const Document = require('camo').Document;

const BottleSize = class BottleSize extends Document {
  constructor() {
    super();
    this.name = {
      type: String,
      unique: true,
      required: true,
    };
    this.description = String;
  }
};

module.exports = BottleSize;
