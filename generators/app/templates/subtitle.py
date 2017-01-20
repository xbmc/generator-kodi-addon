# -*- coding: utf-8 -*-


import urllib2
import sys
import urlparse
import urllib
import os
import unicodedata
import xbmcgui
import xbmcplugin
import xbmc
import xbmcaddon
import xbmcvfs

ADDON = xbmcaddon.Addon()
SCRIPT_ID = ADDON.getAddonInfo('id')
PROFILE = xbmc.translatePath(ADDON.getAddonInfo('profile'))
TEMP = os.path.join(PROFILE, 'temp', '')
HANDLE = int(sys.argv[1])

if not xbmcvfs.exists(TEMP):
    xbmcvfs.mkdirs(TEMP)


# function to retrieve parameters in a dictionary
def getParams():
    if len(sys.argv) > 2:
        return dict(urlparse.parse_qsl(sys.argv[2].lstrip('?')))
    return {}


def normalizeString(str):
    return unicodedata.normalize(
        'NFKD', unicode(unicode(str, 'utf-8'))
    ).encode('ascii', 'ignore')


def getInfo():
    item = {}
    item['temp'] = False
    item['rar'] = False
    # Year
    item['year'] = xbmc.getInfoLabel("VideoPlayer.Year")
    # Season
    item['season'] = str(xbmc.getInfoLabel("VideoPlayer.Season"))
    # Episode
    item['episode'] = str(xbmc.getInfoLabel("VideoPlayer.Episode"))
    item['tvshow'] = normalizeString(
        xbmc.getInfoLabel("VideoPlayer.TVshowtitle"))   # Show
    # try to get original title
    item['title'] = normalizeString(
        xbmc.getInfoLabel("VideoPlayer.OriginalTitle"))
    item['file_original_path'] = urllib.unquote(
        # Full path of a playing file
        xbmc.Player().getPlayingFile().decode('utf-8'))

    if item['title'] == "":
        # no original title, get just Title
        item['title'] = normalizeString(xbmc.getInfoLabel("VideoPlayer.Title"))

    # Check if season is "Special"
    if item['episode'].lower().find("s") > -1:
        item['season'] = "0"
        item['episode'] = item['episode'][-1:]

    if (item['file_original_path'].find("http") > -1):
        item['temp'] = True

    elif (item['file_original_path'].find("rar://") > -1):
        item['rar'] = True
        item['file_original_path'] = os.path.dirname(
            item['file_original_path'][6:])

    elif (item['file_original_path'].find("stack://") > -1):
        stackPath = item['file_original_path'].split(" , ")
        item['file_original_path'] = stackPath[0][8:]

    item['filename'] = os.path.splitext(
        os.path.basename(item['file_original_path']))[0]
    return item


def getLanguages(params):
    langs = []  # ['scc','eng']
    for lang in urllib.unquote(params['languages']).decode('utf-8').split(","):
        langs.append(xbmc.convertLanguage(lang, xbmc.ISO_639_2))
    return langs


def append_subtitle(subname, language, params, sync=False, h_impaired=False):
    # languange long name (for example english)
    listitem = xbmcgui.ListItem(label=xbmc.convertLanguage(language, xbmc.ENGLISH_NAME),
                                # subtitle name displayed
                                label2=subname,
                                # languange 2 letter name (for example en)
                                thumbnailImage=xbmc.convertLanguage(language, xbmc.ISO_639_1))

    # subtitles synced with the video
    listitem.setProperty("sync", 'true' if sync else 'false')
    # hearing impaired subs
    listitem.setProperty("hearing_imp", 'true' if h_impaired else 'false')

    url = "plugin://{url}/?{params}".format(
        url=SCRIPT_ID, params=urllib.urlencode(params))
    xbmcplugin.addDirectoryItem(
        handle=HANDLE, url=url, listitem=listitem, isFolder=False)


# add subtitles to the list from information kodi provides
def Search(info, languages):
    append_subtitle(
        "Lost 1x01", "eng", {"action": "download", "id": 15}, sync=True)
    append_subtitle("Lost 1x01", "ita", {"action": "download", "id": 15})
    append_subtitle("Lost 1x01 720p", "eng", {"action": "download", "id": 15})


# add subtitles to the list from manual user search
def ManualSearch(searchstr, languages):
    append_subtitle(
        "Lost 1x01", "eng", {"action": "download", "id": 15}, sync=True)
    append_subtitle("Lost 1x01", "ita", {"action": "download", "id": 15})
    append_subtitle("Lost 1x01 720p", "eng", {"action": "download", "id": 15})


# download the subtitle chosen by the user
def Download(params):
    id = params['id']
    # download the file requested
    url = "http://path.to/subtitle/{id}.srt".format(id=id)
    file = os.path.join(TEMP, "{id}.srt".format(id=id))

    response = urllib2.urlopen(url)
    with open(file, "w") as local_file:
        local_file.write(response.read())

    # give the file to kodi
    xbmcplugin.addDirectoryItem(
        handle=HANDLE, url=file, listitem=xbmcgui.ListItem(label=file), isFolder=False)

params = getParams()

if 'action' in params:
    if params['action'] == "search":
        Search(getInfo(), getLanguages(params))
    elif params['action'] == "manualsearch":
        ManualSearch(params['searchstring'], getLanguages(params))
    elif params['action'] == "download":
        Download(params)

xbmcplugin.endOfDirectory(HANDLE)
