from functions.getDatabase import *
import time

choice = ''
aadhar = ''


def vote():
    global choice

    print('*Vote casting Section*')
    print('')

    # Fetch all political parties in a list
    parties = fetchAllParty()

    # Checking for errors
    if parties == 0:
        print('Error when fetching parties')
        print('')
        time.sleep(3)
        fun['main_menu']()

    # If no errors, come here
    else:
        # Print all political parties
        print('Select Party')
        print('')

        for i in range(len(parties)):
            print(f'{i+1}. {parties[i]}')
        print('')

        # Entering choice
        choice = input('Choice? : ')
        print('')

        # Checking if choice is valid
        if(int(choice) > len(parties)):
            fun['invalid']()
        # If valid, come here
        else:
            # Printing choice
            selection = parties[(int(choice)-1)]
            print(f'Selected {selection}')
            print('')

            imgPath = 'D:\\FINAL YR PROJ\\ECEfinalproject\\embedded\\fps\\999000.bmp'
            # Casting vote which returns http status code
            status = castVote(selection, imgPath)

            print('*')
            print('Fingerprint is grabbed from localstorage instead of sensor')
            print('D:\FINAL YR PROJ\ECEfinalproject\embedded\fps\999000.bmp')
            print('*')
            print('')
            print('Processing... Please Wait')
            print('')

            if status == 200 or '200':  # 200 means success
                print('Vote Casted')
                print('')
                time.sleep(3)
                fun['main_menu']()
            else:
                print('Vote Not casted. Please contact admin')
                print('')
                time.sleep(3)
                fun['main_menu']()


def register():
    global aadhar
    print('*Register fingerprint Section*')
    print('')

    # Aadhar input
    aadhar = input('Enter your aadhar : ').strip()
    print('')

    imgPath = 'D:\\FINAL YR PROJ\\ECEfinalproject\\embedded\\fps\\999000.bmp'
    # Regiser voter returns http status code
    status = registerVoter(aadhar, imgPath)

    print('*')
    print('Fingerprint is grabbed from localstorage instead of sensor')
    print('D:\FINAL YR PROJ\ECEfinalproject\embedded\fps\999000.bmp')
    print('*')
    print('')

    if(status == 201 or 201):  # 201 means successful
        print('Regn successful')
        print('')
        time.sleep(3)
        fun['main_menu']()
    else:
        print('Regn Not successful')
        print('')
        time.sleep(3)
        fun['main_menu']()


def invalid():
    print('Invalid Input')
    print('')
    time.sleep(3)
    fun['main_menu']()


def main_menu():
    global choice
    # Print choices
    print('1. Vote')
    print('2. Register')
    print('')

    # Choice input and decision
    choice = input('Choice? : ')
    if(choice == '1'):
        fun['vote']()
    elif(choice == '2'):
        fun['register']()
    else:
        fun['invalid']()


# This is a function mapper.(Functions are put in a dictionary as values)
# How to use
# Striucture fun['vote']()
# fun['key'] - gives the value which is a function
# () at the end calls the function
fun = {'vote': vote, 'register': register,
       'invalid': invalid, 'main_menu': main_menu}


def main():
    # Show main menu first
    main_menu()


if __name__ == "__main__":
    main()
