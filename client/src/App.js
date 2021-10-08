import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Credits } from "./pages/Credits";
import { NotFound } from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CreateEvent } from "./pages/CreateEvent";
import { Event } from "./pages/Event";
import { useEvents } from "./context/Events";

export const App = () => {
    const events = useEvents();
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        setRoutes(
            events.map((e) => {
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
                                createdTime: e.created?.time,
                                user: e.user,
                            }}
                        ></Event>
                    </Route>
                );
            })
        );
    }, [events]);

    return (
        <Router>
            <Navbar />
            <div style={{ minHeight: "88vh" }}>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/credits" component={Credits} />
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/create" component={CreateEvent} />
                    {routes}
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
};
