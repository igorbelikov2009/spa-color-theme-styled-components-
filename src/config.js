// Смотрим сюда https://restcountries.com/#api-endpoints-v2 и берём отсюда
// эндпоинты "all" , "/name/" , "alpha?codes="
const BASE_URL = "https://restcountries.com/v2/";

export const ALL_COUNTRIES = BASE_URL + "all?fields=name,capital,flags,population,region";

// Принимает имя страны (name) и это имя страны добавляем в конец
export const searchByCountriy = (name) => BASE_URL + "/name/" + name;

export const filterByCode = (codes) => BASE_URL + "alpha?codes=" + codes.join(",");
