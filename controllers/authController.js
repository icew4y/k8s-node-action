const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Simulate a database
const users = []


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Store user
    const user = {id: Date.now(), username, password: hashedPassword }
    users.push(user)

    // Create token
    const token = createToken(user.id)

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: { id: user.id, user: user.username }
      }
    })
  } catch (error) {
    res.status(500).json({
      error: 'Signup Failed'
    })
  }
}


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find user
    const user = users.find((u) => u.username === username)
    if (!user) {
      return res.status(401).json({
        error: 'User not found!'
      })
    }

    // Check password
    const isMatch = bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid password'
      })
    }

    // Create token
    const token = createToken(user.id)
    res.status(200).json({
      status: 'success',
      token,
      data: { user: { id: user.id, username: user.username } },
  });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}


exports.protect = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized'
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      error: 'Token verification failed'
    })
  }
}
