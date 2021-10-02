import {
  BrowserRouter as Router,
  Switch,
  Route /*Link*/,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Users } from "./pages/Users";
import { NotFound } from "./pages/NotFound";
import Logo from "./components/Logo";

export const App = () => {
  return (
    <Router>
      <Logo />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
