import React from 'react';
import './Results.css';

import { GenericObject } from '../../controllers/type';

class Results extends React.Component<any> {

  private products: GenericObject[];
  private productMap: GenericObject;
  private isNotFirstTime: boolean;

  constructor(props: React.Props<string>) {
    super(props);
    this.products = [];
    this.productMap = {};
    this.isNotFirstTime = false;
  }

  private getProduct(id: string) {
    const index = this.productMap[id];
    return this.products[index];
  }

  private generateProductsMap(products: GenericObject[]) {

    const productMap: GenericObject = {};
    products.forEach((product: GenericObject, index: number) => {
      productMap[product.productid] = index;
    });
    return productMap;
  }

  private addToFaves(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const product = this.getProduct((event.target as HTMLButtonElement).value);
    this.props.addToFaves(product);
  }

  private generateProductsComponent(products: GenericObject[], isRequesting: boolean) {

    if (isRequesting) {
      return(
        <div className='Results-loader_parent_container'>
          <div className='Results-loader_container'>
            <div className='Results-loader'></div>
          </div>
        </div>
      );
    }

    if ((!products || !products.length) && this.isNotFirstTime) {
      return(
        <div>
          <h2>No Results Found or Error :(</h2>
        </div>
      );
    }

    if (!products || !products.length) {
      return(<div></div>);
    }

    const productsList =  products.map((product: GenericObject) => (
      <div key={product.productid} className={`Product-${product.productid} Product-each`}>
        <p>Price: {product.price ? product.price : 'N/A'}</p>
        <button className='btn btn-primary' value={product.productid} onClick={this.addToFaves.bind(this)}>
          Fave
        </button>
        <img src={product.imageURL} alt={product.displayName} height='128' width='128' />
        <p>{product.displayName}</p>
      </div>
    ));

    return(
      <div>
        <h2>Search Results</h2>
        <div className='Results-list'>
          {productsList}
        </div>
      </div>
    );
  }

  public render() {

    if (this.props.isRequesting) {
      this.isNotFirstTime = true;
    }

    this.products = this.props.data && this.props.data.products ? this.props.data.products : [];
    this.productMap = this.generateProductsMap(this.products);
    const productsComponent = this.generateProductsComponent(this.products, this.props.isRequesting);
    return (
      <div className='Results'>
        {productsComponent}
      </div>
    );
  }
}

export default Results;
