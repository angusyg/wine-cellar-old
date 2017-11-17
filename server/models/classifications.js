var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassificationSchema = new Schema({
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

mongoose.model('Classification', ClassificationSchema);
