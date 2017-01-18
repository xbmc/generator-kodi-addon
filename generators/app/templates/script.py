# -*- coding: utf-8 -*-

from resources.lib import utilities
from resources.lib import kodiLogging
import logging
import xbmcaddon
import xbmcgui


logger = logging.getLogger(__name__)
kodiLogging.config()

# Put your code here, this is just an example showing
# a textbox as soon as this addon gets called
addon = xbmcaddon.Addon()
addonname = addon.getAddonInfo('name')

line1 = "Hello World!"

xbmcgui.Dialog().ok(addonname, line1)
