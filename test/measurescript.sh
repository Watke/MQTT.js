#!/usr/bin/env bash
# from argument
messageLength=$1
for i in `seq 1 10`
do
	node measurement.js $messageLength >> "data_$messageLength.txt"
done
