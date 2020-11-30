import React from "react";
import ResultItem from "./ResultItem";

export default class ResultList extends React.Component {
  render() {
    return (
      <div className="col-sm">
        <h2>Resultados de busqueda </h2>
        <ResultItem
          resultSearched={this.props.resultSearched}
          favItems={this.props.favItems}
        ></ResultItem>
      </div>
    );
  }
}
