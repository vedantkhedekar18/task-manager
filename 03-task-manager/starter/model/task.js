const mongoose = require ('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type : String,
        trim : true,
        required : [true ,'Must provide a name'],
        maxlength :[20,'Name should not exceed 20 characters'], 
    },
    completed: {
        type : Boolean,
        default : false,
    },
})

module.exports = mongoose.model('Task',taskSchema)