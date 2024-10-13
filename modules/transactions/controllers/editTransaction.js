const mongoose = require("mongoose");
const validator = require("validator");


const editTransaction = async (req, res) =>{
    const usersModel = mongoose.model("users");
    const transactionsModel = mongoose.model("transactions");

    const {transaction_id, remarks, myamount} = req.body;
    if (!transaction_id) throw " Transaction id is required !";
    if(!validator.isMongoId(transaction_id.toString())) throw "Please provide a valid ID";

    const getTransaction = await transactionsModel.findOne({
        _id: transaction_id,
    });

    if(!getTransaction) throw "Transaction not found";
    
    if(getTransaction.transaction_type === "income"){
        
        const updatuser = await usersModel.updateOne(
            {
                _id: getTransaction.user_id,
            },
            {
                $inc: {
                    balance: getTransaction.amount * -1,
                },
            },{
                runValidators: true,
            }
        );
        const updatTransaction = await transactionsModel.updateOne(
            {
                _id: transaction_id,
            } ,
            {
                remarks,
                amount: myamount,
            },{
                runValidators: true,
            }
        );

        if (updatTransaction && updatuser) {
            await usersModel.updateOne(
                {
                    _id: getTransaction.user_id,
                },
                {
                    $inc: {
                        balance: myamount,
                    },
                },{
                    runValidators: true,
                }
            );
        }

    
    } else {
        const updatuser = await usersModel.updateOne(
            {
                _id: getTransaction.user_id,
            },
            {
                $inc: {
                    balance: getTransaction.amount,
                },
            },{
                runValidators: true,
            }
        );

        const updatTransaction = await transactionsModel.updateOne(
            {
                _id: transaction_id,
            } ,
            {
                remarks,
                amount: myamount,
            },{
                runValidators: true,
            }
        );

        if (updatTransaction && updatuser) {
            await usersModel.updateOne(
                {
                    _id: getTransaction.user_id ,
                },
                {
                    $inc: {
                        balance: myamount * -1,
                    },
                },{
                    runValidators: true,
                }
            );
        }


    }

    
    

    // const updatTransaction = await transactionsModel.updateOne(
    //    {
    //     _id: transaction_id,
    //    } ,
    //    {
    //     remarks,
    //     amount: myamount,
    //    },{
    //     runValidators: true,
    //    }
    // );

    // if(getTransaction.transaction_type === "income"){
    //     await usersModel.updateOne(
    //         {
    //             _id: getTransaction.user_id,
    //         },
    //         {
    //             $inc: {
    //                 balance: getTransaction.amount ,
    //             },
    //         },{
    //             runValidators: true,
    //         }
    //     );
    
    // } else {
    //     await usersModel.updateOne(
    //         {
    //             _id: getTransaction.user_id,
    //         },
    //         {
    //             $inc: {
    //                 balance: getTransaction.amount * -1,
    //             },
    //         },{
    //             runValidators: true,
    //         }
    //     );
    // }


    
    
    

    res.status(200).json({
        status:"success",
        message:"transaction edited successfully",
    });

}

module.exports = editTransaction;