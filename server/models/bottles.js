var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BottleSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    addDate: {
        type: Date,
        required: true
    },
    removeDate: {
        type: Date
    },
    size:{
        type: Schema.Types.ObjectId,
        ref: 'BottleSize'
    },
    origin: {
        type: Schema.Types.ObjectId,
        ref: 'Origin'
    },
    vintage: {
        type: Schema.Types.ObjectId,
        ref: 'Vintage'
    },
    commentary: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    shelf: {
        type: Number
    },
    line: {
        type: Number
    },
    position: {
        type: Number
    },
    front: {
        type: Boolean
    }
});

mongoose.model('Bottle', BottleSchema);
