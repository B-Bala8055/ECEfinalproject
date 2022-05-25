import os
from pad4pi import rpi_gpio
import Adafruit_CharLCD as LCD
from getDatabase import *
import pyfingerprint
from pyfingerprint import PyFingerprint
import time
import tempfile
# Raspberry Pi pin configuration:
# Note this might need to be changed to 21 for older revision Pi's.
lcd_rs = 27
lcd_en = 22
lcd_d4 = 25
lcd_d5 = 24
lcd_d6 = 23
lcd_d7 = 18
lcd_backlight = 4

# Define LCD column and row size for 16x2 LCD.
lcd_columns = 16
lcd_rows = 2

lcd = LCD.Adafruit_CharLCD(lcd_rs, lcd_en, lcd_d4, lcd_d5, lcd_d6, lcd_d7,
                           lcd_columns, lcd_rows, lcd_backlight)


# Keypad stuff

KEYPAD = [
    ["1", "2", "3", "A"],
    ["4", "5", "6", "B"],
    ["7", "8", "9", "C"],
    ["*", "0", "#", "D"]
]

# same as calling: factory.create_4_by_4_keypad, still we put here fyi:
ROW_PINS = [16, 20, 21,
            5]  # BCM numbering; Board numbering is: 7,8,10,11 (see pinout.xyz/)
COL_PINS = [6, 13, 19,
            26]  # BCM numbering; Board numbering is: 12,13,15,16 (see pinout.xyz/)

factory = rpi_gpio.KeypadFactory()

# Try keypad = factory.create_4_by_3_keypad() or
# Try keypad = factory.create_4_by_4_keypad() #for reasonable defaults
# or define your own:
keypad = factory.create_keypad(keypad=KEYPAD, row_pins=ROW_PINS,
                               col_pins=COL_PINS)

fun = ''
pressedKeys = ''
parties = []


def clearKeys():
    global pressedKeys
    pressedKeys = pressedKeys.replace(pressedKeys, '')


def menu():
    lcd.clear()
    lcd.message('1. Vote 2. Off\n 3.Register')
    fun = fun.replace(fun, 'menu')


def menuInput(key):
    global pressedKeys
    lcd.clear()
    if(key == '#'):
        if(pressedKeys == '1'):
            clearKeys()
            vote()
        elif(pressedKeys == '2'):
            clearKeys()
            off()
        elif(pressedKeys == '3'):
            clearKeys()
            register()


def vote():
    global parties
    lcd.clear()
    lcd.message('VOTING Section')
    time.sleep(1)
    lcd.clear()

    # Fetch all political parties in a list
    parties = fetchAllParty()

    # Checking for errors
    if parties == 0:
        lcd.clear()
        lcd.message('Error! \nNo parties')
        print('Error when fetching parties')
        print('')
        time.sleep(2)
        menu()

    else:
        print('Select Party')
        print('')
        partyStr = ''
        for i in range(len(parties)):
            partyStr += f'{i+1}.{parties[i]} '
            if(i % 2 == 0):
                partyStr += '\n'
            print(f'{i+1}.{parties[i]} ')

        lcd.clear()
        lcd.message(partyStr)

        fun = fun.replace(fun, 'vote')


def voteInput(key):
    global pressedKeys
    global parties
    if(key == '#'):
        index = int(pressedKeys) - 1
        clearKeys()
        if(index > len(parties)-1):
            lcd.clear()
            lcd.message('Invalid option')
            time.sleep(2)
            menu()
        else:
            party = parties[index]
            try:
                f = PyFingerprint('/dev/serial0', 57600,
                                  0xFFFFFFFF, 0x00000000)
            except Exception:
                lcd.clear()
                lcd.message('Fingerprint \nsensor error')
                time.sleep(3)
                menu()
            else:
                print('Currently used templates: ' + str(f.getTemplateCount()))
                print('')
                votingFunction(party)

    else:
        pressedKeys += key


def off():
    lcd.clear()
    lcd.message('Sure Switch OFF?')
    fun = fun.replace(fun, 'off')


def offInput(key):
    if(key == '#'):
        lcd.clear()
        lcd.message('Shutting down...')
        time.sleep(2)
        clearKeys()
        os.system("sudo shutdown -h now")
    else:
        clearKeys()
        menu()


def register():
    lcd.clear()
    lcd.message('Enter aadhar')
    fun = fun.replace(fun, 'reg')


def registerInput(key):
    global pressedKeys
    if(key == '#'):
        aadhar = pressedKeys.strip()
        clearKeys()
        try:
            f = PyFingerprint('/dev/serial0', 57600, 0xFFFFFFFF, 0x00000000)
        except Exception:
            lcd.clear()
            lcd.message('Fingerprint \nsensor error')
            time.sleep(3)
            menu()
        else:
            print('Currently used templates: ' + str(f.getTemplateCount()))
            print('')
            regnFunction(aadhar)

    else:
        pressedKeys += key


def votingFunction(choice):
    try:
        # Type the below code to sense all usb devices
        # ls /dev/ttyUSB*
        f = PyFingerprint('/dev/serial0', 57600, 0xFFFFFFFF, 0x00000000)
        lcd.clear()
        lcd.message('FINGER PRINT\n CONFIRMATION')
        # Wait that finger is read
        while f.readImage() == False:
            pass

        lcd.clear()
        lcd.message('  PROCESSING...\n Please wait!')

        imageDestination = tempfile.gettempdir() + '/fingerprint.bmp'
        f.downloadImage(imageDestination)

        print('The image was saved to "' + imageDestination + '".')

        response = castVote(choice, imageDestination)

        if(response != 200):
            lcd.clear()
            lcd.message(' NOT REGISTERED \n  Contact admin  ')
            time.sleep(3)
            menu()
        else:
            lcd.clear()
            lcd.message('REGISTERED\nSUCCESSFULLY')
            time.sleep(3)
            menu()

    except Exception as e:
        lcd.clear()
        lcd.message('Fingerprint regn\n failed')
        print('Operation(FP REGN) failed!')
        print('Exception message: ' + str(e))
        time.sleep(3)
        menu()


def regnFunction(aadhar):
    try:
        # Type the below code to sense all usb devices
        # ls /dev/ttyUSB*
        f = PyFingerprint('/dev/serial0', 57600, 0xFFFFFFFF, 0x00000000)
        lcd.clear()
        lcd.message('FINGER PRINT\n REGISTRATION')
        # Wait that finger is read
        while f.readImage() == False:
            pass

        lcd.clear()
        lcd.message('  PROCESSING...\n Please wait!')

        imageDestination = tempfile.gettempdir() + '/fingerprint.bmp'
        f.downloadImage(imageDestination)

        print('The image was saved to "' + imageDestination + '".')

        response = registerVoter(aadhar, imageDestination)

        if(response != 200):
            lcd.clear()
            lcd.message(' NOT REGISTERED \n  Contact admin  ')
            time.sleep(3)
            menu()
        else:
            lcd.clear()
            lcd.message('REGISTERED\nSUCCESSFULLY')
            time.sleep(3)
            menu()

    except Exception as e:
        lcd.clear()
        lcd.message('Fingerprint regn\n failed')
        print('Operation(FP REGN) failed!')
        print('Exception message: ' + str(e))
        time.sleep(3)
        menu()


def printkey(key):
    if (fun == 'vote'):
        voteInput(key)
    elif (fun == 'menu'):
        menuInput(key)
    elif (fun == 'reg'):
        registerInput(key)
    else:
        menuInput(key)


keypad.registerKeyPressHandler(printkey)

try:
    while (True):
        time.sleep(0.2)
except:
    keypad.cleanup()
