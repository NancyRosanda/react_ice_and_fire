
import React from "react";
import ReactDOM from "react-dom";



class App extends React.Component {

  state = {
    isLoading: true,
    initialCharacters: [],
    characters: [],
    inputValue: "",
    error: null,

  };

  fetchCharacters() {
    fetch(`https://anapioficeandfire.com/api/characters?pagesize=25`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          initialCharacters: data,
          isLoading: false,
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });

  };

  componentDidMount() {
    this.fetchCharacters();
  }

  onChangeHandler(e) {
    let newArray = this.state.initialCharacters.filter((d) => {
      let searchValue = d.culture.toLowerCase() || d.gender.toLowerCase();
      return searchValue.indexOf(e.target.value) !== -1;
    });
    this.setState({
      culture: newArray,
      gender: newArray,
      inputValue: e.target.value
    });
  }


  render() {
    const {
      isLoading,
      characters,
      initialCharacters,
      gender,
      culture,
      error,
      inputValue,
    } = this.state;
    return (
      <><div>
        <h1>Character List</h1>
        <input
          type="text"
          value={this.state.inputValue.culture}
          margin="50"
          placeholder="Search by character culture..."
          onChange={this.onChangeHandler.bind(this)} />

        <select onChange={this.onChangeHandler.bind(this)}>
          <option value="ma">Male</option>
          <option value="fe">Female</option>
          <option value=" ">Unkown</option>
        </select>

        {error ? <p>{error.message}</p> : null}
        <table border="1">
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Died</th>
            <th>Gender</th>
            <th>Culture</th>
            <th>Allegiances</th>
            <th>Books</th>
          </tr>
          {!isLoading ? (
            (characters.length !== 0 || !!inputValue
              ? culture || gender
              : initialCharacters
            ).map((characters) => {
              return (
                <tr key={characters.id}>
                  <td>{characters.name === "" ? "Name unkown" : characters.name}, {characters.aliases}</td>
                  <td>{characters.born === "" ? "Yes" : characters.born}</td>
                  <td>{characters.died === " " ? characters.died : "Yet to find"}</td>
                  <td>{characters.gender === "" ? "Unkown" : characters.gender}</td>
                  <td>{characters.culture === "" ? "Culture unkown" : characters.culture}</td>
                  <td><ul><a href='./House'>{characters.allegiances}</a></ul></td>
                  <td value={characters.id}> {characters.books.length}</td>
                </tr>

              );
            })
          ) : (
            <h3>Loading...</h3>
          )}

        </table>
      </div></>

    );
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

