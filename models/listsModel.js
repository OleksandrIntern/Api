const knex= require('./knex_app')

class listKnex{
    GetFULL(){
        return knex.select().from('lists')
    }

    GetById(listId){
        return  knex.select()
                    .from('lists')
                    .where('id', listId)
    }

    DeleteAll(){
        return  knex('lists')
                    .del()
    }

    DeleteById(listId){
        return  knex('lists')
                    .where('id', listId)
                    .del()
    }

    Create(value,name){
        return     knex('lists')
                        .insert({
                            id:(value[0].max+1),
                            name: name,
                        })                
    }
   
    FindMax(){
        return knex('lists').max('id')
    }

    GetTasksById(listId,all){
        if(all){
        return  knex.select()
                    .from('tasks')
                    .where('list_id',listId)
        }
        else{
            return  knex.select()
                    .from('tasks')
                    .where(function(){ this.where('done', false).andWhere('list_id',listId)})
        }
    }
    
}

module.exports = new listKnex()