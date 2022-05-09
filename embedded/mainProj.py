# Normal libs
import os
import datetime
import time
# Embedded libs
import I2C_LCD_driver

# CUSTOM LIBS
from functions.getDatabase import *

# Initialize I2C display
mylcd = I2C_LCD_driver.lcd()

pressed_keys = ''
# pin = "1234"
fun = ''
aadhar = ''
# month = ''
# year = ''
# first_initial = ''
# last_initial = ''
# student_number = ''
# student = ''
# r = ''
# person = ''

"""******************************* MAIN MENU START*******************************"""


def main_menu():
    global fun
    clear_keys()
    mylcd.lcd_clear()
    mylcd.lcd_display_string('Select, then press #', 1)
    mylcd.lcd_display_string('1. Vote', 2)
    mylcd.lcd_display_string('2. Register', 3)
    mylcd.lcd_display_string('3. Shutdown', 4)
    print('1. Vote')
    print('2. Register')
    print('3. Shutdown')
    print('')
    fun = fun.replace(fun, 'main_menu')


def main_menu_input(key):
    global pressed_keys
    if key == '#':
        print(pressed_keys)
        if pressed_keys == "1":
            clear_keys()
            voter_menu()
        elif pressed_keys == "2":
            print("send to pwd")
            clear_keys()
            register()
        elif pressed_keys == "3":
            print("send to shutdown")
            clear_keys()
            shutdownmenu()
        else:
            mylcd.lcd_clear()
            mylcd.lcd_display_string('   INVALID  ENTRY', 2)
            print('INVALID ENTRY')
            print('')
            time.sleep(2)
            main_menu()
    else:
        pressed_keys += key


"""******************************* MAIN MENU END *******************************"""

"""******************************* VOTE FUNCTION START *******************************"""


def voter_menu():
    global fun
    clear_keys()
    mylcd.lcd_clear()
    fun = fun.replace(fun, 'voter_menu')
    mylcd.lcd_display_string('ENTER AADHAR ID', 1)
    mylcd.lcd_display_string('# - Confirm', 3)
    # mylcd.lcd_display_string('*. Cancel', 4)
    print('ENTER AADHAR ID')
    print('1. Confirm')
    print('2. Cancel')
    print('')


def confirm_aadhar(key):
    global pressed_keys
    if key == '#':
        print(pressed_keys)
        if len(pressed_keys) == 12:

            # Find the voter from server
            voter = fetchVoterData(pressed_keys)

            if(voter['found'] == True):
                mylcd.lcd_clear()
                mylcd.lcd_display_string('   VOTER INFO   ', 1)
                mylcd.lcd_display_string(voter['name'], 2)
                mylcd.lcd_display_string(voter['dob'], 3)
                mylcd.lcd_display_string('Wait for 5 secs', 4)

                print('   VOTER INFO   ')
                print(voter['name'])
                print(voter['dob'])
                print('Wait for 5 secs')
                print('')

                time.sleep(5)

                fingerprint_verification()

            else:
                mylcd.lcd_clear()
                mylcd.lcd_display_string('VOTER NOT FOUND!', 1)
                mylcd.lcd_display_string('Check your entry', 2)
                mylcd.lcd_display_string(pressed_keys, 3)
                mylcd.lcd_display_string('Wait for 5 secs', 4)

                print('VOTER NOT FOUND!')
                print('Check your entry')
                print(pressed_keys)
                print('Wait for 5 secs')
                print('')

                time.sleep(5)

                voter_menu()

        else:
            mylcd.lcd_clear()
            mylcd.lcd_display_string('   INVALID  ENTRY', 2)
            print('INVALID ENTRY')
            print('')

            time.sleep(2)

            voter_menu()
    else:
        pressed_keys += key


def fingerprint_verification():
    """ must code this section """
    mylcd.lcd_clear()
    mylcd.lcd_display_string('PLACE YOUR FINGERPRINT', 1)
    mylcd.lcd_display_string('      [       ]      ', 3)
    time.sleep(.3)

    os.system("sudo shutdown -h now")


"""******************************* VOTE FUNCTION END *******************************"""


"""*******************************  CLEAR KEYS FUNCTION *******************************"""


# Clear keys in pressed Keys
def clear_keys():
    global pressed_keys
    pressed_keys = pressed_keys.replace(pressed_keys, '')

# initial options


"""******************************* BOOT SEQUENCE START *****************************"""


def boot_sequence():
    mylcd.lcd_clear()
    mylcd.lcd_display_string('       BOOTING', 1)
    mylcd.lcd_display_string('      [       ]      ', 3)
    time.sleep(.1)
    mylcd.lcd_display_string('      [   *   ]      ', 3)
    time.sleep(.1)
    mylcd.lcd_display_string('      [  ***  ]      ', 3)
    time.sleep(.1)
    mylcd.lcd_display_string('      [ ***** ]      ', 3)
    time.sleep(.1)
    mylcd.lcd_display_string('      [*******]      ', 3)
    time.sleep(.1)
    main_menu()


"""******************************* BOOT SEQUENCE END *******************************"""

"""******************************* SHUTDOWN SEQUENCE START *************************"""


def shutdownmenu():
    global fun
    clear_keys()
    mylcd.lcd_clear()
    fun = fun.replace(fun, 'shutdownmenu')
    mylcd.lcd_display_string('**Confirm Shutdown**', 1)
    mylcd.lcd_display_string('1. Confirm', 2)
    mylcd.lcd_display_string('2. Cancel', 3)
    print('**Confirm Shutdown**')
    print('1. Confirm')
    print('2. Cancel')
    print('')


def confirm_shutdown(key):
    global pressed_keys
    if key == '#':
        print(pressed_keys)
        if pressed_keys == "1":
            print('Send to shutdown')
            print('')
            shutdown()
        elif pressed_keys == "2":
            mylcd.lcd_clear()
            mylcd.lcd_display_string(' Process  Cancelled', 2)
            print('Process Cancelled')
            print('')
            time.sleep(2)
            main_menu()
        else:
            mylcd.lcd_clear()
            mylcd.lcd_display_string('   INVALID  ENTRY', 2)
            print('INVALID ENTRY')
            print('')
            time.sleep(2)
            shutdownmenu()
    else:
        pressed_keys += key


def shutdown():
    mylcd.lcd_clear()
    mylcd.lcd_display_string('    Shutting down', 1)
    mylcd.lcd_display_string('      [       ]      ', 3)
    time.sleep(.3)
    mylcd.lcd_display_string('      [   *   ]      ', 3)
    time.sleep(.3)
    mylcd.lcd_display_string('      [  ***  ]      ', 3)
    time.sleep(.3)
    mylcd.lcd_display_string('      [ ***** ]      ', 3)
    time.sleep(.3)
    mylcd.lcd_display_string('      [*******]      ', 3)
    time.sleep(.3)
    mylcd.lcd_clear()
    mylcd.lcd_display_string('      Now Safe', 2)
    mylcd.lcd_display_string('    To Shut Down', 3)
    os.system("sudo shutdown -h now")


"""******************************* SHUTDOWN SEQUENCE END ***************************"""

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


boot_sequence()

# This function is called each time a keypad button is


def keyHandler(key):
    if fun == 'main_menu':
        main_menu_input(key)
    elif fun == 'voter_menu':
        confirm_aadhar(key)
    elif fun == 'admin_menu_1':
        admin_input(key)
    elif fun == 'admin_menu_2':
        admin_input2(key)
    elif fun == 'confirm_del':
        delete_db(key)
    elif fun == 'month':
        month_input(key)
    elif fun == 'year':
        year_input(key)
    elif fun == 'finitial':
        finitial_input(key)
    elif fun == 'linitial':
        linitial_input(key)
    elif fun == 'stnum':
        stnum_entry(key)
    elif fun == 'confirm':
        confirm_entry(key)
    elif fun == 'shutdownmenu':
        confirm_shutdown(key)


keypad.registerKeyPressHandler(keyHandler)
