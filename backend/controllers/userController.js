const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email,phone, password ,dateofbirth} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email,phone, password: hashedPassword,dateofbirth });
    await newUser.save();

    res.status(201).json({ message: "User registered" });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
