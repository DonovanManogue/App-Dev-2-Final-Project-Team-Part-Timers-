const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Donovan1663!',
    database: 'hippofarms'
});

class Session{
    constructor(strSession,objUser,datStartTime,datLastUsedDateTime){
        this.sessionID = strSession;
        this.User = objUser;
        this.StartTime = datStartTime;
        this.LastUsedDateTime = datLastUsedDateTime;
    }
}

class User{
    constructor(strFirstName,strLastName,strEmail,strPassword,strMobileNumber,strFarmID,blnOwner){
        this.FirstName = strFirstName;
        this.LastName = strLastName;
        this.Email = strEmail;
        this.Password = strPassword;
        this.MobileNumber = strMobileNumber;
        this.FarmID = strFarmID;
        this.FarmOwner = blnOwner;
    }
}

class Farm{
    constructor(strFarmID,strFarmName,strStreetAddress1,strStreetAddress2,strCity,strState,strZipCode){
        this.FarmID = strFarmID;
        this.FarmName = strFarmName;
        this.StreetAddress1 = strStreetAddress1;
        this.StreetAddress2 = strStreetAddress2;
        this.City = strCity;
        this.State = strState;
        this.ZipCode = strZipCode;

    }
}

class Product{
    constructor(strProductID,strShortName,strLongName,strDescription,strStatus,objFarm){
        this.ProductID = strProductID;
        this.ShortName = strShortName;
        this.LongName = strLongName;
        this.Description = strDescription;
        this.Status = strStatus;
        this.Farm = objFarm;
    }
}


class Message{
    constructor(strType, strMessage){
        this.Type = strType;
        this.Message = strMessage;
    }
}

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
class Product {
    constructor(strProductID,strShortName,strLongName,strDescription,strStatus,objFarm){
        this.ProductID = strProductID;
        this.ShortName = strShortName;
        this.LongName = strLongName;
        this.Description = strDescription;
        this.Status = strStatus;
        this.Farm = objFarm;
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
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});
//End Step Three
// Step Four Users
app.post("/users", (req,res,next) => {
    let strFirstName = req.query.firstname || req.body.firstname;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    let strPassword = req.query.password || req.body.password;
    // call the hash method of bcrypt against the password to encrypt and store with a salt
    // notice the use of .then as a promise due to it being async
    bcrypt.hash(strPassword, 10).then(hash => {
        strPassword = hash;
        pool.query('INSERT INTO tblUsers VALUES(?, ?, ?, ?, ?,SYSDATE())',[strEmail, strFirstName, strLastName, strPreferredName, strPassword], function(error, results){
            if(!error){
                let objMessage = new Message("Success","New User Created");
                res.status(201).send(objMessage);
            } else {
                let objMessage = new Message("Error",error);
                res.status(400).send(objMessage);
            }
        })
    })
})
app.post("/farms", (req,res,next) => {
    let strStreetAddress1 = req.query.streetaddress1 || req.body.streetaddress1;
    let strStreetAddress2 = req.query.streetaddress2 || req.body.streetaddress2;
    let strCity = req.query.city || req.body.city;
    let strState = req.query.state || req.body.state;
    let strZIP = req.query.zip || req.body.zip;
    let strFarmID = uuidv4();
    let strFarmName = req.query.farmname || req.body.farmname;
    let strFirstName = req.query.firstname || req.body.firstname;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    let strPassword = req.query.password || req.body.password;
    pool.query('INSERT INTO tblFarms VALUES(?, ?, ?, ?, ?,?,?)',[strFarmID, strFarmName, strStreetAddress1, strStreetAddress2, strCity,strState,strZIP], function(error, results){
        if(!error){
            bcrypt.hash(strPassword, 10).then(hash => {
                strPassword = hash;
                pool.query('INSERT INTO tblUsers VALUES(?, ?, ?, ?, ?,SYSDATE())',[strEmail, strFirstName, strLastName, strPreferredName, strPassword], function(error, results){
                    if(!error){
                        let objMessage = new Message("FarmID",strFarmID);
                        res.status(201).send(objMessage);
                    } else {
                        let objMessage = new Message("Error",error);
                        res.status(400).send(objMessage);
                    }
                })
            })
        } else {
            let objMessage = new Message("Error",error);
            res.status(400).send(objMessage);
        }
    })
})
app.post("/product",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strProductID = uuidv4();
    let strShortName = req.query.shortname || req.body.shortname;
    let strLongName = req.query.longname || req.body.longname;
    let strDescription = req.query.description || req.body.description;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblProducts VALUES(?, ?, ?, ?, 'ACTIVE',?)",[strProductID,strShortName,strLongName,strDescription,objSession.Farm.FarmID], function(error, results){
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
        
    })
    
})
app.post("/rawmaterial",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strMaterialID = uuidv4();
    let strRelatedProduct = req.query.shortname || req.body.shortname;
    let strQuantity = req.query.longname || req.body.longname;
    let strUnitOfMeasure = req.query.description || req.body.description;
    let strCost = req.query.description || req.body.description;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblRawMaterials VALUES(?, ?, ?, ?,GETDATE(),?,?,?,?)",[strMaterialID,strDescription,strRelatedProduct,objSession.Email,strQuantity,strUnitOfMeasure,strCost,objSession.Farm.FarmID], function(error, results){
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
        
    })
})
app.post("/tasklog",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTaskLogID = uuidv4();
    let strTask = req.query.task || req.body.task;
    
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblTaskLog VALUES(?,?,?,GETDATE(),NULL,?)",[strTaskLogID,strTask,objSession.Email,objSession.Farm.FarmID], function(error, results){
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
        
    })
})
app.post("/harvests",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strHarvestID = uuidv4();
    let strProduct = req.query.task || req.body.task;
    let strQuantity = req.query.quantity || req.body.quantity;
    let strUnitOfMeasure = req.query.unitofmeasure || req.body.unitofmeasure;
    
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblHarvests VALUES(?,?,?,GETDATE(),?,?,?)",[strHarvestID,strProduct,objSession.Email,strQuantity,strUnitOfMeasure,objSession.Farm.FarmID], function(error, results){
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
        
    })
})
app.post("/farmassignment",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strAssignmentID = uuidv4();
    let strUser = req.query.user || req.body.user;
    
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            if(objSession.IsOwner == true){
                pool.query("INSERT INTO tblFarmAssingments VALUES(?, ?, ?, false)",[strAssignmentID,objSession.Farm.FarmID,strUser], function(error, results){
                    if(!error){
                        let objMessage = new Message("AssignmentID",strAssignmentID);
                        res.status(201).send(objMessage);
                    } else {
                        let objMessage = new Message("Error",error);
                        res.status(400).send(objMessage);
                    }
                })
            }
            else {
                let objError = new Message("Error","Only Owners Are Authorized For This Function ");
                res.status(401).send(objError);
            }
        } else {
            let objError = new Message("Error","Bad Session");
            res.status(401).send(objError);
        }
        
    })
    
})
app.post("/position",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strEntry = uuidv4();
    let strUser = req.query.user || req.body.user;
    let strTitle = req.query.title || req.body.title;
    let strPayRate = req.query.payrate || req.body.payrate;
    let strEffectiveDate = req.query.effectivedate || req.body.effectivedate;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            if(objSession.IsOwner == true){
                pool.query("INSERT INTO tblPosition VALUES(?, ?, ?, ?, ?, ?)",[strEntry,strUser,strTitle,strPayRate,strEffectiveDate,objSession.Farm.FarmID], function(error, results){
                    if(!error){
                        let objMessage = new Message("PositionID",strEntry);
                        res.status(201).send(objMessage);
                    } else {
                        let objMessage = new Message("Error",error);
                        res.status(400).send(objMessage);
                    }
                })
            }
            else {
                let objError = new Message("Error","Only Owners Are Authorized For This Function ");
                res.status(401).send(objError);
            }
        } else {
            let objError = new Message("Error","Bad Session");
            res.status(401).send(objError);
        }
        
    })
    
})

app.post("/tasks",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTaskID = uuidv4();
    let strTaskName = req.query.taskname || req.body.taskname;
    let strNote = req.query.note || req.body.note;
    let strStatus = req.query.status || req.body.status;


getSessionDetails(strSessionID,function(objSession){
    if(objSession){
            pool.query("INSERT INTO tblTasks VALUES(?, ?, ?, ?, ?)",[strTaskID,strTaskName,strNote,strStatus,objSession.Farm.FarmID], function(error, results){
                if(!error){
                    let objMessage = new Message("PositionID",strEntry);
                    res.status(201).send(objMessage);
                } else {
                    let objMessage = new Message("Error",error);
                    res.status(400).send(objMessage);
                }
            })
        }else{
        let objError = new Message("Error","Bad Session");
        res.status(401).send(objError);
    }
    
})

})
app.post("/unitofmeasure",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strAbbreviation = req.query.abbreviation || req.body.abbreviation;
    let strDescription = req.query.description || req.body.description;
    let strStatus = req.query.status || req.body.status;

    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            pool.query("INSERT INTO tblUnitOfMeasure VALUES(?,?,?,GETDATE(),?,?,?)",[strHarvestID,strProduct,objSession.Email,strQuantity,strUnitOfMeasure,objSession.Farm.FarmID], function(error, results){
                if(!error){
                    let objMessage = new Message("UnitOfMeasureID",strHarvestID);
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
        
    })
})


app.get("/tasks", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblTasks WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})
app.get("/unitofmeasure", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblUnitOfMeasure WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})
app.get("/harvests", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblHarvests WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})

app.get("/position", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession.IsOwner == true){
            pool.query("SELECT * FROM tblPosition WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
                if(!error){
                    res.status(200).send(results)
                } else {
                    let objError = new Message("Error",error);
                    res.status(400).send(objError);
                }
                
            })
        }            else {
            let objError = new Message("Error","Only Owners Are Authorized For This Function ");
            res.status(401).send(objError);
        }
app.get("/farms", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblFarms WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})
app.get("/products", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblProducts WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})
app.get("/rawmaterials", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblRawMaterials WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})
app.get("/tasklog", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblTasklog WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})

app.get("/farmassignment", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblFarmAssignment WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})
app.get("/users", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    getSessionDetails(strSessionID,function(objSession){
        pool.query("SELECT * FROM tblUsers WHERE FarmID = ?",objSession.Farm.FarmID, function(error,results){
            if(!error){
                res.status(200).send(results)
            } else {
                let objError = new Message("Error",error);
                res.status(400).send(objError);
            }
            
        })
    })
})

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
        
    })
})

app.put("/sessions", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strEndDateTime = req.query.enddatetime || req.body.enddatetime;
    poolquery("UPDATE tblSessions SET EndDateTime = ? WHERE SessionID = ?",[strEndDateTime,strSessionID], function(error,results){
        if(!error){
            letobjMessage = new Message("Success","Session Ended");
            res.status(200).send(results)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
        
    })
})

app.put("/farmassignment", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strUser = req.query.user || req.body.user;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            if(objSession.IsOwner == true){
    poolquery("UPDATE tblFarmAssignment SET UserID = ? WHERE AssignmentID = ?",[strUser,strAssignmentID], function(error,results){
        if(objSession.IsOwner == true){
        if(!error){
            letobjMessage = new Message("Success","Session Ended");
            res.status(200).send(results)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    }else{
        let objError = new Message("Error","User is not an owner");
        res.status(400).send(objError);
    }
    })
            } else {
                let objError = new Message("Error","User is not an owner");
                res.status(400).send(objError);
            }
}

app.put("/farms", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strName = req.query.name || req.body.name;
    let strAddress = req.query.address || req.body.address;
    let strCity = req.query.city || req.body.city;
    let strState = req.query.state || req.body.state;
    let strZip = req.query.zip || req.body.zip;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            if(objSession.IsOwner == true){
    pool.query('UPDATE tblFarms SET Name = ?, Address = ?, City = ?, State = ?, Zip = ? WHERE FarmID = ?', [strName, strAddress, strCity, strState, strZip, strFarmID], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Farm Updated");
            res.status(200).send(objMessage);
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    })
}else{
    let objError = new Message("Error","User is not an owner");
}

app.put("/position",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTitle = req.query.title || req.body.title;
    let strPayRate = req.query.payrate || req.body.payrate;
    let strEffectiveDate = req.query.effectivedate || req.body.effectivedate;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
            if(objSession.IsOwner == true){
    pool.query('UPDATE tblPositions SET Title = ?, PayRate = ?, EffectiveDate = ? WHERE Entry = ?', [strTitle, strPayRate, strEffectiveDate, strUser], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Position Updated");
            res.status(200).send(objMessage);
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    })
}else{
            let objError = new Message("Error","User is not an owner");
        }

app.put("/harvests",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strCrop = req.query.crop || req.body.crop;
    let strVariety = req.query.variety || req.body.variety;
    let strQuantity = req.query.quantity || req.body.quantity;
    let strUnit = req.query.unit || req.body.unit;
    let strDate = req.query.date || req.body.date;
    let strTime = req.query.time || req.body.time;
    let strNotes = req.query.notes || req.body.notes;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query('UPDATE tblHarvest SET Crop = ?, Variety = ?, Quantity = ?, Unit = ?, Date = ?, Time = ?, Notes = ? WHERE HarvestID = ?', [strCrop, strVariety, strQuantity, strUnit, strDate, strTime, strNotes, strHarvestID], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Harvest Updated");
            res.status(200).send(objMessage);
        } else {
            let objError = new Message("Error",error);
        }
    })
}
    })

app.put("/rawmaterial",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strDescription = req.query.description || req.body.description;
    let strRelatedProduct = req.query.shortname || req.body.shortname;
    let strQuantity = req.query.longname || req.body.longname;
    let strUnitOfMeasure = req.query.description || req.body.description;
    let strCost = req.query.description || req.body.description;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query('UPDATE tblRawMaterial SET Description = ?, RelatedProduct = ?, Quantity = ?, UnitOfMeasure = ?, Cost = ? WHERE MaterialID = ?', [strDescription, strRelatedProduct, strQuantity, strUnitOfMeasure, strCost, strRawMaterialID], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Raw Material Updated");
            res.status(200).send(objMessage);
        } else {
            let objError = new Message("Error",error);
        }
    })
}
    })

app.put("/unitofmeasure",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strDescription = req.query.description || req.body.description;
    let strStatus = req.query.status || req.body.status;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query('UPDATE tblUnitOfMeasure SET Description = ?, Status = ? WHERE Abbreviation = ?', [ strDescription, strStatus, strAbbreviation], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Unit of Measure Updated");
            res.status(200).send(objMessage);
        } else {
            let objError = new Message("Error",error);
        }
    })
}
    })

app.put("/tasklog",(req,res,next)=> {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let logdatetime = req.query.logdatetime || req.body.logdatetime;
    
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query('update tbltasklob set minutes = logdatetime - getdate() where tasklogid = ?', [strTask, strTaskLogID], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Task Log Updated");
            res.status(200).send(objMessage);
        } else {
            let objError = new Message("Error",error);
        }
    })
}
    })

    app.put("/tasklog",(req,res,next)=> {
        let strSessionID = req.query.sessionid || req.body.sessionid;
        let strTask = req.query.task || req.body.task;
        getSessionDetails(strSessionID,function(objSession){
            if(objSession){
        pool.query('UPDATE tblTaskLog SET Task = ? WHERE TaskLogID = ?', [strTask,], function(error,results){
            if(!error){
                let objMessage = new Message("Success","Task Log Updated");
                res.status(200).send(objMessage);
            } else {
                let objError = new Message("Error",error);
            }
        })
    }
        })

    app.put("/task",(req,res,next)=> {
        let strSessionID = req.query.sessionid || req.body.sessionid;
        let strTaskName = req.query.taskname || req.body.taskname;
        let strNote = req.query.note || req.body.note;
        let strStatus = req.query.status || req.body.status;
        
        getSessionDetails(strSessionID,function(objSession){
            if(objSession){
        pool.query('Update tblTask SET TaskName = ?, Note = ?, Status = ? WHERE TaskID = ?', [strTaskName, strNote, strStatus, strTaskID], function(error,results){
            if(!error){
                let objMessage = new Message("Success","Task Log Updated");
                res.status(200).send(objMessage);
            } else {
                let objError = new Message("Error",error);
            }
        })
    }
        })
    
    app.put("/products",(req,res,next)=> {
        let strSessionID = req.query.sessionid || req.body.sessionid;
        let strShortName = req.query.shortname || req.body.shortname;
        let strLongName = req.query.longname || req.body.longname;
        let strDescription = req.query.description || req.body.description;
        getSessionDetails(strSessionID,function(objSession){
            if(objSession){
        pool.query('UPDATE tblProducts SET ShortName = ?, LongName = ?, Description = ? WHERE ProductID = ?', [strShortName, strLongName, strDescription, strProductID], function(error,results){
            if(!error){
                let objMessage = new Message("Success","Product Updated");
                res.status(200).send(objMessage);
            } else {
                let objError = new Message("Error",error);
            }
        })
    }
        })

    app.put("/users",(req,res,next)=> {
        let strFirstName = req.query.firstname || req.body.firstname;
        let strLastName = req.query.lastname || req.body.lastname;
        let strPreferredName = req.query.preferredname || req.body.preferredname;
        let strEmail = req.query.email || req.body.email;
        let strPassword = req.query.password || req.body.password;
        getSessionDetails(strSessionID,function(objSession){
            if(objSession){
        pool.query('UPDATE tblUsers SET FirstName = ?, LastName = ?, PreferredName = ?, Email = ?, Password = ? WHERE UserID = ?', [strFirstName, strLastName, strPreferredName, strEmail, strPassword, strUserID], function(error,results){
            if(!error){
                let objMessage = new Message("Success","User Updated");
                res.status(200).send(objMessage);
            } else {
                let objError = new Message("Error",error);
            }

        })

app.delete("/sessions", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    pool.query("DELETE FROM tblSessions WHERE SessionID = ?",[strSessionID], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Session Deleted");
            res.status(202).send(objMessage)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }

app.delete("/farmassignment", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strUser = req.query.user || req.body.user;

    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query("DELETE FROM tblFarmAssignment WHERE User = ?",[strUser], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Farm Assignment Deleted");
            res.status(202).send(objMessage)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    })
}
    })
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
    })
}
    })

app.delete("/harvests", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strProduct = req.query.task || req.body.task;
    let strQuantity = req.query.quantity || req.body.quantity;
    let strUnitOfMeasure = req.query.unitofmeasure || req.body.unitofmeasure;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    poolquery("DELETE FROM tblHarvests WHERE Product = ?, Quantity = ?, UnitOfMeasure = ?",[strProduct, strQuantity, strUnitOfMeasure], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Harvest Deleted");
            res.status(202).send(objMessage)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    })
}
    })
})


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
    })
}
    })
})
app.delete("/products", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strProductID = uuidv4();
    let strShortName = req.query.shortname || req.body.shortname;
    let strLongName = req.query.longname || req.body.longname;
    let strDescription = req.query.description || req.body.description;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query("DELETE FROM tblProducts WHERE ProductID = ?, ShortName = ?, LongName = ?, Description = ?",[strProductID, strShortName, strLongName, strDescription], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Product Deleted");
            res.status(202).send(objMessage)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    })
}
    })



app.delete("/rawmaterials", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strMaterialID = uuidv4();
    let strRelatedProduct = req.query.shortname || req.body.shortname;
    let strQuantity = req.query.longname || req.body.longname;
    let strUnitOfMeasure = req.query.description || req.body.description;
    let strCost = req.query.description || req.body.description;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query("DELETE FROM tblRawMaterials WHERE MaterialID = ?, RelatedProduct = ?, Quantity = ?, UnitOfMeasure = ?, Cost = ?",[strMaterialID, strRelatedProduct, strQuantity, strUnitOfMeasure, strCost], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Raw Material Deleted");
            res.status(202).send(objMessage)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    })
}
    })

  

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
    })
}
    })


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
    })
}
    })



app.delete("/tasks", (req,res,next) => {
    let strSessionID = req.query.sessionid || req.body.sessionid;
    let strTaskID = uuidv4();
    let strTaskName = req.query.taskname || req.body.taskname;
    let strNote = req.query.note || req.body.note;
    let strStatus = req.query.status || req.body.status;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query("DELETE FROM tblTasks WHERE TaskID = ?, TaskName = ?, Note = ?, Status = ?",[strTaskID, strTaskName, strNote, strStatus], function(error,results){
        if(!error){
            let objMessage = new Message("Success","Task Deleted");
            res.status(202).send(objMessage)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    })
}
    })



app.delete("/users", (req,res,next) => {
    let strFirstName = req.query.firstname || req.body.firstname;
    let strLastName = req.query.lastname || req.body.lastname;
    let strPreferredName = req.query.preferredname || req.body.preferredname;
    let strEmail = req.query.email || req.body.email;
    let strPassword = req.query.password || req.body.password;
    getSessionDetails(strSessionID,function(objSession){
        if(objSession){
    pool.query("DELETE FROM tblUsers WHERE FirstName = ?, LastName = ?, PreferredName = ?, Email = ?, Password = ?",[strFirstName, strLastName, strPreferredName, strEmail, strPassword], function(error,results){
        if(!error){
            let objMessage = new Message("Success","User Deleted");
            res.status(202).send(objMessage)
        } else {
            let objError = new Message("Error",error);
            res.status(400).send(objError);
        }
    })
}
    })
// End Step Four
// Step Five
function getSessionDetails(strSessionID,callback){
    pool.query('SELECT * FROM tblSessions LEFT JOIN tblUsers ON tblSessions.UserID = tblUsers.Email LEFT JOIN tblFarmAssignment ON tblSessions.UserID = tblFarmAssignment.User WHERE SessionID = ?',[strSessionID], function(error, results){
        if(!error){
            let objFarm;
            getFarmByID(strFarmID,function(objReturnedFarm){
                objFarm = objReturnedFarm;
                let objUser = new User(results[0].Email,results[0].FirstName,results[0].LastName,results[0].MobileNumber,objFarm,results[0].IsOwner);
                let objSession = new Session(results[0].SessionID,objUser,results[0].StartDateTime,null);
                return objSession;
            })
            
        } else {
          return null;
        }
    })
}
// Example function using the async pool.query with a callback
function getFarmByID(strFarmID,callback){
    pool.query('SELECT * FROM tblFarms WHERE FarmID = ?',[strFarmID], function(error, results){
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
function getFarmByUserID(strUserID,callback){
    pool.query('SELECT tblFarms.* FROM tblFarmAssignment LEFT JOIN tblFarm ON tblFarmAssignment.FarmID = tblFarm.FarmID WHERE User = ?',[strUserID], function(error, results){
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
    pool.query('SELECT * FROM tblUsers LEFT JOIN tblFarmAssignments ON tblUsers.Email = tblFarmAssingments.User LEFT JOIN tblFarms ON tblFarmAssignments.FarmID = tblFarms.FarmID WHERE Email = (SELECT UserID FROM tblSessions WHERE SessionID = ?',[strSessionID], function(error, results){
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
// End Step Five
// Step Six
