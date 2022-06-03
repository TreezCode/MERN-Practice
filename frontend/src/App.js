import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import DarkMode from './components/DarkMode';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <DarkMode />
          <Routes>
            <Route element={<Layout />}>
              {/* public routes */}
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              {/* protected routes */}
              <Route element={<RequireAuth />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/user' element={<User />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
