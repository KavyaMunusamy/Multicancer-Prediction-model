**Multicancer Prediction Model**

This repository contains a full-stack application for predicting breast and cervical cancer using a small FastAPI machine-learning service, an Express.js backend with user authentication and history, and a React + Vite frontend.

**Quick Summary**
- **Backend**: Node/Express API that handles authentication, saving prediction history, and forwarding requests to the ML service. See [backend/server.js](backend/server.js).
- **Frontend**: React app (Vite) that provides the UI and talks to the backend. See [frontend/package.json](frontend/package.json).
- **ML service**: FastAPI app that loads pre-trained models and exposes prediction endpoints. See [ml-service/app.py](ml-service/app.py).
- **Database**: MySQL schema for users and predictions. See [database/schema.sql](database/schema.sql).

**Repository Structure**
- **`backend/`**: Express API and routes ([backend/server.js](backend/server.js)).
- **`backend/config/db.js`**: MySQL connection (uses environment variables).
- **`backend/routes`**: API route definitions for auth, prediction, and history.
- **`frontend/`**: React + Vite app. Main source in [frontend/src](frontend/src).
- **`ml-service/`**: FastAPI model server and model artifacts.
- **`database/schema.sql`**: SQL to create required tables.

**Setup & Run**

Prerequisites:
- Node.js and npm (Node 16+ recommended)
- Python 3.8+ and pip
- MySQL server

1) Database
- Create the database and tables by running the SQL in [database/schema.sql](database/schema.sql) (for example via `mysql -u root -p < database/schema.sql`).

2) Backend
- Copy or create a `.env` file in `backend/` with the following variables:

```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=cancer_prediction
# (optional) replace hard-coded JWT values in source with an env var
JWT_SECRET=your_jwt_secret
```

- Install and start the backend:

```
cd backend
npm install
npm start
```

- The backend runs by default on port `5000` and exposes the API under `/api`.

3) ML service
- The FastAPI app loads model artifacts from the `ml-service/` folder. Ensure these files are present:

- `breast_cancer_model.pkl`
- `cervical_cancer_model.pkl`
- `scaler.pkl` (required by `app.py`)
- `imputer.pkl` (required by `app.py`)

- Create and activate a Python virtualenv, then install runtime deps and run the server:

```
cd ml-service
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn joblib scikit-learn numpy
uvicorn app:app --reload --port 8000
```

- The ML service listens on port `8000` and exposes:
- `POST /predict/breast` — expects a JSON body with feature values, returns `prediction` and `risk_score`.
- `POST /predict/cervical` — same as above for the cervical model.

4) Frontend
- Install and run the Vite dev server:

```
cd frontend
npm install
npm run dev
```

- The frontend is configured to call the backend at `http://localhost:5000/api` (see [frontend/src/services/api.js](frontend/src/services/api.js)).

**API Reference**
- `POST /api/auth/register` — Register a user. Body: `{ name, email, password }`.
- `POST /api/auth/login` — Login. Body: `{ email, password }`. Returns `token` and `user`.
- `POST /api/predict/breast` — Protected. Requires header `Authorization: Bearer <token>`. Body: feature values JSON. Returns `{ prediction, risk_score }`.
- `POST /api/predict/cervical` — Protected. Same pattern.
- `GET /api/history` — Protected. Returns saved prediction history for the authenticated user.

Notes about authentication and tokens:
- Tokens are created and verified using JWT in `backend/controllers/authController.js` and `backend/middleware/authMiddleware.js`.
- The current code uses the string `SECRET_KEY` when signing/verifying tokens. For production, move this value into an environment variable (for example `JWT_SECRET`) and update the code to use `process.env.JWT_SECRET`.

**Important Implementation Details & Caveats**
- The ML service expects `scaler.pkl` and `imputer.pkl` alongside the trained model files. If these artifacts are missing the ML service will fail to start or raise errors on prediction.
- The backend saves predictions in MySQL. Ensure the DB user in your `.env` has appropriate privileges.
- The backend currently logs MySQL connection and server start messages to the console.

**Development Notes & Suggestions**
- You can run the backend with automatic reload using `npx nodemon server.js` (nodemon is listed in `backend/package.json` dependencies).
- Consider adding a `.env.example` and reading `JWT_SECRET` from environment for better security.
- Add a `requirements.txt` in `ml-service/` to pin Python dependencies for reproducibility.

**Where to Look in Code**
- Server entry: [backend/server.js](backend/server.js)
- DB config: [backend/config/db.js](backend/config/db.js)
- Prediction controller: [backend/controllers/predictionController.js](backend/controllers/predictionController.js)
- ML API: [ml-service/app.py](ml-service/app.py)
- Frontend API wrapper: [frontend/src/services/api.js](frontend/src/services/api.js)

**Running the full stack locally (short checklist)**
- Start MySQL and create DB: `mysql -u root -p < database/schema.sql`
- Start ML service: run `uvicorn app:app --reload --port 8000` inside `ml-service/` (ensure pkl files present)
- Start backend: `cd backend && npm install && npm start`
- Start frontend: `cd frontend && npm install && npm run dev`

**Contributing & Next Steps**
- If you'd like, I can:
- Add a `.env.example` and update the backend to use `process.env.JWT_SECRET`.
- Create a `requirements.txt` for `ml-service/`.
- Add npm scripts for development with nodemon.

**License**
- No license file is included. Add a `LICENSE` file if you want a specific open-source license applied.

----

If you want, I can update the code to read `JWT_SECRET` from the environment and add `.env.example`. See [backend/server.js](backend/server.js) and [backend/controllers/authController.js](backend/controllers/authController.js) for the relevant spots.
