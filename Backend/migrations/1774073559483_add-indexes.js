export const up = (pgm) => {
  pgm.createIndex(
    'ping_results', 
    'endpoint_id', 
  )

  pgm.createIndex(
    'incidents',
    'endpoint_id'
  )

  pgm.createIndex(
    "endpoints",
    'org_id'
  )

  pgm.createIndex(
    'organization_members',
    "user_id"
  )

  pgm.createIndex(
    'organization_members',
    "org_id"
  )
}

export const down=(pgm)=>{
    pgm.dropIndex('ping_results',"endpoint_id")
    pgm.dropIndex('incidents',"endpoint_id")
    pgm.dropIndex("endpoints","org_id")
    pgm.dropIndex("organization_members","user_id")
    pgm.dropIndex("organization_members","org_id")

}
