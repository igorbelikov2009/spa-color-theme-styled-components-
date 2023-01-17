import axios from "axios";

import { useState, useEffect } from "react";

import Card from "../components/Card";
import { List } from "../components/List";
import { Controls } from "../components/Controls";
import { ALL_COUNTRIES } from "../config";
import { useHistory } from "react-router-dom";

const HomePage = ({ countries, setCountries }) => {
  const [filtredCountries, setFiltredCountries] = useState(countries);
  // console.log(filtredCountries);
  const { push } = useHistory();

  // К нам приходит "search" из строки поиска и какой-то "region" из селектора
  const handleSearch = (search, region) => {
    // Изначальные данные "data" - все страны
    let data = [...countries];

    // Дальше, если есть "region", то делаем фильтрацию по региону.
    if (region) {
      // data.filter возьми каждую страну, возьми, полученный в ней, "region" и проверь:
      // содержит ли он тот регион, который был выбран.
      data = data.filter((country) => country.region.includes(region));
    }

    // Если есть поисковая строка "search", то делаем фильтр ещё и по ней. data могла уже
    // измениться, могла не измениться, делаем фильтр по тому, что ввёл пользователь.
    if (search) {
      // data.filter возьми каждую страну, возьми её оригинальное название, приведи его к
      // нижнему регистру, проверь includes, и смотри, что поисковая строка маленького
      // регистра есть в составе оригинального названия.
      data = data.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));
    }
    // Получаем усечённый вариант нашего набора стран, и именно его сохраним
    setFiltredCountries(data);
  };

  useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filtredCountries.map((country) => {
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
