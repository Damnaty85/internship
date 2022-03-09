import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetailPage from "./pages/UserDetailPage";
import UserDetail from "./components/UserDetail";
import useFetch from './customHooks/useFetch';

import { Context } from "./context";

const BASE_URL = `https://api.github.com`;

const App: React.FC = () => {
	const [ responseData, setResponseData ] = useState<object>({});
    const [ query, setQuery ] = useState<string>("")
    const { response } = useFetch(`${BASE_URL}/search/users?q=`, `${query}`);

	return (
		<Context.Provider value={{
			data: responseData,
			handleSubmit: async (evt) => {
				evt.preventDefault();
				setResponseData(response)
			},
			handleChange: (evt) => {
				const value = evt.target.value
				setQuery(value)
			},
		}}>
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
		</Context.Provider>
	);
}

export default App;
