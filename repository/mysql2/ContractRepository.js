const db = require('../../config/mysql2/db');
const contractSchema = require('../../model/joi/Contract');
const playerSchema = require("../../model/joi/Player");

exports.getContracts = () => {
        const query = `SELECT con.conId as conId, con.dateFrom, con.dateTo, con.salary, 
       org.orgId as orgId, org.orgName, org.leagueName, org.budget,
        p.pId as pId, p.fName, p.lName, p.nName, p.dateOfBirth, p.isCaptain, p.pPlayed, p.phNumber 
        FROM Contract con
        left join Player p on con.pId = p.pId
        left join Organisation org on con.orgId = org.orgId`;

    return db.promise().query(query)
        .then( (results, fields ) => {
            const contracts = [];
            for (let i=0; i<results[0].length; i++){
                const row = results[0][i];
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
                    },
                    player: {
                        pId: row.pId,
                        fName: row.fName,
                        lName: row.lName,
                        nName: row.nName,
                        dateOfBirth: row.dateOfBirth,
                        isCaptain: row.isCaptain,
                        pPlayed: row.pPlayed,
                        phNumber: row.phNumber
                    }
                };
                contracts.push(contract);
            }
            console.log(contracts);
            return contracts;
        }).catch(err => {
            console.log(err);
        })
};

exports.getContractById = (conId) => {
    const query = `SELECT con.conId as conId, con.dateFrom, con.dateTo, con.salary,
                          org.orgId as orgId, org.orgName, org.leagueName, org.budget,
                          p.pId as pId, p.fName, p.lName, p.nName, p.dateOfBirth,p.isCaptain, p.pPlayed, p.phNumber
                   FROM Contract con
                            left join Player p on con.pId = p.pId
                            left join Organisation org on con.orgId = org.orgId
                   where con.conId = ?`

    return db.promise().query(query, [conId])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return {};
            }
            const contract = {
                conId: parseInt(conId),
                dateFrom: row.dateFrom,
                dateTo: row.dateTo,
                salary: row.salary,
                orgId: row.orgId,
                pId: row.pId,
                organisation: {
                    orgId: row.orgId,
                    orgName: row.orgName,
                    leagueName: row.leagueName,
                    budget: row.budget
                },
                player: {
                    pId: row.pId,
                    fName: row.fName,
                    lName: row.lName,
                    nName: row.nName,
                    dateOfBirth: row.dateOfBirth,
                    isCaptain: row.isCaptain,
                    pPlayed: row.pPlayed,
                    phNumber: row.phNumber
                }
            };
            console.log(contract);
            return contract;

        }).catch(err => {
            console.log(err);
            throw err;
        })
    
};

exports.createContract = (newCData) => {
    const vRes = contractSchema.validate(newCData, {abortEarly: false});

    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    const pId = newCData.pId;
    const orgId = newCData.orgId;
    const dateFrom = newCData.dateFrom;
    const dateTo = newCData.dateTo;
    const salary = newCData.salary;
console.log('createContract');

const sql = 'INSERT into Contract (pId, orgId, dateFrom, dateTo, salary) VALUES (?,?,?,?,?)';
return db.promise().execute(sql,[ pId, orgId, dateFrom, dateTo, salary]);
};

exports.updateContract = (conId, cData) => {

    const vRes = contractSchema.validate(cData, {abortEarly: false});

    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    const pId = cData.pId;
    const orgId = cData.orgId;
    const dateFrom = cData.dateFrom;
    const dateTo = cData.dateTo;
    const salary = cData.salary;
    const sql = `UPDATE Contract set pId = ?, orgId = ?, dateFrom = ?, dateTo = ?, salary = ? where conId = ?`;
    return db.promise().execute(sql, [pId, orgId, dateFrom,  dateTo , salary, conId])
};

exports.deleteContract = (conId) => {
    const sql = `DELETE FROM Contract where conId = ?`;
    return db.promise().execute(sql, [conId]);
};




