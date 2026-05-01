import os

# # ✅ Prevent macOS mutex crash (limit threads)
# os.environ["OMP_NUM_THREADS"] = "1"
# os.environ["TF_NUM_INTRAOP_THREADS"] = "1"
# os.environ["TF_NUM_INTEROP_THREADS"] = "1"

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import Xception
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout

# ✅ GPU memory growth (avoid TensorFlow crashing by grabbing all memory at once)
gpus = tf.config.experimental.list_physical_devices("GPU")
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)

# Dataset Path
DATASET_DIR = "liveness_dataset"
TRAIN_DIR = os.path.join(DATASET_DIR, "train")

# Check dataset
if not os.path.exists(TRAIN_DIR):
    raise FileNotFoundError(f"❌ Train directory not found: {TRAIN_DIR}")

# Image settings
IMG_SIZE = (128, 128)
BATCH_SIZE = 32
EPOCHS = 30  

# ✅ Stronger Data Augmentation + Validation Split
datagen = ImageDataGenerator(
    rescale=1.0 / 255.0,
    rotation_range=45,
    width_shift_range=0.4,
    height_shift_range=0.4,
    brightness_range=[0.3, 1.8],
    zoom_range=0.4,
    horizontal_flip=True,
    shear_range=0.3,
    channel_shift_range=70.0,
    validation_split=0.2  # ✅ Use 20% of data for validation
)

train_generator = datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="binary",
    subset="training"
)

val_generator = datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="binary",
    subset="validation"
)

# ✅ Use Xception for better accuracy
base_model = Xception(weights="imagenet", include_top=False, input_shape=(128, 128, 3))

# Freeze some initial layers to retain ImageNet features
for layer in base_model.layers[:80]: 
    layer.trainable = False

# Custom Layers
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation="relu")(x)  
x = Dropout(0.3)(x)  
output = Dense(1, activation="sigmoid")(x)  

# Define Model
model = Model(inputs=base_model.input, outputs=output)

# ✅ Learning Rate Scheduler
lr_schedule = tf.keras.callbacks.ReduceLROnPlateau(
    monitor="val_loss",
    factor=0.5,
    patience=3,
    min_lr=1e-6
)

# Compile Model
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
    loss="binary_crossentropy",
    metrics=["accuracy"],
)

# Train Model
history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=val_generator,
    callbacks=[lr_schedule]
)

# Save Model
model.save("anti_spoofing_model_xception.h5")
print("✅ Anti-Spoofing Model Successfully Saved!")
