
// build your `/api/projects` router here
const projectRouter = require ('express').Router()



projectRouter.use('*', (req, res)=> {
    res.json(500).json({
        api: ' up and running'
    })
})

projectRouter.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "Something went wrong inside the project router",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = projectRouter