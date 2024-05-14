import express from 'express'
import connectDB from './utilities/connectDB.js'
import userRoutes from './routes/user.js'
import authenticationRoutes from './routes/authentication.js'
import Follower_Routes from './routes/Follower.js'
import Following_Routes from './routes/Following.js'
import Subgreddit_Routes from './routes/subgreddiits.js'

const app = express()
app.use(express.json()) 

app.use('/api/users', userRoutes)
app.use('/api/authentication', authenticationRoutes)
app.use('/api/followers', Follower_Routes)
app.use('/api/following', Following_Routes)
app.use('/api/subgreddiit', Subgreddit_Routes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 6969

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    
connectDB();
