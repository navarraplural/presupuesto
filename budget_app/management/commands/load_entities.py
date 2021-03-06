# -*- coding: UTF-8 -*-

import os.path
import logging

from django.core.management.base import BaseCommand
from django.conf import settings
from budget_app.loaders import EntityLoader

class Command(BaseCommand):
    logging.disable(logging.ERROR)   # Avoid SQL logging on console

    help = u"Carga la lista de entidades públicas, _reemplazando el actual_"

    def handle(self, *args, **options):
        # Allow overriding the data path from command line
        # XXX: overriding was useful when data was shared, not inside the themes. Could be removed.
        if len(args) < 1:
          path = os.path.join(settings.ROOT_PATH, settings.THEME, 'data') # Default: theme data folder
        else:
          path = args[0]

        EntityLoader().load(os.path.join(path, 'entidades.csv'))
