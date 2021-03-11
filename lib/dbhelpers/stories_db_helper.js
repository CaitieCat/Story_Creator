  
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

  const allContributions = (db, story_id) => {
    const values = [story_id];
    const sql = `SELECT * FROM user_contributions WHERE story_id = $1;`
    return db.query(sql, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    }); 
  };

  const storyStart = (db, story_id) => {
    const values = [story_id];
    const sql = `SELECT content FROM stories WHERE id = $1;`
    return db.query(sql, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    }); 
  };

  const storyCompleted = (db, story_id) => {
    const values = [story_id];
    const sql = `UPDATE stories SET story_status = true WHERE id = $1;`
    return db.query(sql, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    }); 
  };

module.exports = { allStories, allContributions, storyStart, storyCompleted }
