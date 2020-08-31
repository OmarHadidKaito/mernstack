import { app } from './src/app'
import { connect } from './src/configuration/DB/DB.mongo'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 5050
const DB_URL = process.env.DB_URL

async function main() {
    try {
        await connect(DB_URL)
        await app.listen(PORT, () => {
            console.log(`sever is running on: http://localhost:${PORT}`)
        })
    } catch (e) {

    }
}

main()