apt install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils git

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt-get install -y nodejs

git clone https://github.com/GoogleChrome/rendertron.git
cd rendertron
npm install

rm -rf /root/rendertron/src/config.ts
wget https://cdn.jsdelivr.net/gh/wgnpj2cg/img/img/78cfd05960c5d8d9d4140cc12df05a84.ts
mv 78cfd05960c5d8d9d4140cc12df05a84.ts /root/rendertron/src/config.ts

npm run build