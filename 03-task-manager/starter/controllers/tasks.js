const Task = require('../model/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('./error/custom_error')


const getAllTasks = asyncWrapper(async (req,res)=>{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
    res.status(500).json({msg: err})
})

const getTask = asyncWrapper(async (req,res,next)=>{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
           return next(createCustomError(`There doesn't exist any id by ${taskID}`,404 ))
        }
        res.status(200).json({task})
        res.status(500).json({msg: err})
    
})

const createTask = asyncWrapper(async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json(task)
    res.status(500).json({msg: err})
})

const updateTask = asyncWrapper(async (req,res) =>{
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new : true,
            runValidators: true,

        })

        if(!task){
             return next(createCustomError(`There doesn't exist any id by ${taskID}`,404 ))
        }
        res.status(200).json({task})
        res.status(500).json({msg: err})
    
})

const deleteTask = asyncWrapper(async (req,res) =>{
    console.log("DELETE CONTROLLER HIT")
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
             return next(createCustomError(`There doesn't exist any id by ${taskID}`,404 ))
        }
        res.status(200).json({task})
        res.status(500).json({msg: err.message})
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}