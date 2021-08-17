import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Frontpage from './Pages/Frontpage/Frontpage';
import Destinations from './Pages/Destinations/Destinations';
import Reservation from './Pages/Reservation/Reservation';
import Login from './Pages/Login/Login';

import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Route exact path="/forside">
          <Frontpage />
        </Route>
        <Route exact path="/destinationer">
          <Destinations />
        </Route>
        <Route exact path="/reservation">
          <Reservation />
        </Route>
        <Route exact path="/værelser">
          <Reservation />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/admin">
          {/* tilføj admin side */}
        </Route>

        <Route path="/">
          <Redirect to="/forside"/>
        </Route>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
