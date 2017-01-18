# -*- coding: utf-8 -*-

from resources.lib import utilities
from resources.lib import kodiLogging
import logging
import time
import xbmc


kodiLogging.config()
logger = logging.getLogger(__name__)

if __name__ == '__main__':
    monitor = xbmc.Monitor()

    while not monitor.abortRequested():
        # Sleep/wait for abort for 10 seconds
        if monitor.waitForAbort(10):
            # Abort was requested while waiting. We should exit
            break
        logger.debug("hello addon! %s" % time.time())