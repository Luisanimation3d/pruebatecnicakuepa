import PropTypes from "prop-types";
import styles from './OwnMessage.module.css';

export function OwnMessage({message}) {
    return (
        <div className={`${styles.ownMessage}`}>
            <div className={`${styles.ownMessageNick}`}>@Me</div>
            <div className={`${styles.ownMessageText}`}>{message}</div>
        </div>
    );
}

OwnMessage.propTypes = {
    message: PropTypes.string.isRequired,
}