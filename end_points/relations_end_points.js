/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var relationsServices = require('../services/relations_services');

/**
 * Creating REST end-points for relations
 * @param app
 */
module.exports.createRelationsEndPoints = function(app) {

    //Create new relation between given models
    app.post('/api/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [POST/api/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier]');
        relationsServices.handleCreateRelationsPost(req, res);
    });

    app.get('/api/:entity/:identifier/:type/:secondEntity', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [GET/api/:entity/:identifier/:type]');
        relationsServices.handleRetrieveRelationsWithType(req, res);
    });

    app.del('/api/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [DELETE/api/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier]');
        relationsServices.handleDeleteRelations(req, res);
    });
};