export const up = (pgm)=>{
    pgm.alterColumn('incidents', 'status', { type: 'varchar(50)' })
}


export const down = (pgm)=>{
    pgm.alterColumn('incidents', 'status', { type: 'boolean' })
}
