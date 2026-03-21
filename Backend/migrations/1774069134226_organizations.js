export const up = (pgm)=>{
    pgm.createTable('organizations', {
        id:{
            type:'uuid',
            primaryKey:true,
            default:pgm.func('gen_random_uuid()')
        },
        name:{
            type:'varchar(512)',
            notNull:true,
            unique:true       
        },
        owner_id:{
            type:'uuid',
            notNull: true,
            references:'users(id)',
            onDelete:'CASCADE'
        },
        created_at:{
            type:'timestampTZ',
            notNull:true,
            default:pgm.func('current_timestamp')
        }
    })
}

export const down =(pgm)=>{
    pgm.dropTable('organizations')
}