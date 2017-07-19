const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios
  .get(geocodeUrl)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS")
      throw new Error("Unable to find that address");
    let Latitude, Longitud;
    with (response.data.results[0]) {
      Latitude = geometry.location.lat;
      Longitud = geometry.location.lng;
      console.log(formatted_address);
    }
    const weatherUrl = `https://api.darksky.net/forecast/081fa797a05f45eb541fdc030d86969b/${Latitude},${Longitud}`;
    return axios.get(weatherUrl);
  })
  .then(response => {
    with (response.data.currently)
      console.log(
        `It's currently ${temperature}. It feels like ${apparentTemperature}.`
      );
  })
  .catch(e => {
    if (e.code === "ENOTFOUND") console.log("Unable to connect to API server.");
    else console.log(e.message);
  });
