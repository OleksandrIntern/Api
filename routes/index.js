const express=require('express');
const router=express.Router();
const tasks = require('./tasks') 
const lists = require('./lists') 
const knex= require('../models/knex_app')


router.use('/tasks',tasks)
router.use('/lists',lists)


let Yesterday =new Date();
Yesterday.setHours(0,0);
let Tomorow =new Date();
Tomorow.setHours(23,59);

router.get('/dashboard',(req,res) => {
    let ansver =[];
    knex.count()
        .from('tasks')
        .whereBetween('due_date',[Yesterday,Tomorow])
        .then(value =>{
            ansver.push(` кількість задач на сьогодні ${value[0].count}`);
        })
    knex.select('lists.name')
        .count()
        .from('tasks')
        .rightJoin('lists','lists.id','tasks.list_id')
        .where('done', false)
        .groupBy('lists.name') 
        .then(value =>{
            ansver.push(value);
            res.json(ansver);
        })
})
router.get(('/collection/today'),(req,res) => {
    knex.select()
        .from('tasks')
        .rightJoin('lists','lists.id','tasks.list_id')
        .whereBetween('due_date',[Yesterday,Tomorow])
        .then(value =>{
            res.json(value);
        })
})







module.exports = router