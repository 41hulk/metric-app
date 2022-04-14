// Actions
const GET_DATA_COUNTRIES = 'GET_COUNTRIES';
const ORDER_BY_DEATHS = 'ORDER_BY_DEATHS';
const ORDER_BY_CASES = 'ORDER_BY_CASES';

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_DATA_COUNTRIES:
      return action.payload.sort((a, b) => Number(b.totalNewDeaths) - Number(a.totalNewDeaths));
    case ORDER_BY_DEATHS:
      return state.slice().sort((a, b) => Number(b.totalNewDeaths) - Number(a.totalNewDeaths));
    case ORDER_BY_CASES:
      return state.slice().sort((a, b) => Number(b.totalNewCases) - Number(a.totalNewCases));
    default: return state;
  }
}

// Action creators
export const orderByDeaths = () => ({
  type: ORDER_BY_DEATHS,
});

export const orderByCases = () => ({
  type: ORDER_BY_CASES,
});

export const getCountries = () => async (dispatch) => {
  const getYesterdayDate = (d) => new Date(d.getTime() - 24 * 60 * 60 * 1000);
  let d = new Date();
  if (d.getUTCHours() <= 9) {
    d = getYesterdayDate(d);
  }
  const currentDate = d.toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-');
  const url = 'https://api.covid19tracking.narrativa.com/api';
  const response = await fetch(`${url}/${currentDate}`)
    .then((res) => (
      res.json().then((json) => {
        const { countries } = json.dates[currentDate];

        return Object.keys(countries).map((key, index) => ({
          id: index,
          name: countries[key].name,
          totalNewDeaths: countries[key].today_new_deaths,
          totalNewCases: countries[key].today_new_confirmed,
          moreInfoLink: countries[key].links[0].href,
        }));
      })
    ))
    .catch(() => []);
  dispatch({
    type: GET_DATA_COUNTRIES,
    payload: response,
  });
};
