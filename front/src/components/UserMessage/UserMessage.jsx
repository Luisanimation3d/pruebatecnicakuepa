import styles from './UserMessage.module.css';
import PropTypes from "prop-types";

export function UserMessage({message, user}) {
    return (
        <div className={`${styles.userMessage}`}>
            <div className={`${styles.userMessageNick}`}>@{user}</div>
            <div className={`${styles.userMessageText}`}>{message}</div>
        </div>
    );
}

UserMessage.propTypes = {
    message: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
}