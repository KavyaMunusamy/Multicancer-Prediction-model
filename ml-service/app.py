from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

breast_model = joblib.load('breast_cancer_model.pkl')

cervical_model = joblib.load('cervical_cancer_model.pkl')

scaler = joblib.load('scaler.pkl')

imputer = joblib.load('imputer.pkl')

@app.post('/predict/breast')
def predict_breast(data: dict):

    values = list(data.values())

    input_data = np.array(values).reshape(1, -1)

    input_data = imputer.transform(input_data)

    input_data = scaler.transform(input_data)

    prediction = breast_model.predict(input_data)[0]

    probability = breast_model.predict_proba(input_data)[0][1]

    return {
        'prediction': 'Malignant' if prediction == 1 else 'Benign',
        'risk_score': float(probability)
    }

@app.post('/predict/cervical')
def predict_cervical(data: dict):

    values = list(data.values())

    input_data = np.array(values).reshape(1, -1)

    input_data = imputer.transform(input_data)

    input_data = scaler.transform(input_data)

    prediction = cervical_model.predict(input_data)[0]

    probability = cervical_model.predict_proba(input_data)[0][1]

    return {
        'prediction': 'Cancer Detected' if prediction == 1 else 'No Cancer',
        'risk_score': float(probability)
    }