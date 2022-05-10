import requests
import json
import os

# PYTHON HTTP REQUESTS
# https://www.w3schools.com/python/module_requests.asp#:~:text=The%20requests%20module%20allows%20you,encoding%2C%20status%2C%20etc).

# Server URL for my phone. Replace it with your IP address or server hosted url
SERVER_URL = 'http://192.168.43.168:5000'


def fetchAllParty():
    req = requests.get(SERVER_URL + '/party')

    res = json.loads(req.text)

    confirmation = res['confirmation']

    if(confirmation == True):
        return res['data']
    else:
        return "Internal Server Error"


def fetchVoterData(aadhar):
    req = requests.get(SERVER_URL + f'/voter?aadhar={aadhar}&dob=privileged')

    res = json.loads(req.text)

    confirmation = res['confirmation']

    if(confirmation == True):
        voter = {'found': True,
                 'name': res['voter']['name'], 'dob': res['voter']['dob']}
        return voter
    else:
        voter = {'found': False}
        return voter


def registerVoter(aadhar, imgPath):

    path_img = imgPath
    ext_name = imgPath.split('.')[1]

    with open(path_img, 'rb') as img:
        name_img = os.path.basename(path_img)
        files = {
            'fingerprint': (name_img, img, f'image/{ext_name}', {'Expires': '0'})}
        with requests.Session() as s:
            r = s.post(SERVER_URL+f'/voter?aadhar={aadhar}', files=files)
            return r.status_code


def castVote(aadhar, imgPath):
    # https://stackoverflow.com/questions/29104107/upload-image-using-post-form-data-in-python-requests

    # Image file path (Fingerprint is stored in this path)
    path_img = imgPath
    ext_name = imgPath.split('.')[1]

    # XHR request
    with open(path_img, 'rb') as img:
        name_img = os.path.basename(path_img)
        files = {
            'fingerprint': (name_img, img, f'image/{ext_name}', {'Expires': '0'})}
        with requests.Session() as s:
            r = s.patch(SERVER_URL+f'/voter?aadhar={aadhar}', files=files)
            """********* MUST RETURN IF THE VOTE IS CASTED OR NOT ********"""
            print(r)
