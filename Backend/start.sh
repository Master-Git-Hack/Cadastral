#!/bin/bash
flask run &
python main.py &
wait
exit $?