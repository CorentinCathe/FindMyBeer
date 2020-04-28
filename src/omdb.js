const API_KEY = "AIzaSyDWaWVjw-oi0pL5VlhhoznSZc3HR5Fopnc";

const useCityApi = {
  bySearch: (search) =>
    new Promise((resolve, reject) => {
      const CITY_API_DETAILS = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input=${search}&inputtype=textquery&fields=geometry`;

      fetch(CITY_API_DETAILS)
        .then((response) => response.json())
        .then((jsonResponse) => resolve(jsonResponse))
        .catch((err) => reject(err));
    }),
  forAutoCompleted: (search) =>
    new Promise((resolve, reject) => {
      const CITY_API_AUTOCOMPLETES = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input=${search}&inputtype=textquery&fields=geometry`;
      fetch(CITY_API_AUTOCOMPLETES)
        .then((response) => response.json())
        .then((jsonResponse) => resolve(jsonResponse)
        .catch((err)=>reject(err)));
    }),
};

export default useCityApi;
