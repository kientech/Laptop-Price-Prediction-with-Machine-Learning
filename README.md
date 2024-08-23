# 🚀 Laptop Price Prediction with Machine Learning - KienTech

## Description

The **Laptop Price Prediction with Machine Learning** project provides a system to predict the price of laptops based on various features such as processor type, RAM size, storage capacity, and more. This solution uses machine learning techniques to offer accurate price estimates, helping potential buyers make informed decisions and allowing sellers to better understand market trends.

### Purpose

With the increasing number of laptop models and configurations, predicting the price can be challenging for both consumers and sellers. This project aims to:

- **Predict Prices Accurately:** By analyzing historical data on laptop specifications and their corresponding prices, the system predicts the price of a laptop given its features.
- **Assist Buyers:** Provides potential buyers with an estimate of what they should expect to pay for a laptop with specific features.
- **Support Sellers:** Helps sellers set competitive prices based on the features and market trends.

### How It Works

1. **Data Collection:** The system uses a dataset containing information about various laptop models, including their specifications and prices.
2. **Feature Engineering:** Relevant features from the dataset are selected and preprocessed to enhance the model’s performance.
3. **Model Training:** A machine learning model is trained on the historical data to learn the relationship between laptop features and their prices.
4. **Prediction:** The trained model is used to predict the price of a laptop based on its features.
5. **User Interface:** Users can input laptop specifications through a web interface to receive a predicted price.

### Components

- **Backend:** Implements machine learning algorithms and provides API endpoints using Python and Flask. It handles data processing, model training, and price prediction.
- **Frontend:** Developed using React.js, the frontend offers a user-friendly interface for entering laptop specifications and viewing predicted prices.
- **Model Training:** Involves training scripts and algorithms that process historical laptop data to build a predictive model.

### Features

- **Price Prediction:** Predict the price of a laptop based on its features such as CPU type, RAM, storage, screen size, and more.
- **Data Visualization:** Provides insights into how different features affect laptop prices.
- **Interactive Interface:** Allows users to input specifications and see predicted prices in real time.

## Tech Stack

- **Backend:**
  - Python
  - Flask (for creating the API)
  - Scikit-learn (for machine learning model training and prediction)
- **Frontend:**
  - React.js (for building the user interface)
  - Axios (for making API calls)
  - Bootstrap / Tailwind CSS (for styling and responsive design)
- **Database:** 
  - SQLite / MongoDB (optional, for storing historical data and user inputs)
- **Deployment:**
  - Docker (optional, for containerizing the application)
  - Heroku / AWS / Azure (for hosting the application)

## Installation

### Prerequisites

- Python 3.x
- Node.js and npm

### Backend Setup

1. Clone the repository:

    ```bash
    git clone [https://github.com/yourusername/laptop-price-prediction.git](https://github.com/kientech/Laptop-Price-Prediction-with-Machine-Learning)
    ```

2. Navigate to the backend directory:

    ```bash
    cd laptop-price-prediction/backend
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Start the Flask server:

    ```bash
    python app.py
    ```

   The backend server should now be running on `http://localhost:5000` (or another port if configured differently).

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd laptop-price-prediction/frontend
    ```

2. Install the required npm packages:

    ```bash
    npm install
    ```

3. Start the React.js development server:

    ```bash
    npm start
    ```

   The frontend application should now be running on `http://localhost:3000` (or another port if configured differently).

## Usage

- **Web Interface:** Access the web application in your browser. Enter laptop specifications such as processor type, RAM size, storage capacity, etc., and receive a predicted price based on the input.
- **API Endpoints:** The backend API provides endpoints for receiving data from the frontend and returning predictions. You can interact with these endpoints directly using tools like Postman for testing.

### Example API Requests

- **GET /api/predict** - Retrieve a predicted price for a laptop based on input features.
- **POST /api/predict** - Submit laptop specifications and receive a predicted price.

## Model Training

The machine learning model is trained using a dataset containing laptop specifications and their corresponding prices. The training script is located in the `model_training` directory.

### Steps to Retrain the Model:

1. Navigate to the `model_training` directory:

    ```bash
    cd laptop-price-prediction/model_training
    ```

2. Run the training script:

    ```bash
    python train_model.py
    ```

   This script will preprocess the data, train the model, and save it for use by the backend API.

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test them thoroughly.
4. Submit a pull request with a description of your changes.
