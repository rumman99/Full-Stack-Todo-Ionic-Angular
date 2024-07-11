import {Schema, model} from "mongoose";

const todoSchema= new Schema({
        task: {
            type: String,
            required: [true, "Task Needed!!!"],
            index: true
        },
        status: {
            type: String,
            required: [true, "Status Needed!!!"],
            enum: ['Pending', 'InProgress', 'Completed'],
            default: 'Pending'
        },
        assignTo: {
            type: String,
            required: [true, "Assign To Needed!!!"],
        },
},
    {timestamps: true}
);


export const Todo= model('Todo', todoSchema);