var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VintageSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        required: true,
        min: 1700,
        max: 2500
    },
    degree: {
        type: Number,
        required: true
    },
    startPeak: {
        type: Number
    },
    endPeak: {
        type: Number
    },
    temperature: {
        type: Number
    },
    bottles: [{
        type: Schema.Types.ObjectId,
        ref: 'Bottle'
    }],
    grapevarieties: [{
        percentage: {
            type: Number
        },
        grapeveriety: {
            type: Schema.Types.ObjectId,
            ref: 'GrapeVariety'
    }}],
    wine: {
        type: Schema.Types.ObjectId,
        ref: 'Wine'
    }
});

mongoose.model('Vintage', VintageSchema);
