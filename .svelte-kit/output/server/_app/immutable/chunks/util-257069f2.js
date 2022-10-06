import { concat, pullAll, without, range } from "lodash-es";
const membersdata = [
  {
    member: "Akimoto Manatsu",
    kanji: "\u79CB\u5143 \u771F\u590F",
    furi: "\u3042\u304D\u3082\u3068 \u307E\u306A\u3064",
    gen: 1,
    dob: "1993-08-20",
    from: "\u57FC\u7389",
    bloodtype: "B",
    height: 154,
    status: ""
  },
  {
    member: "Ikuta Erika",
    kanji: "\u751F\u7530\u7D75\u68A8\u82B1",
    furi: "\u3044\u304F\u305F \u3048\u308A\u304B",
    gen: 1,
    dob: "1997-01-22",
    from: "\u30C7\u30E5\u30C3\u30BB\u30EB\u30C9\u30EB\u30D5",
    bloodtype: "A",
    height: 160,
    status: "2021-12-31"
  },
  {
    member: "Ikoma Rina",
    kanji: "\u751F\u99D2 \u91CC\u5948",
    furi: "\u3044\u3053\u307E \u308A\u306A",
    gen: 1,
    dob: "1995-12-29",
    from: "\u79CB\u7530",
    bloodtype: "AB",
    height: 153,
    status: "2018-05-06"
  },
  {
    member: "Itou Marika",
    kanji: "\u4F0A\u85E4 \u4E07\u7406\u83EF",
    furi: "\u3044\u3068\u3046 \u307E\u308A\u304B",
    gen: 1,
    dob: "1996-02-20",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "O",
    height: 156,
    status: "2017-12-23"
  },
  {
    member: "Inoue Sayuri",
    kanji: "\u4E95\u4E0A \u5C0F\u767E\u5408",
    furi: "\u3044\u306E\u3046\u3048 \u3055\u3086\u308A",
    gen: 1,
    dob: "1994-12-14",
    from: "\u57FC\u7389",
    bloodtype: "B",
    height: 156,
    status: "2020-04-27"
  },
  {
    member: "Etou Misa",
    kanji: "\u885B\u85E4 \u7F8E\u5F69",
    furi: "\u3048\u3068\u3046 \u307F\u3055",
    gen: 1,
    dob: "1993-01-04",
    bloodtype: "AB",
    from: "\u5927\u5206",
    height: 163,
    status: "2019-03-31"
  },
  {
    member: "Kawamura Mahiro",
    kanji: "\u5DDD\u6751 \u771F\u6D0B",
    furi: "\u304B\u308F\u3080\u3089 \u307E\u3072\u308D",
    gen: 1,
    dob: "1995-07-23",
    from: "\u5927\u962A",
    bloodtype: "A",
    height: 158,
    status: "2018-03-31"
  },
  {
    member: "Kawago Hina",
    kanji: "\u5DDD\u5F8C \u967D\u83DC",
    furi: "\u304B\u308F\u3054 \u3072\u306A",
    gen: 1,
    dob: "1998-03-22",
    from: "\u9577\u5D0E",
    bloodtype: "O",
    height: 161,
    status: "2018-12-20"
  },
  {
    member: "Saito Asuka",
    kanji: "\u9F4B\u85E4 \u98DB\u9CE5",
    furi: "\u3055\u3044\u3068\u3046  \u3042\u3059\u304B",
    gen: 1,
    dob: "1998-08-10",
    from: "\u6771\u4EAC",
    bloodtype: "O",
    height: 158,
    status: ""
  },
  {
    member: "Saitou Chiharu",
    kanji: "\u658E\u85E4 \u3061\u306F\u308B",
    furi: "\u3055\u3044\u3068\u3046 \u3061\u306F\u308B",
    gen: 1,
    dob: "1997-02-17",
    from: "\u57FC\u7389",
    bloodtype: "A",
    height: 166,
    status: "2018-07-16"
  },
  {
    member: "Saitou Yuuri",
    kanji: "\u6589\u85E4 \u512A\u91CC",
    furi: "\u3055\u3044\u3068\u3046 \u3086\u3046\u308A",
    gen: 1,
    dob: "1993-07-20",
    from: "\u6771\u4EAC",
    bloodtype: "O",
    height: 157,
    status: "2019-06-30"
  },
  {
    member: "Sakurai Reika",
    kanji: "\u685C\u4E95 \u73B2\u9999",
    furi: "\u3055\u304F\u3089\u3044 \u308C\u3044\u304B",
    gen: 1,
    dob: "1994-05-16",
    bloodtype: "A",
    from: "\u795E\u5948\u5DDD",
    height: 155,
    status: "2019-09-01"
  },
  {
    member: "Takayama Kazumi",
    kanji: "\u9AD8\u5C71 \u4E00\u5B9F",
    furi: "\u305F\u304B\u3084\u307E \u304B\u305A\u307F",
    gen: 1,
    dob: "1994-02-08",
    from: "\u5343\u8449",
    bloodtype: "A",
    height: 162,
    status: "2021-11-21"
  },
  {
    member: "Nakada Kana",
    kanji: "\u4E2D\u7530 \u82B1\u5948",
    furi: "\u306A\u304B\u3060 \u304B\u306A",
    gen: 1,
    dob: "1994-08-06",
    from: "\u57FC\u7389",
    bloodtype: "A",
    height: 158,
    status: "2020-10-25"
  },
  {
    member: "Nakamoto Himeka",
    kanji: "\u4E2D\u5143 \u65E5\u82BD\u9999",
    furi: "\u306A\u304B\u3082\u3068 \u3072\u3081\u304B",
    gen: 1,
    dob: "1996-04-13",
    from: "\u5E83\u5CF6",
    bloodtype: "O",
    height: 161,
    status: "2017-11-19"
  },
  {
    member: "Nishino Nanase",
    kanji: "\u897F\u91CE \u4E03\u702C",
    furi: "\u306B\u3057\u306E \u306A\u306A\u305B",
    gen: 1,
    dob: "1994-05-25",
    from: "\u5927\u962A",
    bloodtype: "O",
    height: 159,
    status: "2018-12-31"
  },
  {
    member: "Noujou Ami",
    kanji: "\u80FD\u689D \u611B\u672A",
    furi: "\u306E\u3046\u3058\u3087\u3046 \u3042\u307F",
    gen: 1,
    dob: "1994-10-18",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "A",
    height: 162,
    status: "2018-12-15"
  },
  {
    member: "Hashimoto Nanami",
    kanji: "\u6A4B\u672C \u5948\u3005\u672A",
    furi: "\u306F\u3057\u3082\u3068 \u306A\u306A\u307F",
    gen: 1,
    dob: "1993-02-20",
    from: "\u5317\u6D77\u9053",
    bloodtype: "B",
    height: 163,
    status: "2017-02-20"
  },
  {
    member: "Higuchi Hina",
    kanji: "\u6A0B\u53E3 \u65E5\u5948",
    furi: "\u3055\u3044\u3068\u3046  \u3042\u3059\u304B",
    gen: 1,
    dob: "1998-01-31",
    from: "\u6771\u4EAC",
    bloodtype: "A",
    height: 161,
    status: ""
  },
  {
    member: "Fukagawa Mai",
    kanji: "\u6DF1\u5DDD \u9EBB\u8863",
    furi: "\u3075\u304B\u304C\u308F \u307E\u3044",
    gen: 1,
    dob: "1991-03-29",
    from: "\u9759\u5CA1",
    bloodtype: "O",
    height: 162,
    status: "2016-06-16"
  },
  {
    member: "Hoshino Minami",
    kanji: "\u661F\u91CE \u307F\u306A\u307F",
    furi: "\u307B\u3057\u306E \u307F\u306A\u307F",
    gen: 1,
    dob: "1998-02-06",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "B",
    height: 155,
    status: "2022-02-12"
  },
  {
    member: "Matsumura Sayuri",
    kanji: "\u677E\u6751 \u6C99\u53CB\u7406",
    furi: "\u307E\u3064\u3080\u3089 \u3055\u3086\u308A",
    gen: 1,
    dob: "1992-08-27",
    from: "\u5927\u962A",
    bloodtype: "B",
    height: 164,
    status: "2021-07-13"
  },
  {
    member: "Wakatsuki Yumi",
    kanji: "\u82E5\u6708 \u4F51\u7F8E",
    furi: "\u308F\u304B\u3064\u304D \u3086\u307F",
    gen: 1,
    dob: "1994-06-27",
    from: "\u9759\u5CA1",
    bloodtype: "O",
    height: 157,
    status: "2018-11-30"
  },
  {
    member: "Wada Maaya",
    kanji: "\u548C\u7530 \u307E\u3042\u3084",
    furi: "\u308F\u3060 \u307E\u3042\u3084",
    gen: 1,
    dob: "1998-04-23",
    from: "\u5E83\u5CF6",
    bloodtype: "O",
    height: 161,
    status: ""
  },
  {
    member: "Itou Karin",
    kanji: "\u4F0A\u85E4 \u304B\u308A\u3093",
    furi: "\u3044\u3068\u3046 \u304B\u308A\u3093",
    gen: 2,
    dob: "1993-05-26",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "O",
    height: 153,
    status: "2019-05-24"
  },
  {
    member: "Itou Jyunna",
    kanji: "\u4F0A\u85E4 \u7D14\u5948",
    furi: "\u3044\u3068\u3046 \u3058\u3085\u3093\u306A",
    gen: 2,
    dob: "1998-08-27",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "A",
    height: 166,
    status: "2021-08-31"
  },
  {
    member: "Sagara Iori",
    kanji: "\u76F8\u697D \u4F0A\u7E54",
    furi: "\u3055\u304C\u3089 \u3044\u304A\u308A",
    gen: 2,
    dob: "1997-11-26",
    from: "\u57FC\u7389",
    bloodtype: "O",
    height: 164,
    status: "2018-07-16"
  },
  {
    member: "Sasaki Kotoko",
    kanji: "\u4F50\u3005\u6728 \u7434\u5B50",
    furi: "\u3055\u3055\u304D \u3053\u3068\u3053",
    gen: 2,
    dob: "1998-08-28",
    from: "\u57FC\u7389",
    bloodtype: "A",
    height: 163,
    status: "2020-03-31"
  },
  {
    member: "Shinuchi Mai",
    kanji: "\u65B0\u5185 \u771E\u8863",
    furi: "\u3057\u3093\u3046\u3061 \u307E\u3044",
    gen: 2,
    dob: "1992-01-22",
    from: "\u57FC\u7389",
    bloodtype: "B",
    height: 165,
    status: "2022-02-10"
  },
  {
    member: "Terada Ranze",
    kanji: "\u5BFA\u7530 \u862D\u4E16",
    furi: "\u3066\u3089\u3060 \u3089\u3093\u305C",
    gen: 2,
    dob: "1998-09-23",
    from: "\u6771\u4EAC",
    bloodtype: "\u4E0D\u660E",
    height: 155,
    status: "2021-12-12"
  },
  {
    member: "Kitano Hinako",
    kanji: "\u5317\u91CE \u65E5\u5948\u5B50",
    furi: "\u304D\u305F\u306E \u3072\u306A\u3053",
    gen: 2,
    dob: "1996-07-17",
    from: "\u5343\u8449",
    bloodtype: "O",
    height: 158,
    status: "2022-04-30"
  },
  {
    member: "Suzuki Ayane",
    kanji: "\u9234\u6728 \u7D62\u97F3",
    furi: "\u3059\u305A\u304D \u3042\u3084\u306D",
    gen: 2,
    dob: "1999-03-05",
    from: "\u5E83\u5CF6",
    bloodtype: "O",
    height: 161,
    status: ""
  },
  {
    member: "Hori Miyona",
    kanji: "\u5800 \u672A\u592E\u5948",
    furi: "\u307B\u308A \u307F\u304A\u306A",
    gen: 2,
    dob: "1996-10-15",
    from: "\u5C90\u961C",
    bloodtype: "O",
    height: 162,
    status: "2021-03-28"
  },
  {
    member: "Yamazaki Rena",
    kanji: "\u5C71\u5D0E \u601C\u5948",
    furi: "\u3084\u307E\u3056\u304D \u308C\u306A",
    gen: 2,
    dob: "1997-05-21",
    from: "\u6771\u4EAC",
    bloodtype: "B",
    height: 164,
    status: "2022-07-17"
  },
  {
    member: "Watanabe Miria",
    kanji: "\u6E21\u8FBA \u307F\u308A\u611B",
    furi: "\u308F\u305F\u306A\u3079 \u307F\u308A\u3042",
    gen: 2,
    dob: "1999-11-01",
    from: "\u6771\u4EAC",
    bloodtype: "O",
    height: 153,
    status: "2021-08-31"
  },
  {
    member: "Itou Riria",
    kanji: "\u4F0A\u85E4 \u7406\u3005\u674F",
    furi: "\u3044\u3068\u3046 \u308A\u308A\u3042",
    gen: 3,
    dob: "2002-10-08",
    from: "\u6C96\u7E04",
    bloodtype: "B",
    height: 154,
    status: ""
  },
  {
    member: "Iwamoto Renka",
    kanji: "\u5CA9\u672C \u84EE\u52A0",
    furi: "\u3044\u308F\u3082\u3068 \u308C\u3093\u304B",
    gen: 3,
    dob: "2004-02-02",
    from: "\u6771\u4EAC",
    bloodtype: "B",
    height: 159,
    status: ""
  },
  {
    member: "Umezawa Minami",
    kanji: "\u6885\u6FA4 \u7F8E\u6CE2",
    furi: "\u3046\u3081\u3056\u308F \u307F\u306A\u307F",
    gen: 3,
    dob: "1999-01-06",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "A",
    height: 170,
    status: ""
  },
  {
    member: "Oozono Momoko",
    kanji: "\u5927\u5712 \u6843\u5B50",
    furi: "\u304A\u304A\u305E\u306E \u3082\u3082\u3053",
    gen: 3,
    dob: "1999-09-13",
    from: "\u9E7F\u5150\u5CF6",
    bloodtype: "O",
    height: 156,
    status: "2021-09-04"
  },
  {
    member: "Kubo Shiori",
    kanji: "\u4E45\u4FDD \u53F2\u7DD2\u91CC",
    furi: "\u304F\u307C \u3057\u304A\u308A",
    gen: 3,
    dob: "2001-07-14",
    from: "\u5BAE\u57CE",
    bloodtype: "O",
    height: 161,
    status: ""
  },
  {
    member: "Sakaguchi Tamami",
    kanji: "\u962A\u53E3 \u73E0\u7F8E",
    furi: "\u3055\u304B\u3050\u3061 \u305F\u307E\u307F",
    gen: 3,
    dob: "2001-11-10",
    from: "\u6771\u4EAC",
    bloodtype: "A",
    height: 161,
    status: ""
  },
  {
    member: "Sato Kaede",
    kanji: "\u4F50\u85E4 \u6953",
    furi: "\u3055\u3068\u3046 \u304B\u3048\u3067",
    gen: 3,
    dob: "1998-03-23",
    from: "\u611B\u77E5",
    bloodtype: "A",
    height: 161,
    status: ""
  },
  {
    member: "Nakamura Reno",
    kanji: "\u4E2D\u6751 \u9E97\u4E43",
    furi: "\u306A\u304B\u3080\u3089 \u308C\u306E",
    gen: 3,
    dob: "2001-09-27",
    from: "\u6771\u4EAC",
    bloodtype: "\u4E0D\u660E",
    height: 167,
    status: ""
  },
  {
    member: "Mukai Hazuki",
    kanji: "\u5411\u4E95 \u8449\u6708",
    furi: "\u3080\u304B\u3044 \u306F\u3065\u304D",
    gen: 3,
    dob: "1999-08-23",
    from: "\u6771\u4EAC",
    bloodtype: "A",
    height: 152,
    status: ""
  },
  {
    member: "Yamashita Mizuki",
    kanji: "\u5C71\u4E0B \u7F8E\u6708",
    furi: "\u3084\u307E\u3057\u305F \u307F\u3065\u304D",
    gen: 3,
    dob: "1999-07-26",
    from: "\u6771\u4EAC",
    bloodtype: "O",
    height: 160,
    status: ""
  },
  {
    member: "Yoshida Ayano Cristi",
    kanji: "\u5409\u7530 \u7DBE\u4E43\u30AF\u30EA\u30B9\u30C6\u30A3\u30FC",
    furi: "\u3088\u3057\u3060 \u3042\u3084\u306E\u30AF\u30EA\u30B9\u30C6\u30A3\u30FC",
    gen: 3,
    dob: "1995-09-06",
    from: "\u5927\u5206",
    bloodtype: "A",
    height: 161,
    status: ""
  },
  {
    member: "Yoda Yuuki",
    kanji: "\u4E0E\u7530 \u7950\u5E0C",
    furi: "\u3088\u3060 \u3086\u3046\u304D",
    gen: 3,
    dob: "2000-05-05",
    from: "\u798F\u5CA1",
    bloodtype: "O",
    height: 153,
    status: ""
  },
  {
    member: "Endo Sakura",
    kanji: "\u9060\u85E4 \u3055\u304F\u3089",
    furi: "\u3048\u3093\u3069\u3046 \u3055\u304F\u3089",
    gen: 4,
    dob: "2001-10-03",
    from: "\u611B\u77E5",
    bloodtype: "\u4E0D\u660E",
    height: 164,
    status: ""
  },
  {
    member: "Kaki Haruka",
    kanji: "\u8CC0\u559C \u9065\u9999",
    furi: "\u304B\u304D \u306F\u308B\u304B",
    gen: 4,
    dob: "2001-08-08",
    from: "\u6803\u6728",
    bloodtype: "A",
    height: 166,
    status: ""
  },
  {
    member: "Kakehashi Sayaka",
    kanji: "\u639B\u6A4B \u6C99\u8036\u9999",
    furi: "\u304B\u3051\u306F\u3057 \u3055\u3084\u304B",
    gen: 4,
    dob: "2002-11-20",
    from: "\u5CA1\u5C71",
    bloodtype: "B\u578B",
    height: 154,
    status: ""
  },
  {
    member: "Kanagawa Saya",
    kanji: "\u91D1\u5DDD \u7D17\u8036",
    furi: "\u304B\u306A\u304C\u308F \u3055\u3084",
    gen: 4,
    dob: "2001-10-31",
    from: "\u5317\u6D77\u9053",
    bloodtype: "O",
    height: 165,
    status: ""
  },
  {
    member: "Kitagawa Yuri",
    kanji: "\u5317\u5DDD \u60A0\u7406",
    furi: "\u304D\u305F\u304C\u308F \u3086\u308A",
    gen: 4,
    dob: "2001-08-08",
    from: "\u30AB\u30EA\u30D5\u30A9\u30EB\u30CB\u30A2\u5DDE",
    bloodtype: "\u4E0D\u660E",
    height: 165,
    status: ""
  },
  {
    member: "Kuromi Haruka",
    kanji: "\u9ED2\u898B \u660E\u9999",
    furi: "\u304F\u308D\u307F \u306F\u308B\u304B",
    gen: 4,
    dob: "2004-01-19",
    from: "\u6771\u4EAC",
    bloodtype: "O",
    height: 162,
    status: ""
  },
  {
    member: "Sato Rika",
    kanji: "\u4F50\u85E4 \u7483\u679C",
    furi: "\u3055\u3068\u3046 \u308A\u304B",
    gen: 4,
    dob: "2001-08-09",
    from: "\u5CA9\u624B",
    bloodtype: "B",
    height: 160,
    status: ""
  },
  {
    member: "Shibata Yuna",
    kanji: "\u67F4\u7530 \u67DA\u83DC",
    furi: "\u3057\u3070\u305F \u3086\u306A",
    gen: 4,
    dob: "2003-03-03",
    from: "\u5343\u8449",
    bloodtype: "A",
    height: 160,
    status: ""
  },
  {
    member: "Seimiya Rei",
    kanji: "\u6E05\u5BAE \u30EC\u30A4",
    furi: "\u305B\u3044\u307F\u3084 \u30EC\u30A4",
    gen: 4,
    dob: "2003-08-01",
    from: "\u57FC\u7389",
    bloodtype: "O",
    height: 164,
    status: ""
  },
  {
    member: "Tamura Mayu",
    kanji: "\u7530\u6751 \u771F\u4F51",
    furi: "\u305F\u3080\u3089 \u307E\u3086",
    gen: 4,
    dob: "1999-01-12",
    from: "\u57FC\u7389",
    bloodtype: "A",
    height: 160,
    status: ""
  },
  {
    member: "Tsutsui Ayame",
    kanji: "\u7B52\u4E95 \u3042\u3084\u3081",
    furi: "\u3064\u3064\u3044 \u3042\u3084\u3081",
    gen: 4,
    dob: "2004-06-08",
    from: "\u611B\u77E5",
    bloodtype: "O",
    height: 160,
    status: ""
  },
  {
    member: "Hayakawa Seira",
    kanji: "\u65E9\u5DDD \u8056\u6765",
    furi: "\u306F\u3084\u304B\u308F \u305B\u3044\u3089",
    gen: 4,
    dob: "2000-08-24",
    from: "\u5927\u962A",
    bloodtype: "A",
    height: 164,
    status: "rest"
  },
  {
    member: "Hayashi Runa",
    kanji: "\u6797 \u7460\u5948",
    furi: "\u306F\u3084\u3057 \u308B\u306A",
    gen: 4,
    dob: "2003-10-02",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "O",
    height: 164,
    status: ""
  },
  {
    member: "Matsuo Miyu",
    kanji: "\u677E\u5C3E \u7F8E\u4F51",
    furi: "\u307E\u3064\u304A \u307F\u3086",
    gen: 4,
    dob: "2004-01-03",
    from: "\u5343\u8449",
    bloodtype: "O",
    height: 167,
    status: ""
  },
  {
    member: "Yakubo Mio",
    kanji: "\u77E2\u4E45\u4FDD \u7F8E\u7DD2",
    furi: "\u3084\u304F\u307C \u307F\u304A",
    gen: 4,
    dob: "2002-08-14",
    from: "\u6771\u4EAC",
    bloodtype: "B",
    height: 153,
    status: ""
  },
  {
    member: "Yumiki Nao",
    kanji: "\u5F13\u6728 \u5948\u65BC",
    furi: "\u3086\u307F\u304D \u306A\u304A",
    gen: 4,
    dob: "1999-02-03",
    from: "\u4EAC\u90FD",
    bloodtype: "A",
    height: 165,
    status: ""
  },
  {
    member: "Ioki Mao",
    kanji: "\u4E94\u767E\u57CE \u8309\u592E",
    furi: "\u3044\u304A\u304D \u307E\u304A",
    gen: 5,
    dob: "2005-07-29",
    from: "\u5175\u5EAB",
    bloodtype: "O",
    height: 166,
    status: "5\u671F\u751F"
  },
  {
    member: "Ikeda Teresa",
    kanji: "\u6C60\u7530 \u745B\u7D17",
    furi: "\u3044\u3051\u3060 \u3066\u308C\u3055",
    gen: 5,
    dob: "2002-05-12",
    from: "\u6771\u4EAC",
    bloodtype: "\u4E0D\u660E",
    height: 159,
    status: "5\u671F\u751F"
  },
  {
    member: "Ichinose Miku",
    kanji: "\u4E00\u30CE\u702C \u7F8E\u7A7A",
    furi: "\u3044\u3061\u306E\u305B \u307F\u304F",
    gen: 5,
    dob: "2003-05-24",
    from: "\u798F\u5CA1",
    bloodtype: "B",
    height: 156,
    status: "5\u671F\u751F"
  },
  {
    member: "Inoue Nagi",
    kanji: "\u4E95\u4E0A \u548C",
    furi: "\u3044\u306E\u3046\u3048 \u306A\u304E ",
    gen: 5,
    dob: "2005-02-17",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "B",
    height: 156,
    status: "5\u671F\u751F"
  },
  {
    member: "Okamoto Hina",
    kanji: "\u5CA1\u672C \u59EB\u5948",
    furi: "\u304A\u304B\u3082\u3068 \u3072\u306A",
    gen: 5,
    dob: "2003-12-17",
    from: "\u611B\u77E5",
    bloodtype: "A",
    height: 158,
    status: "5\u671F\u751F"
  },
  {
    member: "Ogawa Aya",
    kanji: "\u5C0F\u5DDD \u5F69",
    furi: "\u304A\u304C\u308F \u3042\u3084 ",
    gen: 5,
    dob: "2007-06-27",
    from: "\u5343\u8449",
    bloodtype: "B",
    height: 154,
    status: "5\u671F\u751F"
  },
  {
    member: "Okuda Iroha",
    kanji: "\u5965\u7530 \u3044\u308D\u306F",
    furi: "\u304A\u304F\u3060 \u3044\u308D\u306F",
    gen: 5,
    dob: "2005-08-20",
    from: "\u5343\u8449",
    bloodtype: "A",
    height: 157,
    status: "5\u671F\u751F"
  },
  {
    member: "Kawasaki Sakura",
    kanji: "\u5DDD\uFA11 \u685C",
    furi: "\u304B\u308F\u3055\u304D \u3055\u304F\u3089",
    gen: 5,
    dob: "2003-04-17",
    from: "\u795E\u5948\u5DDD",
    bloodtype: "\u4E0D\u660E",
    height: 155,
    status: "5\u671F\u751F"
  },
  {
    member: "Sugawara Satsuki",
    kanji: "\u83C5\u539F \u54B2\u6708",
    furi: "\u3059\u304C\u308F\u3089 \u3055\u3064\u304D ",
    gen: 5,
    dob: "2005-10-31",
    from: "\u5343\u8449",
    bloodtype: "A",
    height: 157,
    status: "5\u671F\u751F"
  },
  {
    member: "Tomisato Nao",
    kanji: "\u51A8\u91CC \u5948\u592E",
    furi: "\u3068\u307F\u3055\u3068 \u306A\u304A",
    gen: 5,
    dob: "2006\u5E749\u670818",
    from: "\u5343\u8449",
    bloodtype: "O",
    height: 164,
    status: "5\u671F\u751F"
  },
  {
    member: "Nakanishi Aruno",
    kanji: "\u4E2D\u897F \u30A2\u30EB\u30CE",
    furi: "\u306A\u304B\u306B\u3057 \u30A2\u30EB\u30CE",
    gen: 5,
    dob: "2003\u5E743\u670817",
    from: "\u5343\u8449",
    bloodtype: "A",
    height: 157,
    status: "5\u671F\u751F"
  }
];
const isISODate = (d) => d.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
const isExpandedDatalist = (l) => "slotsSoldex" in l[0];
function getMember(name) {
  let res = membersdata.filter((x) => x.member == name);
  if (res.length != 0) {
    res[0]["stripped_kanji"] = res[0].kanji.replace(" ", "");
    return res[0];
  } else {
    return {
      memebr: name,
      kanji: name,
      furi: name,
      stripped_kanji: name,
      gen: 0,
      dob: "1900-01-01",
      from: "",
      status: "none"
    };
  }
}
function involvedMembers(cdData2, dataform = "full") {
  return cdData2.table.map((x) => dataform == "name" ? x.member : getMember(x.member));
}
const status2label = (s) => {
  if (isISODate(s)) {
    return "OG";
  } else {
    return "\u73FE\u5F79";
  }
};
const groupID2label = (id) => {
  switch (id) {
    case "sbt":
      return "\u9078\u629C";
    case "und":
      return "\u30A2\u30F3\u30C0\u30FC";
    case "grad":
      return "\u5352\u696D\u4E88\u5B9A";
    default:
      if (id.match(/^(gen)\d+$/))
        return `${id.slice(3)}\u671F\u751F`;
      return `?`;
  }
};
const ordering = {
  furi: (a, b) => a.localeCompare(b, "ja"),
  gen: (a, b) => a - b,
  group: (a, b) => {
    let o = ["grad", "sbt", "und", ...[...Array(5).keys()].map((x) => `gen${x + 1}`)];
    return o.indexOf(a) - o.indexOf(b);
  },
  "dob-year": (a, b) => a - b,
  soldstatus: (a, b) => a ? -1 : b ? 1 : 0,
  genFuri: (a, b) => composeCompares([globalThis.gen, globalThis.furi], [a.gen, a.furi], [b.gen, b.furi]),
  ISODateDescend: compareISODateDescend,
  ISODateAscend: (a, b) => compareISODateDescend(b, a)
};
const opt2label = (opt, val) => {
  switch (opt) {
    case "gen":
      return `${val}\u671F\u751F`;
    case "group":
      return groupID2label(val);
    case "status":
      return status2label(val);
    case "bloodtype":
      return val != "\u4E0D\u660E" ? `${val}\u578B` : "\u4E0D\u660E";
    case "dob-year":
      return isISODate(val) ? `${val.slice(0, 4)}\u5E74` : `${val}\u5E74`;
    case "dob-month":
      return isISODate(val) ? `${val.slice(5, 7)}\u6708` : `${val}\u6708`;
    case "soldstatus":
      return val ? "\u5B8C\u58F2" : "\u672A\u5B8C\u58F2";
    case "from":
      return val;
  }
};
const expandSoldslots = (mbdata) => {
  if (!("slotsSoldex" in mbdata))
    mbdata["slotsSoldex"] = mbdata.slotsSold.map((x) => x.split("|"));
  return mbdata.slotsSoldex;
};
function expandMBData(mbdata, groups) {
  let res = { member: mbdata.member, slotsSoldex: [], numSold: [0, 0], group: "" };
  res.slotsSoldex = expandSoldslots(mbdata);
  let f = res.slotsSoldex.flat();
  res.numSold = [
    f.filter((x) => x.match(/^\d+$/) ? parseInt(x) > 0 : false).length,
    f.filter((x) => x != "x" && x != "?").length
  ];
  res.group = groups == "" ? "" : determineGroup(mbdata, groups);
  return res;
}
function compareData(mbdataNow, mbdataCompare, atdraw = -1) {
  let [m, totalThen] = getNumSold(mbdataCompare, atdraw), [n, totalNow] = getNumSold(mbdataNow, atdraw);
  let lastTimeSoldout = m == totalThen, currentSoldout = n == totalNow, bothSoldout = lastTimeSoldout && currentSoldout;
  if (bothSoldout) {
    return {
      prev: m,
      curr: n,
      diff: 0,
      extraprev: `(${finalSoldoutDraw(mbdataCompare)}\u6B21)`,
      extracurr: `(${finalSoldoutDraw(mbdataNow)}\u6B21)`,
      extradiff: totalThen != "N/A" ? `\u5168\u5B8C\u58F2` : ""
    };
  } else if (lastTimeSoldout && n > m) {
    return {
      prev: `${m}(\u5168)`,
      curr: n,
      diff: "N/A"
    };
  } else if (currentSoldout && n < m) {
    return {
      prev: m,
      curr: `${n}(\u5168)`,
      diff: "N/A"
    };
  } else {
    return {
      prev: totalThen == "N/A" ? "N/A" : m,
      curr: `${n}${currentSoldout ? "(\u5168)" : ""}`,
      diff: m !== "N/A" ? `${n - m > 0 ? "+" : ""}${n - m}` : ""
    };
  }
}
function expandDataList(cdData2) {
  let groups = concat(
    [
      { id: "sbt", has: cdData2.sbt },
      { id: "und", has: getUnderList(cdData2) }
    ],
    cdData2.addgroups ? cdData2.addgroups : []
  );
  return cdData2.table.map((x) => expandMBData(x, groups));
}
function getNumSold(mbdata, atdraw = -1) {
  if (!mbdata)
    return [0, "N/A"];
  let expanded = expandSoldslots(mbdata).flat();
  let bound = atdraw == -1 ? finalSoldoutDraw(mbdata) : atdraw;
  let total = expanded.filter((x) => x != "x" && x != "?").length;
  return bound == -1 ? [0, total] : [expanded.filter((x) => x.match(/^\d+$/) ? parseInt(x) <= bound : false).length, total];
}
function finalSoldoutDraw(mbdata) {
  return mbdata ? expandSoldslots(mbdata).flat().reduce((prev, curr) => {
    if (String(curr).match(/^\d+$/)) {
      let c = parseInt(curr);
      return c > prev ? c : prev;
    } else {
      return String(prev).match(/^\d+$/) ? parseInt(prev) : -1;
    }
  }) : -1;
}
function partitionToGroup(mbDataList, opt = "gen") {
  if (opt == "none")
    return mbDataList;
  let res = [];
  let withopt = [];
  for (let mbdata of mbDataList) {
    let mb = getMember(mbdata.member);
    let val;
    switch (opt) {
      case "dob-year":
        val = mb.dob.slice(0, 4);
        break;
      case "dob-month":
        val = mb.dob.slice(5, 7);
        break;
      case "group":
        val = mbdata.group;
        break;
      case "soldstatus":
        val = mbdata.numSold[0] == mbdata.numSold[1];
        break;
      default:
        val = mb[opt];
        break;
    }
    let i = withopt.indexOf(val);
    if (i != -1) {
      res[i].has.push(mbdata);
    } else {
      withopt.push(val);
      res.push({ label: opt2label(opt, val), value: val, has: [mbdata] });
    }
  }
  return res.sort((a, b) => ordering[opt](a.value, b.value));
}
function sortList(datalist, opt = "none") {
  return "has" in datalist[0] ? datalist.map((x) => {
    return { label: x.label, value: x.value, has: sortPlainList(x.has, opt) };
  }) : sortPlainList(datalist, opt);
}
function sortPlainList(mbdatalist, opt = "kana") {
  switch (opt) {
    case "numsold": {
      let t = isExpandedDatalist(mbdatalist) ? mbdatalist : mbdatalist.map((x) => expandMBData(x, ""));
      return t.sort((a, b) => {
        let soldout = [a, b].map((x) => x.numSold[0] == x.numSold[1]);
        if (soldout[0])
          return soldout[1] ? b.numSold[0] - a.numSold[0] : -1;
        else
          return soldout[1] ? 1 : b.numSold[0] - a.numSold[0];
      });
    }
    case "kana":
      return mbdatalist.sort((a, b) => {
        return ordering.furi(getMember(a.member).furi, getMember(b.member).furi);
      });
    default:
      return mbdatalist;
  }
}
function nth(n) {
  return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th";
}
function cdData(cd) {
  let value = `${cd.num}${cd.type}`;
  let display = `${cd.num}${nth(cd.num)} ${cd.type}`;
  return { display, value };
}
function getUnderList(cdData2) {
  let mblist = cdData2.table.map((x) => x.member);
  if ("addgroups" in cdData2)
    cdData2.addgroups.map((x) => pullAll(mblist, x.has));
  return without(mblist, ...cdData2.sbt);
}
function determineGroup(mb, groups) {
  for (let g of groups) {
    if (g.has.indexOf(mb.member) !== -1)
      return g.id;
  }
  return "NoData";
}
function nthColor(n) {
  const palette = [
    "#911eb4",
    "#3cb44b",
    "#4363d8",
    "#e6194b",
    "#42d4f4",
    "#f58231",
    "#f032e6",
    "#469990",
    "#fabed4",
    "#dcbeff",
    "#9a6324",
    "#fffac8",
    "#800000",
    "#aaffc3",
    "#000075",
    "#ffe119",
    "#bfef45",
    "#808000",
    "#ffd8b1",
    "#000000"
  ];
  return n < palette.length ? palette[n] : palette[n % palette.length];
}
function compareISODateDescend(a, b) {
  let da = a.split("-").map((x) => parseInt(x)), db = b.split("-").map((x) => parseInt(x));
  return composeCompares(
    [0, 0, 0].map(() => {
      return (a2, b2) => b2 - a2;
    }),
    da,
    db
  );
}
function composeCompares(compfuncs, a, b) {
  let c = range(compfuncs.length).map((i) => compfuncs[i](a[i], b[i]));
  return c.reduce((accum, curr) => accum ? accum : curr);
}
export {
  cdData as a,
  getNumSold as b,
  compareData as c,
  expandDataList as e,
  finalSoldoutDraw as f,
  getMember as g,
  involvedMembers as i,
  nthColor as n,
  partitionToGroup as p,
  sortList as s
};
