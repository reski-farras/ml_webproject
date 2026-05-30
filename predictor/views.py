from joblib import numpy_pickle_compat
import os
import joblib
import pandas as pd
# pyrefly: ignore [missing-import]
from django.shortcuts import render
# pyrefly: ignore [missing-import]
from django.conf import settings

# 1. Tentukan path lokasi file pkl model dan encoder secara dinamis
MODEL_PATH = os.path.join(settings.BASE_DIR, 'predictor', 'ml_models', 'model_prediksi_biaya.pkl')
ENCODER_PATH = os.path.join(settings.BASE_DIR, 'predictor', 'ml_models', 'label_encoders.pkl')

# 2. Load model & encoder ke dalam memori server saat Django pertama kali dinyalakan
try:
    model = joblib.load(MODEL_PATH)
    encoders = joblib.load(ENCODER_PATH)
except Exception as e:
    model = None
    encoders = None
    print(f"⚠️ Gagal memuat file ML pkl: {e}")

def home(request):
    return render(request, 'predictor/home.html')

def predict_cost(request):
    context = {'is_post': False}
    
    if request.method == 'POST':
        try:
            # 3. Tangkap 4 data angka dari form HTML
            storage = float(request.POST.get('storage', 0))
            req_cpu = float(request.POST.get('req_cpu', 0))
            act_cpu = float(request.POST.get('act_cpu', 0))
            cpu_util = float(request.POST.get('cpu_util', 0))
            
            # 4. Tangkap 4 data teks/kategori dari dropdown HTML
            region = request.POST.get('region')
            billing = request.POST.get('billing')
            service = request.POST.get('service')
            status = request.POST.get('status')

            # 5. Hitung otomatis parameter ke-9 (CPU_Efficiency)
            cpu_efficiency = act_cpu / req_cpu if req_cpu > 0 else 0

            # 6. Susun menjadi DataFrame dengan urutan kolom yang persis sama saat training
            input_data = pd.DataFrame([{
                "Storage_Used_GB": storage,
                "Required_CPU_Hours": req_cpu,
                "Actual_CPU_Hours": act_cpu,
                "CPU_Utilization_%": cpu_util,
                "Region": region,
                "Billing_Period": billing,
                "Service_Category": service,
                "Instance_Status": status,
                "CPU_Efficiency": cpu_efficiency
            }])

            # 7. Ubah data kategori teks menjadi angka menggunakan Label Encoder yang sudah di-load
            for col in ["Region", "Billing_Period", "Service_Category", "Instance_Status"]:
                input_data[col] = encoders[col].transform(input_data[col].astype(str))

            # 8. Lakukan prediksi biaya menggunakan model XGBoost (.values digunakan karena training memakai numpy array)
            pred_cost = model.predict(input_data.values)[0]

            # 9. Jalankan Logika FinOps untuk menentukan Potensi Penghematan & Rekomendasi
            if cpu_efficiency < 0.6:
                rec = "⚠️ Underutilized (Overprovisioned)"
                opt = pred_cost * 0.35
            elif cpu_efficiency > 1.2:
                rec = "🔥 Overutilized (Butuh Upgrade / Scaling)"
                opt = 0.0
            else:
                rec = "✅ Optimal"
                opt = 0.0

            # 10. Bungkus hasil kalkulasi ke dalam context untuk dikirim balik ke predict.html
            context = {
                'pred_cost': f"{pred_cost:.2f}",
                'opt': f"{opt:.2f}",
                'cpu_efficiency': f"{cpu_efficiency:.2f}",
                'rec': rec,
                'is_post': True
            }

        except Exception as e:
            # Jika ada tipe data salah atau encoder miss, tampilkan error di halaman web
            context = {
                'error': f"Gagal memproses model ML: {str(e)}",
                'is_post': False
            }

    return render(request, 'predictor/predict.html', context)