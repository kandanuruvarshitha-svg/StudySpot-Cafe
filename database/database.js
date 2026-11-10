
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to database
const dbPath = path.join(__dirname, '..', 'studyspot.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to StudySpot Cafe database');
    }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON', (err) => {
    if (err) {
        console.error(err.message);
    }
});

db.serialize(() => {

    // Students table
    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )
    `);

    // Carrels table
    db.run(`
        CREATE TABLE IF NOT EXISTS carrels (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            zone TEXT NOT NULL
        )
    `);

    // Bookings table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            carrel_id INTEGER NOT NULL,
            booking_date TEXT NOT NULL,
            FOREIGN KEY (student_id) REFERENCES students(id),
            FOREIGN KEY (carrel_id) REFERENCES carrels(id)
        )
    `);

    console.log('All three tables created successfully');

    // Sample students
    db.run(`INSERT OR IGNORE INTO students
        (id, name, email)
        VALUES (1, 'Pranav', 'pranav@gmail.com')`);

    db.run(`INSERT OR IGNORE INTO students
        (id, name, email)
        VALUES (2, 'Rahul', 'rahul@gmail.com')`);

    // Sample carrels
    db.run(`INSERT OR IGNORE INTO carrels
        (id, name, zone)
        VALUES (1, 'Carrel A1', 'Zone A')`);

    db.run(`INSERT OR IGNORE INTO carrels
        (id, name, zone)
        VALUES (2, 'Carrel B1', 'Zone B')`);

    // Sample booking
    db.run(`INSERT OR IGNORE INTO bookings
        (id, student_id, carrel_id, booking_date)
        VALUES (1, 1, 1, '2026-11-10')`);

    console.log('Sample records inserted');
});

module.exports = db;
