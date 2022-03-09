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

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(evt.target.value)
    }

    const handleSubmit = async (evt: React.FormEvent<SubmitEvent>) => {
        evt.preventDefault();
        setResponseData(response)
    }


  return (
    <Context.Provider value={{
		data: responseData,
		handleSubmit: handleSubmit,
		handleChange: handleChange,
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
