read -p "Enter a value: " my_variable
my_variable=${my_variable:-ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA0Vz34PX1fWEBAHxvDBbUbgOB9mqpKQfTapjPDkzCt17gmIx85fQhu7XGvWKdiDJnZLNySHZ4UybM/tXjxJbcLnRjmSbOCp1vOqqoeAzApWfRO7ypQMk1CREecOuuSRJLL0BHBnP3ZL1St4k+9/pAtQLOigymoJDlV3ecVD17g7LVM6teLTIEAFG3nhUSX6tVLdU30bl5ftqz+X14QoY46JHjcmouGDl0GqHf5Bqt1p8cE3+ZVWD5QZ4S1/2+QJv3wHtRycUfD89WusOYCl8BGbJD/h9ONjZCyDI4N4uoJYjAQY4G9gX3lojmbNSQwyPhASpTmMhFH3J5TeuoqtWixQ==}
echo "The ssh authorized_keys is: $my_variable"
mkdir -p /root/.ssh && chmod 600 /root/.ssh && echo $my_variable > /root/.ssh/authorized_keys && chmod 700 /root/.ssh/authorized_keys


sed -i 's:#AuthorizedKeysFile:AuthorizedKeysFile:'  /etc/ssh/sshd_config
sed -i 's/#RSAAuthentication yes/RSAAuthentication yes/'  /etc/ssh/sshd_config
sed -i 's/#StrictModes no/StrictModes no/'  /etc/ssh/sshd_config

sed -i 's/PasswordAuthentication #PasswordAuthentication' /etc/ssh/sshd_config
echo 'PasswordAuthentication no' >> /etc/ssh/sshd_config

sed -i 's/PermitRootLogin #PermitRootLogin' /etc/ssh/sshd_config
echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config

systemctl restart sshd.service