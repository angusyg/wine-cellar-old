const Document = require('camo').Document;

const Type = class Type extends Document {
  constructor() {
    super();
    this.name = {
      type: String,
      unique: true,
      required: true,
    };
    this.description = String;
    this.color = String;
  }
};

module.exports = Type;
