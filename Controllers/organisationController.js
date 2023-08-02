const OrganisationRepository  = require('../repository/mysql2/OrganisationRepository');


exports.showOrganisationList = (req, res, next) => {
    OrganisationRepository.getOrganisations()
        .then(organisations => {
            res.render('pages/organisation/list', {
                organisations: organisations,
                navLocation: 'organisation',
                validationErrors: []
            });
        });
}


exports.showAddOrganisationForm = (req, res, next) => {
    res.render('pages/organisation/form', {
        organisation: {},
        pageTitle: req.__('organisation.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('organisation.form.add.btnLabel'),
        formAction: '/organisations/add',
        navLocation: 'organisation',
        validationErrors: []
    });
};

exports.showEditOrganisationForm = (req, res, next) => {
    const orgId = req.params.orgId;
    OrganisationRepository.getOrganisationById(orgId)
        .then(organisation => {
            res.render('pages/organisation/form', {
                organisation: organisation,
                formMode: 'edit',
                pageTitle: req.__('organisation.form.edit.pageTitle'),
                btnLabel: req.__('organisation.form.edit.btnLabel'),
                formAction: '/organisations/edit',
                navLocation: 'organisation',
                validationErrors: []
            });
        });

};


exports.showOrganisationDetails = (req, res, next) => {
    const orgId = req.params.orgId;
    OrganisationRepository.getOrganisationById(orgId)
        .then(organisation => {
            res.render('pages/organisation/form', {
                organisation: organisation,
                formMode: 'showDetails',
                pageTitle: req.__('organisation.form.details.pageTitle'),
                formAction: '',
                navLocation: 'organisation',
                validationErrors: []
            });
        });
};

//The operation const orgData = { ...req.body }; creates a new Javascript object orgData copying all fields from req.body.
exports.addOrganisation = (req, res, next) => {
    const orgData = {...req.body};

    OrganisationRepository.createOrganisation(orgData)
        .then(result => {
            res.redirect('/organisations');
        }).catch(err => {
            console.log(orgData);
            console.log(err.message);
        res.render('pages/organisation/form', {
            organisation: orgData,
            pageTitle: req.__('organisation.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('organisation.form.add.btnLabel'),
            formAction: '/organisations/add',
            navLocation: 'organisation',
            validationErrors: err.details
        });
    });

};

exports.updateOrganisation = (req, res, next) => {
    const orgId = req.body.orgId;
    const orgData = {...req.body};
    OrganisationRepository.updateOrganisation(orgId, orgData)
        .then(result => {
            res.redirect('/organisations');
        }).catch(err => {
            console.log(orgData);
            console.log(err);
        res.render('pages/organisation/form', {
            organisation: orgData,
            formMode: 'edit',
            pageTitle: req.__('organisation.form.edit.pageTitle'),
            btnLabel: req.__('organisation.form.edit.btnLable'),
            formAction: '/organisations/edit',
            navLocation: 'organisation',
            validationErrors: err.details
        });
    });
};

exports.deleteOrganisation = (req, res, next) => {
    const orgId = req.params.orgId;
    OrganisationRepository.deleteOrganisation(orgId)
        .then( () => {
            res.redirect('/organisations');
        });
};
