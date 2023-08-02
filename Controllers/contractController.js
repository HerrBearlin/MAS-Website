const ContractRepository  = require('../repository/mysql2/ContractRepository');
const PlayerRepository  = require('../repository/mysql2/PlayerRepository');
const OrganisationRepository = require('../repository/mysql2/OrganisationRepository');

exports.showContractList = (req, res, next) => {
    ContractRepository.getContracts()
        .then(contracts => {
            res.render('pages/contract/list', {
                contracts: contracts,
                navLocation: 'contract',
                validationErrors: []
            });
        });
}


exports.showAddContractForm = (req, res, next) => {

    let allPlayers, allOrgs;
    PlayerRepository.getPlayers()
        .then(players => {
            allPlayers = players;
            return OrganisationRepository.getOrganisations();
        })
        .then(orgs => {
            allOrgs = orgs;
            res.render('pages/contract/form', {
                contract: {},
                formMode: 'createNew',
                allPlayers: allPlayers,
                allOrgs: allOrgs,
                pageTitle: req.__('contract.form.add.pageTitle'),
                btnLabel: req.__('contract.form.add.btnLabel'),
                formAction: '/contracts/add',
                navLocation: 'contract',
                validationErrors: []
            });
        });

};

exports.showEditContractForm = (req, res, next) => {
    let allPlayers, allOrgs;
    const conId = req.params.conId;
    ContractRepository.getContractById(conId)
        .then(contract => {
            PlayerRepository.getPlayers()
                .then(players => {
                    allPlayers = players;
                    return OrganisationRepository.getOrganisations();
                })
                .then(orgs => {
                    allOrgs = orgs;
                    console.log(contract);
                    res.render('pages/contract/form', {
                        contract: contract,
                        allPlayers: allPlayers,
                        allOrgs: allOrgs,
                        formMode: 'edit',
                        pageTitle: req.__('contract.form.edit.pageTitle'),
                        btnLabel: req.__('contract.form.edit.btnLabel'),
                        formAction: '/contracts/edit',
                        navLocation: 'contract',
                        validationErrors: []
                    });
                });
        });
};


exports.showContractDetails = (req, res, next) => {
    let allPlayers, allOrgs, contractDet;
    const conId = req.params.conId;
    ContractRepository.getContractById(conId)
        .then(contract => {
            contractDet = contract;
            return PlayerRepository.getPlayers();
        })
    PlayerRepository.getPlayers()
        .then(players => {
            allPlayers = players;
            return OrganisationRepository.getOrganisations();
        })
        .then(orgs => {
            allOrgs = orgs;
            res.render('pages/contract/form', {
                contract: contractDet,
                allPlayers: allPlayers,
                allOrgs: allOrgs,
                formMode: 'showDetails',
                pageTitle: req.__('contract.form.details.pageTitle'),
                formAction: '',
                navLocation: 'contract',
                validationErrors: []
            });
        });
};

//The operation const conData = { ...req.body }; creates a new Javascript object conData copying all fields from req.body.
exports.addContract = (req, res, next) => {
    const conData = {...req.body};
    //console.log(conData);
    ContractRepository.createContract(conData)
        .then(result => {
            res.redirect('/contracts');
        }).catch(err => {

            console.log(err.message);
            let allPlayers, allOrgs;
            PlayerRepository.getPlayers()
                .then(players => {
                    allPlayers = players;
                    return OrganisationRepository.getOrganisations();
                })
                .then(organisations => {
                    console.log("CON ID: " + conData.conId.value);
                    allOrgs = organisations;
                    res.render('pages/contract/form', {
                        contract: conData,
                        pageTitle: req.__('contract.form.add.pageTitle'),
                        formMode: 'createNew',
                        allPlayers: allPlayers,
                        allOrgs: allOrgs,
                        btnLabel: req.__('contract.form.add.btnLabel'),
                        formAction: '/contracts/add',
                        navLocation: 'contract',
                        validationErrors: err.details
                })
            });
        });

};

exports.updateContract = (req, res, next) => {
    const conId = req.body.conId;
    const conData = {...req.body};
    console.log("Update Contract");
    ContractRepository.updateContract(conId, conData)
        .then(result => {
            res.redirect('/contracts')
        })
        .catch(err => {
            console.log("Contract Error Update");
            console.log(err);
            let allPlayers, allOrgs;
            PlayerRepository.getPlayers()
                .then(players => {
                    allPlayers = players;
                    return OrganisationRepository.getOrganisations();
                })
                .then(organisations => {
                    allOrgs = organisations;
                    res.render(`pages/contract/form`, {
                        contract: conData,
                        pageTitle: req.__('contract.form.edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: req.__('contract.form.edit.btnLabel'),
                        formAction: '/contracts/edit',
                        navLocation: 'contract',
                        allPlayers: allPlayers,
                        allOrgs: allOrgs,
                        validationErrors: err.details
                    });
                });
        });

};

exports.deleteContract = (req, res, next) => {
    const conId = req.params.conId;
    ContractRepository.deleteContract(conId)
        .then( () => {
            return ContractRepository.getContracts()
        })
        .then(contracts => {
            res.render('pages/contract/list', {
                contracts: contracts,
                message: true,
                messageText: 'Contract deleted',
                pageTitle: 'Contract List',
                navLocation: 'contract'
            });
        });
};
