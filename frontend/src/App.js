// external imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// internal imports
import Layout from './components/Layout';
import DarkMode from './components/DarkMode';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
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
