import PropTypes from "prop-types";
import styles from './ModeratorMessage.module.css';

export function ModeratorMessage({message, user}) {
    return (
        <div className={`${styles.moderatorMessage}`}>
            <div className={`${styles.moderatorMessageNick}`}>@{user} <span className={`${styles.moderatorMessageTag}`}>Moderator</span></div>
            <div className={`${styles.moderatorMessageText}`}>{message}</div>
        </div>
    );
}

ModeratorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
}