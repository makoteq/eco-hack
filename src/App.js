import styles from "./App.module.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Stack from 'react-bootstrap/Stack'
  import Container from 'react-bootstrap/Container'
  export default function App() {
    return (
      <Router>
        <div>
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
    <div className={styles.con}>      <Stack gap={1}>
      <div className={styles.item}>First item</div>
      <div className={styles.item}>Second item</div>
      <div className={styles.item}>Third item</div>
    </Stack></div>
    );
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }
