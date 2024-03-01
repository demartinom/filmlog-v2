import requests
from bs4 import BeautifulSoup


def get_all_urls(url):
    # Send GET request to url
    response = requests.get(url)
    # Create HTML parser
    soup = BeautifulSoup(response.content, "html.parser")
    # Create new set so there are no duplicates
    urls = set()
    # Loop over all a tags on page
    for a_tag in soup.find_all("a", href=True):
        # Get URL
        href = a_tag["href"]
        # Add to set
        if "every-single-film-stock-still-made-today" in href:
            urls.add(href)

    return urls
