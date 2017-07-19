const yargs = require("yargs");

const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) console.log(errorMessage);
  else {
    console.log(results.Address);
    weather.getWeather(results, (error, response) => {
      if (error) console.log(error);
      else
        console.log(
          `It's currently ${response.Temperature}. It feels like ${response.ApparentTemperature}`
        );
    });
  }
});

// 081fa797a05f45eb541fdc030d86969b
// https://api.darksky.net/forecast/081fa797a05f45eb541fdc030d86969b/37.8267,-122.4233
