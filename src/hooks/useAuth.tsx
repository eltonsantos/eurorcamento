import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
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
  currentUser: any | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

  const navigate = useNavigate()
  const [currentUser,setCurrentUser] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false)

  async function handleLogin({ email, password }: HandleLoginProps) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      //console.log(auth)
      setIsLoggedIn(true)
      //localStorage.setItem('@eurocamento:auth', JSON.stringify(auth));
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
    //console.log(auth)
    navigate('/')
    //localStorage.removeItem('@eurocamento:auth')
    setCurrentUser(currentUser)
    setIsLoggedIn(false);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('Logged')
        setCurrentUser(currentUser)
        console.log(currentUser)
      } else {
        console.log('Not logged')
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, handleLogin, handleLogout }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}