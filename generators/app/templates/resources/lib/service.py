# -*- coding: utf-8 -*-

from resources.lib import kodiutils
from resources.lib import kodilogging
import logging
import time
import xbmc
import xbmcaddon


ADDON = xbmcaddon.Addon()
logger = logging.getLogger(ADDON.getAddonInfo('id'))


def run():
    monitor = xbmc.Monitor()

    while not monitor.abortRequested():
        # Sleep/wait for abort for 10 seconds
        if monitor.waitForAbort(10):
            # Abort was requested while waiting. We should exit
            break
        logger.debug("hello addon! %s" % time.time())
