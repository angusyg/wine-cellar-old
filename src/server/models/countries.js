const Region = require('./regions');
const Document = require('camo').Document;

const Country = class Country extends Document {
  constructor() {
    super();
    this.name = {
      type: String,
      unique: true,
      required: true,
    };
    this.description = String;
    this.regions = [Region];
  }
};

module.exports = Country;
