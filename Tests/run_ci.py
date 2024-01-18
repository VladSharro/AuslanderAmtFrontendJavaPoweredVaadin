#!/usr/bin/env python
from robot import run_cli

args = ['--variable', 'BROWSER:headlesschrome', '--variable', 'DOMAIN:132.231.1.189', '--argumentfile', './options.txt']
run_cli (args)