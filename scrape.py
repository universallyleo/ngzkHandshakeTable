import os
import sys
import re

import requests
from io import open as iopen  # to make sure we are not using File.open
import json
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore

# get environment variable (stored under vercel project setting)
forTUNE_data = json.loads(os.environ["COOKIES"])
firebase_cred = json.loads(os.environ["FIREBASE_KEY"])

cookies = forTUNE_data["cookies"]
user_agent = forTUNE_data["user_agent"]
headers = forTUNE_data["headers"]

datafolder = "./src/lib/data/"

SITEURL = "https://fortunemusic.jp"
BASEURL = "https://fortunemusic.jp/nogizaka_202212/"
CDNUM = 31
CDTYPE = "Single"

NAMESDICT = {
    "秋元真夏": "Akimoto Manatsu",
    "生田絵梨花": "Ikuta Erika",
    "生駒里奈": "Ikoma Rina",
    "伊藤万理華": "Itou Marika",
    "井上小百合": "Inoue Sayuri",
    "衛藤美彩": "Etou Misa",
    "川村真洋": "Kawamura Mahiro",
    "川後陽菜": "Kawago Hina",
    "齋藤飛鳥": "Saito Asuka",
    "斎藤ちはる": "Saitou Chiharu",
    "斉藤優里": "Saitou Yuuri",
    "桜井玲香": "Sakurai Reika",
    "高山一実": "Takayama Kazumi",
    "中田花奈": "Nakada Kana",
    "中元日芽香": "Nakamoto Himeka",
    "西野七瀬": "Nishino Nanase",
    "能條愛未": "Noujou Ami",
    "橋本奈々未": "Hashimoto Nanami",
    "樋口日奈": "Higuchi Hina",
    "深川麻衣": "Fukagawa Mai",
    "星野みなみ": "Hoshino Minami",
    "松村沙友理": "Matsumura Sayuri",
    "若月佑美": "Wakatsuki Yumi",
    "和田まあや": "Wada Maaya",
    "伊藤かりん": "Itou Karin",
    "伊藤純奈": "Itou Jyunna",
    "相楽伊織": "Sagara Iori",
    "佐々木琴子": "Sasaki Kotoko",
    "新内眞衣": "Shinuchi Mai",
    "寺田蘭世": "Terada Ranze",
    "北野日奈子": "Kitano Hinako",
    "鈴木絢音": "Suzuki Ayane",
    "堀未央奈": "Hori Miyona",
    "山崎怜奈": "Yamazaki Rena",
    "渡辺みり愛": "Watanabe Miria",
    "伊藤理々杏": "Itou Riria",
    "岩本蓮加": "Iwamoto Renka",
    "梅澤美波": "Umezawa Minami",
    "大園桃子": "Oozono Momoko",
    "久保史緒里": "Kubo Shiori",
    "阪口珠美": "Sakaguchi Tamami",
    "佐藤楓": "Sato Kaede",
    "中村麗乃": "Nakamura Reno",
    "向井葉月": "Mukai Hazuki",
    "山下美月": "Yamashita Mizuki",
    "吉田綾乃クリスティー": "Yoshida Ayano Cristi",
    "与田祐希": "Yoda Yuuki",
    "遠藤さくら": "Endo Sakura",
    "賀喜遥香": "Kaki Haruka",
    "掛橋沙耶香": "Kakehashi Sayaka",
    "金川紗耶": "Kanagawa Saya",
    "北川悠理": "Kitagawa Yuri",
    "黒見明香": "Kuromi Haruka",
    "佐藤璃果": "Sato Rika",
    "柴田柚菜": "Shibata Yuna",
    "清宮レイ": "Seimiya Rei",
    "田村真佑": "Tamura Mayu",
    "筒井あやめ": "Tsutsui Ayame",
    "早川聖来": "Hayakawa Seira",
    "林瑠奈": "Hayashi Runa",
    "松尾美佑": "Matsuo Miyu",
    "矢久保美緒": "Yakubo Mio",
    "弓木奈於": "Yumiki Nao",
    "五百城茉央": "Ioki Mao",
    "池田瑛紗": "Ikeda Teresa",
    "一ノ瀬美空": "Ichinose Miku",
    "井上和": "Inoue Nagi",
    "岡本姫奈": "Okamoto Hina",
    "小川彩": "Ogawa Aya",
    "奥田いろは": "Okuda Iroha",
    "川﨑桜": "Kawasaki Sakura",
    "菅原咲月": "Sugawara Satsuki",
    "冨里奈央": "Tomisato Nao",
    "中西アルノ": "Nakanishi Aruno",
}

# if login required:
# https://mechanicalsoup.readthedocs.io/en/stable/tutorial.html?highlight=login#a-more-complete-example-logging-in-into-github
# or
# https://stackoverflow.com/questions/13925983/login-to-website-using-urllib2-python-2-7
# see:
# https://stackoverflow.com/questions/23102833/how-to-scrape-a-website-which-requires-login-using-python-and-beautifulsoup


#############################
# input format e.g.: 2022年8月11日（木・祝）東京都・ベルサール高田馬場
# output format: "2022-08-11"
#############################
def findDate(text):
    a = re.split(r"\D+", text)[0:3]
    if len(a[1]) < 2:
        a[1] = "0" + a[1]
    if len(a[2]) < 2:
        a[2] = "0" + a[2]
    return "-".join(a)


#############################
# Iterator that get all participating member (tested with jupyter)
#############################
def mbListCrawler(start, threshold=12):
    marker = start.next_sibling.next_sibling
    while len(marker) < threshold and len(marker) > 0:
        yield marker.replace("\n", "")
        marker = marker.next_sibling.next_sibling


def mbListScrapeFromTable(soup):
    lst = soup.select("form div.tgl02")
    res = {}
    for itm in lst:
        # if itm.find("button", class_="tglHook") is not None:
        for x in itm.select("th.rowHead"):
            res[x.contents[0].stripped_strings[0]] = []
    return res


#############################
# Find tables to scrape
# in: link = url to page containing slots table
#     mblist=JSON object with keys=member's jp name, values=things to scrape
#     mblist will be updated after running this
#############################
def ScrapeTables(link, mblist):
    scrapeLog = ""
    link = SITEURL + link
    scrappage = requests.get(link, cookies=cookies, headers=headers)
    if scrappage.status_code != 200:
        scrapeLog += f"Error: {scrappage.status_code}\n"
        scrapeLog += f"URL {link} request failed\n"
        return scrapeLog
    soup = BeautifulSoup(scrappage.text, "html.parser")

    if len(soup.select("form.login_form")) > 0:
        scrapeLog += "Login needed\n"
        return scrapeLog

    # if len(mblist) == 0:  # scrape member info from table
    #     mblist = mbListScrapeFromTable(soup)
    #     print("Member list scrapped from table")
    #     for k in mblist.keys():
    #         print(f"  {k}")

    lst = soup.select("form div.tgl02")
    for itm in lst:
        receptionEnded = itm.find("span", string="受付終了")
        if receptionEnded is not None:
            # of the form:
            #   <button class="tglHook js_tglHook">
            #       <span class="badgeStatus _close">受付終了</span>
            #       <b>第4次受付</b>
            #       2022年8月17日（水）14:00 ～ 2022年8月18日（木）14:00 まで
            #   </button>
            date = findDate(
                receptionEnded.find_next_sibling(text=True)
            )  # get text not enclosed in tag
            scrapeLog += f"Reception ended: {date}\n"
            continue
        else:
            date = findDate(itm.find("button", class_="tglHook").string)
            scrapeLog += f"**** Scrape day: {date}\n"
            for target in itm.select("table tbody tr"):
                scrappedName = target.find("th").string

                # TODO: check this handles all types of N/A slots correctly

                temp = [x for x in target.select("td")]
                row = []
                for x in temp:
                    if x.find("select") is not None:
                        row.append("")
                    elif len(x.select("span.textType01")) > 0:
                        row.append("SOLD")
                    elif len(x.contents) == 1:
                        if next(x.stripped_strings) != "---":
                            scrapeLog += f"Scraping Contents (len={len(x.contents)}) from {scrappedName}: {x.contents[0]}"
                        else:
                            row.append("x")
                    else:
                        scrapeLog += f"Scraping Contents (len={len(x.contents)}) from {scrappedName}: {x.contents[0]}"
                # print(f"{scrappedName}: {row}")
                mblist[NAMESDICT[scrappedName]].append({"date": date, "soldout": row})
    return (mblist, scrapeLog)


####################################################
# Merge new data with old.  Input var "old" will be modified
####################################################
def updateMBTable(old, new, newentry):
    for day in new:
        for day2 in old:
            if day["date"] == day2["date"]:
                day2["soldout"] = [
                    newentry if x[1] == "" and x[0] != "" else x[1]
                    for x in zip(day["soldout"], day2["soldout"])
                ]
    return old


def updateToFirebase(newlastdraw, tabledata):
    #############################
    # initialise firebase
    #############################
    log = "Initialising Firebase\n"
    if not firebase_admin._apps:
        cred = credentials.Certificate(firebase_cred)
        firebase_admin.initialize_app(cred)
    db = firestore.client()
    log += "Requesting table from Firebase\n"
    tables_ref = db.collection("tables")
    queryres = (
        tables_ref.where("cd.num", "==", CDNUM)
        .where("cd.type", "==", CDTYPE)
        .limit(1)
        .get()[0]
    )
    cd_ref = queryres.reference
    cd_fromFB = queryres.to_dict()
    #############################
    # Update firebase record
    #############################
    if cd_fromFB["lastDraw"] >= newlastdraw:
        log += f"Already scraped draw {thisDraw}\nAbort update of Firebase\n"
    else:
        log += "Update data to Firebase\n"
        cd_ref.update({"lastDraw": newlastdraw, "table": tabledata})
        log += "Firebase update finished\n"
    return log


####################################################
###########   Main Program Starts Here   ###########
####################################################
if __name__ == "__main__":
    log = ""

    # For testing locally
    # config = json.load(iopen("forTUNE-cookies.json", encoding="utf-8"))
    # headers = config["headers"]
    # user_agent = config["user_agent"]
    # cookies = config["cookies"]
    #############################
    # scrape participating mb
    #############################
    scrappage = requests.get(BASEURL)
    if scrappage.status_code != 200:
        log += f"[red]Error[/red]:\n{scrappage.status_code}\nPage ({BASEURL}) request failed"
        print(log)
        sys.exit()

    soup = BeautifulSoup(scrappage.text, "html.parser")
    anchor = soup.find("span", class_="bold", string="【参加メンバー】")
    if anchor is not None:
        participants = {NAMESDICT[x]: [] for x in mbListCrawler(anchor) if len(x) > 0}
        # print("Member list scraped [green]✔[/green]")
    else:
        log += "Cannot find participant list.  Scrape from table. ⚠\n"

    anchor = soup.find("a", string="お申込みはこちら")
    if anchor is not None:
        tablelink = anchor["href"]
        log += f"Found link to table ({tablelink})\n"
    else:
        log += "Cannot find table to scrape.❌\nAbort process."
        print(log)
        sys.exit()

    txt = [
        x
        for x in soup.find("span", class_="badgeStatus _accept").parent.stripped_strings
    ][1]
    # sample:  txt = '第11次受付'
    thisDraw = int(re.search("\d+", txt).group(0))
    print(thisDraw)

    # Scrape
    (newtb, scrapeLog) = ScrapeTables(tablelink, participants)
    log += "********* Scrape Log *********"
    log += scrapeLog
    log += "********* ---------- *********\n"

    if newtb == 0:
        log += "Table empty.❌\nAbort process."
        print(log)
        sys.exit()

    #############################
    # read existed record and merge with new
    #############################
    datafile = str(f"{datafolder}{sys.argv[1]}")
    fulldata = json.load(iopen(datafile, encoding="utf-8"))
    cd = fulldata[len(fulldata) - 1]

    tabledata = cd["table"]
    dates = cd["meetDates"]
    newlastdraw = cd["lastDraw"] + 1
    if newlastdraw > thisDraw:
        log += f"Already scraped draw {thisDraw}\nAbort process"
        print(log)
        sys.exit()

    cd["lastDraw"] = newlastdraw

    for mb in tabledata:
        old = [
            {
                "date": row[1],
                "soldout": [x for x in row[0].split("|")],
            }
            for row in zip(mb["slotsSold"], dates)
        ]
        # if mb["member"] == "Sugawara Satsuki":
        #     print("Satsuki:")
        #     print("old:", old)
        #     print("new:", tb[mb["member"]])

        res = updateMBTable(
            old, newtb[mb["member"]], str(newlastdraw)
        )  # "old" will be updated too; res is just shallow copy of old
        res.sort(key=lambda x: x.get("date"))  # sort in ascending order of date
        mb["slotsSold"] = ["|".join(x["soldout"]) for x in res]
        # now tabledata=cd["table"] is updated

    log += "******** JSON data as follows ******************"
    log += json.dumps(cd)
    log += "************************************************"

    #############################
    # Write new record to blank file
    #############################
    with iopen(str(f"{datafolder}data.json"), "w") as outfile:
        json.dump(fulldata, outfile, indent=3)

    #############################
    # Firebase manipulation
    #############################
    log += updateToFirebase(newlastdraw, tabledata)

    print(log)
