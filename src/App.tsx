import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetailPage from "./pages/UserDetailPage";
import UserDetail from "./components/UserDetail";
import { ToggleButton } from "./components/ToggleButton";
import { useAppSelector } from "./store/hooks/redux";

const App: React.FC = () => {
	const { toggle } = useAppSelector(state => state.appReducer)
	return (
		<div className={`App ${toggle ? '_dark' : ''}`}>
			<ToggleButton />
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
