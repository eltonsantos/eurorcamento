/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

import { Lock, User } from 'phosphor-react';
import logoImg from '../../assets/logo.svg';

import * as S from "./styles";

export function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const { handleLogin } = useAuth()

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()
    await handleLogin({ email, password })
  }

  return (
    <S.Container>
      <img src={logoImg} alt="€urorçamento" />
      <div className="login-item">
        <form onSubmit={handleSignIn} className="form form-login">
          <div className="form-field">
            <label className="email" htmlFor="login-email">
              <User weight="fill" color="#fff" />
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
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
              value={password}
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