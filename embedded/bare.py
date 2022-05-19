from functions.getDatabase import *
import time

choice = ''
aadhar = ''


def vote():
    global choice

    print('*Vote casting Section*')
    print('')

    parties = fetchAllParty()

    print('Select Party')

    if parties == 0:
        print('Error when fetching parties')
        print('')
        time.sleep(3)
        fun['main_menu']()

    else:
        for i in range(len(parties)):
            print(f'{i+1}. {parties[i]}')

        choice = input('Choice? : ')
        print('')

        selection = parties[(int(choice)-1)]
        print(f'Selected {selection}')
        print('')
        imgPath = 'D:\\FINAL YR PROJ\\ECEfinalproject\\embedded\\fps\\999000.bmp'
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
    aadhar = input('Enter your aadhar : ').strip()
    print('')

    imgPath = 'D:\\FINAL YR PROJ\\ECEfinalproject\\embedded\\fps\\999000.bmp'
    status = registerVoter(aadhar, imgPath)

    print('*')
    print('Fingerprint is grabbed from localstorage instead of sensor')
    print('D:\FINAL YR PROJ\ECEfinalproject\embedded\fps\999000.bmp')
    print('*')
    print('')

    if(status == 201 or 201):
        print('Regn successful')
        print('')
        time.sleep(3)
        fun['main_menu']()
    else:
        print('Regn Not successful')
        print('')
        time.sleep(3)
        fun['main_menu']()


def main_menu():
    global choice
    print('1. Vote')
    print('2. Register')
    print('')
    choice = input('Choice? : ')
    if(choice == '1'):
        fun['vote']()
    elif(choice == '2'):
        fun['register']()
    else:
        print('Nothing')


fun = {'vote': vote, 'register': register, 'main_menu': main_menu}


def main():
    main_menu()


if __name__ == "__main__":
    main()
