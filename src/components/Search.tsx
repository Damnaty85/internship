import { useContext } from 'react';
import { Context } from '../context';

const Search = () => {
	const { handleSubmit, handleChange } = useContext(Context);
	return (
		<section className="search _test">
			<form onSubmit={handleSubmit}>
				<h3>Search for users in the GitHub database</h3>
				<label>
					<span className="material-icons">search</span>
					<input type="search" placeholder="Start typing user login..." onChange={handleChange}/>
				</label>
			</form>
		</section>
	)
}

export default Search;
