var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CountrySchema = new Schema({
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
    regions: [{
        type: Schema.Types.ObjectId,
        ref: 'Region'
    }]
});

mongoose.model('Country', CountrySchema);
