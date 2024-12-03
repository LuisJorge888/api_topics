const { db } = require('../database/connection');


class Topic {

    constructor(name = "", current_price = null, create_at = null, id = null, updated_at = null, delete_at = null){

        this.id         = id;
        this.name       = name;
        this.price      = current_price;
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
            price:       this.price,
            last_update: this.updated_at
        }
    }

    setName(newName){
        this.name = newName;
    }

    async create(){

        try {

            let insert = await db.query(
                `INSERT INTO tp_topic (tp_name, tp_current_price) VALUES (?,?);`,
                [this.name, this.price], (err, rows) => {

                    if (err) {
                        //res.status(400).send(err.message);

                        return null;
                    } else {
                        //res.status(201).json({ id: rows.insertId });
                        return rows;
                    }
                }
            );

            if(insert == null){
                return false;
            }

            this.id = insert.insertId;

            return true;

        } catch (err) {
            //res.status(500).send(err.message);
            return false;
        }
    }

    static async getTopicById(idTopic){

        try {

            let success = await db.query(
                `SELECT * FROM tp_topic WHERE tp_delete_at IS NULL AND tp_id = ?`,
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

            
            let topic = new Topic(success[0].tp_name, success[0].tp_current_price, success[0].tp_create_at, success[0].tp_id, success[0].tp_updated_at, success[0].tp_delete_at);

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
                `SELECT * FROM tp_topic WHERE tp_delete_at IS NULL`,
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

                    let topic = new Topic(item.tp_name, item.tp_current_price, item.tp_create_at, item.tp_id, item.tp_updated_at, item.tp_delete_at);
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
                `UPDATE tp_topic SET tp_delete_at = CURRENT_TIMESTAMP WHERE tp_delete_at IS NULL AND tp_id = ?`,
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
                `UPDATE tp_topic SET tp_updated_at = CURRENT_TIMESTAMP, tp_name = ? WHERE tp_delete_at IS NULL AND tp_id = ?`,
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