import { observable, action, runInAction } from 'mobx';
import {
  createSimpleSchema,
  serialize,
  deserialize,
} from 'serializr';
import PropTypes from 'prop-types';

const CurrencySchema = createSimpleSchema({
  currency: true,
});

class CurrencyStore {
  @observable currency = '';
  @observable loading = true;
  @observable currencies = [];
  @observable error = '';

  constructor() {
    this.getData();
  }

  @action setCurrency(incurrency) {
    if (this.currency === incurrency.value) return;
    this.currency = incurrency.value;
    const r = this.currencies.items.find(param => param._id === this.currency);
    if (r === undefined) {
      localStorage.removeItem('Currency');
    } else {
      const json = JSON.stringify(serialize(CurrencySchema, this));
      localStorage.setItem('Currency', json);
    }
    ;
  }

  @action getData() {
    this.loading = true;
    fetch('https://api.pleasepay.co.uk/currencies')
      .then(res => (res.json()))
      .then((data) => {
        runInAction(() => {
          this.currencies = data;
          this.loading = false;
          try {
            const ls = localStorage.getItem('Currency');
            if (ls) {
              const deser = deserialize(CurrencySchema, JSON.parse(ls));
              this.currency = deser.currency;
            }
          } catch (e) {
            localStorage.removeItem('Currency');
            console.log('Error in serializr');
            console.log(e.message);
          }
        });
      })
      .catch((err) => {
        console.log('Error in getData');
        console.log(err.message);
        this.error = err.message;
      });
  }

  getCurrencyList() {
    return this.currencies.items.map(param => ({value: param._id, label: param.translations.en}));
  }

  getCurCurrency() {
    const r = this.currencies.items.find(param => param._id === this.currency);
    if (r === undefined) return {};
    return {value: r._id, label: r.translations.en};
  }
};

export default CurrencyStore;

export const currencyStoreShape = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string.isRequired,
});
