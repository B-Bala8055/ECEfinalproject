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
        voter = {'name': res['voter']['name'], 'dob': res['voter']['dob']}
        return voter
    else:
        return 'No Data Found'


def castVote(aadhar, fp):
    # https://stackoverflow.com/questions/29104107/upload-image-using-post-form-data-in-python-requests

    # import os
    # import requests
    # url = 'http://host:port/endpoint'
    # with open(path_img, 'rb') as img:
    #     name_img = os.path.basename(path_img)
    #     files = {
    #         'image': (name_img, img, 'multipart/form-data', {'Expires': '0'})}
    #     with requests.Session() as s:
    #         r = s.post(url, files=files)
    #         print(r.status_code)
    print("Helo, Refer The above stackoverflow thread")
