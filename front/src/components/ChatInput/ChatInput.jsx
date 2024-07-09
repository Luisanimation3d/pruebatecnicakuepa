import { FiSend } from "react-icons/fi";
import styles from "./ChatInput.module.css";
import PropTypes from "prop-types";
import {useState} from "react";

export function ChatInput({newMessage}) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  return (
    <form className={`${styles.chatInputContainer}`} onSubmit={e=> {
        e.preventDefault();
        if(!message.trim()) {
            setError('Message cannot be empty');
            return;
        }
        newMessage(message);
        setMessage('');
        setError('')
    }}>
      <input type="text" className={`${styles.chatInput}`} placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button className={`${styles.chatInputButton}`}><FiSend/></button>
        {
            error && <p className={`${styles.error}`}>{error}</p>
        }
    </form>
  );
}

ChatInput.propTypes = {
    newMessage: PropTypes.func.isRequired
}