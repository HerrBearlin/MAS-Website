const db = require('../../config/mysql2/db');
const playerSchema = require('../../model/joi/Player');
const authUtil = require("../../utils/authUtils");

exports.getPlayers = () => {

//gets 2 paramteters, 1st - result of query, 2nd - additional metadata
    return db.promise().query(`SELECT * FROM Player`)
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
};
exports.getPlayerById = (pId) => {

        const query = `SELECT 
        p.pId as pId, p.fName, p.lName, p.nName, p.dateOfBirth, p.isCaptain, p.pPlayed, p.phNumber, p.password,
        org.orgId as orgId, org.orgName, org.leagueName, org.budget,
        con.conId as conId, con.dateFrom, con.dateTo, con.salary
        FROM Player p
        left join Contract con on con.pId = p.pId
        left join Organisation org on con.orgId = org.orgId
        where p.pId = ?`;

        return db.promise().query(query, [pId])
            .then((results, fields) => {
                const firstRow = results[0][0];
                if(!firstRow)
                {
                    return {};
                }
                const pla = {
                    pId: parseInt(pId),
                    fName: firstRow.fName,
                    lName: firstRow.lName,
                    nName: firstRow.nName,
                    dateOfBirth: firstRow.dateOfBirth,
                    isCaptain: firstRow.isCaptain,
                    pPlayed: firstRow.pPlayed,
                    phNumber: firstRow.phNumber,
                    password: firstRow.password,
                    contracts: []
                }
                for( let i=0; i<results[0].length; i++){
                    const row = results[0][i];
                    if(row.conId){
                        const contract = {
                            conId: row.conId,
                            dateFrom: row.dateFrom,
                            dateTo: row.dateTo,
                            salary: row.salary,
                            organisation: {
                                orgId: row.orgId,
                                orgName: row.orgName,
                                leagueName: row.leagueName,
                                budget: row.budget
                            }
                        };
                        pla.contracts.push(contract);

                    }
                }
                return pla;
            }).catch(err => {
                console.log(err);
                throw err;
            })
};

exports.createPlayer = (newPlayerData) => {
    const vRes = playerSchema.validate(newPlayerData, {abortEarly: false});

    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    return checkPhoneNumberUnique(newPlayerData.phNumber)
        .then(phNumberErr => {
            if(phNumberErr) {
                return Promise.reject(phNumberErr);
            } else {
                const fName = newPlayerData.fName;
                const lName = newPlayerData.lName;
                const nName = newPlayerData.nName;
                const dateOfBirth = newPlayerData.dateOfBirth;
                const isCaptain = newPlayerData.isCaptain;
                const pPlayed = newPlayerData.pPlayed;
                const phNumber = newPlayerData.phNumber;

                const password = authUtil.hashPassword(newPlayerData.password);
                const sql = 'INSERT into Player (fName, lName, nName, dateOfBirth, isCaptain, pPlayed, phNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                console.log(fName);
                console.log(lName);
                console.log(nName);
                console.log(dateOfBirth);
                console.log(isCaptain);
                console.log(pPlayed);
                console.log(phNumber);

                return db.promise().execute(sql, [fName, lName, nName, dateOfBirth, isCaptain, pPlayed, phNumber, password]);

            }
        })
        .catch(err => {
            return Promise.reject(err)
        });
};



exports.updatePlayer = (pId, pData) => {

    const vRes = playerSchema.validate(pData, {abortEarly: false});

    if(vRes.error){
        return Promise.reject(vRes.error);
    }
                const fName = pData.fName;
                const lName = pData.lName;
                const nName = pData.nName;
                const dateOfBirth = pData.dateOfBirth;
                const isCaptain = pData.isCaptain;
                const pPlayed =pData.pPlayed;
                const phNumber = pData.phNumber;
                const password = authUtil.hashPassword(pData.password);
                const sql =`UPDATE Player set fName = ?, lName = ?, nName = ?, dateOfBirth = ?, isCaptain = ?, pPlayed = ?, phNumber = ?, password = ? where pId = ?`;
                return db.promise().execute(sql, [fName, lName, nName, dateOfBirth, isCaptain, pPlayed, phNumber, password, pId]);

    return checkPhoneNumberUnique(pData.phNumber)
        .then(phNumberErr => {
            if(phNumberErr) {
                return Promise.reject(phNumberErr);
            } else {
                const fName = pData.fName;
                const lName = pData.lName;
                const nName = pData.nName;
                const dateOfBirth = pData.dateOfBirth;
                const isCaptain = pData.isCaptain;
                const pPlayed =pData.pPlayed;
                const phNumber = pData.phNumber;
                const password = pData.password;
                const sql =`UPDATE Player set fName = ?, lName = ?, nName = ?, dateOfBirth = ?, isCaptain = ?, pPlayed = ?, phNumber = ?, password = ? where pId = ?`;
                return db.promise().execute(sql, [fName, lName, nName, dateOfBirth, isCaptain, pPlayed, phNumber, password, pId]);
            }
        })
        .catch(err => {
            return Promise.reject(err)
        });
    };

exports.deletePlayer = (pId) => {
const sql1 = 'DELETE FROM Contract where pId = ?';
const sql2 = 'DELETE FROM Player where pId = ?';
return db.promise().execute(sql1, [pId])
    .then(() => {
        return db.promise().execute(sql2, [pId])
    });


};


checkPhoneNumberUnique = (phNumber, pId) => {
    let sql, promise;
    if(pId){
        sql = `SELECT COUNT(1) as c FROM Player WHERE pId != ? and phNumber = ?`;
        prmose = db.promise().query(sql, [pId, phNumber]);
    } else{
        sql = `SELECT COUNT(1) as c FROM Player WHERE phNumber = ?`;
        promise = db.promise().query(sql, [phNumber]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0){
            err = {
                details: [{
                    path: ['phNumber'],
                    message: 'The entered phone number is already in use'
                }]
            }
        return err;
        }
        return null;

    });
}

exports.findByPhoneNumber = (phNumber) => {
    if(!phNumber)
    {
        console.log("Error in FindingPhoneNumber");
        return null;
    }
    const sql = `SELECT * FROM Player where phNumber = ?`

    return db.promise().query(sql, [phNumber])
        .then((results, field) => {
            const firstRow = results[0][0];
            if(!firstRow)
            {
                return {}
            }
            const player = {
                pId: firstRow.pId,
                fName: firstRow.fName,
                lName:  firstRow.lName,
                nName: firstRow.nName,
                dateOfBirth: firstRow.dateOfBirth,
                isCaptain: firstRow.isCaptain,
                pPlayed: firstRow.pPlayed,
                phNumber: firstRow.phNumber,
                password: firstRow.password
            }
            return player;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}