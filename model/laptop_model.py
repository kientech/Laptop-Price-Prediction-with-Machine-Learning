from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd

# Load the model and DataFrame
pipe = pickle.load(open('pipe.pkl', 'rb'))
df = pickle.load(open('df.pkl', 'rb'))

# Define a FastAPI app
app = FastAPI()

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins, but consider specifying domains in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


# Define a Pydantic model for input validation
class LaptopInput(BaseModel):
    company: str
    laptop_type: str
    ram: int
    weight: float
    touchscreen: str
    ips: str
    screen_size: float
    resolution: str
    cpu: str
    hdd: int
    ssd: int
    gpu: str
    os: str


# Helper function to convert categorical values to numerical indices
def encode_categorical(value, category_list):
    try:
        return category_list.index(value)
    except ValueError:
        raise ValueError(f"Category '{value}' not found in the category list.")


# Helper function to prepare input data for prediction
def prepare_input_data(input_data: LaptopInput):
    # Convert categorical variables to numerical values
    touchscreen = 1 if input_data.touchscreen.lower() == 'yes' else 0
    ips = 1 if input_data.ips.lower() == 'yes' else 0

    # Convert categorical inputs to indices
    try:
        company_index = encode_categorical(input_data.company, df['Company'].unique().tolist())
        laptop_type_index = encode_categorical(input_data.laptop_type, df['TypeName'].unique().tolist())
        cpu_index = encode_categorical(input_data.cpu, df['Cpu brand'].unique().tolist())
        gpu_index = encode_categorical(input_data.gpu, df['Gpu brand'].unique().tolist())
        os_index = encode_categorical(input_data.os, df['os'].unique().tolist())
    except ValueError as e:
        return {"error": str(e)}

    # Calculate PPI
    try:
        X_res, Y_res = map(int, input_data.resolution.split('x'))
        ppi = ((X_res ** 2) + (Y_res ** 2)) ** 0.5 / input_data.screen_size
    except (ValueError, ZeroDivisionError) as e:
        return {"error": f"Invalid resolution format or screen size. Error: {e}"}

    # Prepare the query array
    query_dict = {
        'Company': company_index,
        'TypeName': laptop_type_index,
        'RAM': input_data.ram,
        'Weight': input_data.weight,
        'Touchscreen': touchscreen,
        'IPS': ips,
        'PPI': ppi,
        'Cpu brand': cpu_index,
        'HDD': input_data.hdd,
        'SSD': input_data.ssd,
        'Gpu brand': gpu_index,
        'OS': os_index
    }

    # Convert dictionary to DataFrame to match model input format
    query_df = pd.DataFrame([query_dict])

    return query_df


# Endpoint to predict laptop price
@app.post("/predict")
def predict_price(input_data: LaptopInput):
    # Prepare the input data
    query_df = prepare_input_data(input_data)

    if isinstance(query_df, dict) and "error" in query_df:
        return query_df  # Return error if any occurred in preparation

    # Predict the price
    try:
        predicted_price = pipe.predict(query_df)
    except Exception as e:
        return {"error": f"Prediction error: {e}"}

    # Return the predicted price
    return {"predicted_price": f"${int(np.exp(predicted_price[0]))}"}
