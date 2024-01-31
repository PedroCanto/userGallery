import styles from "./styles.module.css";
import { UploadSimple } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function Upload() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/image/upload", formData);
      navigate("/table");
      console.log("Imagem enviada com sucesso:", response.imagePath);
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
    }
  };
  return (
    <main>
      <header className={styles.header}>
        <strong>Modal - Upload de Imagem</strong>
      </header>
      <div className={styles.upload}>
        <form className={styles.quadrado}>
          <UploadSimple className={styles.icon} />
          <input onChange={handleFileChange} type="file" />
          {selectedFile && <img src={URL.createObjectURL(selectedFile)} />}
        </form>
      </div>
      <footer className={styles.footer}>
        <button 
          onClick={handleUpload} 
          className={styles.footerButton1}>
          Cadastrar
        </button>
        <button
          onClick={() => navigate("/table")}
          className={styles.footerButton2}
        >
          Cancelar
        </button>
      </footer>
    </main>
  );
}
