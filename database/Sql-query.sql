CREATE DATABASE topics_dev;

create table tp_topic (
    tp_id SERIAL PRIMARY KEY, 
    tp_name VARCHAR(50), 
    tp_current_price DOUBLE UNSIGNED NOT NULL,
    tp_create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    tp_updated_at TIMESTAMP, 
    tp_delete_at TIMESTAMP
);

create table pr_price (
    pr_id SERIAL PRIMARY KEY, 
    pr_price DOUBLE UNSIGNED NOT NULL,  
    pr_topic_id BIGINT UNSIGNED NOT NULL,  
    pr_create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT `fk_price_topic` FOREIGN KEY (pr_topic_id) REFERENCES tp_topic (tp_id) ON DELETE CASCADE ON UPDATE RESTRICT
);