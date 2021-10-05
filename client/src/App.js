import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Users } from "./pages/Users";
import { Credits } from "./pages/Credits";
import { NotFound } from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import { CreateEvent } from "./pages/CreateEvent";
import { Event } from "./pages/Event";
import { EVENT_CONTEXT } from "./constants";
import { LoginPage } from "./pages/Login";

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
                <Navbar />
                <Switch>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/credits" component={Credits} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/create" component={CreateEvent} />
                    <Route exact path="/login" component={LoginPage} />
                    {Array.isArray(props.events) &&
                        props.events.map((e) => {
                            return (
                                <Route key={e._id} exact path={`/event/${e._id}`}>
                                    <Event
                                        data={{
                                            name: e.name,
                                            type: e.type,
                                            description: e.description,
                                            address: e.address,
                                            time: e.time,
                                            lat: e.lat,
                                            lon: e.lon,
                                            id: e._id,
                                            createdTime: e.created.time,
                                        }}
                                    ></Event>
                                </Route>
                            );
                        })}
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </EVENT_CONTEXT.Provider>
    );
};
