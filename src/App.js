import "./App.css";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; //라우팅
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { TodoList } from './pages/TodoList';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { // user 판명을 듣고 
      if(user) { // 있으면
        console.log('O')
        setIsLogin(true); // 로그인 됨
      } else {
        console.log('X')
        setIsLogin(false); // 로그인 안됨
      }
      //setLoading(false);
    });
  }, [])
  
  return (
    <div>
      <BrowserRouter>
      {isLogin ? (
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/*" element={<Navigate to="main" />} />
            <Route path="/" element={<Navigate to="main" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<Navigate to="login" />} />
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App;