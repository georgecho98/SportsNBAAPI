import './App.css';
import { Outlet } from 'react-router-dom';

import AppNavbar from './components/Navbar'

function App() {
  return (
    <>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <AppNavbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
