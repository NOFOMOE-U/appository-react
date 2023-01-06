import { loadRemoteModule } from '@appository/load-remote-module';
import { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NxWelcome from './nx-welcome';

const Bookstore = lazy(() => loadRemoteModule('bookstore', './Module'));

const Login = lazy(() => loadRemoteModule('login', './Module'));

const Dashboard = lazy(() => loadRemoteModule('dashboard', './Module'));

const Admin = lazy(() => loadRemoteModule('admin', './Module'));

export function App() {
  return (
    <Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bookstore">Bookstore</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host" />} />
        <Route path="/bookstore" element={<Bookstore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
