import {ChatContainer} from "../../components/ChatContainer/ChatContainer.jsx";
import styles from './ClassView.module.css';
import {FiLogOut} from "react-icons/fi";
import {useAuth} from "../../context/AuthContext.jsx";

export function ClassView() {
    const {logout} = useAuth()
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.imageContainer}`}>
                {/*<img src="https://pbs.twimg.com/media/GBUAgggWIAANq5N?format=jpg&name=4096x4096" alt=""*/}
                {/*     className={`${styles.image}`}/>*/}
                <iframe className={`${styles.image}`}
                        src="https://www.youtube.com/embed/BVnhDlbhPvs?si=b6pH0kKCfeUAc-7U&amp;controls=0&autoplay=1e"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <ChatContainer/>
            <button className={`${styles.logoutButton}`} onClick={logout}>
                <FiLogOut/>
            </button>
        </div>
    );
}