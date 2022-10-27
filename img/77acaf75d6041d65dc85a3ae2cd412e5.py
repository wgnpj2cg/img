import os
import re

run_tmplate = """from scrapy.cmdline import execute

execute(["scrapy", "crawl", "###spider_name###"])"""


class SpiderConstant:
    @classmethod
    def spider_file_path(cls):
        tmps = os.listdir(os.getcwd())
        dirs = []
        for tmp in tmps:
            if os.path.isdir(tmp) and not tmp.startswith('.'):
                dirs.append(tmp)
        if len(dirs) != 1:
            print("[400] Cann't find the project floder")
            return False
        spider_file_dir = os.path.join(os.getcwd(), dirs[0], 'spiders')
        if not os.path.exists(spider_file_dir):
            print("[400] Cann't find the spider floder")
            return False
        # 获取spider_file_dir目录下所有以_spider.py结尾的文件
        paths = []
        for tmp in os.listdir(spider_file_dir):
            if tmp.endswith("_spider.py"):
                paths.append(os.path.join(spider_file_dir, tmp))
        if len(paths) == 1:
            return paths[0]
        elif len(paths) == 0:
            print("[400] Cann't find the spider file.")
            return False
        else:
            print('[400] Unknow error')
            return False

    @classmethod
    def spider_settings_path(cls):
        tmps = os.listdir(os.getcwd())
        dirs = []
        for tmp in tmps:
            if os.path.isdir(tmp) and not tmp.startswith('.'):
                dirs.append(tmp)
        if len(dirs) != 1:
            print("[400] Cann't find the project floder")
            return False
        settings_path = os.path.join(os.getcwd(), dirs[0], 'settings.py')
        if not os.path.exists(settings_path):
            print("[400] Cann't find the settings.py file")
            return False
        return settings_path


def get_file_content(file_path: str):
    with open(file_path, 'r', encoding='utf-8') as fn:
        return fn.read()


def write_file_content(file_path: str, content: str):
    os.remove(file_path)
    with open(file_path, 'a+', encoding='utf-8') as fn:
        fn.write(content)


def check_file_equal_text(text: str, file_path: str):
    content = get_file_content(file_path)
    for line in content.split('\n'):
        line = line.strip().replace(' ', '')
        if text == line:
            return True
    return False


def check_file_contains_text(text: str, file_path: str):
    content = get_file_content(file_path)
    for line in content.split('\n'):
        line = line.strip().replace(' ', '')
        if text in line:
            return True
    return False


# 在当前路径下生成run.py文件
def generate_runpy_file():
    run_file_path = os.path.join(os.getcwd(), 'run.py')
    if os.path.exists(run_file_path):
        os.remove(run_file_path)
    spider_file_path = SpiderConstant.spider_file_path()
    if spider_file_path:
        # 读取spider_file_path文件
        with open(spider_file_path, 'r', encoding='utf-8') as fn:
            spider_file_content = fn.read()
            for line in spider_file_content.split('\n'):
                line = line.replace(' ', '')
                if line.strip().startswith('name='):
                    spider_name = line.strip().replace('name=', '')
                    if len(spider_name) > 0:
                        with open('run.py', 'a+', encoding='utf-8') as f1:
                            f1.write(run_tmplate.replace("###spider_name###", spider_name))
                        print('[200] Create run.py for {spider_name}'.format(spider_name=spider_name))


def random_ua():
    # 运行系统命令
    os.system('pip3 install scrapy-fake-useragent')
    print('\n' * 5)
    spider_settings_path = SpiderConstant.spider_settings_path()
    if spider_settings_path:
        UserAgentMiddleware = False
        RetryMiddleware = False
        RandomUserAgentMiddleware = False
        RetryUserAgentMiddleware = False

        with open(spider_settings_path, 'r', encoding='utf-8') as fn:
            spider_settings_content = fn.read()
            c = False
            for line in spider_settings_content.split('\n'):
                line = line.strip().replace(' ', '')
                if 'DOWNLOADER_MIDDLEWARES={' in line:
                    c = True
                if c:
                    if '}' in line:
                        c = False
                if True:
                    if line == "'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware':None,":
                        UserAgentMiddleware = True
                    if line == "'scrapy.downloadermiddlewares.retry.RetryMiddleware':None,":
                        RetryMiddleware = True
                    if line == "'scrapy_fake_useragent.middleware.RandomUserAgentMiddleware':400,":
                        RandomUserAgentMiddleware = True
                    if line == "'scrapy_fake_useragent.middleware.RetryUserAgentMiddleware':401,":
                        RetryUserAgentMiddleware = True
        os.remove(spider_settings_path)
        with open(spider_settings_path, 'a+', encoding='utf-8') as fn:
            # 使用正则表达式匹配
            result = []
            c = False
            for line in spider_settings_content.split('\n'):
                newline = line.strip().replace(' ', '')
                if 'DOWNLOADER_MIDDLEWARES={' in newline:
                    c = True
                    result.append('DOWNLOADER_MIDDLEWARES = {')
                    if not UserAgentMiddleware:
                        result.append("    'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': None,")
                    if not RetryMiddleware:
                        result.append("    'scrapy.downloadermiddlewares.retry.RetryMiddleware': None,")
                    if not RandomUserAgentMiddleware:
                        result.append("    'scrapy_fake_useragent.middleware.RandomUserAgentMiddleware': 400,")
                    if not RetryUserAgentMiddleware:
                        result.append("    'scrapy_fake_useragent.middleware.RetryUserAgentMiddleware': 401,")
                elif c and '#}' in newline:
                    result.append('}')
                    c = False

                else:
                    result.append(line)
            fn.write('\n'.join(result))
            print('[200] Random useragent settings ok')


def render_spider_to_rediscrawlspider():
    spider_file_path = SpiderConstant.spider_file_path()
    # spider.py
    if not check_file_equal_text("fromscrapy_redis.spidersimportRedisCrawlSpider", spider_file_path):
        content = get_file_content(spider_file_path)
        content = re.sub(r'\n\n', '\nfrom scrapy_redis.spiders import RedisCrawlSpider\n\n', content, 1)
        content = re.sub(r'\(CrawlSpider\)', '(RedisCrawlSpider)', content, 1)
        spider_name = re.findall(r'.+name = (.+)', content)[0].replace('_spider', '')[1:-1]
        content = re.sub('.+start_urls.+', '', content)
        tmp_1 = "    redis_key = '{spider_name}:start_urls'".format(spider_name=spider_name)
        content = re.sub('.+allowed_domains.+', tmp_1, content)
        write_file_content(spider_file_path, content)

    # setings.py
    spider_settings_path = SpiderConstant.spider_settings_path()
    content = get_file_content(spider_settings_path)
    if not check_file_equal_text('SCHEDULER="scrapy_redis.scheduler.Scheduler"', spider_settings_path):
        content += '\n\n# Enables scheduling storing requests queue in redis.\nSCHEDULER = "scrapy_redis.scheduler.Scheduler"\n'
    if not check_file_equal_text('DUPEFILTER_CLASS="scrapy_redis.dupefilter.RFPDupeFilter"', spider_settings_path):
        content += '\n# Ensure all spiders share same duplicates filter through redis.\nDUPEFILTER_CLASS = "scrapy_redis.dupefilter.RFPDupeFilter"\n'
    if not check_file_contains_text('REDIS_URL=', spider_settings_path):
        content += "\n# Specify the full Redis URL for connecting (optional).\n# If set, this takes precedence over the REDIS_HOST and REDIS_PORT settings.\nREDIS_URL = 'redis://user:pass@hostname:9001'\n"
    if not check_file_contains_text('scrapy_redis.pipelines.RedisPipeline', spider_settings_path):
        content = re.sub('# ITEM_PIPELINES', 'ITEM_PIPELINES', content, 1, re.S)
        tmp_1 = re.findall('(ITEM_PIPELINES = \{.+)# }', content, re.S)
        if len(tmp_1) > 0:
            tmp_1 = tmp_1[0]
            content = re.sub('ITEM_PIPELINES.+?# }', tmp_1 + "\n}", content, 1, re.S)
        content = re.sub('ITEM_PIPELINES = {', 'ITEM_PIPELINES = {\n    "scrapy_redis.pipelines.RedisPipeline": 300,\n',
                         content)
    write_file_content(spider_settings_path, content)


def render_spider_to_redisspider():
    spider_file_path = SpiderConstant.spider_file_path()
    if not check_file_equal_text("fromscrapy_redis.spidersimportRedisSpider", spider_file_path):
        content = get_file_content(spider_file_path)
        content = re.sub(r'\n\n', '\nfrom scrapy_redis.spiders import RedisSpider\n\n', content, 1)
        content = re.sub(r'\(scrapy.Spider\)', '(RedisSpider)', content, 1)
        spider_name = re.findall(r'.+name = (.+)', content)[0].replace('_spider', '')[1:-1]
        content = re.sub('.+start_urls.+', '', content)
        tmp_1 = "    redis_key = '{spider_name}:start_urls'".format(spider_name=spider_name)
        content = re.sub('.+allowed_domains.+', tmp_1, content)
        write_file_content(spider_file_path, content)

    # setings.py
    spider_settings_path = SpiderConstant.spider_settings_path()
    content = get_file_content(spider_settings_path)
    if not check_file_equal_text('SCHEDULER="scrapy_redis.scheduler.Scheduler"', spider_settings_path):
        content += '\n\n# Enables scheduling storing requests queue in redis.\nSCHEDULER = "scrapy_redis.scheduler.Scheduler"\n'
    if not check_file_equal_text('DUPEFILTER_CLASS="scrapy_redis.dupefilter.RFPDupeFilter"', spider_settings_path):
        content += '\n# Ensure all spiders share same duplicates filter through redis.\nDUPEFILTER_CLASS = "scrapy_redis.dupefilter.RFPDupeFilter"\n'
    if not check_file_contains_text('REDIS_URL=', spider_settings_path):
        content += "\n# Specify the full Redis URL for connecting (optional).\n# If set, this takes precedence over the REDIS_HOST and REDIS_PORT settings.\nREDIS_URL = 'redis://user:pass@hostname:9001'\n"
    if not check_file_contains_text('scrapy_redis.pipelines.RedisPipeline', spider_settings_path):
        content = re.sub('# ITEM_PIPELINES', 'ITEM_PIPELINES', content, 1, re.S)
        tmp_1 = re.findall('(ITEM_PIPELINES = \{.+)# }', content, re.S)
        if len(tmp_1) > 0:
            tmp_1 = tmp_1[0]
            content = re.sub('ITEM_PIPELINES.+?# }', tmp_1 + "\n}", content, 1, re.S)
        content = re.sub('ITEM_PIPELINES = {', 'ITEM_PIPELINES = {\n    "scrapy_redis.pipelines.RedisPipeline": 300,\n',
                         content)
    write_file_content(spider_file_path, content)


if __name__ == '__main__':
    menu = {
        1: {
            'name': "随机UA",
            'func': random_ua
        },
        2: {
            'name': "RedisCrawlSpider",
            'func': render_spider_to_rediscrawlspider
        },
        3: {
            'name': "RedisSpider",
            'func': render_spider_to_redisspider
        }
    }
    for k, v in menu.items():
        print(k, v['name'])
    choice = input("请输入你的选择：")
    if choice.isdigit():
        choice = int(choice)
        if choice in menu:
            menu[choice]['func']()
        else:
            print("输入错误")
