import pandas as pd
from sqlalchemy import create_engine, text
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

    def readQuery(self, query, params=None):
        try:
            with self.engine.connect() as connection:
                df = pd.read_sql(text(query), connection, params=params)
                return df
        except Exception as e:
            print(f"Error reading data: {e}")
            return None
        
    def insertQuery(self, query, params=None):
        try:
            with self.engine.connect() as connection:
                transaction = connection.begin()
                try:
                    result = connection.execute(text(query), params)
                    transaction.commit()
                    if result.returns_rows:
                        df = pd.DataFrame(result.fetchall(), columns=result.keys())
                        return df
                    return None
                except Exception as e:
                    transaction.rollback()
                    raise e
        except Exception as e:
            print(f"Error executing INSERT query: {e}")
            return None



db = DBConfig()