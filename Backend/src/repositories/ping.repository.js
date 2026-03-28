import pool from '../db/pool.js'

export async function savePingResult(endpointId, statusCode, responseTime, isSuccess){
    const query = 'insert into ping_results(endpoint_id, status_code, response_time, is_success) values($1, $2, $3, $4) returning *'

    const res = await pool.query(query,[endpointId, statusCode, responseTime, isSuccess])

    return res.rows[0]
}