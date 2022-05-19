const knex= require('./knex_app')

class taskKnex{
    GetFULL(){
        return knex.select().from('tasks')
    }
    GetById(taskId){
        return  knex.select()
                    .from('tasks')
                    .where('id', taskId)
    }
    DeleteAll(){
        return  knex('tasks')
                    .del()
    }
    DeleteById(taskId){
        return  knex('tasks')
                    .where('id', taskId)
                    .del()
    }
    Create(value,item,date,listId){
        return     knex('tasks')
                        .insert({
                            id:(value[0].max+1),
                            item: item,
                            due_date: date,
                            done: false,
                            list_id: listId
                        })                
    }
    Update(taskId,item,date,done,listId){
        return  knex('tasks')
                    .where('id', taskId)
                    .update({
                        item: item,
                        due_date:date,
                        done: done,
                        list_id: listId
                    })
    }
    FindMax(){
        return knex('tasks').max('id')
    }
}

module.exports = new taskKnex()