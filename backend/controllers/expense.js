const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
    const { title, amount, category, note, description, date} = req.body;

    const income = ExpenseSchema({
        title,
        amount,
        category,
        note,
        description,
        date
    });

    try {
        // validation
        if(!title || !amount || !category || !note || !description || !date) {
            return res.status(400).json({msg: 'All fields are required'});
        }
        if(amount <= 0 || !amount === Number) {
            return res.status(400).json({msg: 'Amount must be a number and greater than 0'});
        }
        await income.save();
        res.status(200).json({msg: 'Expense added successfully'});
    } catch (error) {
        res.status(500).json({msg: 'Server error'});   
    }

    console.log(income)

};

exports.getExpense = async (req, res) => {
    try {
        const income = await ExpenseSchema.find().sort({createdAt: -1});
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((income) =>{
        res.status(200).json({msg: 'Expense deleted successfully'})
    })
    .catch((error) => {
        res.status(500).json({msg: 'Server error'});
    })
}