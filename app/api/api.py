from flask import Flask, request
import requests
import hashlib
import time

app = Flask("Marvel")


PUBLIC_API_KEY = "e20d3ce96b8e5dfe51cf319d96a40999"
PRIVATE_API_KEY = "a4288d8d93df4c9a9bbd70f66fda27ecb016b99d"
ts = str(int(time.time()))

@app.route("/characters", methods=["GET"])
def getCharacters():
    page = request.args.get('currentPage', default = 1, type = int)
    offset = (page-1)*10
    limit = 10

    hash = hashlib.sha1()
    hash = hashlib.md5((ts+PRIVATE_API_KEY+PUBLIC_API_KEY).encode("utf-8"))
    resp = requests.get(
            "https://gateway.marvel.com:443/v1/public/characters",
            params={"apikey":"e20d3ce96b8e5dfe51cf319d96a40999", "ts":ts, "hash":hash.hexdigest(),
            "limit":limit, "offset":offset
            }
       )
    jsonResp = resp.json()
    return jsonResp

app.run()
