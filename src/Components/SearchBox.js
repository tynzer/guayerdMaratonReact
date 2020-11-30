import React from "react";
export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
    };
  }

  componentDidMount() {
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=Atari%2060")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ data: data.results });
        this.props.result(this.state.data);
      });
  }

  handleClick = () => {
    this.serch(this.state.value);
  };

  /*     onKeyUp = (event) => {  
            console.log("evento")
            if (event.key === "13") {
                this.serch(this.state.value);
            }
        } */

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  serch = (value) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${value}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ data: data.results });
        this.props.result(this.state.data);
      });
  };

  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese su busqueda"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={this.state.value}
          onChange={this.handleChange}
        ></input>
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.handleClick} /*  onKeyPress={this.onKeyUp} */
          >
            {" "}
            Buscar
          </button>
        </div>
      </div>
    );
  }
}
