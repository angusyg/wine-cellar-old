var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BottleSizeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    }
});

mongoose.model('BottleSize', BottleSizeSchema);
