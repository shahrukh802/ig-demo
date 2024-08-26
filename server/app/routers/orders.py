from fastapi import APIRouter, Depends
import pandas as pd
import os
from app.oauth2 import get_current_user

router = APIRouter(
    tags=['Orders']
)


@router.get('/get-data')
async def get_data(user: int = Depends(get_current_user)):

    file_path = os.path.join(os.getcwd(), 'data', "orders.csv")
    df = pd.read_csv(file_path)
    cleaned_df = clean_data(df)
    
    analysis_results = analyze_data(cleaned_df)
    
    return analysis_results


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    # Check for and remove any duplicate rows
    df = df.drop_duplicates()

    # Ensure date formats are consistent
    df['CLEAN_DateTime'] = pd.to_datetime(df['CLEAN_DateTime'])
    df['Date'] = pd.to_datetime(df['Date'])

    # Check for missing values and handle them if necessary
    df = df.dropna()

    return df

def analyze_data(df: pd.DataFrame) -> dict:
    # Group data by CLEAN_DateTime and sum Quantity
    df_time_series = df.groupby('CLEAN_DateTime').agg({'Quantity': 'sum'}).reset_index()

    # Prepare data for Chart.js
    chart_data = {
        "labels": df_time_series['CLEAN_DateTime'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist(),
        "datasets": [{
            "label": "Quantity Over Time",
            "data": df_time_series['Quantity'].tolist(),
            "backgroundColor": "rgba(75, 192, 192, 0.2)",
            "borderColor": "rgba(75, 192, 192, 1)",
            "borderWidth": 1,
            "fill": False
        }]
    }

    return {
        "chart_data": chart_data,
        "orders_per_region": df['Region'].value_counts().to_dict()
    }