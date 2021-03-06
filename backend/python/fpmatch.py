import cv2
import os
import sys

# stored_image = sys.argv[1]
# voter_image = sys.argv[2]

aadhar = sys.argv[1]
# voter image here

fileName1 = ''
extName1 = ''
for file in [file for file in os.listdir("D:/FINAL YR PROJ/ECEfinalproject/backend/python/fingerprint/got/")]:
    print(file)
    if file.startswith(aadhar):
        fileName = file
        extName = file.split('.')[1]

sample = cv2.imread(
    "D:/FINAL YR PROJ/ECEfinalproject/backend/python/fingerprint/stored/" + fileName1)
# sample = cv2.resize(sample, None, fx=2, fy=2)

best_score = 0
image = None
filename = None
kp1, kp2, mp = None, None, None

# All fingerprint images stored in database
# for file in [file for file in os.listdir("D:/FINAL YR PROJ/ECEfinalproject/backend/python/dataset/train_data_trim")]:

fileName2 = ''
extName2 = ''
for file in [file for file in os.listdir("D:/FINAL YR PROJ/ECEfinalproject/backend/python/fingerprint/got/")]:
    print(file)
    if file.startswith(aadhar):
        fileName = file
        extName = file.split('.')[1]

fingerprint_image = cv2.imread(
    "D:/FINAL YR PROJ/ECEfinalproject/backend/python/fingerprint/got/" + fileName2)

# fingerprint_image = cv2.resize(fingerprint_image, None, fx=2, fy=2)
# fingerprint_image = cv2.normalize(
#     fp_image, None, 0, 255, cv2.NORM_MINMAX).resize(fp_image, None, fx=2, fy=2).astype('uint8')
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
    # filename = file
    filename = fileName
    image = fingerprint_image
    kp1, kp2, mp = keypoints_1, keypoints_2, match_points
    # print("matched with" + file + "Score: " + str(len(mp)))
    # break
# print("BEST MATCH: " + filename)

print(str(best_score))


# result = cv2.drawMatches(sample, kp1, image, kp2, mp, None)
# result = cv2.resize(result, None, fx=4, fy=4)
# cv2.imshow("Result", result)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
