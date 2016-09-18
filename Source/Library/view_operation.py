from pyfiglet import Figlet

AUTH = "PHAYATE TANAKA"
TITLE = "H A R P"
DETAIL_TITLE = "Horse Analystic of Race Planning"
def draw_title(version):

    ''' PRINT TITLE '''
    f = Figlet(font="slant")
    print f.renderText(TITLE)

    f = Figlet(font="small")
    # print f.renderText(DETAIL_TITLE)

    # ver_str =  'version: ' + version
    # msg = f.renderText(ver_str)
    # print msg

def draw_race_title(title):
    f = Figlet(font="small")
    msg = f.renderText( title )
    print(msg + '\n')
