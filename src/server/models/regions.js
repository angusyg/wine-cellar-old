const Document = require('camo').Document;

const Region = class Region extends Document {
  constructor() {
    super();
    this.name = {
      type: String,
      unique: true,
      required: true,
    };
    this.description = String;
    this.appellations = [Appellation];
  }
};

module.exports = Region;
