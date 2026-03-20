export const up = (pgm) => {
  pgm.createTable('users', {
    id: {
        type : 'uuid',
        primaryKey:true, 
        default:pgm.func('gen_random_uuid()')
    },
    email: { 
        type: 'varchar(1000)',
        notNull: true, 
        unique: true
    },
    password_hash : {
        type : "varchar(1000)",
        notNull : true
    },
    role : {
        type : 'varchar(256)', 
        notNull:true, default:'viewer'
    },
    created_at: {
      type: 'timestampTZ',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

export const down = (pgm) => {
    pgm.dropTable('users')
}