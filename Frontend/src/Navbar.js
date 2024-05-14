import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({children}) {

  const location = useLocation();
  const isSubGreddiitPage = location.pathname.startsWith('/subgreddiit/');
  return (
    <>
    <nav style={{backgroundColor: '#333', color: '#fff', padding: '10px'}}>
      <ul style={{display: 'flex', justifyContent: 'space-between'}}>
        <li>
          <Link to="/Profile" style={{color: '#fff', textDecoration: 'none'}}>Profile</Link>
        </li>
        <li>
          <Link to="/MySubGreddiits" style={{color: '#fff', textDecoration: 'none'}}>MySubGreddiits</Link>
        </li>

        
        {isSubGreddiitPage && 
        <>
          <li>
          <Link to="/Users" style={{color: '#fff', textDecoration: 'none'}}>Users</Link>
          </li>
          <li>
          <Link to="/Joining_Requests" style={{color: '#fff', textDecoration: 'none'}}>Joining_Requests</Link>
          </li>
          <li>
          <Link to="/Stats" style={{color: '#fff', textDecoration: 'none'}}>Stats</Link>
          </li>
          <li>
          <Link to="/Reported" style={{color: '#fff', textDecoration: 'none'}}>Reported</Link>
          </li>
        </>}
        
        <li>
          <Link to="/Login" style={{color: '#fff', textDecoration: 'none'}}>Logout</Link>
        </li>
      </ul>
    </nav>
    {children}
    </>
  );
}

export default Navbar;