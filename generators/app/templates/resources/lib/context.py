# -*- coding: utf-8 -*-

import xbmcaddon
import xbmcgui


def run():
    # Implement what your contextmenu aims to do here
    # For example you could call executebuiltin to call another addon
    #   xbmc.executebuiltin("RunScript(script.example,action=show)")
    # You might want to check your addon.xml for the visible condition of your contextmenu
    # Read more here http://kodi.wiki/view/Context_Item_Add-ons
    addon = xbmcaddon.Addon()
    addon_name = addon.getAddonInfo('name')

    line1 = "Hello World!"

    xbmcgui.Dialog().ok(addon_name, line1)
