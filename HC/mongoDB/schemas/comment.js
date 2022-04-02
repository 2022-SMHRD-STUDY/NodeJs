const mongoose = require('mongoose');

const { Schema } = mongoose;
const {Types:{ObjectId}} = Schema;
const commentSchema = new Schema({
    Commenter:{
        type:ObjectId,
        required: true,
        ref: 'User',
    },
    comment:{
        type: String,
        required: true,
    },
    createAt: {
        type:Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment',commentSchema);