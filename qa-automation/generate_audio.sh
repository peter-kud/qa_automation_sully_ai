#!/bin/bash

# === Settings ===
OUT_DIR="./test_data/audio"
OUT_FILE="$OUT_DIR/headache.wav"
TEXT="Hello doctor. I am here today because I have been experiencing headaches for the past month.  
The pain usually starts on one side of my head and then spreads across.  
I also drink about four cups of coffee a day and do not drink enough water.  
I would like to understand what could be causing these headaches."

# === Create folder if not exists ===
mkdir -p "$OUT_DIR"

# === Generate AIFF (macOS say command) ===
say -o "$OUT_DIR/tmp.aiff" "$TEXT"

# === Convert AIFF -> WAV (using ffmpeg) ===
ffmpeg -i "$OUT_DIR/tmp.aiff" -ar 16000 -ac 1 "$OUT_FILE" -y

# === Cleanup temp file ===
rm "$OUT_DIR/tmp.aiff"

echo "Audio file generated: $OUT_FILE"
