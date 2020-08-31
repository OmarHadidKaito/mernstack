import mongoose from "mongoose"

const { Schema } = mongoose

const ExpenseSchema = Schema({
    amount: { type: Number, required: true },
    description: { type: String },
    created: { type: Date, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const Expense = mongoose.model('Expense', ExpenseSchema)