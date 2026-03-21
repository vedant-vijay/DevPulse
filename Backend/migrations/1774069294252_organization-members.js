// id, org_id (FK→organizations), user_id (FK→users), 
// role, created_at

export const up = (pgm)=>{
    pgm.createTable('organization_members',{
        id:{
            type:'uuid',
            primaryKey:true, 
            default:pgm.func('gen_random_uuid()')
        },
        org_id:{
            type: 'uuid', 
            notNull: true, 
            references: 'organizations(id)', 
            onDelete: 'CASCADE' 
        },
        user_id:{
            type: 'uuid', 
            notNull: true, 
            references: 'users(id)', 
            onDelete: 'CASCADE' 
        },
        role:{
            type:'varchar(256)',
            notNull:true
        },
        created_at:{
            type: 'timestampTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
}

export const down=(pgm)=>{
    pgm.dropTable('organization_members')
}