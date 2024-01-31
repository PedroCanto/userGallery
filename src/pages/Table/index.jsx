import styles from "./styles.module.css";
import { Image, ListBullets, Eye, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import { Header } from "../../componentes/Header";

export function Table() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  async function getAllImages() {
    const  response  = await api.get("/image", { Image });

    setImages(response.data);

    return response.data;
  }
  async function handleDelete(imgId) {
    const response = await api.delete(`/image/` + imgId);
    getAllImages();
    return response;
  }
  async function handleView(imgId) {
    const response = await api.get("/image/" + imgId);
    navigate(`/view/${imgId}`);
    return response.data.B64file;
  }

  useEffect(() => {
    getAllImages();
  }, []);
  
  

  return (
    <main>
        <Header/>
        <div className={styles.tabela}>
          <strong>Tabela</strong>
          <form>
            <button
              onClick={() => navigate("/carousel")}
              className={styles.tabelaButtonimg}
            >
              <Image />
            </button>
            <button
              onClick={() => navigate("/table")}
              className={styles.tabelaButtontable}
            >
              <ListBullets />
            </button>
          </form>
        </div>
          <form className={styles.button}>
            <button onClick={() => navigate("/upload")}>
              Upload de Imagem
            </button>
          </form>
      <table>
        <thead>
          <th>Id</th>
          <th>Nome</th>
          <th>Tamanho</th>
          <th>Data de criação</th>
          <th>Ações</th>
        </thead>

        <tbody>
          {images.map((img) => {
            return (
              <tr key={img.id}>
                <td>{img.id}</td>
                <td>{img.image}</td>
                <td>{img.sizekb} KB</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(img.created))}
                </td>
                <td className={styles.btn}>
                  <Eye
                    onClick={() => handleView(img.id)}
                    className={styles.buttonEye}
                  />{" "}
                  <Trash
                    onClick={() => handleDelete(img.id)}
                    className={styles.buttonTrash}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
