var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GrapeVarietySchema = new Schema({
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

mongoose.model('GrapeVariety', GrapeVarietySchema);
