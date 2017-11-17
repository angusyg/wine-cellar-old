var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WineSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Region'
    },
    appellation: {
        type: Schema.Types.ObjectId,
        ref: 'Appellation'
    },
    classification: {
        type: Schema.Types.ObjectId,
        ref: 'Classification'
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    producer: {
        type: String,
        trim: true
    },
    vintages: [{
        type: Schema.Types.ObjectId,
        ref: 'Vintage'
    }]
});

mongoose.model('Wine', WineSchema);
