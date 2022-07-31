const express = require('express')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const app = express()
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const indexRouter = require('./routes/index')
const patientRouter = require('./routes/patients')
const adminRouter = require('./routes/admins')

app.use(express.json({ limit: '10kb' }))
app.use(express.static('public'))

app.use(mongoSanitize())  //Data sanitization against NoSQL Query Injections
app.use(xss()) //Data sanitization against XSS
app.use(hpp(/*whitelist: [array of attributes we allow to repeat in the URL]*/)) //Prevent Http Parameter pollution

//ROUTES
app.use('/', indexRouter)
app.use('/admins', adminRouter)
app.use('/patients', patientRouter)


/*unhandled routes get sent this response. Insert all the other routes above this*/
app.all('*', (req, res, next) => {
    next(new AppError(`cannot find ${req.originalUrl} on this server`, 404))
})

/*Error handling middleware*/
app.use(globalErrorHandler)
module.exports = app
