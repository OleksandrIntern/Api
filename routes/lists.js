const router = require('express').Router()

const listKnex = require('../models/listsModel')

router.get(('/'),(req,res) => {
    listKnex.GetFULL()
       .then((value)=>{
          res.json(value);
        })
})

router.get(('/:id'),(req,res) => {
  const listId =parseInt(req.params.id);
  listKnex.GetById(listId)
    .then((value)=>{
        res.json(value);
    })
})


router.post(('/'),(req,res) =>{  
  listKnex.FindMax()
    .then((value)=>{
      listKnex.Create(value,req.body.name,req.body.date)
        .then(()=>{
          res.json('Posted')
        })
    })
 
})   
router.delete(('/:id'),(req,res)=>{
  const listId =parseInt(req.params.id);
  listKnex.DeleteById(listId)
      .then(()=>{
          res.json('Deleted')
      })
})

router.delete(('/'),(req,res)=>{
  listKnex.DeleteAll()
    .then(()=>{
      res.json('All deleted')
    })
})

router.get(('/:id/tasks'),(req,res) => {
  const listId =parseInt(req.params.id);
    listKnex.GetTasksById(listId,req.query.all)
        .then(value =>{
            res.json(value);
        })
})

module.exports = router