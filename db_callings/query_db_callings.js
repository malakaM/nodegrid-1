/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var logger = require('../utils/log');
var utils = require('../utils/utils');
var mongo_connection = require('../utils/mongoose_connection');
var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

/**
 * Query all object from given mongo collection
 * @param req
 * @param res
 */
module.exports.getAllFromDB = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.find({}, function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, 'Internal Server Error - ['+ req.params.modelName +'] data querying was failed', err);
        } else {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data successfully retrieved");
            utils.sendResponse(res, 200, '['+ req.params.modelName +'] data successfully retrieved', records);
        }
    });

};

/**
 * Query One object from given mongo collection
 * @param req
 * @param res
 */
module.exports.getOneFromDB = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.findOne({_id: req.params.id}, function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, 'Internal Server Error - ['+ req.params.modelName +'] data querying was failed', err);
        } else {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data successfully retrieved");
            utils.sendResponse(res, 200, '['+ req.params.modelName +'] data successfully retrieved', records);
        }
    });

};

module.exports.getOneFromDBHardCoded = function (req, res) {

    var entityModel = mongoose.model('cars', entity);
    /*entityModel.findOne({"data.year": {$gt: "1992"}, "data.model":"Sunny"}, "price year", function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, 'Internal Server Error - ['+ req.params.modelName +'] data querying was failed', err);
        } else {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data successfully retrieved");
            utils.sendResponse(res, 200, '['+ req.params.modelName +'] data successfully retrieved', records);
        }
    });*/

    entityModel.find({})
        .where('data.model').equals('corolla')
        .where('data.model').equals('Sunny')
        .select("data.price data.year")
        .sort("data.price")
        .exec(function (err, records) {
            if (err) {
                logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
                utils.sendResponse(res, 500, 'Internal Server Error - ['+ req.params.modelName +'] data querying was failed', err);
            } else {
                logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data successfully retrieved");
                utils.sendResponse(res, 200, '['+ req.params.modelName +'] data successfully retrieved', records);
            }
        });

};