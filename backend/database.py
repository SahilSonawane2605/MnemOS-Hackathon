import sqlite3

db = sqlite3.connect("database.db", check_same_thread=False)
db.row_factory = sqlite3.Row

cursor = db.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    title TEXT,
    topic TEXT,
    skill TEXT,
    source TEXT,
    timestamp TEXT,
    duration_seconds INTEGER
)
""")

db.commit()


def get_cursor():
    return db.cursor()


def commit():
    db.commit()