//Bring in prisma and cookie
const prisma = require('../lib/prisma/index')
const cookieToken = require('../utils/cookieToken')

//user signup


exports.signup =  async(req, res, next ) => {
    try {
        const { name, email, password } = req.body
        if(!name || !email || !password) {
            throw new Error('Please provide all fields')
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
                
  },
})
//Send user a token
        cookieToken(user, res)
        
    } catch (error) {
        throw new Error(error)
    }
}

//login user
exports.login = async(req, res, next ) => {
    try {

        // Take info from user 
        const {email, password } = req.body

        if(!email || !password ) {
            throw new Error('Please provide email and password')
        }

        // Find user based upon email
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        // When there is no user
        if(!user)  {
            throw new Error('User not found')
        }

        //password mismatch
        if(user.password !== password)  {
            throw new Error('Password is incorrect')
        }

        //user is there and validation ok
        cookieToken(user, res)
        
    } catch (error) {
        throw new Error(error)
        
    }
}

//logout user
exports.logout = async(req, res, next ) => {
    try {
        res.clearCookie('token')
        res.status(200).json({
            success: true
        })
        
    } catch (error) {
        throw new Error(error)    
    }
}