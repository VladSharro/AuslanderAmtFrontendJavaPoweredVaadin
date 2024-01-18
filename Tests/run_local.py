#!/usr/bin/env python
from robot import run_cli

args = ['--variable', 'BROWSER:Chrome', '--variable', 'DOMAIN:localhost:4200', '--argumentfile', './options.txt']
run_cli (args)