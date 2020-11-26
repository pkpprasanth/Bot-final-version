const express = require('express');

function createRouter(db) {
  const router = express.Router();
  router.get('/event/', function (req, res, next) {
    db.query(
      'SELECT * FROM data',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });
  router.get('/details/:name', function (req, res, next) {
    db.query(
      'SELECT * FROM details WHERE id=?',
      [req.params.name,],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.post('/details', (req, res, next) => {
    db.query(
      'INSERT INTO details (name, id) VALUES (?,?)',
      [req.body.name, req.body.id],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  
  return router;
}

module.exports = createRouter;
