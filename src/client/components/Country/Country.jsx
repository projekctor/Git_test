import React from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import Select from 'react-select';
import { countryStoreShape } from '../../stores/CountryStore';
import { currencyStoreShape } from '../../stores/CurrencyStore';

@inject('countryStore', 'currencyStore')
@observer
class Country extends React.Component {
  handleCountryChange = (selectedOption) => {
    runInAction(() => {
      this.props.countryStore.setCountry(selectedOption);
      const defCurrency = this.props.countryStore.getDefCurrency();
      this.props.currencyStore.setCurrency({ value: defCurrency });
    });
  };

  render() {
    return (
      <div>
        <div className="lab">Country</div>
        <div className="l2" />
        <div className="l3">
          <Select
            id="country"
            name="countries"
            clearable={false}
            deleteRemoves={false}
            value={this.props.countryStore.getCurCountry()}
            onChange={this.handleCountryChange}
            options={this.props.countryStore.getCountryList()}
          />
        </div>
      </div>
    );
  }
}

Country.propTypes = {
  countryStore: countryStoreShape.isRequired,
  currencyStore: currencyStoreShape.isRequired,
};

export default Country;
