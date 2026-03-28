import pool from '../db/pool.js'

export async function getOrgByUserId(userId){
    const query = "Select * from organization_members where user_id = $1"
    const res = await pool.query(query, [userId]) 

    return res.rows[0]?.org_id
}

export async function getOrgById(id){
    const query = "select * from organizations where id = $1"
    const res = await pool.query(query, [id])

    return res.rows[0]
}

export async function getRole(user_id, org_id){
    const query = "select role from organization_members where user_id = $1 and org_id = $2"
    const res = await pool.query(query, [user_id, org_id])
    return res.rows[0]
}

export async function createOrg(name, ownerId){
    const client = await pool.connect()
    try{
        await client.query('begin')
        const query1 = "insert into organizations(name, owner_id) values ($1, $2) returning id, name";

        const query2 = "insert into organization_members(org_id, user_id, role) values ($1, $2, $3) returning *"

        const res1 = await client.query(query1, [name, ownerId])

        await client.query(query2, [res1.rows[0].id, ownerId, 'owner'])

        await client.query('commit')

        return res1.rows[0]
    }catch(err){

        await client.query("rollback")
        console.log(err)
        throw err
    }
    finally{

        await client.release()
    }  
}

export async function updateOrg(id, name){
    const query = "UPDATE organizations SET name = $1 WHERE id = $2 returning id, name"
    const res = await pool.query(query, [name, id])

    return res.rows[0]
}

export async function deleteOrg(id){
    const query = "delete from organizations where id = $1"
    const res = await pool.query(query, [id])


}