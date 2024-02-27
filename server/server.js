const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// error msg
function errorHandler(err, req, res, next) {
    res.status(500);

    console.log(err)

    res.json({ error: err.message });
}




// Connect to DB
const username = process.env.USER_NAME,
    password = process.env.PASSWORD,
    database = process.env.DB;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ixbfcur.mongodb.net/${database}?retryWrites=true&w=majority`)

// IMPORT USER MODEL

const UserModel = require('./models/Users.js')

app.get('/users', async (req, res) => {
    // const user = req.body
    // res.json(user.userName)
    const data = await UserModel.find()
    res.json(data)
})


app.post('/Register', async (req, res) => {
    const { studentName, userName, age, email, country, phone, password } = req.body
    const checkUsers = await UserModel.findOne({ userName })

    if (checkUsers) {
        return res.json({ message: "this name is exist" })
    }
    const hashpassword =  bcrypt.hashSync(password, 1)
    const newUser = new UserModel({
        studentName:studentName,
        userName: userName,
        password: hashpassword,
        phone:phone,
        email:email,
        age:age,
        country:country
        
    })
    await newUser.save();
    return res.json({ message: "account has created" })
    
})

app.post('/login', async (req, res) => {
    const { userName, password } = req.body

    const checkUsers = await UserModel.findOne({ userName })
    !checkUsers && res.json({ message: "Username is incorrect" })

    const isPasswordValid = await bcrypt.compare(password, checkUsers.password)

    !isPasswordValid && res.json({ message: " Username or password is incorrect" })

    const token = jwt.sign({ id: checkUsers._id }, process.env.SECRET)

    return res.json({token,adminId :checkUsers._id})

})

app.use(errorHandler);



app.listen(PORT, () => {
    console.log('server is working');
})