import requests


class XMR:
    def __init__(self, xmr_num):
        self.xmr_num = xmr_num

    def XMR_TO_USDT(self):
        url = "https://delicate-term-e1d6.cilisou.workers.dev/api/v3/avgPrice?symbol=XMRUSDT"
        response = requests.request("GET", url).json()
        return response['price']

    def USDT_TO_CNY(self):
        url = "https://v2.alapi.cn/api/exchange"

        payload = {'token': 'UAZYjoF7PGg0gPIY',
                   'money': float(self.xmr_num) * float(self.XMR_TO_USDT()),
                   'from': 'USD',
                   'to': 'CNY'}

        response = requests.request("POST", url, data=payload).json()['data']['exchange_round']
        print(response)


xmr = XMR(0.03).USDT_TO_CNY()
