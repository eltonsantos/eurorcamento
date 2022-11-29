import { Lock, User } from 'phosphor-react';
import { FormEvent } from 'react';
import logoImg from '../../assets/logo.svg';
import * as S from "./styles";

export function Login() {

  function handleLogin(event: FormEvent) {
    event.preventDefault();

    console.log("aqui")

  }

  return (
    <S.Container>
      <img src={logoImg} alt="€urorçamento" />
      <div className="login-item">
        <form action="/transactions" method="get" className="form form-login">
          <div className="form-field">
            <label className="user" htmlFor="login-username">
              <User weight="fill" color="#fff" />
            </label>
            <input id="login-username" type="text" className="form-input" placeholder="Username" required />
          </div>

          <div className="form-field">
            <label className="lock" htmlFor="login-password">
              <Lock weight="fill" color="#fff" />
            </label>
            <input id="login-password" type="password" className="form-input" placeholder="Password" required />
          </div>

          <div className="form-field">
            <input type="submit" value="Entrar" />
          </div>
        </form>
      </div>
    </S.Container>
  )
}