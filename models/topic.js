const { db } = require('../database/connection');


class Topic {

    constructor(name = "", create_at = null, id = null, updated_at = null, delete_at = null){

        this.id         = id;
        this.name       = name;
        this.create_at  = create_at;
        this.updated_at = updated_at;
        this.delete_at  = delete_at;
    }

    static getTabla(){
        return "topic";
    }

    toPublicData() {
        return {
            id:          this.id.toString(), // This is bc serialize BigInt in JSON error.
            name:        this.name,
            last_update: this.updated_at,
        }
    }

    setName(newName){
        this.name = newName;
    }

    create(){

        try {
            let success = db.query(
                `INSERT INTO topic (name) VALUES(?);`,
                [this.name], (err, rows) => {

                    if (err) {
                        //res.status(400).send(err.message);
                        return false;
                    } else {
                        //res.status(201).json({ id: rows.insertId });

                        this.id = rows.insertId;
                        return true;
                    }

                }
            );

            return success;

        } catch (err) {
            //res.status(500).send(err.message);
            return false;
        }
    }

    static async getTopicById(idTopic){

        try {

            let success = await db.query(
                `SELECT * FROM topic WHERE delete_at IS NULL AND id = ?`,
                [idTopic], (err, rows) => {

                    if (err) {
                        //res.status(400).send(err.message);
                        return null;
                    } else {
                        //res.status(201).json({ id: rows.insertId });
                        return rows;
                    }

                }
            );

            if(success.length == 0){ // Id does not exist.
                return null;
            }

            
            let topic = new Topic(success[0].name, success[0].create_at, success[0].id, success[0].updated_at, success[0].delete_at);

            return topic;

        } catch (err) {
            console.log(err)
            //res.status(500).send(err.message);
            return false;
        }
    }

    static async getAll(){

        try {

            let success = await db.query(
                `SELECT * FROM topic WHERE delete_at IS NULL`,
                [], (err, rows) => {

                    if (err) {
                        //res.status(400).send(err.message);
                        return null;
                    } else {
                        //res.status(201).json({ id: rows.insertId });
                        return rows;
                    }

                }
            );

            if(success.length > 0){

                let topics = [];

                success.forEach((item, index) => {

                    let topic = new Topic(item.name, item.create_at, item.id, item.updated_at, item.delete_at);
                    topics.push(topic.toPublicData());
                })

                return topics;
            }

            return null;

        } catch (err) {
            console.log(err)
            //res.status(500).send(err.message);
            return false;
        }
    }

    async delete(){

        try {

            let success = await db.query(
                `UPDATE topic SET delete_at = CURRENT_TIMESTAMP WHERE delete_at IS NULL AND id = ?`,
                [this.id], (err, rows) => {

                    if (err) {
                        //res.status(400).send(err.message);
                        return null;
                    } else {
                        //res.status(201).json({ id: rows.insertId });
                        return rows;
                    }

                }
            );

            if(success.affectedRows == 0){ // Id does not exist.or is deleted already..
                return false;
            }

            return true;

        } catch (err) {
            console.log(err)
            //res.status(500).send(err.message);
            return false;
        }
    }

    async update(){

        try {

            let success = await db.query(
                `UPDATE topic SET updated_at = CURRENT_TIMESTAMP, name = ? WHERE delete_at IS NULL AND id = ?`,
                [this.name, this.id], (err, rows) => {

                    if (err) {
                        //res.status(400).send(err.message);
                        return null;
                    } else {
                        //res.status(201).json({ id: rows.insertId });
                        return rows;
                    }

                }
            );

            if(success.affectedRows == 0){ // Id does not exist.or is deleted already..
                return false;
            }

            return true;

        } catch (err) {
            console.log(err)
            //res.status(500).send(err.message);
            return false;
        }
    }


}

module.exports = Topic;