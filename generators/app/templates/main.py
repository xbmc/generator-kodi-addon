# -*- coding: utf-8 -*-

from resources.lib import kodilogging
<%_ if (props.type == 'Contextmenu') { -%>
from resources.lib import context
<%_ } else if (props.type == 'Plugin') { -%>
from resources.lib import plugin
<%_ } else if (props.type == 'Script') { -%>
from resources.lib import script
<%_ } else if (props.type == 'Service') { -%>
from resources.lib import service
<%_ } else if (props.type == 'Subtitle') { -%>
from resources.lib import subtitle
<% } %>
import logging
import xbmcaddon

# Keep this file to a minimum, as Kodi
# doesn't keep a compiled copy of this
ADDON = xbmcaddon.Addon()
kodilogging.config()

<%_ if (props.type == 'Contextmenu') { -%>
context.run()
<%_ } else if (props.type == 'Plugin') { -%>
plugin.run()
<%_ } else if (props.type == 'Script') { -%>
script.show_dialog()
<%_ } else if (props.type == 'Service') { -%>
service.run()
<%_ } else if (props.type == 'Subtitle') { -%>
subtitle.run()
<% } %>

