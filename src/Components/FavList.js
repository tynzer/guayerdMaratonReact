import React from "react";

export default class FavList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      /* itemsArray: this.props.resultsItems, */
    };
  }

  /*   componentDidMount() {
    let itemsID = JSON.parse(localStorage.getItem("ID_producto"));
    const dataArray = [];
    Promise.all(
      itemsID.map((itemID) =>
        fetch(`https://api.mercadolibre.com/items/${itemID}`)
          .then((res) => res.json())
          .then((data) => {
            dataArray.push(data);
            this.setState({ itemsArray: dataArray });
          })
          .catch((logError) => console.log(logError))
      )
    );
  } */

  handleClick = (id) => {
    let itemsArray = this.props.resultsItems;
    if (itemsArray) {
      const itemsArrayFilter = itemsArray.filter((item) => item.id !== id);
      /*    this.setState({ itemsArray: itemsArrayFilter });  
        console.log("ss",this.state.itemsArray) */
      this.props.delResultsItems(itemsArrayFilter); //guardo el nuevo array en el state padre
      let IDValues = JSON.parse(localStorage.getItem("ID_producto"));
      //search id items
      if (IDValues) {
        let indexFav = IDValues.indexOf(id);
        if (indexFav !== -1) {
          //Vereifico coincida el id a eliminar
          IDValues.splice(indexFav, 1); //guardo el id para eliminar del state
          //saved values
          localStorage.setItem("ID_producto", JSON.stringify(IDValues));
          // si no quedan mas id en el local storage elimina la key y pone en falso el componente para que no renderize
          if (itemsArrayFilter.length <= 0) {
            localStorage.removeItem("ID_producto");
            this.props.delFavItemsID(false);
          }
        }
      }
    }
  };

  /* 

    //get olds values
    let IDValues = JSON.parse(localStorage.getItem("ID_producto"));
    //search id items
    if (IDValues) {
      let indexFav = IDValues.indexOf(id);
      if (indexFav !== -1) {
        //Vereifico coincida el id a eliminar
        let idDeleted = IDValues.splice(indexFav, 1)[0]; //guardo el id para eliminar del state
        //saved values
        localStorage.setItem("ID_producto", JSON.stringify(IDValues));
        //Buscar item adi en array
        let itemsArray = this.state.itemsArray;
        //  buscar en el array el id a eliminnar;
        const itemsArrayFilter = itemsArray.filter(
          (item) => item.id !== idDeleted
        );
        //crea un array sin el el array id encontrado
        this.setState({ itemsArray: itemsArrayFilter });
        // si no quedan mas id en el local storage elimina la key y pone en falso el componente para que no renderize
        if (IDValues.length <= 0) {
          localStorage.removeItem("ID_producto");
          this.props.delFavItemsID(false);
        }
      }
    } 
  };*/

  handleClickDel = () => {
    localStorage.removeItem("ID_producto");
    /*   this.setState({ itemsArray: "" }); */
    this.props.delFavItemsID(false);
    this.props.delResultsItems([]);
  };

  /*    componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar las props):
    if (this.props.resultsItems !== prevProps.resultsItems) {
      let itemsPrev = this.state.itemsArray;
      if (itemsPrev.length >0) {
          console.log("dwa itemps prev", itemsPrev)
        itemsPrev.push(this.props.resultsItems);
        this.setState({ itemsArray: itemsPrev });
      } else {
        this.setState({ itemsArray: itemsPrev });
      }
    }
  } 
 */
  /*      componentWillReceiveProps (newProps) {

console.log(newProps.favItems)
let itemsArrayAdd = this.state.itemsArray
console.log("array will", itemsArrayAdd)
itemsArrayAdd.push(newProps.favItems)
 this.setState({ itemsArray: itemsArrayAdd })
        
     }    */

  render() {
    return (
      <div className="col-sm">
        <h2>
          Lista de favoritos{" "}
          <span>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleClickDel}
            >
              Eliminar
            </button>
          </span>
        </h2>
        <div className="card mb-5">
          {this.props.resultsItems &&
            this.props.resultsItems.map((result) => {
              return (
                <div key={`${result.id}-fav`} className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      className="card-img-top"
                      src={result.thumbnail}
                      alt={result.title}
                    ></img>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{result.title}</h5>
                      <p className="card-text">
                        {" "}
                        Precio : {result.price} {result.currency_id}
                      </p>
                      <div className="row mb-4">
                        <div className="col-12 col-md-8">
                          <p className="card-text">
                            {" "}
                            Stock : {result.available_quantity} / Ventas :{" "}
                            {result.sold_quantity}
                          </p>
                        </div>
                        <div className="col-6 col-md-4">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {
                              this.handleClick(result.id);
                            }}
                          >
                            <i className="fas fa-heart"></i>
                          </button>
                        </div>
                      </div>
                      <a href={result.permalink} className="btn btn-primary">
                        <small>{result.title}</small>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
