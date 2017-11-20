var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    appellations: [{
        type: Schema.Types.ObjectId,
        ref: 'Appellation'
    }]
});

mongoose.model('Region', RegionSchema);