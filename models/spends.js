const mongoose = require('mongoose');

const spendSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
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
        type: String,
        required: true
    }
})

module.exports = mongoose.model('spends', spendSchema);