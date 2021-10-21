const { table } = require("console");
var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var queueEspera = [];
var tablas = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tablas", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(tablas);
});

app.get("/api/tables/:tables", function (req, res) {
    var chosen = req.params.tablas;

    for (var i = 0; i < table.length; i++) {
        if (chosen === table[i].customerName) {
            return res.json(table[i]);
        }
    }
    return res.json(false);
});

app.get("/api/queueEspera", function (req, res) {
    return res.json(queueEspera);
});

app.post("/api/tables", function (req, res) {
    var newReservation = req.body;
    if (tablas.length < 5) {
        tablas.push(newReservation);
        res.json(newReservation);
    }
    else{ res.json(false); }
    
});

app.post("/api/queueEspera", function (req, res) {
    var newReservation = req.body;
    console.log(newReservation);
    queueEspera.push(newReservation);
    res.json(newReservation);    
});

app.listen(PORT, () => { console.log(PORT);
});