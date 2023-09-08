import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import HomePage from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle />
        <nav>
          <ul style={{ textDecoration: 'none' }}>
            <li >
              Home / <NavigationLink />
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/users" element={<UsersPage />} />
          <Route exact path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function NavigationLink() {
  const currentPath = window.location.pathname;

  const linkClass = 'navigation-link';

  if (currentPath === '/users') {
    return <Link to="/products" className={linkClass}>Products</Link>;
  } else if (currentPath === '/products') {
    return <Link to="/users" className={linkClass}>Users</Link>;
  }
}

export default App;
