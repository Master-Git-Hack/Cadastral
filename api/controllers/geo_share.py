import math
import os
import shutil
from os.path import join
from stat import S_ISDIR
from typing import List

import piexif
from fastapi import FastAPI, File, HTTPException, UploadFile
from paramiko import AutoAddPolicy, SSHClient
from PIL import Image
from pydantic import BaseModel

from .. import config

__CONNECT = {
    "hostname": config.SECRETS.SFTP_HOST,
    "username": config.SECRETS.SFTP_USER,
    "password": config.SECRETS.SFTP_PASS,
}


def list_directories(sftp, path="Fotogrametria"):
    return {
        item.filename: (
            list_directories(sftp, join(path, item.filename))
            if S_ISDIR(item.st_mode)
            else None
        )
        for item in sftp.listdir_attr(path)
    }


def format_folders(data, parent_key=""):
    result = []
    for folder, children in data.items():
        current_key = f"{parent_key}.{folder}" if parent_key else folder
        result.append(
            {
                "key": current_key,
                "label": folder.replace("_", " ").title(),
                "data": f"{folder.replace('_', ' ').title()} Folder",
                "icon": "pi pi-fw pi-folder",
                "selectable": not bool(children),
                "leaf": not bool(children),
                "children": (
                    format_folders(children, current_key) if children else None
                ),
            }
        )
    return result


def list_stft_folders():
    folders = []
    try:
        with SSHClient() as client:
            client.set_missing_host_key_policy(AutoAddPolicy())
            client.connect(**__CONNECT)
            with client.open_sftp() as sftp:
                folders = format_folders(list_directories(sftp))
        # client = SSHClient()
        # client.set_missing_host_key_policy(AutoAddPolicy())
        # client.connect("sftp_server", username="user", password="password")
        # sftp = client.open_sftp()
        # folders = format_folders(list_directories(sftp))
        # sftp.close()
        # client.close()
    except Exception as e:
        print(e)
    finally:
        return folders


def get_images(path: str):
    path = path.replace(".", "/")
    with SSHClient() as client:
        client.set_missing_host_key_policy(AutoAddPolicy())
        client.connect(**__CONNECT)
        with client.open_sftp() as sftp:
            
