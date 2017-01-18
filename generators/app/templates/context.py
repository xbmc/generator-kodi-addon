# -*- coding: utf-8 -*-

import xbmcaddon
import xbmcgui

def main():
    # Implement what your contextmenu aims to do here
    # For example you could call executebuiltin to call another addon
    #   xbmc.executebuiltin("RunScript(script.example,action=show)")
    # You might want to check your addon.xml for the visible condition of your contextmenu
    # Read more here http://kodi.wiki/view/Context_Item_Add-ons
    addon = xbmcaddon.Addon()
    addonname = addon.getAddonInfo('name')

    line1 = "Hello World!"

    xbmcgui.Dialog().ok(addonname, line1)

if __name__ == '__main__':
    main()