var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OriginSchema = new Schema({
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

mongoose.model('Origin', OriginSchema);
