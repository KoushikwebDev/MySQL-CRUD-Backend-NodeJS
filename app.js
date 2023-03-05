import express from "express";
import db from "./database.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//? Connecting to the Pool 🚀🚀
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log("Connected to MySql DataBase " + result[0]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//? Create Connection 🚀🚀
db.connect((err) => {
  if (err) {
    console.log("Connecton failed " + JSON.stringify(err));
  } else {
    console.log("Db connection Sucessfully Established");
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello MySQL </h1>");
});

//? GetDataAll 🚀🚀
app.get("/getdataall", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        succes: false,
        error: err,
      });
    } else {
      console.log(rows);
      res.status(200).json({
        succes: true,
        data: rows,
      });
    }
  });
});

//? GetData of a single Row 🚀🚀
app.get("/getdata/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id=?", [id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        succes: false,
        error: err,
      });
    } else {
      console.log(rows);
      res.status(200).json({
        succes: true,
        data: rows,
      });
    }
  });
});

//? Delete Data of a row 🚀🚀

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id=?", [id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        succes: false,
        error: err,
      });
    } else {
      console.log(rows);
      res.status(200).json({
        succes: true,
        data: rows,
      });
    }
  });
});

// Heading:
//? Insert Data to a Table (a row will added to table) 🚀🚀

app.post("/add", (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  // const data = [title, price, description, imageUrl];
  const data = Object.values(req.body);
  db.query(
    "INSERT INTO products(title,price,description,imageUrl) values(?)",
    [data],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.json({
          error: err,
        });
      } else {
        console.log(rows);
        res.json({
          data: rows,
        });
      }
    }
  );
});

//? Patch 🚀🚀🚀 Update a row data

app.patch("/update", (req, res) => {
  const { id } = req.body;

  db.query("UPDATE products SET ? WHERE id=" + id, [req.body], (err, rows) => {
    if (err) {
      console.log(err);
      res.json({
        error: err,
      });
    } else {
      console.log(rows);
      res.json({
        data: rows,
      });
    }
  });
});

//? PUT 🚀🚀🚀 it will inset new row(Data), if row id not data in a table

app.put("/updatedata", (req, res) => {
  const { id, title, price, description, imageUrl } = req.body;
  const data = [title, price, description, imageUrl];

  db.query("UPDATE products SET ? WHERE id=" + id, [req.body], (err, rows) => {
    if (err) {
      console.log(err);
      res.json({
        error: err,
      });
    } else {
      if (rows.affectedRows === 0) {
        db.query(
          "INSERT INTO products(title,price,description,imageUrl) values(?)",
          [data],
          (err, rows) => {
            if (err) {
              console.log(err);
              res.json({
                error: err,
              });
            } else {
              console.log(rows);
              res.json({
                data: rows,
              });
            }
          }
        );
      } else {
        console.log(rows);
        res.json({
          data: rows,
        });
      }
    }
  });
});

app.listen(3000, () => {
  console.log("App is running at port  " + 3000);
});
