import express from "express";
import cors from 'cors'


const app = express()

app.use(cors())

const server = app.listen(9100, () => {
    console.log("Server is up and running http://localhost:9100");
    
})


process.on('unhandledRejection', (err) => {
    console.log("UNHANDLED SERVER ERROR", err);
    server.close(process.exit(1))
})