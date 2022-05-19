const router = require('express').Router()

const taskKnex = require('../models/tasksModel')

router.get(('/'),(req,res) => {
    taskKnex.GetFULL()
       .then((value)=>{
          res.json(value);
        })
})

router.get(('/:id'),(req,res) => {
  const taskId =parseInt(req.params.id);
  taskKnex.GetById(taskId)
    .then((value)=>{
        res.json(value);
    })
})


router.post(('/'),(req,res) =>{  
  taskKnex.FindMax()
    .then((value)=>{
      taskKnex.Create(value,req.body.name,req.body.date,req.body.listId)
        .then(()=>{
          res.json('Posted')
        })
    })
 
})   

router.delete(('/:id'),(req,res)=>{
  const taskId =parseInt(req.params.id);
  taskKnex.DeleteById(taskId)
      .then(()=>{
          res.json('Deleted')
      })
})

router.delete(('/'),(req,res)=>{
  taskKnex.DeleteAll()
    .then(()=>{
      res.json('All deleted')
    })
})

router.patch(('/:id'),(req,res)=>{
  const taskId =parseInt(req.params.id);
  taskKnex.Update(taskId,req.body.name,req.body.date,req.body.done,req.body.listId)
      .then(()=>{
          res.json('Updated')
      })
})




module.exports = router