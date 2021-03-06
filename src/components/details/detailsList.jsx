import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDetails } from '../../redux/details/details';
import ArrowIcon from '../home/arrowIcon';
import './detail.css';

const DetailsList = ({ name }) => {
  const dispatch = useDispatch();

  const list = [
    {
      id: 0,
      title: 'New Confirmed Cases',
      value: 'newConfirmed',
    },
    {
      id: 1,
      title: 'New Deaths',
      value: 'newDeaths',
    },
    {
      id: 2,
      title: 'Total Confirmed Cases',
      value: 'totalConfirmed',
    },
    {
      id: 3,
      title: 'Total Deaths',
      value: 'totalDeaths',
    },
    {
      id: 4,
      title: 'Total Recovered',
      value: 'totalRecovered',
    },
  ];

  const selectedCountry = useSelector((state) => (
    state.countries.find((country) => country.name === name)
  ));

  useEffect(() => {
    if (selectedCountry !== undefined) {
      dispatch(fetchDetails(selectedCountry.moreInfoLink, selectedCountry.name));
    }
  }, [selectedCountry]);

  const details = useSelector((state) => state.details);
  return (
    <>
      {Object.keys(details).length !== 0 && (
        <ul className="data-details p-0 m-0">
          {list.map((item) => (
            <li key={item.id} className="card rounded-0 d-flex flex-row justify-content-between p-4 text-white">
              <p className="m-0 text-white">
                {item.title}
              </p>
              <div className="d-flex gap-1 align-center">
                {details[item.value]}
                <div className="d-grid align-content-center">
                  <ArrowIcon />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

DetailsList.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DetailsList;
