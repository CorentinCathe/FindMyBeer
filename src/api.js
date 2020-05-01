const API_KEY = "AIzaSyDWaWVjw-oi0pL5VlhhoznSZc3HR5Fopnc";

const useApi = {
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
                .then((jsonResponse) => resolve(jsonResponse))
                .catch((err) => reject(err));
        }),
    getNearbyBreweries: (lat, long, dist) =>
        new Promise((resolve, reject) => {
            const NEARBY_BREWERIES_DETAILS = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public-us&geofilter.distance=${lat}%2C+${long}%2C+${dist}`;
            fetch(NEARBY_BREWERIES_DETAILS)
                .then((response) => response.json())
                .then((jsonResponse) => resolve(jsonResponse))
                .catch((err) => reject(err));
        }),
    getBeersByID: (brewery_id) =>
        new Promise((resolve, reject) => {
            const BEER_API_DETAILS = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=brewery_id%3D${brewery_id}`;
            fetch(BEER_API_DETAILS)
                .then((response) => response.json())
                .then((jsonResponse) => resolve(jsonResponse))
                .catch((err) => reject(err));
        }),
    getBreweryByID: (brewery_id) =>
        new Promise((resolve, reject) => {
            const BREWERY_API_DETAILS = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public-us&q=id%3D${brewery_id}`;
            fetch(BREWERY_API_DETAILS)
                .then((response) => response.json())
                .then((jsonResponse) => resolve(jsonResponse))
                .catch((err) => reject(err));
        })
};

export default useApi;