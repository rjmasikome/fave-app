import React from 'react';
import './Faves.css';

import { GenericObject } from '../../controllers/type';

class Faves extends React.Component<any> {

  private favesMap: GenericObject;

  constructor(props: React.Props<string>) {
    super(props);
    this.favesMap = {};
  }

  private getProductIndex(id: string) {
    return this.favesMap[id];
  }

  private generateProductsMap(products: GenericObject[]) {

    const productMap: GenericObject = {};
    products.forEach((product: GenericObject, index: number) => {
      productMap[product.productid] = index;
    });
    return productMap;
  }

  private removeFaves(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const productIndex = this.getProductIndex((event.target as HTMLButtonElement).value);
    this.props.removeFaves(productIndex);
  }

  private generateProductsList(products: GenericObject[]) {

    if (!products || !products.length) {
      return(<div></div>);
    }

    const productsList =  products.map((product: GenericObject) => (
      <div key={product.productid} className={`Product-${product.productid} Product-each`}>
        <p>Price: {product.price ? product.price : 'N/A'}</p>
        <button className='btn btn-primary' value={product.productid} onClick={this.removeFaves.bind(this)}>
          Remove
        </button>
        <img src={product.imageURL} alt={product.displayName} height='128' width='128' />
        <p>{product.displayName}</p>
      </div>
    ));

    return(
      <div>
        <h2>Wishlists</h2>
        <div className='Faves-list'>
          {productsList}
        </div>
      </div>
    );
  }

  public render() {

    const faves = this.props.faves ? this.props.faves : [];
    const favesComponent = this.generateProductsList(faves);
    this.favesMap = this.generateProductsMap(faves);
    return (
      <div className='Faves'>
        {favesComponent}
      </div>
    );
  }
}

export default Faves;
