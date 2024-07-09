import {useState, useEffect} from "react";
import {ChatList} from "../ChatList/ChatList.jsx";
import {ChatInput} from "../ChatInput/ChatInput.jsx";
import styles from "./ChatContainer.module.css";
import io from "socket.io-client";
import {useAuth} from "../../context/AuthContext.jsx";
import {FiMessageSquare, FiX} from "react-icons/fi";

const socket = io('http://localhost:3000');

export function ChatContainer() {
    const {user} = useAuth()

    const [messages, setMessages] = useState([])

    const [chatopen, setChatopen] = useState(true)


    const sendMessage = (message) => {
        const newMessage = {
            type: 'student',
            userId: user._id,
            username: user.username,
            user: user._id,
            message: message
        }
        receiveMessage(newMessage);
        socket.emit('message', newMessage);
    }

    const receiveMessage = (message) => {
        setMessages(state => [...state, message]);
    }

    useEffect(() => {
        socket.on('loadMessages', (messages) => {
            setMessages(messages);
        });

        socket.on('message', receiveMessage);

        socket.emit('requestMessages');

        return () => {
            socket.off('loadMessages');
            socket.off('message');
        }
    }, []);

    return (
        <>
            {
                chatopen ? (
                    <div
                        className={`${styles.chatContainer} ${chatopen ? styles['chatContainer--open'] : styles['chatContainer--close']}`}>
                        <header className={`${styles.chatHeader}`}>
                            <h2 className={`${styles.chatTitle}`}>
                                Clase de Tecnologías Web
                            </h2>
                            <button className={`${styles.closeChat}`} onClick={() => setChatopen(prev => !prev)}>
                                <FiX/>
                            </button>
                        </header>
                        <ChatList messages={messages}/>
                        <ChatInput newMessage={sendMessage}/>
                    </div>
                ) : (
                    <button className={`${styles.chatButton}`} onClick={() => setChatopen(prev => !prev)}>
                        <FiMessageSquare/>
                    </button>
                )
            }
        </>
    );
}

export default ChatContainer;