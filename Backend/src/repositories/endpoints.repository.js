import pool from "../db/pool.js";

export async function createEndpoint(orgId, url, method, expectedStatus, checkInterval){
    const query = 'insert into endpoints(org_id, url, method, expected_status, check_interval) values($1, $2, $3, $4, $5) returning *'
    const res = await pool.query(query, [orgId, url, method, expectedStatus, checkInterval])

    return res.rows[0]

}

export async function getEndpointsByOrg(orgId){
    const query = 'select * from endpoints where org_id = $1'
    const res = await pool.query(query, [orgId])
    return res.rows

}

export async function getEndpointById(id){
    const query = 'select * from endpoints where id = $1'
    const res = await pool.query(query, [id])
    return res.rows[0]

}

export async function updateEndpoint(id, url, method, expectedStatus, checkInterval){
    const query = 'update endpoints set url = $1, method =$2, expected_status = $3, check_interval = $4 where id = $5 returning *'
    const res = await pool.query(query,[url,method, expectedStatus, checkInterval, id])
    return res.rows[0]
}

export async function deleteEndpoint(id){
    const query = 'delete from endpoints where id = $1'
    const res = await pool.query(query,[id])
    return "endpoint gets deleted successfully"
}