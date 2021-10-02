import styles from "./App.module.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Stack from 'react-bootstrap/Stack'
  import Container from 'react-bootstrap/Container'
  import Logo from "./components/Logo/index.js";
  import Hand from "./components/AnimatedHand/Hand.js";
  export default function App() {
    return (
      <Router>
        <div>
          <Logo/>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
  function Home() {
    return (
    <div className={styles.con}><Stack gap={1}>
      <div className={styles.item}>First item</div>
      <div className={styles.item}>Second item</div>
      <div className={styles.item}>Third item</div>
    </Stack></div>
    );
  }
  
  function About() {
    return <Hand/>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }
