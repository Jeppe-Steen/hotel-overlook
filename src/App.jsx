import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Frontpage from './Pages/Frontpage/Frontpage';
import Destinations from './Pages/Destinations/Destinations';
import Reservation from './Pages/Reservation/Reservation';
import Login from './Pages/Login/Login';

import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer/Footer';
import Admin from './Pages/Admin/Admin';
function App() {

  return (
    <div className="App">
      <Router>
        <Navigation />

        <Switch>
          <Route exact path="/forside">
            <Frontpage />
          </Route>

          <Route path="/destinationer">
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
            <Admin />
          </Route>

          <Route exact path="/">
            <Redirect to="/forside"/>
          </Route>

          <Route path="/">
            <p>denne side findes ikke</p>
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
