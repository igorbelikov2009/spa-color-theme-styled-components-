import axios from "axios";
import { useState, useEffect } from "react";

import Card from "../components/Card";
import { List } from "../components/List";
import { Controls } from "../components/Controls";
import { ALL_COUNTRIES } from "../config";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  //   console.log(countries);
  const history = useHistory();

  useEffect(() => {
    axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, []);

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

          return <Card key={country.name} onClick={() => history.push(`/country/${country.name}`)} {...countryInfo} />;
        })}
      </List>
    </>
  );
};

export default HomePage;
