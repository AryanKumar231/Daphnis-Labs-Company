import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Helper to create JWT
const createToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Register
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });

        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        const token = createToken(user);

        res.status(201).json({
            message: 'User registered',
            token,
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = createToken(user);

        res.status(200).json({
            message: 'Logged in',
            token,
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};




export { register, login };
