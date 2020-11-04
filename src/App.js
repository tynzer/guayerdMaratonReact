import React from "react"
import './App.css';
import SearchBox from "../src/Components/SearchBox"
import ResultList from "../src/Components/ResultList"
import FavList from "./Components/FavList";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],

    }
  }

  result = (dataSearched) => {
    this.setState({ data: dataSearched })
  }


  render() {
    return (
      <div className="App">
        <h1>Guayerd - MELI</h1>
      Una nueva manera de encontar
        <SearchBox result={this.result}></SearchBox>
        <div className="container">
          <div className="row">
            <ResultList resultSearched={this.state.data}></ResultList>
            <FavList ></FavList>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
