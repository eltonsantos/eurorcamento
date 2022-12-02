import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, FormEvent, ReactNode, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseconfig";
interface AuthProviderProps {
  children: ReactNode;
}

interface HandleLoginProps {
  email: string;
  password: string;
}

interface AuthContextData {
  handleLogin: (data: HandleLoginProps) => Promise<void>;
  handleLogout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false)

  async function handleLogin({ email, password }: HandleLoginProps) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log("User: " + { auth, email, password })
      setIsLoggedIn(true)
      navigate('/transactions')
    } catch (error) {
      setError(true)
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log('Unexpected error: ' + error)
      }
    }
  }

  const handleLogout = async () => {
    await signOut(auth);
    console.log(auth)
    navigate('/')
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}