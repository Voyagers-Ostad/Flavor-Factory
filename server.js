require("dotenv").config();
const app = require('./app')
const port= process.env.PORT || 4000;
app.listen(port, function () {
    console.log(`Backend Server Running on ....${port}`)
})