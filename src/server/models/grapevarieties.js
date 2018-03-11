const Document = require('camo').Document;

const GrapeVariety = class GrapeVariety extends Document {
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

module.exports = GrapeVariety;
