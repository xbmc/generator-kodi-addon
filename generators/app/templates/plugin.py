# -*- coding: utf-8 -*-

import routing
import logging
from resources.lib import utilities
from resources.lib import kodiLogging
from xbmcgui import ListItem
from xbmcplugin import addDirectoryItem, endOfDirectory


logger = logging.getLogger(__name__)
kodiLogging.config()
plugin = routing.Plugin()

@plugin.route('/')
def index():
    addDirectoryItem(plugin.handle, plugin.url_for(show_category, "one"), ListItem("Category One"), True)
    addDirectoryItem(plugin.handle, plugin.url_for(show_category, "two"), ListItem("Category Two"), True)
    endOfDirectory(plugin.handle)

@plugin.route('/category/<category_id>')
def show_category(category_id):
    addDirectoryItem(plugin.handle, "", ListItem("Hello category %s!" % category_id))
    endOfDirectory(plugin.handle)

if __name__ == '__main__':
    plugin.run()