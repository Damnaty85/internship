import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetailPage from "./pages/UserDetailPage";
import UserDetail from "./components/UserDetail";

const App: React.FC = () => {
  return (
    <div className="App">
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path='user/' element={<UserDetailPage/>}>
					<Route path=":userLogin" element={<UserDetail />}/>
				</Route>
			</Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
