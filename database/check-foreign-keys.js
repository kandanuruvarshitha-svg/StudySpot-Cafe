
const db = require('./database');

db.all(
    "PRAGMA foreign_key_list(bookings)",
    (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Foreign Key Relationships:");
            console.log(rows);
        }

        db.close();
    }
);
