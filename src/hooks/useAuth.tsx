import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseconfig";

import { toast } from 'react-toastify'
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
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

  const navigate = useNavigate()
  const [currentUser,setCurrentUser] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false)

  async function handleLogin({ email, password }: HandleLoginProps) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      //console.log(auth)
      setIsLoggedIn(true)
      //localStorage.setItem('@eurocamento:auth', JSON.stringify(auth));
      navigate('/transactions')

      toast.success('Seja bem vindo ao EurOrçamento');
    } catch (error) {
      setError(true)
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log('Unexpected error: ' + error)
      }
    }
  }

  async function handleLogout() {
    await signOut(auth)
    //console.log(auth)
    //localStorage.removeItem('@eurocamento:auth')
    setIsLoggedIn(false)
    setCurrentUser(null)
    navigate('/')
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {    
        console.log('Logged')
        //setIsLoggedIn(true)
        setCurrentUser(currentUser)
        setIsLoading(false)
        console.log(currentUser.email)
      } else {
        console.log('Not logged')
        setIsLoading(false)
      }
    })
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, isLoading, handleLogin, handleLogout }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}