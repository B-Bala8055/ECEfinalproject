# Connecting mongodb to python
# https://www.mongodb.com/languages/python
# MONGODB_CONNECTION_URL = 'mongodb+srv://balaTest:Bbala2000.@cluster0.qmgle.mongodb.net/evoting?retryWrites=true&w=majority'
from functions.getDatabase import *


def main():

    selection = 'ttp'
    path = 'D:\\FINAL YR PROJ\\ECEfinalproject\\backend\\python\\dataset\\real_data_trim\\00003.bmp'
    castVote(selection, path)


main()
