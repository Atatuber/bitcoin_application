import pandas as pd
from sqlalchemy import create_engine
import os

class DBConfig:
    def __init__(self):
        self.user = os.getenv("DB_USER", "postgres")
        self.password = os.getenv("DB_PASSWORD", "Project!123")
        self.host = os.getenv("DB_HOST", "localhost")
        self.port = os.getenv("DB_PORT", "5432")
        self.database = os.getenv("DB_NAME", "chainvault")
        self.engine = self.createConnection()

    def createConnection(self):
        try:
            connection_string = f"postgresql://{self.user}:{self.password}@{self.host}:{self.port}/{self.database}"
            engine = create_engine(connection_string)
            print("Database connection established.")
            return engine
        except Exception as e:
            print(f"Error creating database connection: {e}")
            return None

    def readQuery(self, query):
        try:
            with self.engine.connect() as connection:
                df = pd.read_sql(query, connection)
                return df
        except Exception as e:
            print(f"Error reading data: {e}")
            return None

db = DBConfig()