const Document = require('camo').Document;

const Classification = class Classification extends Document {
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

module.exports = Classification;
