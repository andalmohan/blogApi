const mongoose = require("mongoose");

const URL = `mongodb+srv://abimeeraperumal10:${process.env.PASSWORD}@nishitha.8jv94cv.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => console.log("Connected")).catch((error) => console.log(error));
