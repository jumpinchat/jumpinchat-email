#!/bin/bash

curl \
  -X POST \
  -H "Authorization: secret" \
  -H "Content-Type: application/json" \
  -d \
    '{
      "to": "test@email.com",
      "subject": "test",
      "text": "foo",
      "html": "<b style=\"color: red\">foo</b>"
    }' \
  localhost:3434/email/send
