import { Lock, User } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../services/firebaseconfig'
import { FormEvent, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import * as S from "./styles";

export function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleLogin(event: FormEvent) {
    event.preventDefault();
    //console.log("Tentou logar")

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Entrou aqui")
        navigate('/transactions')
      })
      .catch((error) => {
        setError(true);
        console.log("Error é: " + error)
      });

  }

  return (
    <S.Container>
      <img src={logoImg} alt="€urorçamento" />
      <div className="login-item">
        <form onSubmit={handleLogin} className="form form-login">
          <div className="form-field">
            <label className="email" htmlFor="login-email">
              <User weight="fill" color="#fff" />
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              onChange={(e) => {setEmail(e.target.value)}}
              required
            />
          </div>

          <div className="form-field">
            <label className="lock" htmlFor="login-password">
              <Lock weight="fill" color="#fff" />
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              onChange={(e) => {setPassword(e.target.value)}}
              required
            />
          </div>

          <div className="form-field">
            <input type="submit" value="Entrar" />
          </div>
{/* 
          {error && <span>Wrong email or password!</span>} */}
          
        </form>
      </div>
    </S.Container>
  )
}