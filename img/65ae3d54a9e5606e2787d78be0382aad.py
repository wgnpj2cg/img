import os

with open("heroku.yml", "w+") as fn:
    fn.write("""build:
    docker:
        web: Dockerfile
    """)

with open("Dockerfile", "w+") as fn:
    fn.write("""FROM ubuntu
ADD dck/ /workarea
WORKDIR /workarea

RUN apt-get update --fix-missing \
    && apt-get -y install wget \
    && mkdir \workarea \
    && apt install -y python3 python3-pip
RUN pip3 install -r requirements.txt

CMD bash /workarea/start.sh
    """)

with open("app.json", "w+") as fn:
    fn.write("""{
  "name": "[...]",
  "repository": "[https://github.com/...]",
  "env": {
    "Db_username": {
      "description": "Db_username",
      "value": "Db_username"
    },
    "Db_port": {
      "description": "Db_port",
      "value": "Db_port"
    }
  },
  "website": "https://example.com",
  "stack": "container"
}
    """)

os.mkdir("src")
with open("src/start.sh", "w+") as fn:
    fn.write("""#!/bin/bash
python3 /workarea/app.py 0.0.0.0:$(PORT)""")

with open("README.md", "w+", encoding='utf-8') as fn:
    fn.write("""
    1.修改 app.json
    2.修改 start.sh
    
    """)
