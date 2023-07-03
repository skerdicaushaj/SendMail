const db = require("../models");
const models = db.sequelize.models;
const axios = require('axios');

exports.create = async (req, res) => {
    try {
        let usersUrl = 'https://jsonplaceholder.typicode.com/users';
        let dataToCheck = await axios.get(usersUrl);

        // Check if the response data is empty
        if (!dataToCheck.data || dataToCheck.data.length === 0) {
            res.status(404).json({ data: 'No data found.' });
            return;
        }

        try {
            const existingUsers = await models.users.findAll({ where: { id: dataToCheck.data.map(data => data.id) } });
            const exists = existingUsers.length === dataToCheck.data.length;

            if (exists) {
                res.status(200).json({data: "Data exists."})
            }
            else{
                const data = await models.users.bulkCreate(dataToCheck.data);
                res.status(200).json({data})

            }
          } catch (error) {
            console.error(error);
          }
    } catch (e) {
        res.status(500).send({message: e.message})
    }
};

exports.list = async (req, res) => {
    try {
        const limit =  req.query.limit || 1000;
        const sortBy = req.query.sort_by || "id"
        const order = req.query.order || "desc"

        const users = await models.users.findAll({
            limit, order: [[sortBy, order]]
        });

        res.status(200).send({data: users})
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}