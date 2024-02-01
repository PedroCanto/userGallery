import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";




export function Login() {
  
  const navigate = useNavigate();

  const { handleLoginUser } = useContext(authContext);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (event) => {
    try {
      await handleLoginUser(event.login, event.password);
      navigate("/carousel");
    } catch (error) {
      throw new Error("Error authenticating");
    }
  };


  return (
    <main className={styles.login}>
      <img
        className={styles.img}
        src="https://intentos.com.br/wp-content/uploads/2020/06/o-que-e-fotografia-de-paisagem-1024x666.jpeg "
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <header>
          <strong>Entrar</strong>
        </header>
        <input {...register("login")} placeholder="Digite seu usuário" />
        <input
          {...register("password")}
          placeholder="Digite sua senha"
          type="password"
        />
        <footer>
          <button   type="submit">
            Acessar a plataforma
          </button>

          

     
        </footer>
      </form>
    </main>
  );
}
