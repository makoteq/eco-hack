import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Users } from "./pages/Users";
import { NotFound } from "./pages/NotFound";
import Logo from "./components/Logo";
import { CreateEvent } from "./pages/CreateEvent";
import { Event } from "./pages/Event";
import { EVENT_CONTEXT } from "./constants";

export const App = (props) => {
    const [context, setContext] = useState({
        events: props.events,
        updateEvents: function (events = []) {
            if (!Array.isArray(events)) throw new TypeError("Events must come in array");
            setContext({
                events: events,
                updateEvents: this.updateEvents,
            });
        },
    });

    return (
        <EVENT_CONTEXT.Provider value={context}>
            <Router>
                <Logo />
                <Switch>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/create" component={CreateEvent} />
                    {Array.isArray(props.events) &&
                        props.events.map((e) => {
                            return (
                                <Route key={e._id} exact path={`/event/${e._id}`}>
                                    <Event id={e._id}></Event>
                                </Route>
                            );
                        })}
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </EVENT_CONTEXT.Provider>
    );
};

export default App;
