import os
import sys
import mariadb
from dotenv import load_dotenv


def cleardb():
    # Load environment variables
    load_dotenv()

    # List of environment variables to check
    env_vars = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASS", "DB_PORT"]

    # Check if all environment variables are set
    for var in env_vars:
        if var not in os.environ:
            print(f"{var} is not set!")
            sys.exit(1)

    # Database configuration
    config = {
        "host": os.getenv("DB_HOST"),
        "port": int(os.getenv("DB_PORT", 3306)),
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASS"),
        "database": os.getenv("DB_NAME"),
    }

    try:
        # Connect to the database
        conn = mariadb.connect(**config)
        cursor = conn.cursor()

        # Retrieve a list of all tables in the database
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()

        confirm = input(
            "Are you sure you want to drop all tables? This cannot be undone. Type 'yes' to continue: "
        )
        if confirm.lower() != "yes":
            print("Operation cancelled.")
            return

        cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")

        # Drop each table
        for (table,) in tables:
            try:
                print(f"Dropping table: {table}")
                cursor.execute(f"DROP TABLE `{table}`")
            except mariadb.Error as e:
                print(f"Error dropping table {table}: {e}")

        cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")

        # Commit changes
        conn.commit()
        print("All tables have been dropped successfully.")

    except mariadb.Error as e:
        print(f"Error connecting to MariaDB: {e}")
    finally:
        if conn:
            conn.close()
