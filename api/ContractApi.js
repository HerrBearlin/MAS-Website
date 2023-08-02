const ContractRepository = require('../repository/mysql2/ContractRepository');


exports.getContracts = (req, res, next) => {
    ContractRepository.getContracts()
        .then(contracts => {
            res.status(200).json(contracts);
        }).catch(err => {
        console.log(err);
    });

};

exports.getContractById = (req, res, next) => {
    const conId = req.params.conId;
    ContractRepository.getContractById(conId)
        .then(contract => {
            if(!contract)
            {
                res.status(404).json({
                    message: 'Contract with id: ' +conId+ ' not found'
                })
            }else
            {
                res.status(200).json(contract);
            }
        });
};


exports.createContract = (req, res, next) => {
    ContractRepository.createContract(req.body)
        .then(newObj => {
            res.status(201).json(newObj)
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateContract = (req, res, next) => {
    const conId = req.params.conId;
    ContractRepository.updateContract(conId, req.body)
        .then(result => {
            res.status(200).json({message: 'Contract updated!', c: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    //   console.log("Organisation updated2.");
};

exports.deleteContract = (req, res, next) => {
    const conId = req.params.conId;
    ContractRepository.deleteContract(conId)
        .then(result => {
            res.status(200).json({message: 'Removed contract', c: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });

};










