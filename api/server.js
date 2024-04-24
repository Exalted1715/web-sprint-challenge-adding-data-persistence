// build your server here and require it from index.js
const express =require("express")
const projectRouter = require("./project/router")
const resourceRouter = require("./resource/router")
const server=express()

server.use(express.json())



server.use('/api/project', projectRouter)
server.use('/api/resource', resourceRouter)

server.use('*', (req, res) =>{
    res.json({api: " up and running"})
})

module.exports = server