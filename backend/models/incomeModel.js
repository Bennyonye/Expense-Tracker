const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 55
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 25
    },
    type: {
        type: String,
        default:"income"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    }
}, {timestamps: true});

module.exports = mongoose.model('Income', incomeSchema);