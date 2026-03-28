import pool from "../db/pool.js"

export async function createIncident(endpointId){
    const query = "INSERT INTO incidents(endpoint_id, status, started_at) VALUES($1, $2, NOW()) returning *"
    const res = await pool.query(query, [endpointId, "open"])
    return res.rows[0]

}

export async function getRecentFailures(endpointId){

    const query = "select * from ping_results where endpoint_id = $1 and is_success = false order by checked_at DESC limit 3"
    const res = await pool.query(query, [endpointId])

    return res.rows
}