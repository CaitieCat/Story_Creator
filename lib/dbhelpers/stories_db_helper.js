  
const allStories = (db) => {
  console.log("hi");
  const sql = `SELECT * FROM stories;`
    return db.query(sql)
    .then((data) => {
      console.log(data.rows);
      return data.rows;
      })
    .catch((err) => {
      console.log("error: ", err);
          }); 
  };

module.exports = { allStories }
