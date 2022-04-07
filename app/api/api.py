from flask import Flask, request
import requests
import urllib.request, json
import os
import hashlib
import datetime
import time
# from mainFunctions import insertUsuario

app = Flask("Marvel")


PUBLIC_API_KEY = "e20d3ce96b8e5dfe51cf319d96a40999"
PRIVATE_API_KEY = "a4288d8d93df4c9a9bbd70f66fda27ecb016b99d"
# ts = datetime.date.today()
ts = str(int(time.time()))
# ts = hashlib.sha1()
print("ts",ts)

####### LMEBRETES
## tratar respostas e erros
## comentarios

@app.route("/characters", methods=["GET"])
def getCharacters():
    page = request.args.get('currentPage', default = 1, type = int)
    print("page", page)
    offset = (page-1)*55
    limit = 55

    print("offset : ", offset)
    print("limit : ", limit)

    hash = hashlib.sha1()
    hash = hashlib.md5((ts+PRIVATE_API_KEY+PUBLIC_API_KEY).encode("utf-8"))
    # hash = hashlib.md5(hash)
    resp = requests.get(
            "https://gateway.marvel.com:443/v1/public/characters",
            params={"apikey":"e20d3ce96b8e5dfe51cf319d96a40999", "ts":ts, "hash":hash.hexdigest(),
            "limit":limit, "offset":offset
            }
       )
    jsonResp = resp.json()
    # url = "https://developer.marvel.com/v1/public/characters"
    # response = urllib.request.urlopen(url)
    # data = response.read()
    # dict = json.loads(data)
    # print("resp data",jsonResp["data"]["results"])
    # characters = jsonResp.data.comics
    return jsonResp

# app.run()
