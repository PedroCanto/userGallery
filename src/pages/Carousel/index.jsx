import styles from "./styles.module.css";
import { Image, ListBullets, CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { Header } from "../../componentes/Header";

export function Carousel() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    getAllImages();
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  async function getAllImages() {
    const { data } = await api.get("/image");
    setImages(data);
  }

  return (
    <main>
      <Header />
      <div className={styles.carrossel}>
        <strong>Carrossel</strong>
        <form>
          <button
            onClick={() => navigate("/carousel")}
            className={styles.carrosselbuttonimg}
          >
            <Image />
          </button>
          <button
            onClick={() => navigate("/table")}
            className={styles.carrosselbuttontable}
          >
            <ListBullets />
          </button>
        </form>
      </div>

      <div className={styles.slide}>
        <button
          disabled={selectedImageIndex === 0}
          onClick={() => setSelectedImageIndex((state) => state - 1)}
        >
          <CaretLeft />
        </button>
        <img
          src={`data:image/jpeg;base64, ${images[selectedImageIndex]?.B64file}`}
        />
        <button
          disabled={images.length - 1 === selectedImageIndex}
          onClick={() => setSelectedImageIndex((state) => state + 1)}
        >
          <CaretRight />
        </button>
      </div>
      <footer className={styles.footer}>
        {images.map((img, i) => {
          return (
            <img
              onClick={() => setSelectedImageIndex(i)}
              key={img.id}
              src={`data:image/jpeg;base64, ${img.B64file}`}
            />
          );
        })}
      </footer>
    </main>
  );
}
