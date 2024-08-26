const mongoose = require('mongoose');

const spendSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('spends', spendSchema);