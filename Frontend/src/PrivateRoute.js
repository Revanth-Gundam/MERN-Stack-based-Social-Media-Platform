import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function PrivateRoute ({ children }) {
  const navigate = useNavigate();
//   const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('LoginSuccessful'))
      navigate('/login');
    else setLoading(false);
  }, []);

  if (loading) return <h1>Loading</h1>;

  return <Navbar>{children}</Navbar>;
  // return children;
}