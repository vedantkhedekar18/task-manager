const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
    {
        company:{
            type:String,
            required :[true,'Provide a valid comapany name'],
            maxlength:50,
        },
        position:{
            type:String,
            required :[true,'Provide a valid position'],
            macxlenght:100,
        },
        status:{
            type:String,
            enum:['interview','declined','pending'],
            default:'pending',
        },
        createdBy:{
            type:mongoose.Types.ObjectId,
            ref:'user',
            required:[true,'please provide user'],
        },

    },{timestamps:true}
)

module.exports = mongoose.model('Job',JobSchema)
