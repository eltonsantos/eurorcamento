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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log("User: " + { auth, email, password })
      setIsLoggedIn(true);
      navigate('/transactions')
    }
    catch (error) {
      setError(true)
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unexpected error', error);
      }
    }
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
 
          { error && <span className="form-field error">Wrong email or password!</span> }
          
        </form>
      </div>
    </S.Container>
  )
}