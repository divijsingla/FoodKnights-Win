from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import undetected_chromedriver as vc 
import time
import array

options= Options()
# options.add_experimental_option("detach", True)



driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)

url="https://swiggy.com"

import json


driver.get(url)

with open('cookies.json', 'r') as f:
    cookies = json.load(f)
for cookie in cookies:
    driver.add_cookie(cookie)
time.sleep(5)
print(driver.get_cookies())
driver.refresh()
 