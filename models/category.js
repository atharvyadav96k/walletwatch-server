const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    categoryName: {
        type: String,   
        require: true
    },
    shareable: {
        type: Boolean,
        require: true
    },
    spendIds: [  
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'spends'
        }
    ]
})

module.exports = mongoose.model('categorys', categorySchema);