import React from "react";

export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            data: []
        }
    }

    handleClick = (id) => {
        /*    this.props.favListItems(id); */ // aca iria el push del array
        //get olds values
        let IDValues = JSON.parse(localStorage.getItem('ID_producto')) || [];
        //push new value
        if (IDValues.indexOf(id) === -1) { //Vereifico que no este repetido el id
            IDValues.push(id);
            //saved values
            localStorage.setItem('ID_producto', JSON.stringify(IDValues));
        }
    }



    render() {
        console.log(this.props.resultSearched)
        return (
            <div className="card mb-5">
                {this.props.resultSearched.map(result => {
                    return (
                        <div key={result.id} className="row no-gutters">
                            <div className="col-md-4">
                                <img className="card-img-top" src={result.thumbnail} alt={result.title}></img>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{result.title}</h5>
                                    <p className="card-text"> Precio : {result.price} {result.currency_id}</p>
                                    <div className="row mb-4">
                                        <div className="col-12 col-md-8"><p className="card-text">
                                            Stock : {result.available_quantity} / Ventas : {result.sold_quantity}</p></div>
                                        <div className="col-6 col-md-4"><button className="btn btn-outline-secondary" type="button" onClick={() => { this.handleClick(result.id) }}>
                                            <i className="far fa-heart"></i></button>
                                        </div>
                                    </div>
                                    <a href={result.permalink} className="btn btn-primary"><small>{result.title}</small></a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}





