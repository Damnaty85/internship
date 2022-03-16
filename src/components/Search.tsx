import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { fetching, handleChangeQuery } from "../store/reducers/ActionCreators";

const BASE_URL = `https://api.github.com`;

const Search = () => {
	const dispatch = useAppDispatch();
	const { query } = useAppSelector(state => state.appReducer)

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		dispatch(fetching(`${BASE_URL}/search/users?per_page=100&q=`, `${query}`))
	}

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(handleChangeQuery(evt))
	}

	return (
		<section className="search">
			<form onSubmit={handleSubmit}>
				<h3>Search for users in the GitHub database</h3>
				<label>
					<span className="material-icons">search</span>
					<input type="search" placeholder="Start typing user login..." value={`${query ? query : ''}`} onChange={handleChange}/>
				</label>
			</form>
		</section>
	)
}

export default Search;
