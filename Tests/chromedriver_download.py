from requests import get
from urllib.request import urlretrieve
from zipfile import ZipFile
from os import remove

def chromedriver_download():
    filename = "chromedriver.zip"
    latest_endpoint = "https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_STABLE"

    r = get(latest_endpoint)
    version = r.text
    #url = "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/" + version + "/linux64/chromedriver-linux64.zip"
    url = "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/" + "120.0.6099.199" + "/linux64/chromedriver-linux64.zip"

    urlretrieve(url, filename)
    with ZipFile(filename, "r") as f:
        f.extractall()
    remove(filename)

if __name__ == "__main__":
    chromedriver_download()