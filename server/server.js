require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')
const ExpressError = require('./utils/ExpressError.js')
const eventRoutes = require('./routes/eventRoutes.js')
const formRoutes = require('./routes/formRoutes.js')
const memberRoutes = require('./routes/memberRoutes.js')
const messageRoutes = require('./routes/messageRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const achievementRoute = require('./routes/achievementRoute.js')
const alumniRoute = require('./routes/alumniRoute.js')
const panelRoutes = require('./routes/panelRoute.js')
const authRoutes = require('./routes/authRoutes.js')
const coreRoutes = require('./routes/coreRoutes.js')
const projectRoutes = require('./routes/projectRoute.js')
const teamMembersRoutes = require('./routes/teamMembersRoute.js')
const issueRoutes=require('./routes/issueRoutes.js')
const codingProfileRoutes = require('./routes/codingProfileRoutes.js')

const app = express()
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL


// console.log(MONGO_URL,PORT)
// const allowedOrigins = ['https://nexus-svnit.tech', 'https://nexus-svnit.vercel.app', 'http://localhost:3001'];
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/health-check', (req, res) => {
    return res.send('EveryThing is Fine.')
})

cloudinary.config({
    secure: true
})

app.use('/auth', authRoutes)
app.use('/event', eventRoutes)
app.use('/forms', formRoutes)
app.use('/member', memberRoutes)
app.use('/team', teamMembersRoutes)
app.use('/messages', messageRoutes)
app.use('/api/user', userRoutes)
app.use('/api/core', coreRoutes)
app.use('/achievements', achievementRoute)
app.use('/alumni', alumniRoute)
app.use('/Panel', panelRoutes);
app.use('/projects', projectRoutes);
app.use("/issue",issueRoutes);
app.use('/coding-profiles', codingProfileRoutes);

mongoose.connect(MONGO_URL, { maxPoolSize: 10, serverSelectionTimeoutMS: 10000 })
    .then(() => {
        app.listen(PORT, (req, res) => {
            console.log('connected to db')

            console.log('listening on port', PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'page not found'))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'something went wrong' } = err
    res.status(statusCode).send(err.message)
    // next(err)
})