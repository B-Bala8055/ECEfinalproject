import cv2
import os

# sample = cv2.imread(
#     "D:/FINAL YR PROJ/ECEfinalproject/backend/python/dataset/real_data/00003.bmp")
# sample = cv2.resize(sample, None, fx=2, fy=2)
# cv2.imshow("result", sample)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

for file in [file for file in os.listdir("D:/FINAL YR PROJ/ECEfinalproject/backend/python/dataset/train_data")]:
    print(file)
    fingerprint_image = cv2.imread(
        "D:/FINAL YR PROJ/ECEfinalproject/backend/python/dataset/train_data/"+file)

    print(fingerprint_image)
    # fingerprint_image = cv2.resize(fingerprint_image, None, fx=2, fy=2)

    # cv2.imshow("result", fingerprint_image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
