import pool from "../db/pool.js"

export async function findUserByEmail(email){
    const query = "SELECT * FROM users WHERE email = $1"
    const res = await pool.query(query, [email])

    return res.rows[0]
}

export async function createUser(email, password_hash, role) {
    const text = "insert into users(email, password_hash, role) values ($1, $2, $3) returning*"
    const res = await pool.query(text, [email, password_hash, role])

    return res.rows[0]
}

export async function saveRefreshToken(user_id, token, expires_at){
    const text = "insert into refresh_tokens(user_id, token, expires_at) values ($1, $2, $3) returning*"
    const res = await pool.query(text, [user_id, token, expires_at])

    return res.rows[0]
}

export async function findRefreshToken(token){
    const query = 'select * from refresh_tokens where token = $1'
    const res = await pool.query(query, [token])

    return res.rows[0]

}

export async function deleteRefreshToken(token){
    const query = 'delete from refresh_tokens where token = $1'
    const res = await pool.query(query, [token])
}