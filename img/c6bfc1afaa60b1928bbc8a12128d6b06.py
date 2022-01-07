import os


class TarTool:
    def tar(self):
        file_path = input("file_path: ")
        out_tar_name = input("out_file_name: ")
        password = input("password: ")
        if not os.path.exists(file_path):
            print('Not found: {file_path}'.format(file_path=file_path))
        os.system('tar -zcf  - {file_path}  |openssl des3 -salt -k {password} | dd of={out_tar_name}'.format(
            file_path=file_path, password=password, out_tar_name=out_tar_name))

    def untar(self):
        file_path = input("file_path: ")
        password = input("password: ")
        if not os.path.exists(file_path):
            print('Not found: {file_path}'.format(file_path=file_path))
        os.system('dd if={file_path} |openssl des3 -d -k {password} | tar zxf -'.format(file_path=file_path,
                                                                                        password=password))


if __name__ == '__main__':
    tt = TarTool()
    print('1: tar')
    print('2: untar')
    job_type = int(input('type: '))
    if job_type == 1:
        tt.tar()
    if job_type == 2:
        tt.untar()
