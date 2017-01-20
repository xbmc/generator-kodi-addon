# -*- coding: utf-8 -*-

import xbmc
import xbmcaddon
import re
import sys
import logging

<%_ if (props.kodiVersion == '2.24.0') { -%>
if sys.version_info >= (2, 7):
    import json as json
else:
    import simplejson as json
<%_ } else { -%>
import json as json
<% } %>

# read settings
ADDON = xbmcaddon.Addon('<%= props.scriptid %>')

logger = logging.getLogger(__name__)

def notification(header, message, time=5000, icon=ADDON.getAddonInfo('icon')):
    xbmc.executebuiltin("XBMC.Notification(%s,%s,%i,%s)" % (header, message, time, icon))

def showSettings():
    ADDON.openSettings()

def getSetting(setting):
    return ADDON.getSetting(setting).strip().decode('utf-8')

def setSetting(setting, value):
    ADDON.setSetting(setting, str(value))

def getSettingAsBool(setting):
    return getSetting(setting).lower() == "true"

def getSettingAsFloat(setting):
    try:
        return float(getSetting(setting))
    except ValueError:
        return 0

def getSettingAsInt(setting):
    try:
        return int(getSettingAsFloat(setting))
    except ValueError:
        return 0

def getString(string_id):
    return ADDON.getLocalizedString(string_id).encode('utf-8', 'ignore')

def kodiJsonRequest(params):
    data = json.dumps(params)
    request = xbmc.executeJSONRPC(data)

    try:
        response = json.loads(request)
    except UnicodeDecodeError:
        response = json.loads(request.decode('utf-8', 'ignore'))

    try:
        if 'result' in response:
            return response['result']
        return None
    except KeyError:
        logger.warn("[%s] %s" % (params['method'], response['error']['message']))
        return None
