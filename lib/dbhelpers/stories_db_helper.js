  
const allStories = (db) => {
  const sql = `SELECT * FROM stories;`
    return db.query(sql)
    .then((data) => {
      const stories = data.rows
      return stories;
      })
    .catch((err) => {
      console.log("error: ", err);
          }); 
  };

  const allContributions = (db) => {
    const sql = `SELECT * FROM user_contributions;`
    return db.query(sql)
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    }); 
  };

module.exports = { allStories, allContributions }
