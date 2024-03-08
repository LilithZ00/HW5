import express from "express";
import { conn, queryAsync } from "../dbcon";

import mysql from "mysql";
import { person_req } from "../model/person";

export const router = express.Router();

// สร้าง Endpoint เพื่อดึงข้อมูลมนุษย์ทั้งหมด
router.get("/", async (req, res) => {
    const sql = "select * from HW_5_person";
    conn.query(sql, (err, result) => {
      res.status(200);
      res.json(result);
    });
});

//insert
router.post("/insert_person", (req, res) => {
    const person: person_req = req.body;
    console.log(person);
    let sql = "insert into HW_5_person(name_person,img_person,info_person,type,id_movie) values (?,?,?,?,?)";
    sql = mysql.format(sql, [
        person.name_person, 
        person.img_person, 
        person.info_person, 
        person.type, 
        person.id_movie
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
    const sql = "delete from HW_5_person where id_person = ?";
    conn.query(sql,[id], (err, result) => {
      res.status(200);
      res.json(result);
    });
});