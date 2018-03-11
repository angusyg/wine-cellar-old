const Document = require('camo').Document;

const Bottle = class Bottle extends Document {
  constructor() {
    super();
    this.name = {
      type: String,
      required: true,
    };
    this.addDate = Date;
    this.removeDate = Date;
    this.size = BottleSize;
    this.origin = Origin;
    this.vintage = Vintage;
    this.commentary = String;
    this.price = Number;
    this.shelf = Number;
    this.line = Number;
    this.position = Number;
    this.front = Boolean;
  }
};

module.exports = Bottle;
