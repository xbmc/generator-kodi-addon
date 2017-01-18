# -*- coding: utf-8 -*-

import xbmcaddon
import xbmcgui

# Put your code here, this is just an example showing
# a textbox as soon as this addon gets called
addon = xbmcaddon.Addon()
addonname = addon.getAddonInfo('name')

line1 = "Hello World!"

xbmcgui.Dialog().ok(addonname, line1)
