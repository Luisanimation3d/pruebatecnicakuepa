import {User} from "../models/user.model.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUser = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, envConfig.JWT.SECRET);
        const user = await User.findById(decoded.user.id);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    try {
        const {name, username, password, userType} = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        user = new User({name, username, password: hashedPassword, userType});
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const {name, username, password, userType} = req.body;
        const findUser = await User.findById(req.params.id);
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        const user = await User.findOneAndUpdate({ _id: req.params.id }, {name, username, password: hashedPassword, userType});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user._id
            }
        }
        const token = jwt.sign(payload, envConfig.JWT.SECRET, { expiresIn: envConfig.JWT.EXPIRES_IN });

        res.cookie('token', token);

        res.status(200).json({ token });
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const logoutUser = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.status(200).json({ message: 'Logout successful' });
}