// Actions
const GET_DETAILS = 'GET_DETAILS';
// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_DETAILS:
      return action.payload;
    default: return state;
  }
}

// Action Creators
export const fetchDetails = (moreInfoLink, name) => async (dispatch) => {
  const getYesterdayDate = (d) => new Date(d.getTime() - 24 * 60 * 60 * 1000);
  let d = new Date();
  if (d.getUTCHours() <= 9) {
    d = getYesterdayDate(d);
  }
  const currentDate = d.toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-');
  const url = 'https://api.covid19tracking.narrativa.com';
  const response = await fetch(`${url}${moreInfoLink}`)
    .then((res) => (
      res.json().then((json) => {
        const country = json.dates[currentDate].countries[name];
        return {
          name: country.name,
          totalConfirmed: country.today_confirmed,
          totalDeaths: country.today_deaths,
          totalRecovered: country.today_recovered,
          newConfirmed: country.today_new_confirmed,
          newDeaths: country.today_new_deaths,
          source: country.source,
        };
      })
    )).catch(() => []);

  dispatch({
    type: GET_DETAILS,
    payload: response,
  });
};
