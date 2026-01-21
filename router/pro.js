const express = require('express');
const router = express.Router();
const pool = require('../pool.js');

router.get("/v1", (req, res) => {
	const $name = req.query.name;
	const $x = req.query.x;
	const $y = req.query.y;
	const $time = req.query.time;
	const $events= req.query.events
	const $detail= req.query.detail
	const $index= req.query.index
	const $level= req.query.level
	const $ifNew= req.query.ifNew


	var sql = "INSERT INTO log(player, position_x, position_y, events, details, clue_idx, level, ifNew, unix_time) VALUES (?,?,?,?,?,?,?,?,?);";
	pool.query(sql,[$name,$x,$y,$events,$detail,$index,$level,$ifNew,$time],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	})
});

router.get("/login", (req, res) => {
	const $name = req.query.name;
	const $pass = req.query.pass;
	const $code = req.query.code;

	var sql = "select * from user where name=? and password=?";
	pool.query(sql,[$name,$pass],(err,result)=>{
		if(err) throw err;

		if(result.length>0){
			let a = result[0].level
			res.send(""+a+""); // go into the game
		}else{
			res.send("-1"); // password wrong
		}
	})
});

router.get("/new", (req, res) => {
	const $name = req.query.name;
	const $pass = req.query.pass;
	let $code = req.query.code;
	console.log($code)
	if($code == ''){
		$code = 0
	}

	var sql = "select * from user where name=?";
	pool.query(sql,[$name,$pass],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
				res.send("0"); // name already existed
		}else{
				var sql = "INSERT INTO user(name, password, code, level) VALUES (?,?,?,0);";
				pool.query(sql,[$name,$pass,$code],(err,result)=>{
				if(err) throw err;
				res.send("1"); //start game
			})
			}
	})
});

router.get("/levelUp", (req, res) => {
	const $name = req.query.name;
	const $level = req.query.level;

	var sql = "UPDATE user SET level = ? WHERE name = ?;";
	pool.query(sql,[$level,$name],(err,result)=>{
		if(err) throw err;
		
	})
});

module.exports = router;

