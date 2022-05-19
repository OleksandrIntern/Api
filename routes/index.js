const express=require('express');
const router=express.Router();


const { Client } = require('pg')
const client = new Client({
  host:"localhost",
  user: "alex",
  //port: 5000,
  password: "nan",
  database:"tasks"
})


client.connect()


router.get(('/tasks/:id'),(req,res) => {
  const taskId =parseInt(req.params.id);
  client.query(`select * from tasks where id =${taskId} `, (err, resp) => {
    if(!err){

      res.json((resp.rows));
    }
    else {
      console.log(err.message)
    }
    client.end
  })
})

router.post(('/tasks'),(req,res) =>{
  client.query(`SELECT MAX (id) from tasks `,(err,resp)=> { let  id=(resp.rows[0].max)
    client.query( `insert into tasks (id, task,done) values (${ Number(id)+1},'${req.body.name}',${false})`, (err, resp) => {
      if(!err){
  
        res.json('added');
      }
      else {
        console.log(err.message)
      }
      client.end
    })
  });
})

router.delete(('/tasks'),(req,res)=>{
    client.query(`delete from tasks`,(err,resp)=>{
      if(!err){
  
        res.json('All Deleted');
      }
      else {
        console.log(err.message)
      }
      client.end
    })
})

router.delete(('/tasks/:id'),(req,res)=>{
  const taskId =parseInt(req.params.id);
  console.log(taskId)
  client.query(`delete from tasks where id =${taskId}`,(err,resp)=>{
    if(!err){
      res.json("Deleted");
    }
    else {
      console.log(err.message)
    }
    client.end
  })
})


router.patch (('/tasks/:id'),(req,res)=>{
  const taskId =parseInt(req.params.id);
  if(req.body.name){
    client.query(`Update tasks set task ='${req.body.name}' where id = ${taskId}`,(err,resp)=>{
      if(!err){
        res.json("updated");
      }
      else {
        console.log(err.message)
      }
    })
  }
  if(req.body.done){
    client.query(`Update tasks set done ='${req.body.done}' where id = ${taskId}`,(err,resp)=>{
      if(!err){
        res.json("updated");
      }
      else {
        console.log(err.message)
      }
    })
  }
})


router.get(('/dashboard'),(req,res) => {
  let ansver =[]
  let Yesterday =new Date();
  Yesterday.setHours(0,0);
  let Tomorow =new Date();
  Tomorow.setHours(23,59);
  client.query('select  count(*)  from tasks WHERE due_date BETWEEN $1 AND $2',[Yesterday,Tomorow]
  , (err, resp) => { 
    if(!err){
      ansver.push(` кількість задач на сьогодні ${resp.rows[0].count}`);
    }
    else {
      console.log(err.message)
    }
    client.end
  })

  client.query(`select lists.name, count(tasks.id) from tasks 
  right JOIN lists on lists.id = tasks.list_id 
  Where tasks.done=false
  GROUP BY lists.name 
  `
  , (err, resp) => { 
    if(!err){
      ansver.push(resp.rows);
      res.json(ansver);
    }
    else {
      console.log(err.message)
    }
    client.end
  })
  
  
})


router.get(('/collection/today'),(req,res) => {
  let Yesterday =new Date();
  Yesterday.setHours(0,0);
  let Tomorow =new Date();
  Tomorow.setHours(23,59);
  client.query('select  *  from tasks right JOIN lists on lists.id = tasks.list_id  WHERE due_date BETWEEN $1 AND $2',[Yesterday,Tomorow], (err, resp) => { 
    if(!err){
      res.json(ansver);
    }
    else {
      console.log(err.message)
    }
    client.end
  })
})


router.get(('/lists/:listId/tasks'),(req,res) => {
  const listId =parseInt(req.params.listId);
  if(req.query.all){
    client.query(`select  *  from tasks  Where tasks.list_id=${listId}`, (err, resp) => { 
      if(!err){
        res.json(resp.rows);
      }
      else {
        console.log(err.message)
      }
      client.end
    })
  }
  else{
    client.query(`select  *  from tasks  Where tasks.done=false AND  tasks.list_id=${listId}`, (err, resp) => { 
      if(!err){
        res.json(resp.rows);
      }
      else {
        console.log(err.message)
      }
      client.end
    })
  }
})


module.exports = router