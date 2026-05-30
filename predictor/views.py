from joblib import numpy_pickle_compat
import os
import joblib
import pandas as pd
# pyrefly: ignore [missing-import]
from django.shortcuts import render
# pyrefly: ignore [missing-import]
from django.conf import settings

# Load model saat server menyala
MODEL_PATH = os.path.join(settings.BASE_DIR, 'predictor', 'ml_models', 'model_prediksi_biaya.pkl')
ENCODER_PATH = os.path.join(settings.BASE_DIR, 'predictor', 'ml_models', 'label_encoders.pkl')

model = joblib.load(MODEL_PATH)
label_encoders = joblib.load(ENCODER_PATH)

def home(request):
    # Pastikan di sini manggilnya home.html, jangan predict.html!
    return render(request, 'predictor/home.html')

def predict_cost(request):
    context = {}
    if request.method == 'POST':
        req_cpu = float(request.POST.get('req_cpu', 0))
        act_cpu = float(request.POST.get('act_cpu', 0))
        cpu_util = float(request.POST.get('cpu_util', 0))
        region = request.POST.get('region', 'US-East-1')
        billing = request.POST.get('billing', 'Monthly')
        service = request.POST.get('service', 'Compute')
        status = request.POST.get('status', 'Running')
        
        # Encode fitur kategorikal
        input_data = {
            'Required_CPU_Hours': req_cpu,
            'Actual_CPU_Hours': act_cpu,
            'CPU_Utilization': cpu_util,
        }
        
        # Encode kolom kategorikal jika ada di label_encoders
        categorical_cols = {
            'Region': region,
            'Billing_Type': billing,
            'Service_Type': service,
            'Resource_Status': status,
        }
        
        for col, val in categorical_cols.items():
            if col in label_encoders:
                le = label_encoders[col]
                if val in le.classes_:
                    input_data[col] = le.transform([val])[0]
                else:
                    input_data[col] = 0  # fallback
            else:
                input_data[col] = 0
        
        # Buat DataFrame dan prediksi
        df_input = pd.DataFrame([input_data])
        
        # Pastikan urutan kolom sesuai model
        if hasattr(model, 'feature_names_in_'):
            df_input = df_input.reindex(columns=model.feature_names_in_, fill_value=0)
        
        pred_cost = round(model.predict(df_input)[0], 2)
        
        # Hitung optimization & efisiensi
        opt = round(pred_cost * (1 - cpu_util / 100), 2) if cpu_util < 100 else 0
        cpu_efficiency = "Efisien ✅" if cpu_util >= 70 else "Tidak Efisien ❌"
        
        if cpu_util >= 80:
            rec = "Resource sudah optimal, pertahankan konfigurasi."
        elif cpu_util >= 50:
            rec = "Pertimbangkan right-sizing untuk menghemat biaya."
        else:
            rec = "Resource sangat underutilized! Segera lakukan optimasi."

        context = {
            'pred_cost': pred_cost,
            'opt': opt,
            'cpu_efficiency': cpu_efficiency,
            'rec': rec,
            'is_post': True
        }
        
    # Pastikan di akhir fungsi ini manggilnya predict.html!
    return render(request, 'predictor/predict.html', context)