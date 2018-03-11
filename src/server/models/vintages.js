const Document = require('camo').Document;

const Vintage = class Vintage extends Document {
  constructor() {
    super();
    this.name = {
      type: String,
      required: true,
    };
    this.year = Number;
    this.degree = Number;
    this.startPeak = Number;
    this.endPeak = Number;
    this.temperature = Number;
    this.bottles = [Bottle];
    this.grapevarieties = [GrapeVariety];
    this.wine = [Wine];
  }
};

module.exports = Vintage;
