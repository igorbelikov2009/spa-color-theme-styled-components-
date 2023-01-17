import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";

import Card from "../components/Card";
import { List } from "../components/List";
import { Controls } from "../components/Controls";
import { ALL_COUNTRIES } from "../config";
import { useHistory } from "react-router-dom";

const HomePage = ({ countries, setCountries }) => {
  // const [countries, setCountries] = useState([]);
  // console.log(countries);
  const { push } = useHistory();

  useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  return (
    <>
      <Controls />
      <List>
        {countries.map((country) => {
          const countryInfo = {
            img: country.flags.png,
            name: country.name,
            info: [
              {
                title: "Population",
                description: country.population.toLocaleString(),
              },
              {
                title: "Region",
                description: country.region,
              },
              {
                title: "Capital",
                description: country.capital,
              },
            ],
          };

          return (
            <Card
              key={country.name}
              onClick={() => {
                push(`/country/${country.name}`);
                console.log(country.name);
                console.log(`/country/${country.name}`);
              }}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};

export default HomePage;
