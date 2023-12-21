// Upp 2: Använd express och skapa en server

// Använd express och skapa en server
const express = require("express");
const server = express();

// Konfig servern för JSON samt URL encoded data samt möjliggöra CORS
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

// Upp 2: Lyssna på port 3000 och logga att servern är igång
const port = 3000;

server.listen(3000, () => console.log("Server running"));

// Upp 2: Skapa en GET-route för "/users"

server.get("/users", (req, res) => {
  // användt sqlite3 samt skapas en databaskoppling
  const sqlite3 = require("sqlite3").verbose(); // upp 3
  const db = new sqlite3.Database("./gik339-labb2.db");

  db.all("SELECT * FROM users", [], (err, rows) => {
    // om uppstår fel, skickar felmeddelande och statuskod 500 till klienten
    if (err) {
      res.status(500).send(err);
    } else {
      // Skicka resultatet tillbaka till klienten i JSON-format
      res.json(rows);
    }

    // Stäng databaskopplingen när förfrågan klar
    db.close((err) => {
      if (err) {
        console.error("Stänga databas går ej", err.message);
      } else {
        console.log("Ingen koppling till databasen");
      }
    });
  });
});
