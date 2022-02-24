interface IFunctionProps {
  handleChange: (evt: any) => void,
  handleSearchSubmit: (evt: any) => void
}

const Search = ({handleChange, handleSearchSubmit}: IFunctionProps) => {
  return (
    <>
        <form onSubmit={handleSearchSubmit}>
            <h3>Search for users in the GitHub database</h3>
            <input type="search" placeholder="Start typing user login..." onChange={handleChange}/>
        </form>
    </>
  )
}

export default Search;
