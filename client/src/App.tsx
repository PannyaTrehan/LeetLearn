import MyNavbar from './components/MyNavbar'
import AllRoutes from './pages/AllRoutes';
import Footer from './components/Footer';
import api from './api/apiConfig';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("called 1")
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
}, []);

  return (
    <>
      <MyNavbar />
      <AllRoutes />
      <Footer />
    </>
  )
}

export default App
