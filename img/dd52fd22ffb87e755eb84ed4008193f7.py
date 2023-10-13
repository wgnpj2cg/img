# encoding:utf-8
import pathlib
import requests
# 获取当前命令执行的路径
root_path = pathlib.Path.cwd()


# 判断是否存在res.txt
if not pathlib.Path.exists(root_path.joinpath('res.txt')):
    print("res.txt not found")
    # exit(1)
# 读取res.txt文件
with open(root_path.joinpath('res.txt'), 'r', encoding='utf-8') as f:
    result = f.read()

# 发送POST请求
data = {
    "data": """Github Action Info
pyinstaller build succeed
download url: `{result}`""".format(result=result),
}
response = requests.post('https://tginfo.oubst.workers.dev', data=data)
print(response.text)