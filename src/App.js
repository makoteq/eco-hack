import { BrowserRouter as Router, Switch, Route /*Link*/ } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Users } from "./pages/Users";
import Logo from "./components/Logo";
export const App = () => {
    return (
        <Router>
          <Logo/>
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/users" component={Users} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
};
