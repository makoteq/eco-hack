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
import { API_CLIENT } from "./constants";

export const App = () => {
    const [routes, setRoutes] = useState(
        API_CLIENT.events.map((e) => {
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

    useEffect(() => {
        API_CLIENT.on("EVENT_RELOAD", (list) => {
            setRoutes(
                list.map((e) => {
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
                                    user: e.user,
                                }}
                            ></Event>
                        </Route>
                    );
                })
            );
        });
        API_CLIENT.on("EVENT_CREATE", (list) => {
            setRoutes(
                list.map((e) => {
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
                                    user: e.user,
                                }}
                            ></Event>
                        </Route>
                    );
                })
            );
        });
    }, []);

    return (
        <Router>
            <Navbar />
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
            <Footer/>
        </Router>
    );
};
