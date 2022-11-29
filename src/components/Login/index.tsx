import { Lock, User } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import * as S from "./styles";

export function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const database = [
    {
      email: "teste@teste.com",
      password: "teste123"
    }
  ]

  const errors = {
    email: "Email errado",
    password: "Password errado"
  };


  function handleLogin(event: FormEvent) {
    event.preventDefault();

    var { email, password } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.email === email.value);

    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Email not found
      setErrorMessages({ name: "email", message: errors.email });
    }

    if(isSubmitted) {
      navigate("/transactions");
      window.location.reload();
    } else {
      console.log("Usuário e/ou senha diferente")
    }
  }

  // function renderErrorMessage(name: any) {
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );
  // }

  return (
    <S.Container>
      <img src={logoImg} alt="€urorçamento" />
      <div className="login-item">
        <form onSubmit={handleLogin} className="form form-login">
          <div className="form-field">
            <label className="email" htmlFor="login-email">
              <User weight="fill" color="#fff" />
            </label>
            <input id="login-email" type="text" name="email" className="form-input" placeholder="Email" required />
          </div>

          <div className="form-field">
            <label className="lock" htmlFor="login-password">
              <Lock weight="fill" color="#fff" />
            </label>
            <input id="login-password" type="password" name="password"  className="form-input" placeholder="Password" required />
          </div>

          <div className="form-field">
            <input type="submit" value="Entrar" />
          </div>
          
        </form>
      </div>
    </S.Container>
  )
}