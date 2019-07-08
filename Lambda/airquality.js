const request = require('request');

(function() {
 
 function DescribePollutants(filterFunction, callback)
 {
   request('http://airquality.derrycreativescollective.com/', function (error, response, body) {
    var AllReadings = JSON.parse(body);
    var readings = AllReadings.filter(filterFunction);
    if (readings.length == 0) 
    {
     callback("Sorry, no data available");
    }
    else
    {
     var output = "The daily mean of ";
     for(var i in readings)
     {
      var reading = readings[i];
      /*
        "Date": "03/07/2019",
        "Site": "Armagh Lonsdale Road",
        "Pollutant": "NO",
        "Daily_Mean": "26",
        "Status": "P",
        "Unit": "µg/m³"
      */
      output += NamePollutant(reading.Pollutant) + "  is " + reading.Daily_Mean + " " + reading.Unit + ", ";
     }
     output += " at " + readings[0].Site;
     callback(output);
    }
   });
 }
 

 module.exports.NitrogenOxide = function(city, callback){
    DescribePollutants(function(reading)
    { 
      return (reading.Pollutant == "NO" || reading.Pollutant == "NO₂" || reading.Pollutant == "NOₓ as NO₂") && 
      reading.Site.indexOf(city) != -1 && 
      reading.Daily_Mean != "nodata" 
    },callback);
 };
 
  module.exports.NitrogenOxide = function(city, callback){
    DescribePollutants(function(reading)
    { 
      return (reading.Pollutant == "NO" || reading.Pollutant == "NO₂" || reading.Pollutant == "NOₓ as NO₂") && 
      reading.Site.indexOf(city) != -1 && 
      reading.Daily_Mean != "nodata" 
    },callback);
 };
 
 module.exports.ParticulateMatter = function(city, callback){
    DescribePollutants(function(reading)
    { 
      return (reading.Pollutant == "PM₁₀" || reading.Pollutant == "Non-volatile PM₁₀" || reading.Pollutant == "Volatile PM₁₀" || reading.Pollutant == "PM₂.₅") && 
      reading.Site.indexOf(city) != -1 && 
      reading.Daily_Mean != "nodata" 
    },callback);
 };
 
 module.exports.SulfurDioxide = function(city, callback){
    DescribePollutants(function(reading)
    { 
      return (reading.Pollutant == "SO₂") && 
      reading.Site.indexOf(city) != -1 && 
      reading.Daily_Mean != "nodata" 
    },callback);
 };
 
 module.exports.Ozone = function(city, callback){
    DescribePollutants(function(reading)
    { 
      return (reading.Pollutant == "O₃") && 
      reading.Site.indexOf(city) != -1 && 
      reading.Daily_Mean != "nodata" 
    },callback);
 };
 
 module.exports.CarbonMonoxide = function(city, callback){
    DescribePollutants(function(reading)
    { 
      return (reading.Pollutant == "CO") && 
      reading.Site.indexOf(city) != -1 && 
      reading.Daily_Mean != "nodata" 
    },callback);
 };
 
 function NamePollutant(pollutant)
 {
   switch(pollutant) 
   {
     case "NO": return "nitrogen oxide";
     case "NO₂": return "nitrogen dioxide";
     case "NOₓ as NO₂": return "Nitrous oxide";
     case "PM₁₀": return "Particulate Matter";
     case "Non-volatile PM₁₀": return "Non-Volatile Particulate Matter";
     case "Volatile PM₁₀": return "Volatile Particulate Matter";
     case "SO₂": return "Sulfur dioxide";
     case "O₃": return "Ozone";
     case "CO": return "Carbon monoxide";
     case "PM₂.₅": return "Fine particulate matter";
     default: return pollutant;
   }
 }
 
})();