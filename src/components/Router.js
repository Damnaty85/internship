import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from "../App";
import UserDetail from './UserDetail';
import UserList from './UserList';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path='user/*' element={<UserList/>}/>
        </Routes>
    </BrowserRouter>
);

export default Router;