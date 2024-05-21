#!/bin/bash
cd v1 & sourceflask run &
python main.py &
wait
exit $?