const Document = require('camo').Document;

const Appellation = class Appellation extends Document {
  constructor() {
    super();
    this.name = {
      type: String,
      unique: true,
      required: true,
    };
    this.description = String;
    this.region = {
      type: Region,
      required: true,
    };
  }
};

module.exports = Appellation;
