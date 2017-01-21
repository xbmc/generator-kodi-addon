# -*- coding: utf-8 -*-

from resources.lib import utilities
from resources.lib import kodiLogging
import logging
import xbmcaddon
import xbmcgui


ADDON = xbmcaddon.Addon()
logger = logging.getLogger(ADDON.getAddonInfo('id'))
kodiLogging.config()

# Put your code here, this is just an example showing
# a textbox as soon as this addon gets called
addonname = ADDON.getAddonInfo('name')

line1 = "Hello World!"

xbmcgui.Dialog().ok(addonname, line1)
