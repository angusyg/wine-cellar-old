var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TypeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    color: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    }
});

mongoose.model('Type', TypeSchema);
