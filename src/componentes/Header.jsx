import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import styles from "./Header.module.css"

export function Header(){
    const { handleLogout } = useContext(authContext);
    return(
        <main className={styles.header}>
            <header>
                <strong>GALLERY</strong>
                <form>
                    <button onClick={() => handleLogout()} type="submit">
                     Encerrar sessão
                    </button>
                </form>
            </header>
        </main>
    )
}