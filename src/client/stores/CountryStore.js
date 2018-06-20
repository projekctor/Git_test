import { observable, action, runInAction } from 'mobx';
import {
  createSimpleSchema,
  serialize,
  deserialize,
} from 'serializr';
import PropTypes from 'prop-types';

const CountrySchema = createSimpleSchema({
  country: true,
});

class CountryStore {
  @observable country = '';
  @observable loading = true;
  @observable countries = [];
  @observable error = '';

  constructor() {
    this.getData();
  }

  @action getData() {
    this.loading = true;
    fetch('https://api.pleasepay.co.uk/countries')
      .then(res => (res.json()))
      .then((data) => {
        runInAction(() => {
          this.countries = data;
          this.loading = false;
          try {
            const ls = localStorage.getItem('Country');
            if (ls) {
              const deser = deserialize(CountrySchema, JSON.parse(ls));
              this.country = deser.country;
            }
          } catch (e) {
            localStorage.removeItem('Country');
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

  @action setCountry(incountry) {
    if (this.country === incountry.value) return;
    this.country = incountry.value;
    const r = this.countries.items.find(param => param._id === this.country);
    if (r === undefined) {
      localStorage.removeItem('Country');
    } else {
      const json = JSON.stringify(serialize(CountrySchema, this));
      localStorage.setItem('Country', json);
    }
  }

  getCountryList() {
    return this.countries.items.map(param => ({ value: param._id, label: param.translations.en }));
  }

  getCurCountry() {
    const r = this.countries.items.find(param => param._id === this.country);
    if (r === undefined) return {};
    return { value: r._id, label: r.translations.en };
  }

  getDefCurrency() {
    const r = this.countries.items.find(param => param._id === this.country);
    if (r === undefined) return {};
    return r.preferredCurrency.id;
  }
}

export default CountryStore;

export const countryStoreShape = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  country: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string.isRequired,
});
