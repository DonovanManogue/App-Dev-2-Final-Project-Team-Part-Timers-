const mysql = require('mysql');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const pool = mysql.createPool({
    database: "hippofarms",
    host: "localhost",
    password: "Donovan1663!",
    port: 3306,
    user: "root"
});

const HTTP_PORT = 8000;
// Create Custom Classes
class Session {
    constructor(strSessionID,objUser,datStartDateTime,datLastUsedDateTime) {
        this.SessionID = strSessionID;
        this.User = objUser;
        this.StartDateTime = datStartDateTime;
        this.LastUsedDateTime = datLastUsedDateTime;
    }
}
class User {
    constructor(strEmail,strFirstName,strLastName,strMobileNumber,objFarm,blnOwner){
        this.Email = strEmail;
        this.FirstName = strFirstName;
        this.LastName = strLastName;
        this.MobileNumber = strMobileNumber;
        this.Farm = objFarm;
        this.FarmOwner = blnOwner;
    }
}


class Farm {
    constructor(strFarmID,strFarmName,strStreetAddress1,strStreetAddress2,strCity,strState,strZIP) {
        this.FarmID = strFarmID;
        this.FarmName = strFarmName;
        this.StreetAddress1 = strStreetAddress1;
        this.StreetAddress2 = strStreetAddress2;
        this.City = strCity;
        this.State = strState;
        this.ZIPCode = strZIP;
    }
}

class Message {
    constructor(strType,strMessage){
        this.Type = strType;
        this.Message = strMessage;
    }
}
// End Step One
//Step Two
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
// End Step Two
// Step Three
function uuidv4() { 
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => 
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) ); 
    } 
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});
//End Step Three
// Step Four Users
app.post('/sessions',function(req,res){
    let strUserID = req.body.UserID;
    let datStartDateTime = new Date(); // Set the start date time to the current time
  
    pool.query("INSERT INTO tblSessions (SessionID, UserID, StartDateTime) VALUES (?, ?, ?)", [uuidv4(), strUserID, datStartDateTime], function(error, results) {
      if (!error) {
        let objMessage = new Message("Session created successfully", results.insertId);
        res.status(201).send(objMessage);
      } else {
        let objMessage = new Message("Error", error);
        res.status(400).send(objMessage);
      }
    });
  });
  
  
    app.post("/users", (req,res,next) => {
        let strFirstName = req.body.firstname;
        let strLastName = req.body.lastname;
        let strEmail = req.body.email;
        let strPhoneNumber = req.body.phonenumber;
        let strPassword = req.body.password;   
        console.log("Request body:", req.body);     
    // call the hash method of bcrypt against the password to encrypt and store with a salt
    // notice the use of .then as a promise due to it being async
    bcrypt.hash(strPassword, 10).then(hash => {
        strPassword = hash;
        pool.query('INSERT INTO tblUsers VALUES(?, ?, ?, ?, ?,SYSDATE())',[ strFirstName, strLastName, strEmail,strPhoneNumber,strPassword], function(error, results){
            if(!error){
                let objMessage = new Message("Success","New User Created");
                res.status(201).send(objMessage);
            } else {
                let objMessage = new Message("Error",error);
                console.error(error);
                res.status(400).send(objMessage);
            }
        })
    });
});

let strFarmID = uuidv4();
const  saltRounds = 10;
app.post("/farms", (req,res) => {
    let strStreetAddress1 = req.query.streetaddress1 || req.body.streetaddress1;
    let strStreetAddress2 = req.query.streetaddress2 || req.body.streetaddress2;
    let strCity = req.query.city || req.body.city;
    let strState = req.query.state || req.body.state;
    let strZIP = req.query.zip || req.body.zip;
    let strFarmID = uuidv4();
    let strFarmName = req.query.farmname || req.body.farmname;
  let strFirstName = req.query.firstname || req.body.firstname;
  let strLastName = req.query.lastname || req.body.lastname;
  let strEmail = req.query.email || req.body.email;
  let strPhoneNumber = req.query.phonenumber || req.body.phonenumber;
  let strPassword = req.query.password || req.body.password;

  pool.query("INSERT INTO tblFarms VALUES (?, ?, ?, ?, ?, ?, ?)", [strFarmID, strFarmName, strStreetAddress1, strStreetAddress2, strCity, strState, strZIP], function(error1, results1){
    if (!error1) {
      bcrypt.hash(strPassword, saltRounds, function(err, hash) {
        if (err) {
          let objMessage = new Message("Error", err.message);
          console.error(err);
          return res.status(500).send(objMessage);
        } else {
          pool.query("INSERT INTO tblUsers VALUES (?, ?, ?, ?, ?, SYSDATE())", [strFirstName, strLastName,strEmail, strPhoneNumber, hash], function(error2, results2) {
            if (!error2) {
              let objMessage = new Message("FarmID", strFarmID);
              res.status(201).send(objMessage);
              
              const AssignmentID = uuidv4(); // Generate unique AssignmentID
              const IsOwner = 1; // Set to 1 for owner, otherwise 0
              pool.query("INSERT INTO tblFarmAssignment VALUES(?, ?, ?, ?)", [AssignmentID, strFarmID, strEmail, IsOwner], function(error3, results3) {
                if (error3) {
                  console.error(error3);
                  let objMessage = new Message('Error', error3.message);
                  return res.status(500).send(objMessage);
                }
              });
            } else {
              let objMessage = new Message("Error", error2);
              console.error(error2);
              res.status(400).send(objMessage);
            }
          });
        }
      });
    } else {
      let objMessage = new Message("Error", error1);
      console.error(error1);
      res.status(400).send(objMessage);
    }
  });
});


app.post("/login", (req, res) => {
    let strEmail = req.body.email || req.query.email;
    let strPassword = req.body.password || req.query.password;
  
    pool.query('SELECT * FROM tblUsers WHERE email = ?', [strEmail], function(error, results) {
      if (error) {
        let objMessage = new Message("Error", error);
        console.error(error);
        return res.status(400).send(objMessage);
      }
  
      if (results.length === 0) {
        let objMessage = new Message("Error", "User not found");
        return res.status(401).send(objMessage);
      }
  
      let user = results[0];

      bcrypt.compare(strPassword, user.Password, function(err, result) {
        if (result != true) {
          let objMessage = new Message("Error", err.message);
          return res.status(500).send(objMessage);
        }
      
        console.log("Result of password comparison:", result);
      
        var sessionID = uuidv4();
        var UserID = strEmail;
        var startDateTime = new Date();
      
        pool.query('INSERT INTO tblSessions VALUES (?, ?, ?)', [sessionID, UserID, startDateTime], function(error, results) {
          if (error) {
            console.error(error);
            var objMessage = new Message('Error', error.message);
            return res.status(500).json(objMessage);
          }{
          if(!error){
                      // Return the session ID and user details to the client
          return res.status(200).json({"SessionID": sessionID});
          }
        }
      });
    });
    });
    });

    app.get('/workers/count', (req, res) => {
        // Get a connection from the pool
        pool.getConnection((err, conn) => {
          if (err) {
            return console.error(err);
          }
      
          // Execute query to count number of rows in tblposition
          const query = `SELECT COUNT(*) AS numWorkers, SUM(PayRate) AS totalPay FROM tblposition`;
          conn.query(query, (err, rows) => {
            // Release the connection back to the pool
            conn.release();
      
            if (err) {
              return console.error(err);
            }
      
            // Return the result as JSON
            const result = { numWorkers: rows[0].numWorkers, totalPay: rows[0].totalPay };
      res.json(result);
          });
        });
      });

      app.get('/products/count', (req, res) => {
        // Get a connection from the pool
        pool.getConnection((err, conn) => {
          if (err) {
            return console.error(err);
          }
      
          // Execute query to count number of rows in tblposition
          const query = `SELECT COUNT(*) AS numProducts FROM tblproducts`;
          conn.query(query, (err, rows) => {
            // Release the connection back to the pool
            conn.release();
      
            if (err) {
              return console.error(err);
            }
      
            // Return the result as JSON
            const result = { numProducts: rows[0].numProducts };
      res.json(result);
          });
        });
      });

        app.get('/tasks/count', (req, res) => {
        // Get a connection from the pool
        pool.getConnection((err, conn) => {
        if (err) {
        return console.error(err);
        }

        // Execute query to count number of rows in tblposition
        const query = `SELECT COUNT(*) AS numTasks, 
        SUM(CASE WHEN Status IN ('Not Started', 'Delayed', 'In Progress') THEN 1 ELSE 0 END) AS incompleteTasks, 
        SUM(CASE WHEN Status = 'Completed' THEN 1 ELSE 0 END) AS completeTasks
      FROM tblTasks;`;
        conn.query(query, (err, rows) => {
        // Release the connection back to the pool
        conn.release();

        
        if (err) {
        return console.error(err);
        }
        const result = { numTasks: rows[0].numTasks, completeTasks:rows[0].completeTasks, incompleteTasks:rows[0].incompleteTasks };
        res.json(result);
            });
          });
        });


    app.post("/position", (req, res, next) => {
        let strSessionID = req.query.sessionid || req.body.sessionid;
        let strEntryID = uuidv4();
        let strPayRate = req.query.payrate || req.body.payrate;
        let strTitle = req.query.title || req.body.title;
        let strUser = req.query.user || req.body.user;
       
        getSessionDetails(strSessionID, function(objSession) {
          if (objSession) {
            console.log(objSession);
            pool.query("INSERT INTO tblPosition VALUES(?, ?, ?, ?,SYSDATE(),?)", [strEntryID,strUser,strTitle, strPayRate,  objSession.User.Farm.FarmID ], function(error, results) {
              if (!error) {
                let objMessage = new Message("EntryID", strEntryID);
                res.status(201).send(objMessage);
              } else {
                let objMessage = new Message("Error", error);
                res.status(400).send(objMessage);
              }
            });
          } else {
            let objError = new Message("Error", "Bad Session");
            res.status(401).send(objError);
          }
        });
      });

      app.get("/position", (req, res, next) => {
        let strSessionID = req.query.sessionid || req.body.sessionid;
        getSessionDetails(strSessionID, function(objSession) {
        pool.query("SELECT * FROM tblPosition WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});

app.put("/position", (req, res, next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
        let strUser = req.query.user || req.body.user;
        let strTitle = req.query.title || req.body.title;
        let strPayRate = req.query.payrate || req.body.payrate;
        let strEntryID = req.body.entryid || req.query.entryid;
        getSessionDetails(strSessionID, function(objSession) {
            if (objSession) {
        pool.query(
          "UPDATE tblPosition SET User=?, Title=?,  PayRate=?  WHERE EntryID=?",
          [ strUser, strTitle, strPayRate,strEntryID, objSession.User.Farm.FarmID ],
          function(error, results) {
            console.log(results);
            if (!error) {
              let objMessage = new Message("Success", "Position Updated");
              res.status(200).send(objMessage);
            } else {
              let objError = new Message("Error", error);
              res.status(400).send(objError);
            }
          }
        );
      } else {
          let objError = new Message("Error", "Bad Session");
          res.status(401).send(objError);
      }
    });
  });

  app.put("/products",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strProductName = req.query.productname || req.body.productname;
    let strDescription = req.query.description || req.body.description;
    let strStatus = req.query.status || req.body.status;
    let strProductID = req.query.productid || req.body.productid;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("UPDATE tblProducts SET ProductName =?, Description = ?, Status =? WHERE ProductID = ?", [strProductName, strDescription,strStatus,strProductID], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Product Updated");
                    res.status(200).send(objMessage);
                } else {
                    let objError = new Message("Error",error);
                }
            });
        }
    });
});


 app.put("/Harvests", (req, res, next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strProductID = req.query.product || req.body.product;
    let strUnitOfMeasure2 = req.query.unitofmeasure2 || req.body.unitofmeasure2;
    let strQuantity = req.query.quantity || req.body.quantity;
    let strHarvestID = req.query.harvestid || req.body.harvestid;
    getSessionDetails(strSessionID, function (objSession) {
      if (objSession) {
        pool.query(
          "UPDATE tblHarvests set product=?,set unitofmeasure2=?,set harvestdatetime=SYSDATE(), set quantity= ? WHERE HarvestID = ?",
          [strProductID,strUnitOfMeasure2, strQuantity, strHarvestID],
          function (error, results) {
            if (!error) {
              let objMessage = new Message("Success", "Harvest Updated");
              res.status(200).send(objMessage);
            } else {
              let objError = new Message("Error", error);
              res.status(400).send(objError);
            }
          }
        );
      } else {
        let objError = new Message("Error", "Invalid session ID");
        res.status(400).send(objError);
      }
    });
  });

app.delete("/products", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strProductID = req.query.productid || req.body.productid;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblProducts WHERE ProductID = ?",[strProductID], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Product Deleted");
                    res.status(202).send(objMessage)
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            });
        }
    });
});
  
  app.delete("/position", (req, res, next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strEntryID = req.body.entryid || req.query.entryid;
    getSessionDetails(strSessionID, function(objSession) {
      if (objSession) {
        pool.query(
          "DELETE FROM tblPosition WHERE EntryID=?",
          [strEntryID],
          function(error, results) {
            if (!error) {
              let objMessage = new Message("Success", "Position Deleted");
              res.status(200).send(objMessage);
            } else {
              let objError = new Message("Error", error);
              res.status(400).send(objError);
            }
          }
        );
      } else {
        let objError = new Message("Error", "Bad Session");
        res.status(401).send(objError);
      }
    });
  });
  

  app.delete("/Harvests", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strHarvestID = req.query.harvestid || req.body.harvestid;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblHarvests WHERE HarvestID=? ",[strHarvestID], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Harvest Deleted");
                    res.status(202).send(objMessage);
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            }
            );
        } else {
            let objError = new Message("Error", "Bad Session");
            res.status(401).send(objError);
          }
        });
      });

    

app.post("/products",(req,res)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strProductID = uuidv4();
    let strProductName = req.query.productname || req.body.productname;
    let strDescription = req.query.description || req.body.description;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblProducts VALUES(?, ?, ?, 'ACTIVE',?)",[strProductID,strProductName,strDescription,objSession.User.Farm.FarmID], function(error, results){
                if(!error){
                    let objMessage = new Message("ProductID",strProductID);
                    res.status(201).send(objMessage);
                } else {
                    let objMessage = new Message("Error",error);
                    res.status(400).send(objMessage);
                }
            })
        } else {
            let objError = new Message("Error","Bad Session");
            res.status(401).send(objError);
        }
        
    });
    
});
app.post("/materials",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strMaterialID = uuidv4();
    let strMaterial = req.query.material || req.body.material;
    let strMaterialDescription = req.query.materialdescription || req.body.materialdescription;
    let strRelatedProduct = req.query.relatedproduct || req.body.relatedproduct;
    let strQuantity = req.query.quantity || req.body.quantity;
    let strUnitOfMeasure2 = req.query.unitofmeasure2 || req.body.unitofmeasure2;
    let strUnitOfMeasure = req.query.unitofmeasure|| req.body.unitofmeasure;
    let strCost = req.query.cost || req.body.cost;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblMaterials VALUES(?, ?, ?, ?,?,SYSDATE(),?,?,?,?,?)",
            [strMaterialID,strMaterial,strMaterialDescription,strRelatedProduct,objSession.Email,strQuantity,strUnitOfMeasure,strUnitOfMeasure2,strCost,objSession.User.Farm.FarmID], function(error, results){
                if(!error){
                    let objMessage = new Message("MaterialID",strMaterialID);
                    res.status(201).send(objMessage);
                } else {
                    let objMessage = new Message("Error",error);
                    res.status(400).send(objMessage);
                }
            })
        } else {
            let objError = new Message("Error","Bad Session");
            res.status(401).send(objError);
        }
        
    });
});
app.post("/tasklog",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTaskLogID = uuidv4();
    let strTask = req.query.task || req.body.task;
    
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblTaskLog VALUES(?,?,?,GETDATE(),NULL,?)",[strTaskLogID,strTask,objSession.Email,objSession.User.Farm.FarmID], function(error, results){
                if(!error){
                    let objMessage = new Message("TaskLogID",strTaskLogID);
                    res.status(201).send(objMessage);
                } else {
                    let objMessage = new Message("Error",error);
                    res.status(400).send(objMessage);
                }
            })
        } else {
            let objError = new Message("Error","Bad Session");
            res.status(401).send(objError);
        }
        
    });
});
app.post("/Harvests",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strUser = req.query.user || req.body.user;
    let strHarvestID = uuidv4();
    let strProductID = req.query.product || req.body.product;
    let strQuantity = req.query.quantity || req.body.quantity;
    let strUnitOfMeasure = req.query.unitofmeasure || req.body.unitofmeasure;
    let strUnitOfMeasure2 = req.query.unitofmeasure2 || req.body.unitofmeasure2;

    
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblHarvests VALUES(?,?,?,SYSDATE(),?,?,?,?)",[strHarvestID,strProductID,strUser,strQuantity,strUnitOfMeasure,objSession.User.Farm.FarmID,strUnitOfMeasure2], function(error, results){
                if(!error){
                    let objMessage = new Message("HarvestID",strHarvestID);
                    res.status(201).send(objMessage);
                } else {
                    let objMessage = new Message("Error",error);
                    res.status(400).send(objMessage);
                }
            })
        } else {
            let objError = new Message("Error","Bad Session");
            res.status(401).send(objError);
        }
        
    });
});
app.post("/farmassignment",(req,res,next)=> {
  let strSessionID = req.query.sessionid || req.body.sessionid;
  let strAssignmentID = uuidv4();
  let strUser = req.query.user || req.body.user;
  
  getSessionDetails(strSessionID,function(objSession){
    if(objSession){
      if(objSession.IsOwner == true){
        pool.query("INSERT INTO tblFarmAssignments VALUES(?, ?, ?, false)",
          [strAssignmentID,strFarmID,strUser], 
          function(error, results){
            if(!error){
              let objMessage = new Message("AssignmentID",strAssignmentID);
              res.status(201).send(objMessage);
            } else {
              let objMessage = new Message("Error",error);
              res.status(400).send(objMessage);
            }
          }
        );
      } else {
        let objError = new Message("Error","Only Owners Are Authorized For This Function ");
        res.status(401).send(objError);
      }
    } else {
      let objError = new Message("Error","Bad Session");
      res.status(401).send(objError);
    }
  });
  
});



app.post("/tasks", (req, res, next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTaskID = uuidv4();
    let strTask = req.query.task || req.body.task;
    let strNotes = req.query.notes || req.body.notes;
    let strStatus = req.query.status || req.body.status;
    let strTaskStartTime = req.query.taskstarttime || req.body.taskstarttime;
    let strTaskEndTime = req.query.taskendtime || req.body.taskendtime;
  
    getSessionDetails(strSessionID, function (objSession) {
      if (objSession) {
        pool.query(
          "INSERT INTO tbltasks (TaskID, TaskName, Notes, Status, FarmID, taskStartTime, taskEndTime) VALUES (?, ?, ?, ?, ?,?,?)",
          [strTaskID, strTask, strNotes, strStatus, objSession.User.Farm.FarmID, strTaskStartTime, strTaskEndTime],
          function (error, results) {
            if (!error) {
              let objMessage = new Message("TaskID", strTaskID);
              res.status(201).send(objMessage);
            } else {
              let objMessage = new Message("Error", error);
              res.status(400).send(objMessage);
            }
          }
        );
      } else {
        let objError = new Message("Error", "Bad Session");
        res.status(401).send(objError);
      }
    });
  });

  app.put("/tasks",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTaskID = req.query.taskid || req.body.taskid;
    let strTask = req.query.task || req.body.task;
    let strNotes = req.query.notes || req.body.notes;
    let strStatus = req.query.status || req.body.status;
    let strTaskStartTime = req.query.taskstarttime || req.body.taskstarttime;
    let strTaskEndTime = req.query.taskendtime || req.body.taskendtime;
    
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("Update tblTasks SET TaskName = ?, Notes = ?, Status = ?, taskStartTime=?, taskEndTime=?, WHERE TaskID = ?", 
            [strTask, strNotes, strStatus,strTaskStartTime,strTaskEndTime, strTaskID], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Task Updated");
                    res.status(200).send(objMessage);
                } else {
                    let objError = new Message("Error",error);
                }
            });
        }
    });
});



app.post("/unitofmeasure", (req, res, next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strAbbreviation = req.query.abbreviation || req.body.abbreviation;
    let strDescription = req.query.description || req.body.description;
    let strStatus = req.query.status || req.body.status;
  
    getSessionDetails(strSessionID, function (objSession) {
      if (objSession) {
        pool.query("INSERT INTO tblUnitOfMeasure (Abbreviation, Description, DateCreated, Status, CreatedBy, FarmID) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?, ?)",
          [strAbbreviation, strDescription, strStatus, objSession.Email, objSession.User.Farm.FarmID],
          function (error, results) {
            if (!error) {
              let objMessage = new Message("UnitOfMeasureID", results.insertId);
              res.status(201).send(objMessage);
            } else {
              let objMessage = new Message("Error", error);
              res.status(400).send(objMessage);
            }
          }
        );
      } else {
        let objError = new Message("Error", "Bad Session");
        res.status(401).send(objError);
      }
    });
  })


app.get("/tasks", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblTasks WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});
app.get("/unitofmeasure", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblUnitOfMeasure WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});
app.get("/Harvests", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblHarvests WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});


app.get("/farms", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblFarms WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});
app.get("/products", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblProducts WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});
app.get("/materials", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblMaterials WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});
app.get("/tasklog", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblTasklog WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});

app.get("/farmassignment", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblFarmAssignment WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});
app.get("/users", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblUsers WHERE FarmID = ?",objSession.User.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        });
    });
});

app.get("/test", (req,res,next)=>{
    let strFarmID = req.query.farmid || req.body.farmid;
    console.log(strFarmID);
    getFarmByID(strFarmID,function(objFarm){
        if(objFarm){
            res.status(200).send(objFarm);
        } else {
            let objError = new Message("Error","Farm Does Not Exist");
            res.status(400).send(objError);
        }
        
    });
});

app.put("/sessions", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strEndDateTime = req.query.enddatetime || req.body.enddatetime;
    poolquery("UPDATE tblSessions SET EndDateTime = ? WHERE SessionID = ?",[strEndDateTime,strSessionID], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Session Ended");
            res.status(200).send(results)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
        
    });
});

app.put("/farmassignment", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strUser = req.query.user || req.body.user;
    let strAssignmentID = req.query.assignmentid || req.body.assignmentid;

    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            if(objSession.IsOwner == true){
                pool.query("UPDATE tblFarmAssignment SET UserID = ? WHERE AssignmentID = ?", [strUser, strAssignmentID], function(error, results){
                    if(!error){
                        let objMessage = new Message("Success","User Assigned to Farm");
                        res.status(200).send(objMessage)
                    } else {
                        let objError = new Message("Error",error);
                        res.status(400).send(objError);
                    }
                })
            } else {
                let objError = new Message("Error","User is not an owner");
                res.status(400).send(objError);
            }
        }
    });
});

app.put("/farms", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strFarmID = req.query.farmid || req.body.farmid;
    let strName = req.query.name || req.body.name;
    let strAddress = req.query.address || req.body.address;
    let strCity = req.query.city || req.body.city;
    let strState = req.query.state || req.body.state;
    let strZip = req.query.zip || req.body.zip;

    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            if(objSession.IsOwner == true){
                pool.query("UPDATE tblFarms SET Name = ?, Address = ?, City = ?, State = ?, Zip = ? WHERE FarmID = ?", [strName, strAddress, strCity, strState, strZip, strFarmID], function(error,results){
                    if(!error){
                        let objMessage = new Message("Success","Farm Updated");
                        res.status(200).send(objMessage);
                    } else {
                        let objError = new Message("Error",error);
                        res.status(400).send(objError);
                    }
                })
            } else {
                let objError = new Message("Error","User is not an owner");
                res.status(400).send(objError);
            }
        }
    });
});




  
 

app.put("/materials",(req,res,next)=> {
    let strSessionID = req.body.sessionid;
    let strMaterialID = req.body.materialid;
    let strMaterial = req.body.material;
    let strMaterialDescription = req.body.materialdescription;
    let strQuantity = req.body.quantity;
    let strUnitOfMeasure2 = req.body.unitofmeasure2;
    let strCost = req.body.cost;
    getSessionDetails(strSessionID, function(objSession) {
        if (objSession) {
            pool.query("UPDATE tblMaterials SET material=?, description=?, quantity=?, unitofmeasure2=?, cost=? WHERE MaterialID = ?",
                        [strMaterial, strMaterialDescription, strQuantity, strUnitOfMeasure2, strCost, strMaterialID],
                        function(error, results) {
                            if (!error) {
                                let objMessage = new Message("Success", "Raw Material Updated");
                                res.status(200).send(objMessage);
                            } else {
                                let objError = new Message("Error", error);
                                res.status(500).send(objError);
                            }
                        });
        }
    });
});


app.put("/unitofmeasure",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strAbbreviation = req.query.abbreviation || req.body.abbreviation;
    let strDescription = req.query.description || req.body.description;
    let strStatus = req.query.status || req.body.status;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("UPDATE tblUnitOfMeasure SET Description = ?, Status = ? WHERE Abbreviation = ?", [ strDescription, strStatus, strAbbreviation], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Unit of Measure Updated");
                    res.status(200).send(objMessage);
                } else {
                    let objError = new Message("Error",error);
                    res.status(500).send(objError);
                }
            });
        }
    });
});

app.put("/tasklog",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTaskLogID = req.query.tasklogid || req.body.tasklogid;
    let logdatetime = req.query.logdatetime || req.body.logdatetime;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("UPDATE tblTaskLog SET Minutes = DATEDIFF(MINUTE, LogDateTime, GETDATE()) WHERE TaskLogID = ?", [strTaskLogID], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Task Log Updated");
                    res.status(200).send(objMessage);
                } else {
                    let objError = new Message("Error",error);
                    res.status(500).send(objError);
                }
            });
        }
    });
});





app.put("/users",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strFirstName = req.query.firstname || req.body.firstname;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    let strPassword = req.query.password || req.body.password;
    let strUserID = req.query.userid || req.body.userid;
    
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("UPDATE tblUsers SET FirstName = ?, LastName = ?, PreferredName = ?, Email = ?, Password = ? WHERE UserID = ?", [strFirstName, strLastName, strPreferredName, strEmail, strPassword, strUserID], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","User Updated");
                    res.status(200).send(objMessage);
                } else {
                    let objError = new Message("Error",error);
                }
            });
        }
    });
});

app.delete("/sessions", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    pool.query("DELETE FROM tblSessions WHERE SessionID = ?",[strSessionID], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Session Deleted");
            res.status(202).send(objMessage);
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    });
});

app.delete("/farmassignment", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strUser = req.query.user || req.body.user;

    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblFarmAssignment WHERE User = ?",[strUser], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Farm Assignment Deleted");
                    res.status(202).send(objMessage);
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            });
        }
    });
});
app.delete("/farm", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strStreetAddress1 = req.query.streetaddress1 || req.body.streetaddress1;
    let strStreetAddress2 = req.query.streetaddress2 || req.body.streetaddress2;
    let strCity = req.query.city || req.body.city;
    let strState = req.query.state || req.body.state;
    let strZIP = req.query.zip || req.body.zip;
    let strFarmName = req.query.farmname || req.body.farmname;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblFarm WHERE StreetAddress1 = ?, StreetAddress2 = ?, City = ?, State = ?, ZIP = ?, FarmName = ?",[strStreetAddress1, strStreetAddress2, strCity, strState, strZIP, strFarmName], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Farm Deleted");
                    res.status(202).send(objMessage)
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            });
        }
    });
});


app.delete("/positions", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strEntry = uuidv4();
    let strUser = req.query.user || req.body.user;
    let strTitle = req.query.title || req.body.title;
    let strPayRate = req.query.payrate || req.body.payrate;
    let strEffectiveDate = req.query.effectivedate || req.body.effectivedate;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblPositions WHERE User = ?, Title = ?, PayRate = ?, EffectiveDate = ?",[strUser, strTitle, strPayRate, strEffectiveDate], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Position Deleted");
                    res.status(202).send(objMessage)
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            });
        }
    });
});



app.delete("/materials", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strMaterialID = req.query.materialid || req.body.materialid;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblMaterials WHERE MaterialID=?",[strMaterialID], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Raw Material Deleted");
                    res.status(202).send(objMessage)
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            });
        }
    });
});

app.delete("/unitofmeasure", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strAbbreviation = req.query.abbreviation || req.body.abbreviation;
    let strDescription = req.query.description || req.body.description;
    let strStatus = req.query.status || req.body.status;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblUnitOfMeasure WHERE Abbreviation = ?, Description = ?, Status = ?",[strAbbreviation, strDescription, strStatus], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Unit of Measure Deleted");
                    res.status(202).send(objMessage)
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            });
        };
    });
});

app.delete("/taskslog", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTask = req.query.task || req.body.task;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblTasksLog WHERE Task = ?",[strTask], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Task Log Deleted");
                    res.status(202).send(objMessage)
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            });
        };
    });
});

app.delete("/tasks", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTaskID = req.query.taskid || req.body.taskid;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("DELETE FROM tblTasks WHERE TaskID = ?",[strTaskID], function(error,results){
                if(!error){
                    let objMessage = new Message("Success","Task Deleted");
                    res.status(202).send(objMessage)
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
            });
        };
    });
});



    app.delete("/users", (req,res,next) => {
        let strSessionID = req.query.sessionid || req.body.sessionid;
        let strFirstName = req.query.firstname || req.body.firstname;
        let strLastName = req.query.lastname || req.body.lastname;
        let strPreferredName = req.query.preferredname || req.body.preferredname;
        let strEmail = req.query.email || req.body.email;
        let strPassword = req.query.password || req.body.password;
        getSessionDetails(strSessionID,function(objSession){
            if(objSession){
                pool.query("DELETE FROM tblUsers WHERE FirstName = ? AND LastName = ? AND PreferredName = ? AND Email = ? AND Password = ?",[strFirstName, strLastName, strPreferredName, strEmail, strPassword], function(error,results){
                    if(!error){
                        let objMessage = new Message("Success","User Deleted");
                        res.status(202).send(objMessage)
                    } else {
                        let objError = new Message("Error",error);
                        res.status(400).send(objError);
                    }
                })
            }
        });
    });
    
    // End Step Four
    // Step Five
    function getSessionDetails(strSessionID, callback) {
        pool.query('SELECT * FROM tblSessions LEFT JOIN tblUsers ON tblSessions.UserID = tblUsers.Email LEFT JOIN tblFarmAssignment ON tblSessions.UserID = tblFarmAssignment.User WHERE SessionID = ?', [strSessionID], function(error, results) {
            if (!error) {
            let objFarm;
            getFarmByID(results[0].FarmID, function(objReturnedFarm) {
              objFarm = objReturnedFarm;
              let objUser = new User(results[0].Email, results[0].FirstName, results[0].LastName, results[0].MobileNumber, objFarm, results[0].IsOwner);
              let objSession = new Session(results[0].SessionID, objUser, results[0].StartDateTime, null);
              callback(objSession) ;
            });
          } else {
            callback(null); 
          }
        });
      }
// Example function using the async pool.query with a callback
function getFarmByID(strFarmID,callback){
    pool.query("SELECT * FROM tblFarms WHERE FarmID = ?",[strFarmID], function(error, results){
        if(!error){
            if(results.length > 0){
                let objFarm = new Farm(results[0].FarmID,results[0].FarmName,results[0].StreetAddress1,results[0].StreetAddress2,results[0].City,results[0].State,results[0].ZIP);
                callback(objFarm);
            } else {
                callback(null);
            }
        } else {
          callback(null);
        }
    });
}

function getFarmByUserID(strUserID,callback){
    pool.query("SELECT tblFarms.* FROM tblFarmAssignment LEFT JOIN tblFarm ON tblFarmAssignment.FarmID = tblFarm.FarmID WHERE User = ?",[strUserID], function(error, results){
        if(!error){
            if(results.length > 0){
                callback(new Farm(results[0].FarmID,results[0].FarmName,results[0].StreetAddress1,results[0].StreetAddress2,results[0].City,results[0].State,results[0].ZIP));
            } else {
                callback(null);
            }
        } else {
          callback(null);
        }
    })
}
function getUserBySessionID(strSessionID,callback){
    pool.query("SELECT * FROM tblUsers LEFT JOIN tblFarmAssignments ON tblUsers.Email = tblFarmAssingments.User LEFT JOIN tblFarms ON tblFarmAssignments.FarmID = tblFarms.FarmID WHERE Email = (SELECT UserID FROM tblSessions WHERE SessionID = ?)",[strSessionID], function(error, results){
        if(!error){
            if(results.length > 0){
                console.log(results);
                callback(new User(results[0].Email,results[0].FirstName,results[0].LastName,results[0].MobileNumber,null,null));
            } else {
                callback(null);
            }
        } else {
          callback(null);
        }
    })
}
