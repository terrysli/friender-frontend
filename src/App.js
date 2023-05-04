import './App.css';
import NavBar from './NavBar';

/**
 * Site application
 *
 * App -> []
 */

function App() {

  /** Handles site-wide logout */
  function logout() {

  }

  return (
    <div className="App">
      <NavBar logout={logout}/>
    </div>
  );
}

export default App;
