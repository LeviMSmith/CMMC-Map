import mariadb
from dotenv import load_dotenv
import os
import sys
import json
import re


def read_json():
    # Read JSON string from stdin
    json_str = sys.stdin.read()

    # Parse the JSON string into a Python object
    try:
        data = json.loads(json_str)
        print("json parsed successfully")
        return data
    except json.JSONDecodeError:
        print("Error: Input is not valid JSON.")
        sys.exit(1)


def insert_data(data, cur, conn):
    print("Resetting static tables")

    cur.execute("SET FOREIGN_KEY_CHECKS = 0;")
    print("Disabled foreign key checks")

    tables_to_reset = [
        "policies_assessment_objective",
        "policies_control",
        "policies_section",
    ]

    for table in tables_to_reset:
        sql = f"TRUNCATE TABLE `{table}`"
        cur.execute(sql)
        print(f"Reset data and auto-increment for {table}")

    cur.execute("SET FOREIGN_KEY_CHECKS = 1;")
    print("Foreign key checks re-enabled")

    # Insertion commands remain unchanged
    section_insert_sql = "INSERT IGNORE INTO policies_section (id) VALUES (?)"
    control_insert_sql = "INSERT INTO policies_control (id, section_id) VALUES (?, ?)"
    assessment_objective_insert_sql = (
        "INSERT INTO policies_assessment_objective (letter, control_id) VALUES (?, ?)"
    )

    for control in data:
        section_pattern = re.compile(r"3\.(\d+)\.\d+")

        section_match = re.search(section_pattern, control["section"])
        if section_match is None:
            raise ValueError(
                f"Control {control['id']} has section name {control['section']} which doesn't seem to contain its major section. Should be of the form 3.x.x"
            )

        section = int(section_match.group(1))

        cur.execute(section_insert_sql, (section,))
        cur.execute(control_insert_sql, (control["id"], section))

        for letter, objective in control["assessment_objectives"].items():
            cur.execute(assessment_objective_insert_sql, (letter, control["id"]))


def jsontodb():
    load_dotenv()

    # List of environment variables to check
    env_vars = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASS"]

    for var in env_vars:
        if not var in os.environ:
            print(f"{var} is not set!")
            sys.exit(1)

    config = {
        "host": os.getenv("DB_HOST"),
        "port": int(os.getenv("DB_PORT", 3306)),
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASS"),
        "database": os.getenv("DB_NAME"),
    }

    try:
        conn = mariadb.connect(**config)
        cursor = conn.cursor()
        print("Connected to database successfully!")

        data = read_json()

        insert_data(data, cursor, conn)

        conn.commit()

        cursor.close()
        conn.close()

        print("Data inserted successfully")

    except mariadb.Error as e:
        print(f"Failed to insert into MariaDB: {e}")
        conn.rollback()
        sys.exit(1)
