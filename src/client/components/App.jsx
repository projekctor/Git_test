import React from 'react';
import { observer, inject } from 'mobx-react';
import Country from './Country';
import Currency from './Currency';
import { countryStoreShape } from '../stores/CountryStore';
import { currencyStoreShape } from '../stores/CurrencyStore';

@inject('countryStore', 'currencyStore')
@observer
class App extends React.Component {

  render() {
    if ((this.props.countryStore.error !== '') || (this.props.currencyStore.error !== '')) {
      return (<div> <span>Error...try to reload page</span> </div>);
    } else if (this.props.countryStore.loading || this.props.currencyStore.loading) {
      return (<div> <span>Loading...</span> </div>);
    }
    return (
      <div className="container">
        <div className="Dropdowns">
          <Country />
          <div className="Pause" />
          <Currency />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  countryStore: countryStoreShape.isRequired,
  currencyStore: currencyStoreShape.isRequired,
};

export default App;
