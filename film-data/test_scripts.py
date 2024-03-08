from get_urls import get_all_urls


def test_get_all_urls():
    assert get_all_urls("https://www.york.ac.uk/teaching/cws/wws/webpage1.html") == {
        "webpage2.html",
        "col3.html",
    }
