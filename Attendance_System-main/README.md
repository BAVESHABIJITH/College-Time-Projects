# Attendance System with Face Recognition & Anti-Spoofing
A smart attendance system built with Streamlit that uses facial recognition, anti-spoofing detection, and geolocation verification.
## You have to Download shape_predictor_68_face_landmarks.dat from Some where
## Features

- **Face Recognition**: Identifies students using trained SVM model
- **Anti-Spoofing**: Detects fake faces using deep learning (Xception model)
- **Geolocation Verification**: Ensures attendance is marked only within campus
- **Automatic Subject Detection**: Marks attendance based on class schedule
- **Duplicate Prevention**: Prevents marking attendance more than once per hour

## Tech Stack

- Python 3.x
- Streamlit
- OpenCV
- face_recognition
- TensorFlow/Keras
- dlib
- MySQL

## Setup

### 1. Install Dependencies

```bash
pip install streamlit face_recognition opencv-python numpy mysql-connector-python pandas tensorflow dlib imutils python-dotenv streamlit-js-eval scikit-learn
```

### 2. Download Required Models

- `shape_predictor_68_face_landmarks.dat` - [Download from dlib](http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2)

### 3. Train Models

```bash
# Train face recognition model
python train_face_recognition.py

# Train anti-spoofing model
python train_anti_spoofing.py
```

### 4. Configure Database

Create a MySQL database `attendance_system` and update credentials in `.env` or `app.py`.

### 5. Run the App

```bash
streamlit run app.py
```

## Configuration

Update college coordinates in `app.py`:
```python
COLLEGE_LAT = 11.0772746
COLLEGE_LON = 76.9897629
```

## License

MIT License
