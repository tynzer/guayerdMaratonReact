import React from "react";
import "./App.css";
import SearchBox from "../src/Components/SearchBox";
import ResultList from "../src/Components/ResultList";
import FavList from "./Components/FavList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      resultsItems: [],
      favListRender: false,
    };
  }

  componentDidMount() {
    let itemsID = JSON.parse(localStorage.getItem("ID_producto"));
    if (itemsID) {
      const dataArray = [];
        Promise.all(
        itemsID.map((itemID) =>
          fetch(`https://api.mercadolibre.com/items/${itemID}`)
            .then((res) => res.json())
            .then((data) => {
              dataArray.push(data);
              this.setState({ resultsItems: dataArray });
              this.setState({ favListRender: true });
            })
            .catch((logError) => console.log(logError))
        )
      );
      /* .then(data => { 
 this.setState({ resultsItems: data.dataArray });
 console.log(data, this.state.resultsItems)
 // do something with the data
})    */
    }
  }

  result = (dataSearched) => {
    this.setState({ data: dataSearched });
  };

  favItemsAdd = (favItems) => {
    let resultItemsArray = this.state.resultsItems;
    if (resultItemsArray.length > 0) {
      resultItemsArray.push(favItems);
      this.setState({ resultsItems: resultItemsArray });
       
    } else {
      this.setState({ resultsItems: [favItems] });
    }
     this.setState({ favListRender: true }); 
  };

  delFavItemsID = (isFavItems) => {
    this.setState({ favListRender: isFavItems });
  };

  delResultsItems = (isResultsItems) => {
    let resultArrayBefore = this.state.resultsItems
    resultArrayBefore.push(isResultsItems)
    this.setState({ resultsItems: isResultsItems });
  };

  render() {
    const renderAuthButton = () => {
      if (this.state.favListRender) {
        return (
          <FavList
            delFavItemsID={this.delFavItemsID}
            delResultsItems={this.delResultsItems}
            resultsItems={this.state.resultsItems}
          ></FavList>
        );
      }
    };

    return (
      <div className="App">
        <h1>Guayerd - MELI</h1>
        Una nueva manera de encontar
        <SearchBox result={this.result}></SearchBox>
        <div className="container">
          <div className="row">
            <ResultList
              resultSearched={this.state.data}
              favItems={this.favItemsAdd}
            ></ResultList>
            {renderAuthButton()}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
