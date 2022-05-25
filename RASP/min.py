import os
from pad4pi import rpi_gpio
import Adafruit_CharLCD as LCD
import time
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


def clearKeys():
    global pressedKeys
    pressedKeys = pressedKeys.replace(pressedKeys, '')


def vote():
    lcd.clear()
    lcd.message('VOTING MACHINE')
    time.sleep(2)
    lcd.clear()
    lcd.message('1. ABC 2. DEF \n3. GHI 4. JKL')
    fun = fun.replace(fun, 'vote')


def voteInput(key):
    if(key == '#'):
        lcd.clear()
        lcd.message('   Place Your\n     finger')
        time.sleep(3)
        lcd.clear()
        if(int(pressedKeys) % 2 == 0):
            lcd.message('Vote casted \n successfully')
        else:
            lcd.message('Vote not casted')
            lcd.message('Contact admin')
        time.sleep(3)
        vote()
        clearKeys()
    else:
        pressedKeys += key


def printkey(key):
    if fun == 'vote':
        voteInput(key)
    else:
        voteInput(key)


keypad.registerKeyPressHandler(printkey)

try:
    while (True):
        time.sleep(0.2)
except:
    keypad.cleanup()
