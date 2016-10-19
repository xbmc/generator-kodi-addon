import xbmcaddon
import xbmcgui

addon       = xbmcaddon.Addon()
addonname   = addon.getAddonInfo('name')

line1 = "Hello World!"

xbmcgui.Dialog().ok(addonname, line1)
