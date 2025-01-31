# bitcoin_application

## **Bitcoin (TESTNET4) Tracking Application**

Easily manage, track, send and receive bitcoin using your Bitcoin wallets!

---

## **How to Run**

Follow the steps below to set up and run both the frontend and backend of the application.

### **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **Python** (v3.7 or later)
- **pip** (comes with Python)
- **psql** (v15 or later)

### **Frontend**

1. **Navigate to the Frontend Directory:**

    ```bash
    cd frontend/
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Run the Frontend Development Server:**

    ```bash
    npm run dev
    ```

   The frontend should now be running, typically accessible at `http://localhost:3000` (check your project configuration for the exact URL).

### **Backend**

1. **Navigate to the Backend Directory:**

    ```bash
    cd backend/
    ```

2. **Create a Python Virtual Environment (Recommended):**

    ```bash
    python -m venv venv
    ```

3. **Activate the Virtual Environment:**

    - **Windows:**

        ```bash
        venv\Scripts\activate
        ```

    - **Mac/Linux:**

        ```bash
        source venv/bin/activate
        ```

4. **Install Required Python Packages:**

    ```bash
    (python3 -m) pip install flask
    (python3 -m) pip install bitcoinlib
    (python3 -m) pip install flask-cors
    (python3 -m) pip install flask-bcrypt
    (python3 -m) pip install flask-jwt-extended
    (python3 -m) pip install pandas
    (python3 -m) pip install psycopg2
    (python3 -m) pip install python-dotenv
    ```
5. **Setup .env file**

    - Create .env file in **bitcoin_application** directory.
    - Setup AES_SECRET_KEY variable, example:
       ```bash
       AES_SECRET_KEY='your_secret_key_here'

6. **Navigate to the Source Directory:**

    ```bash
    cd src
    ```

7. **Run the Backend Application:**

    ```bash
    # Using Flask's CLI
    flask --app main run

    # Alternatively, you can run the main.py file directly
    python main.py  # or python3 main.py
    ```

   The backend server should now be running, typically accessible at `http://localhost:127.0.0.1` (check your Flask configuration for the exact URL).

---

## **Project Structure**

```
bitcoin_application/
├── frontend/
│   ├── package.json
│   └── ... (other frontend files)
├── backend/
│   ├── venv/
│   ├── src/
│   │   ├── main.py
│   │   └── ... (other backend files)
│   └── ... (other backend files)
├── README.md
└── .env
```

---
