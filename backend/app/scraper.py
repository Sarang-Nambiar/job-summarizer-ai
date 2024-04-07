from bs4 import BeautifulSoup
from selenium import webdriver
from selenium_stealth import stealth

def extract_data(url):

    # Stealthy selenium scraping
    options = webdriver.ChromeOptions() 
    options.add_argument("start-maximized")
    options.add_argument("--headless")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    driver = webdriver.Chrome(options=options)

    stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
        )
    
    driver.get(url)

    content = driver.page_source
    try:
        soup = remove_unwanted_tags(content)
        description = soup.find("div", id="jobDescriptionText").get_text().strip()
        driver.quit()
        return {"description": description}
    except Exception as e:
        driver.quit()
        return {"error": str(e)}

def remove_unwanted_tags(content, unwanted_tags=["script", "style", "head", "title", "meta"]):
    soup = BeautifulSoup(content, "html.parser")

    for tag in soup.find_all(unwanted_tags):
        tag.decompose()
    return soup