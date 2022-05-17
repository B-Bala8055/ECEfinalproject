import cv2
import os

sample = cv2.imread(
    "D:/FINAL YR PROJ/ECEfinalproject/backend/python/fingerprint/got/00000.bmp")

best_score = 0
image = None
filename = ''
kp1, kp2, mp = None, None, None

# All fingerprint images stored in database

for file in [file for file in os.listdir("D:/FINAL YR PROJ/ECEfinalproject/backend/python/fingerprint/stored/")]:
    fingerprint_image = cv2.imread(
        "D:/FINAL YR PROJ/ECEfinalproject/backend/python/fingerprint/stored/" + file)

    sift = cv2.SIFT_create()

    keypoints_1, descriptors_1 = sift.detectAndCompute(sample, None)
    keypoints_2, descriptors_2 = sift.detectAndCompute(
        fingerprint_image, None)

    matches = cv2.FlannBasedMatcher({'algorithm': 1, 'trees': 10}, {}).knnMatch(
        descriptors_1, descriptors_2, k=2)

    match_points = []

    for p, q in matches:
        if p.distance < 0.1 * q.distance:
            match_points.append(p)

    keypoints = 0

    if len(keypoints_1) < len(keypoints_2):
        keypoints = len(keypoints_1)
    else:
        keypoints = len(keypoints_2)

    if len(match_points) / keypoints * 100 > best_score:
        best_score = len(match_points) / keypoints * 100
        filename = file
        image = fingerprint_image
        kp1, kp2, mp = keypoints_1, keypoints_2, match_points
        # print("matched with" + file + " Score: " + str(len(mp)))

        # break

id = filename.split('.')[0]
print(id)

# result = cv2.drawMatches(sample, kp1, image, kp2, mp, None)
# result = cv2.resize(result, None, fx=4, fy=4)
# cv2.imshow("Result", result)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
