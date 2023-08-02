const OrganisationRepository = require('../repository/mysql2/OrganisationRepository');


exports.getOrganisations = (req, res, next) => {
    OrganisationRepository.getOrganisations()
        .then(organisations => {
            res.status(200).json(organisations);
        }).catch(err => {
            console.log(err);
    });

};

exports.getOrganisationById = (req, res, next) => {
    const orgId = req.params.orgId;
    OrganisationRepository.getOrganisationById(orgId)
        .then(organisation => {
            if(!organisation)
            {
                res.status(404).json({
                    message: 'Organisation with id: ' +orgId+ ' not found'
                })
            }else
            {
                res.status(200).json(organisation);
            }
        });
};


exports.createOrganisation = (req, res, next) => {
    OrganisationRepository.createOrganisation(req.body)
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

exports.updateOrganisation = (req, res, next) => {
    const orgId = req.params.orgId;
    OrganisationRepository.updateOrganisation(orgId, req.body)
        .then(result => {
            res.status(200).json({message: 'Organisation updated!', o: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
 //   console.log("Organisation updated2.");
};

exports.deleteOrganisation = (req, res, next) => {
    const orgId = req.params.orgId;
    OrganisationRepository.deleteOrganisation(orgId)
        .then(result => {
            res.status(200).json({message: 'Removed organisation', o: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });

};










