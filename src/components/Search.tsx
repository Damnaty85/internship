import { useContext } from 'react';
import { Context } from '../context';

const Search = () => {
	const { handleSubmit, handleChange } = useContext<any>(Context);
	return (
		<section className="search">
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
