import React, { ChangeEvent } from 'react';
import './Search.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { request } from '../../controllers/request';
import { Action, GenericObject, RequestState } from '../../controllers/type';
import Results from '../Results/Results';
import Faves from '../Faves/Faves';

const ENTER_KEY_CODE = 13;

class Search extends React.Component<GenericObject> {

  private searchTerm: string;
  private faves: GenericObject[];

  constructor(props: GenericObject) {
    super(props);
    this.searchTerm = '';
    this.faves = [];
  }

  private changeText(event: ChangeEvent<HTMLInputElement>)  {
    this.searchTerm = event.target.value;
  }

  private searchByEnter(event: React.KeyboardEvent<HTMLInputElement>) {

    const keyCode = event.keyCode || event.which;

    if (!keyCode || keyCode !== ENTER_KEY_CODE) {
      return;
    }

    this.props.request(this.searchTerm);
  }

  private searchByClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.props.request(this.searchTerm);
  }

  private addToFaves(product: GenericObject) {
    this.faves.push(product);
    this.setState({faves: this.faves});
  }

  private removeFaves(productIndex: number) {
    this.faves.splice(productIndex, 1);
    this.setState({faves: this.faves});
  }

  public render() {
    return (
      <div className='Search'>
        <header className='Search-header'>
          <h1>Sneakers Wishlist</h1>
          <div className='Search-FieldAndButton'>
            <input
              className='Search-TextField'
              type='text'
              name='searchTerm'
              onChange={this.changeText.bind(this)}
              onKeyDown={this.searchByEnter.bind(this)}
            />
            <button className='btn btn-primary' onClick={this.searchByClick.bind(this)}>
              Search
            </button>
          </div>
        </header>
        <Results
          data={this.props.data}
          addToFaves={this.addToFaves.bind(this)}
          isRequesting={this.props.isRequesting}
        />
        <Faves
          faves={this.faves}
          removeFaves={this.removeFaves.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (reducerState: GenericObject) => {

  const requested: RequestState = reducerState.request;
  return {
    isRequesting: requested.isRequesting,
    searchTerm: requested.searchTerm,
    data: requested.data,
  };
};

const mapDispatchToProps = (dispatch: (action: Action) => any) =>
  bindActionCreators(
    {
      request,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
