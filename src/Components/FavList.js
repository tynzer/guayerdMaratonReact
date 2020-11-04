import React from "react";

export default class FavList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            itemsID: [],
            data: []
        }
    }

    /*   favListItems = (id)=>{
      }
   */
    componentDidMount() {
        let itemsID = JSON.parse(localStorage.getItem("ID_producto")) || [];
        const dataArray = [];
        itemsID.forEach((itemID) => {
            fetch(`https://api.mercadolibre.com/items/${itemID}`).then((res) => { return res.json() })
                .then((data) => {
                    dataArray.push(data)
                    this.setState({ data: dataArray });
                    /*  this.props.result(this.state.data); */
                })
        })
    }

    handleClick = (id) => {
     /*    this.props.favListItems(id); // aca iria el eliminar del array */

        //get olds values
        let IDValues = JSON.parse(localStorage.getItem('ID_producto')) || [];
        //search id items
        let indexFav = IDValues.indexOf(id)
        if (IDValues.indexOf(id) !== -1) { //Vereifico que no este repetido el id
            IDValues.splice(indexFav, 1);
            //saved values
            localStorage.setItem('ID_producto', JSON.stringify(IDValues));
        }
    }


    handleClickDel = () => {
        localStorage.removeItem('ID_producto')
    }

    render() {
        return (
            <div className="col-sm">
                <h2>Lista de favoritos  <span>
                    <button className="btn btn-outline-secondary" type="button" onClick={this.handleClickDel}>Eliminar</button>
                </span></h2>
                <div className="card mb-5">
                    {this.state.data.map(result => {
                        return (
                            <div key={`${result.id}-fav`} className="row no-gutters">
                                <div className="col-md-4">
                                    <img className="card-img-top" src={result.thumbnail} alt={result.title}></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{result.title}</h5>
                                        <p className="card-text"> Precio : {result.price} {result.currency_id}</p>
                                        <div className="row mb-4">
                                            <div className="col-12 col-md-8">
                                                <p className="card-text"> Stock : {result.available_quantity} / Ventas : {result.sold_quantity}</p>
                                            </div>
                                            <div className="col-6 col-md-4">
                                                <button className="btn btn-outline-secondary" type="button" onClick={() => { this.handleClick(result.id) }}>
                                                <i className="fas fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <a href={result.permalink} className="btn btn-primary"><small>{result.title}</small></a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}