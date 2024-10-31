import MyNavbar from './components/MyNavbar'
import AllRoutes from './pages/AllRoutes';
import Footer from './components/Footer';
import { refreshToken } from './api/UserRequests';
import { useEffect } from 'react';
import "./App.scss";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          await refreshToken();
          // api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <MyNavbar />
      <div className="content flex-grow-1">
        <AllRoutes />
      </div>
      <Footer />
    </div>
  )
}

export default App
