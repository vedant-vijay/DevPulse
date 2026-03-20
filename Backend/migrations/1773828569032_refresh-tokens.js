export const up = (pgm) => {
pgm.createTable('refresh_tokens', {
    id :{
        type:'uuid',
        primaryKey:true, 
        default:pgm.func('gen_random_uuid()')
    },
    user_id: { 
        type: 'uuid', 
        notNull: true, 
        references: 'users(id)', 
        onDelete: 'CASCADE' 
    },
    token :{
        type:'varchar(512)',
        notNull:true,
        unique:true
    },
    expires_at:{
        type:"timestampTZ",
        notNull:true,
    },
    created_at: {
      type: 'timestampTZ',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
})
}

export const down = (pgm) => {
    pgm.dropTable('refresh_tokens')
}