import os
import base64
import io
import cv2
import numpy as np
import matplotlib.pyplot as plt
import pytesseract
from PIL import Image
import fitz  # PyMuPDF
from io import BytesIO
import re



pytesseract.pytesseract.tesseract_cmd = r'C:\Users\vlads\Tesseract2\tesseract.exe'


def visum_analisator(image_path):

    decoded_pdf = base64.b64decode(image_path)
    pdf_stream = io.BytesIO(decoded_pdf)

    # Конвертация PDF в изображение
    doc = fitz.open(stream=pdf_stream)
    page = doc[0]
    pix = page.get_pixmap()
    img_data = pix.tobytes("png")
    img = Image.open(BytesIO(img_data))
    image = np.array(img)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

    #mrz = read_mrz(image_path)
    #print(mrz)



    # Пороговая обработка для выделения изображения
    _, thresh = cv2.threshold(image, 200, 255, cv2.THRESH_BINARY_INV)

    # Поиск контуров
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        # Проверка размеров контура (пропускаем слишком маленькие контуры)
        if w > 50 and h > 50:
            # Выделение и масштабирование изображения
            cropped_image = image[y:y+h, x:x+w]

            # Распознавание текста
            extracted_text = pytesseract.image_to_string(cropped_image)

            lines = extracted_text.split('\n')
            last_stand = next((line for line in reversed(lines) if line.strip()), None)

            #print(last_stand)

            match = re.match(r'(\d+)', last_stand)
            if match:

                #print(match.group(1))  # Возвращает найденные цифры
                number = match.group(1)[:9] if len(match.group(1)) >= 9 else match.group(1)
                #print(number)
            else:
                return None  # Возвращает None, если цифры в начале строки не найдены

            #print(extracted_text)

            #plt.imshow(cropped_image, cmap='gray')
            #plt.show()

    return number


#image_path = "C:\\Users\\vlads\\test\\Visum.png"


if __name__ == "__main__":
    image_data = os.environ.get("IMAGE_DATA")
    moneys, date = visum_analisator(image_data)
    print(','.join([moneys, date]))
