import requests
import csv
from bs4 import BeautifulSoup


def get_film_stocks(urls, csv_filename):
    with open(csv_filename, mode="a", newline="") as urls_csv:
        # csv column names that match table columns on page
        fieldnames = [
            "Name",
            "Vendor",
            "Manufacturer",  # Some are named Manufacturer instead of vendor
            "Type",
            "",  # Catch all for outliers
            "Native ISO",
            "Format(s)",
            "35mm DX Coded",
            "Spectral sensitivity",
            "Normal Process",
            "Cross process",
            "Push process",
            "Exposure latitude",
            "Verified Manufacturer",
            "Image SRC",
        ]
        # Create headers from fieldnames
        writer = csv.DictWriter(urls_csv, fieldnames=fieldnames)
        writer.writeheader()
        # Loop through urls
        for url in urls:
            response = requests.get(url)
            soup = BeautifulSoup(response.content, "html.parser")
            # Find film info tables
            tables = soup.findAll("table")
            for table in tables:
                # Finds columns 1 (header), 2 (data), and 3(image src) and stores them in object to be added to csv when completed. Only adds to csv when all the data has been added to object
                rows = table.findAll("tr")
                row_data = {}
                for row in rows:
                    column = row.find("td", class_="column-1").get_text(strip=True)
                    content = row.find("td", class_="column-2").get_text(strip=True)
                    image_row = row.find("td", class_="column-3")
                    row_data[column] = content
                    # Makes sure image src exists
                    if image_row:
                        photo = image_row.find("img")
                        if photo:
                            row_data["Image SRC"] = photo.get("src")
                    # Write to csv
                    if row_data.get("Verified Manufacturer"):
                        writer.writerow(row_data)


if __name__ == "__main__":
    # Urls for pages with film stock tables
    urls = [
        "https://emulsive.org/reviews/film-reviews/film-list/every-single-film-stock-still-made-today-part-1-adox-to-dubblefilm#adox-films",
        "https://emulsive.org/reviews/film-reviews/film-list/every-single-film-stock-still-made-today-part-2-film-ferrania-to-hillvale#film-washi-films",
        "https://emulsive.org/reviews/film-reviews/film-list/every-single-film-stock-still-made-today-part-3-ilford-to-japan-camera-hunter#ilford-harman-technologyfilms",
        "https://emulsive.org/reviews/film-reviews/film-list/every-single-film-stock-still-made-today-part-4-kodak-to-maco-direct#kono-films",
        "https://emulsive.org/reviews/film-reviews/film-list/every-single-film-stock-still-made-today-part-5-oriental-to-rollei#oriental-photo-industrial-films",
        "https://emulsive.org/reviews/every-single-film-stock-still-made-today-part-6-shanghai-to-yodica#shanghai-films",
    ]
    # Function to get Urls of pages for individual stocks
    csv_filename = "film_stocks.csv"  # Specify the CSV filename
    # Get data on film stocks
    get_film_stocks(urls, csv_filename)
