import rateLimit from 'express-rate-limit'

export const authLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 10,
    message : "too many requests, please try again later."

})

export const apiLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 40,
    message : "too many reuests, please try again later."
})

