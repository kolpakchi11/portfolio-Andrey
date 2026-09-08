        
import random
from colorama import init, Fore, Back, Style


init(autoreset=True)

def groen_tekst(tekst):
    return Fore.GREEN + Style.BRIGHT + tekst + Style.RESET_ALL


def geel_tekst(tekst):
    return Fore.YELLOW + Style.BRIGHT + tekst + Style.RESET_ALL


def blauw_tekst(tekst):
    return Fore.CYAN + Style.BRIGHT + tekst + Style.RESET_ALL


def wit_tekst(tekst):
    return Fore.WHITE + Style.BRIGHT + tekst + Style.RESET_ALL


def dim_tekst(tekst):
    return Style.DIM + tekst + Style.RESET_ALL