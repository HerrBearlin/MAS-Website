const db = require('../../config/mysql2/db');

const organisationSchema = require('../../model/joi/Organisation');

exports.getOrganisations = () => {
    return db.promise().query(`SELECT * FROM Organisation`)
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
};
exports.getOrganisationById = (orgId) => {
    const query = `SELECT
        org.orgId as orgId, org.orgName, org.leagueName, org.budget,
        p.pId as pId, p.fName, p.lName, p.nName, p.dateOfBirth, p.isCaptain, p.pPlayed, p.phNumber,
        con.conId as conId, con.dateFrom, con.dateTo, con.salary
        FROM Organisation org
        left join Contract con on con.orgId = org.orgId
        left join Player p on con.pId = p.pId
        where org.orgId = ?`;

    return db.promise().query(query, [orgId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow)
            {
                return {};
            }
            const org = {
                orgId: parseInt(orgId),
                orgName: firstRow.orgName,
                leagueName: firstRow.leagueName,
                budget: firstRow.budget,
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
                        player: {
                            pId: row.pId,
                            fName: row.fName,
                            lName: row.lName,
                            nName: row.nName,
                            dateOfBirth: row.dateOfBirth,
                            isCaptain: row.isCaptain,
                            pPlayed: row.pPlayed,
                            phNumber: row.phNumber,
                        }
                    };
                    org.contracts.push(contract);

                }
            }
            return org;
        }).catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createOrganisation = (newOData) => {
    const vRes = organisationSchema.validate(newOData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
   const orgName = newOData.orgName;
   const leagueName = newOData.leagueName;
   const budget = newOData.budget;
    const sql = `INSERT into Organisation (orgName, leagueName, budget)
                VALUES (?, ?, ?)`;
    console.log(orgName);
    console.log(leagueName);
    console.log(budget);
    return db.promise().execute(sql, [orgName, leagueName,budget]);
};

exports.updateOrganisation = (orgId, oData) => {
    const vRes = organisationSchema.validate(oData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    const orgName = oData.orgName;
    const leagueName = oData.leagueName;
    const budget = oData.budget;

    const sql = `UPDATE Organisation set orgName = ?, leagueName = ?, budget = ? where orgId = ?`;
    console.log("Organisation updated.");
    return db.promise().execute(sql, [orgName, leagueName, budget, orgId]);

};

exports.deleteOrganisation = (orgId) => {
    const sql1 = 'DELETE FROM Contract where orgId = ?';
    const sql2 = 'DELETE FROM Organisation where orgId = ?';
    return db.promise().execute(sql1, [orgId])
        .then(() => {
            return db.promise().execute(sql2, [orgId])
        });
};




