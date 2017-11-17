var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppellationSchema = new Schema({
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
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Region'
    }
});

mongoose.model('Appellation', AppellationSchema);
