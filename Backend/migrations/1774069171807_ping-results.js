export const up =(pgm)=>{
    pgm.createTable('ping_results', {
        id:{
            type:"uuid",
            primaryKey:true,
            default:pgm.func('gen_random_uuid()')
        },
        endpoint_id:{
            type:'uuid',
            notNull:true,
            references:'endpoints(id)',
            onDelete:'CASCADE'
        },
        status_code:{
            type:'integer',
            notNull:true
        },
        response_time:{
            type:'float',
            notNull:true
        },
        is_success:{
            type:'boolean',
            notNull:true,
            default:false
        },
        checked_at:{
            type: 'timestampTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),            
        }
    })
}

export const down=(pgm)=>{
    pgm.dropTable('ping_results')
}