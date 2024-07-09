import {Message} from "../models/message.model.js";
import {User} from "../models/user.model.js";

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('user', 'username userType');

        const formattedMessages = messages.map(msg => ({
            type: msg.user.userType,
            username: msg.user.username,
            userId: msg.user._id,
            message: msg.message
        }));

        // res.status(200).json(formattedMessages);
        return formattedMessages;
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id).populate('user', 'username userType');
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        const formattedMessage = {
            type: message.user.userType,
            user: message.user.username,
            message: message.message
        };

        res.status(200).json(formattedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const createMessage = async ({user, message}) => {
    try {

        const userExists = await User.findOne({ _id: user });

        const newMessage = new Message({
            user,
            message
        });

        await newMessage.save();

        const formattedMessage = {
            type: userExists.userType,
            username: userExists.username,
            userId: userExists._id,
            message: newMessage.message
        };

        return formattedMessage;
    } catch (error) {
        // res.status(500).json({message: 'Server error'});
        console.log(error);
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const findMessage = await Message.findById(req.params.id);
        if (!findMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await Message.findOneAndDelete({ _id: req.params.id });

        res.status(200).json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};