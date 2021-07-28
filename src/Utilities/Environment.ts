import process from "process"

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export function isDev() {
    console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`)
    return development
}