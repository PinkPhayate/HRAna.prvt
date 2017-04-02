from pyfiglet import Figlet

AUTH = "PHAYATE TANAKA"
TITLE = "H A R P"
DETAIL_TITLE = "Horse Analystic of Race Planning"
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'

def draw_title(version):

    ''' PRINT TITLE '''
    f = Figlet(font="slant")
    print f.renderText(TITLE)

    print RED + 'version: ' + version + ENDC
    print RED + 'simulation mode' + ENDC
    # f = Figlet(font="small")
    # print f.renderText(DETAIL_TITLE)

    # ver_str =  'version: ' + version
    # msg = f.renderText(ver_str)
    # print msg

def draw_race_title(title):
    f = Figlet(font="small")
    msg = f.renderText( title )
    print(msg + '\n')
