import {OwnMessage} from "../OwnMessage/OwnMessage.jsx";
import styles from './ChatList.module.css';
import {UserMessage} from "../UserMessage/UserMessage.jsx";
import {ModeratorMessage} from "../ModeratorMessage/ModeratorMessage.jsx";
import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import {useAuth} from "../../context/AuthContext.jsx";

export function ChatList({messages}) {
    const {user: userAuth} = useAuth()
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <div className={`${styles.chatList}`}>
            {
                messages.map((message, index) => {
                    if(message.userId === userAuth._id) {
                        return <OwnMessage key={index} message={message.message}/>
                    } else if (message.type === 'student') {
                        return <UserMessage key={index} message={message.message} user={message.username}/>
                    } else if (message.type === 'moderator') {
                        return <ModeratorMessage key={index} message={message.message} user={message.username}/>
                    }
                })
            }
            <div ref={messagesEndRef} />
        </div>
    );
}

ChatList.prototype = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    })).isRequired
}