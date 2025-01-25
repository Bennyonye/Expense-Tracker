const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date} = req.body;

    const income = new IncomeSchema({
        title,
        amount,
        date,
        category,
        description,
    });
    
    try {
        // validation
        if(!title || !amount || !category || !description || !date) {
            return res.status(400).json({msg: 'All fields are required'});
        }
        if(amount <= 0 || isNaN(amount)) {
            return res.status(400).json({msg: 'Amount must be a number and greater than 0'});
        }
        await income.save();
        res.status(200).json({msg: 'Income added successfully'});
    } catch (error) {
        res.status(500).json({msg: error.message ||'Server error'});   
    }

    console.log(income)

};

exports.getIncome = async (req, res) => {
    try {
        const income = await IncomeSchema.find().sort({createdAt: -1});
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income) =>{
        res.status(200).json({msg: 'Income deleted successfully'})
    })
    .catch((error) => {
        res.status(500).json({msg: 'Server error'});
    })
}