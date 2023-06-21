const mongoose = require('mongoose')

const Schema = mongoose.Schema

const homeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    files: {
        type: String,
        ref: 'File',
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Home', homeSchema)
