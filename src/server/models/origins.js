const Document = require('camo').Document;

const Origin = class Origin extends Document {
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

module.exports = Origin;
