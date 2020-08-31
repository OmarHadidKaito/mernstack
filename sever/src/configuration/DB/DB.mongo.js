import mongoose from 'mongoose'

export const connect = (DB_URL) => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    mongoose.connection.on(`created`, () => {
        console.log(`done connection`)
    })

    mongoose.connection.on(`error`, (err) => {
        console.error(`no filed :( ${err}`)
    })
    console.log(`DB has been connected:${DB_URL}`)
}


