import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

const App = () => {
    return (
        <Router>
            <Routes>
                {routes.map(route => <Route path={route.path} element={route.component} key={route.path} exact />)}
            </Routes>
        </Router>
    );
};

export default App;