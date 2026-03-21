export const up=(pgm)=>{
    pgm.createTable('endpoints', {
        id:{
            type:'uuid',
            primaryKey:true,
            default:pgm.func('gen_random_uuid()')
        },
        url:{
            type:'varchar(1000)',
            notNull:true
        },
        method:{
            type:'varchar(256)',
            notNull:true
        },
        org_id:{
            type:'uuid',
            notNull:true,
            references:'organizations(id)',
            onDelete:'CASCADE'

        },
        expected_status:{
            type:'integer',
            notNull:true
        },
        current_status:{
            type:'boolean',
            default:true  //true means up and vice versa
        },
        check_interval:{
            type:'integer'
        },
        created_at: {
            type: 'timestampTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }    
    })
}

export const down =(pgm)=>{
    pgm.dropTable('endpoints')
}