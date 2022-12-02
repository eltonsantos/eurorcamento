import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, FormEvent, ReactNode, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseconfig";

// interface User {
//   email: string;
//   password: string;
//   isLoggedIn: boolean;
// }

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  //user: User | undefined;
  handleLogin: (event: FormEvent) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

  const navigate = useNavigate()
  //const [user, setUser] = useState<User>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    console.log("User: " +  auth)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log(auth)
      console.log("User: " + { auth, email, password })
      navigate('transactions')
      setIsLoggedIn(true)
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
    <AuthContext.Provider value={{ handleLogin, handleLogout }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}