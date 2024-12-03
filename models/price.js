const { db } = require('../database/connection');


class Price {

    constructor(pr_id = null, pr_price = null, pr_topic_id = null, pr_create_at = null){
        
        this.pr_id = pr_id;
        this.pr_price = pr_price;
        this.pr_topic_id = pr_topic_id;
        this.pr_create_at = pr_create_at;
    }

    static getTable(){
        return "pr_price"
    }

    toPublicData() {
        return {
            pr_id:          this.pr_id.toString(), // This is bc serialize BigInt in JSON error.
            pr_price:       this.pr_price,
            pr_topic_id:    this.pr_topic_id.toString() 
        }
    }

    async create(){

        try {
            
            let insert = await db.query(
                `INSERT INTO pr_price (pr_topic_id, pr_price) VALUES (?,?);`,
                [this.pr_topic_id.toString(), this.pr_price], (err, rows) => {

                    if (err) {
                        //res.status(400).send(err.message);

                        //console.error(err.message)
                        return false;
                    } else {
                        //res.status(201).json({ id: rows.insertId });
                        return true;
                    }
                }
            );

            if(!insert){
                return false;
            }

            this.pr_id = insert.insertId;

            console.table(this)

            return insert;

        } catch (err) {
            //res.status(500).send(err.message);

            //console.error(err.message)
            console.log(err.message)

            return false;
        }
    }

    static async getHistory(idTopic){
        
        try {

            let select = await db.query(
                `SELECT * FROM pr_price WHERE pr_topic_id = ?`,
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

            if(select.length > 0){

                let prices = [];

                select.forEach((item, index) => {

                    let price = new Price(item.pr_id, item.pr_price, item.pr_topic_id, item.pr_create_at);
                    prices.push(price.toPublicData());
                })

                return prices;
            }

            return null;

        } catch (err) {
            console.log(err)
            //res.status(500).send(err.message);
            return false;
        }
    }

}

module.exports = Price;