const Resturant = require('../models/ResturantModel');
const mongoose = require('mongoose');
const fs = require('fs');
exports.getAllRecords = (req, res, next)=>{
    Resturant.find()
    .select('firstName lastName guest checkIn _id')
    .exec()
    .then(result=>{
        console.log(result) 
        const response = {
            count: result.length,
            data: result.map(result=>{
                return {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    guest: result.guest,
                    checkIn: result.checkIn,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/resturant/'+result._id
                    }
                }
            })
        }
             res.status(200).json({
                message: 'Handling GET request to /resturant',
                result: response
            });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });

}

exports.addRecord = (req, res, next)=>{
  //console.log(req.file);
  //console.log(req.body);
  //console.log(req.userData);
  console.log(req.body.firstName)
   resturant = new Resturant({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    guest: req.body.guest,
    checkIn: req.body.checkIn
  })
  resturant.save()
      .then(function(result){
        console.log(result)
        res.status(201).json({
            message: "Handling POST request to /products",
            data: {
                firstName: result.firstName,
                    lastName: result.lastName,
                    guest: result.guest,
                    checkIn: result.checkIn,
                    _id: result._id,
                _id: result._id
            }
        });
      }).catch(function(err){
        if (err) throw err;
        return res.status(500).json({
          error: err
        });
      })
}


exports.getSingleRecord = (req, res, next)=>{
  console.log(req.params.id)
  Resturant.findOne({_id: req.params.id}).select('firstName lastName guest checkIn _id')
  .exec()
  .then(result=>{
    if(result){
      console.log(result)
      return res.status(202).json({
          message: 'Handling GET request to /cms',
          result
      })
    }else{
      console.log('err');
    }
  })
  .catch(err=>{
    return res.status(402).json({
      error: "Please check your input and try again"
    })
  })
}

exports.updateRecord = async (req, res, next)=>{
  Resturant.updateOne({_id: req.params.id}, {$set: req.body})
  .exec()
  .then(result=>{
    console.log(result)
    return res.status(200).json({
      message: 'Record Updated Successfully',
      result
    })
  })
  .catch(err=>{
     return res.status(402).json({
        error: "Please check your input and try again"
      })
  })
}

exports.deleteRecord = (req, res, next)=>{
    Resturant.remove({_id: req.params.id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Record Deleted Successfully',
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
}
