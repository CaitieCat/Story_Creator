// function to return all functions  
const allStories = (db) => {
  const sql = `SELECT * FROM stories;`;
  return db.query(sql)
    .then((data) => {
      const stories = data.rows;
      return stories;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

// function to return specific user story 

// function to return all contributions
const allContributions = (db, story_id) => {
  const values = [story_id];
  const sql = `SELECT * FROM user_contributions WHERE story_id = $1;`;
  return db.query(sql, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};
// function to return the start of a story
const storyStart = (db, story_id) => {
  const values = [story_id];
  const sql = `SELECT content FROM stories WHERE id = $1;`;
  return db.query(sql, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};
// function to update the story status to completed
const storyCompleted = (db, story_id) => {
  const values = [story_id];
  const sql = `UPDATE stories SET story_status = true WHERE id = $1;`;
  return db.query(sql, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};
// function to get the contribution content
const getContribution = (db, id) => {
  const values = [id];
  const sql = `SELECT contribution FROM user_contributions WHERE id = $1;`;
  return db.query(sql, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};
// function to update the stories with a contribution value
const storyUpdated = (db, story_id, content) => {
  const values = [story_id, content];
  const sql = `UPDATE stories SET content = content + ' ' + $2 true WHERE id = $1;`;
  return db.query(sql, values)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};


module.exports = { allStories, allContributions, storyStart, storyCompleted, storyUpdated, getContribution };
