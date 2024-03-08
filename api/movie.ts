import express from "express";
import { conn, queryAsync } from "../dbcon";
import { movie_req } from "../model/movie";
import mysql from "mysql";

export const router = express.Router();

// สร้าง Endpoint เพื่อดึงข้อมูลหนังทั้งหมด
router.get("/:name", async (req, res) => {
  const name = req.params.name;
  const sql = "SELECT * FROM HW_5_movie INNER JOIN HW_5_person ON HW_5_movie.id_movie = HW_5_person.id_movie WHERE HW_5_movie.name_movie LIKE ?";
  conn.query(sql, [`%${name}%`], (err, result) => {
    if (err) {
      // Handle error
      console.error(err);
      res.status(500).json({ error: 'An error occurred while executing the query' });
    } else {
      res.status(200).json(result);
    }
  });
});


//insert
router.post("/insert_movie", (req, res) => {
    const movie: movie_req = req.body;
    console.log(movie);
    let sql = "insert into HW_5_movie(name_movie,img_movie,trailer_movie,story_movie,score_movie) values (?,?,?,?,?)";
    sql = mysql.format(sql, [
        movie.name_movie, 
        movie.img_movie, 
        movie.trailer_movie, 
        movie.story_movie, 
        movie.score_movie
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res.status(201).json({
        affected_row: result.affectedRows,
        last_idx: result.insertId,
      });
    });
  });

  //delete
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const sql = "delete from HW_5_movie where id_movie = ?";
    conn.query(sql,[id], (err, result) => {
      res.status(200);
      res.json(result);
    });
});

