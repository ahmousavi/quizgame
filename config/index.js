module.exports = {
    secret: process.env.AUTH_SECRET || "this-is-qok-secret-for-jwt:b",
    database_url : `mongodb://${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || "quizofkings"}`,
    port: process.env.APP_PORT || 8000,
}