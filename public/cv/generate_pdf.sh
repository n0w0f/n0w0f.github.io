#!/bin/bash
# PDF Generation Script for CV

# Variables
INPUT_FILE="index.html"  # or whatever your CV HTML file is named
OUTPUT_FILE="nawaf_alampara_cv.pdf"
MARGIN_TOP="0.4"
MARGIN_BOTTOM="0.4"
MARGIN_LEFT="0.4"
MARGIN_RIGHT="0.4"
SCALE="0.9"  # Reduces the overall size of content (0.9 = 90% of original size)

# Chrome command with advanced options
# For Linux
# google-chrome --headless \
#   --disable-gpu \
#   --print-to-pdf="$OUTPUT_FILE" \
#   --print-to-pdf-no-header \
#   --default-page-size=A4 \
#   --no-margins \
#   --margin-top=$MARGIN_TOP \
#   --margin-bottom=$MARGIN_BOTTOM \
#   --margin-left=$MARGIN_LEFT \
#   --margin-right=$MARGIN_RIGHT \
#   --scale=$SCALE \
#   "$INPUT_FILE"

# For macOS (uncomment if needed)
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless \
  --disable-gpu \
  --print-to-pdf="$OUTPUT_FILE" \
  --print-to-pdf-no-header \
  --default-page-size=A4 \
  --no-margins \
  --margin-top=$MARGIN_TOP \
  --margin-bottom=$MARGIN_BOTTOM \
  --margin-left=$MARGIN_LEFT \
  --margin-right=$MARGIN_RIGHT \
  --scale=$SCALE \
  "$INPUT_FILE"

# For Windows (uncomment if needed)
# "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless ^
#   --disable-gpu ^
#   --print-to-pdf="%OUTPUT_FILE%" ^
#   --print-to-pdf-no-header ^
#   --default-page-size=A4 ^
#   --no-margins ^
#   --margin-top=%MARGIN_TOP% ^
#   --margin-bottom=%MARGIN_BOTTOM% ^
#   --margin-left=%MARGIN_LEFT% ^
#   --margin-right=%MARGIN_RIGHT% ^
#   --scale=%SCALE% ^
#   "%INPUT_FILE%"

echo "PDF generated: $OUTPUT_FILE"