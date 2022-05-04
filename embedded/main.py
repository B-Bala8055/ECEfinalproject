# Connecting mongodb to python
# https://www.mongodb.com/languages/python
# MONGODB_CONNECTION_URL = 'mongodb+srv://balaTest:Bbala2000.@cluster0.qmgle.mongodb.net/evoting?retryWrites=true&w=majority'

from functions.getDatabase import *


def main():

    print(fetchAllParty())
    print(fetchVoterData('123123123'))


main()
