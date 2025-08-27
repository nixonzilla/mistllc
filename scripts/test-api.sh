#!/bin/bash
BASE_URL="http://127.0.0.1:8787"

echo "✅ Health check"
curl -s $BASE_URL/health | jq

echo -e "\n🎵 Get all songs"
curl -s $BASE_URL/songs | jq

echo -e "\n➕ Add song"
curl -s -X POST $BASE_URL/songs \
  -H "Content-Type: application/json" \
  -d '{"title":"Drippy","artist":"MISTLLC"}' | jq

echo -e "\n✏️ Update song"
curl -s -X PUT $BASE_URL/songs/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Song","artist":"Updated Artist"}' | jq

echo -e "\n🗑️ Delete song"
curl -s -X DELETE $BASE_URL/songs/1 | jq
