import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetailPage from "./pages/UserDetailPage";
import UserDetail from "./components/UserDetail";

function App() {
	return (
		<div id="app">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route exact path='user/' element={<UserDetailPage/>}>
						<Route path=":userLogin" exact={true} render={(match) => {<UserDetail login={match.params.userLogin} />}}/>
					</Route>
				</Routes>
			</BrowserRouter>
    	</div>
  	);
}

export default App;
