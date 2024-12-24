# bitcoin_application

## **Bitcoin Tracking Application**

Easily manage and track your Bitcoin wallets!

---

## **How to Run**

Follow the steps below to set up and run both the frontend and backend of the application.

### **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **Python** (v3.7 or later)
- **pip** (comes with Python)

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
    pip install flask
    pip install bitcoinlib
    pip install flask-cors
    ```

5. **Navigate to the Source Directory:**

    ```bash
    cd src
    ```

6. **Run the Backend Application:**

    ```bash
    # Using Flask's CLI
    flask --app main run

    # Alternatively, you can run the main.py file directly
    python main.py  # or python3 main.py
    ```

   The backend server should now be running, typically accessible at `http://localhost:5000` (check your Flask configuration for the exact URL).

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
└── README.md
```

---
