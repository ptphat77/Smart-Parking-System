const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const data = new FormData();
data.append("srcImg", fs.createReadStream("numberPlate.jpg"));
data.append("Session", "string");

const options = {
  method: "POST",
  url: "https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/",
  headers: {
    "X-RapidAPI-Key": "e1add10806msh14920801023e5b1p122da9jsnc097b5e541ef",
    "X-RapidAPI-Host": "pen-to-print-handwriting-ocr.p.rapidapi.com",
    ...data.getHeaders(),
  },
  data: data,
};

const request = async () => {
  try {
    const response = await axios.request(options);
    let numberPlate = response.data.value;
    numberPlate = numberPlate.replace(/\s/g, ""); // remove space and \n character
    console.log(numberPlate);
  } catch (error) {
    console.error(error);
  }
};

request();
