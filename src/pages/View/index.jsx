import { useCallback, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

export function View() {
  const navigate = useNavigate();
  const [images, setImage] = useState("");
  const { id } = useParams();

  async function getImage() {
    const { data } = await api.get(`/image/${id}`);
    setImage(data.B64file);
  }
  useCallback(getImage(), [id]);

  if (!images) {
    return <h1>Carregando</h1>;
  }
  return (
    <main>
      <header className={styles.header}>
        <strong>Modal - Visualizar imagem</strong>
      </header>
      <div className={styles.slide}>
        <img src={`data:image/jpeg;base64, ${images}`} />
      </div>
      <footer className={styles.footer}>
        <button onClick={() => navigate("/table")}>Fechar</button>
      </footer>
    </main>
  );

}
