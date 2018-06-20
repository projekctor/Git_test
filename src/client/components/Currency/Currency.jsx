import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'react-select';
import { currencyStoreShape } from '../../stores/CurrencyStore';

@inject('currencyStore')
@observer
class Currency extends React.Component {
  handleCurrencyChange = (selectedOption) => {
    this.props.currencyStore.setCurrency(selectedOption);
  };

  render() {
    return (
      <div>
        <div className="lab">Currency</div>
        <div className="l2" />
        <div className="l3">
          <Select
            name="currencies"
            clearable={false}
            deleteRemoves={false}
            searchable={false}
            value={this.props.currencyStore.getCurCurrency()}
            onChange={this.handleCurrencyChange}
            options={this.props.currencyStore.getCurrencyList()}
          />
        </div>
      </div>
    );
  }
}


Currency.propTypes = {
  currencyStore: currencyStoreShape.isRequired,
};

export default Currency;
