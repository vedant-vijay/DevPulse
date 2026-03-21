export const up = (pgm)=>{
    pgm.createTable('incidents',{
        id:{
            type:'uuid',
            primaryKey:true, 
            default:pgm.func('gen_random_uuid()')


        },
        endpoint_id:{
            type: 'uuid', 
            notNull: true, 
            references: 'endpoints(id)', 
            onDelete: 'CASCADE' 

        },
        status:{
            type:'boolean',
            notNull:true

        },
        started_at:{
            type:'timestampTZ',
            notNull:true

        },
        resolved_at:{
            type:'timestampTZ'
        },
        created_at:{
            type: 'timestampTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
}

export const down =(pgm)=>{
    pgm.dropTable('incidents')
}