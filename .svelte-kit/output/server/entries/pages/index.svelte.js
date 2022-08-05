import { c as create_ssr_component, e as escape, n as null_to_empty, a as each, b as add_attribute, v as validate_component } from "../../_app/immutable/chunks/index-280110de.js";
import { concat, pullAll, without, find, min } from "lodash-es";
const data = [
  {
    cd: {
      num: 28,
      type: "Single"
    },
    lastDraw: 19,
    meetDates: [
      "2021-09-25",
      "2021-10-15",
      "2021-10-30",
      "2021-11-12",
      "2021-12-04",
      "2021-12-24"
    ],
    sbt: [
      "Takayama Kazumi",
      "Higuchi Hina",
      "Suzuki Ayane",
      "Iwamoto Renka",
      "Umezawa Minami",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Kakehashi Sayaka",
      "Shibata Yuna",
      "Seimiya Rei",
      "Tamura Mayu",
      "Tsujii Ayame",
      "Hayakawa Seira"
    ],
    table: [
      {
        member: "Takayama Kazumi",
        slotsSold: [
          "x|x|x|x|x",
          "7|7|8|8|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "4|4|4|5|5",
          "||||",
          "7|8|5|9|6",
          "||||",
          "||16||15",
          "6|5|4|5|3"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Kitano Hinako",
        slotsSold: [
          "3|3|3|3|3",
          "6|5|5|4|5",
          "4|3|3|3|3",
          "5|5|4|5|3",
          "5|5|4|4|4",
          "3|3|2|2|2"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "4|4|4|5|4",
          "8|9|8|9|8",
          "7|6|5|7|5",
          "13|13|10|12|11",
          "14|13|10|13|14",
          "5|6|5|4|3"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "||||x",
          "||||x",
          "||||x",
          "||||x",
          "||||x",
          "||15|5|x"
        ]
      },
      {
        member: "Ito Riria",
        slotsSold: [
          "||||",
          "x|x|x|x|x",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "3|2|2|2|2",
          "x|x|x|x|x",
          "3|2|2|3|2",
          "3|3|3|3|2",
          "3|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "8|6|4|6|6",
          "||||",
          "19|19|18|16|9"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "||||",
          "||||",
          "||10||",
          "||||",
          "||||",
          "13|12|9|8|5"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "x|x|x|x|x",
          "||||",
          "x|x|x|x|x",
          "||||",
          "||||"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "1|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yoda Yuuki",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Endo Sakura",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kaki Haruka",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "2|2|3|3|3",
          "4|3|3|3|3",
          "2|2|2|2|3",
          "2|2|2|3|3",
          "3|3|2|3|3",
          "2|2|3|2|3"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "8|8|7|8|8",
          "||||",
          "3|3|2|3|3",
          "||||",
          "||||",
          "11|9|7|6|5"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "?|?|?|?|?",
          "?|?|?|?|?"
        ]
      },
      {
        member: "Kuromi Haruka",
        slotsSold: [
          "||||",
          "x|x|||",
          "x|x|x|x|x",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Rika",
        slotsSold: [
          "||||",
          "||||",
          "|9|7|11|11",
          "||||",
          "||15||",
          "8|7|6|7|4"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "5|4|4|4|5",
          "8|8|8|8|9",
          "5|4|3|4|4",
          "9|9|9|9|8",
          "9|8|8|7|8",
          "4|4|3|3|3"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "3|3|3|2|3",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "3|3|3|3|3",
          "3|2|3|3|3",
          "x|x|x|2|2"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "2|2|2|2|2",
          "3|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|3",
          "3|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Tsujii Ayame",
        slotsSold: [
          "3|3|3|3|3",
          "4|4|4|4|3",
          "2|2|2|2|3",
          "4|4|3|3|4",
          "2|3|3|3|3",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Hayashi Runa",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "x|x|x|x|x",
          "||||",
          "||||19"
        ]
      },
      {
        member: "Matsuo Miyu",
        slotsSold: [
          "x|x|||",
          "||||",
          "x|x|||",
          "||||",
          "||||",
          "11|7|5|5|4"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yumiki Nao",
        slotsSold: [
          "|||6|",
          "||10||10",
          "10|9|7|8|9",
          "||||",
          "|16|16||",
          "10|8|7|6|5"
        ]
      }
    ]
  },
  {
    cd: {
      num: 1,
      type: "Best"
    },
    lastDraw: 14,
    meetDates: [
      "2022-01-15",
      "2022-02-05",
      "2022-03-11"
    ],
    sbt: [
      "Higuchi Hina",
      "Shinuchi Mai",
      "Suzuki Ayane",
      "Iwamoto Renka",
      "Umezawa Minami",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Kakehashi Sayaka",
      "Seimiya Rei",
      "Tamura Mayu",
      "Tsujii Ayame",
      "Hayakawa Seira"
    ],
    table: [
      {
        member: "Higuchi Hina",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "7|7|8|8|8",
          "x|x|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "x|x|x|x|x",
          "||||",
          "||||14"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "||||x",
          "||||x",
          "||||x"
        ]
      },
      {
        member: "Ito Riria",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "||||8",
          "6|6|6|7|5",
          "||13|11|9"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "3|2|3|3|3",
          "4|4|3|3|4",
          "4|4|3|3|3"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "2|2|2|2|3",
          "3|3|3|3|3",
          "3|3|3|3|3"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "x|x|x|x|x",
          "||||",
          "||||"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||||",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Yoda Yuuki",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Endo Sakura",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|3|3|2",
          "3|2|3|2|2"
        ]
      },
      {
        member: "Kaki Haruka",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "8||8||",
          "||11||",
          "||||"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "x|x|x|x|x",
          "?|?|?|?|?",
          "||||"
        ]
      },
      {
        member: "Kuromi Haruka",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Rika",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "||||",
          "||||",
          "12|11|8|10|6"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "4|4|3|4|3",
          "8|7|6|8|9",
          "11|11|5|11|10"
        ]
      },
      {
        member: "Tsujii Ayame",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "3|3|4|3|3",
          "3|3|4|3|3",
          "3|4|4|4|3"
        ]
      },
      {
        member: "Hayashi Runa",
        slotsSold: [
          "?|?|?|?|?",
          "||||",
          "||||"
        ]
      },
      {
        member: "Matsuo Miyu",
        slotsSold: [
          "?|?|?|?|?",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yumiki Nao",
        slotsSold: [
          "||||",
          "|||11|",
          "||||"
        ]
      }
    ]
  },
  {
    cd: {
      num: 29,
      type: "Single"
    },
    lastDraw: 20,
    meetDates: [
      "2022-04-16",
      "2022-04-29",
      "2022-05-21",
      "2022-06-04",
      "2022-07-02",
      "2022-07-16"
    ],
    sbt: [
      "Higuchi Hina",
      "Suzuki Ayane",
      "Iwamoto Renka",
      "Umezawa Minami",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Kakehashi Sayaka",
      "Shibata Yuna",
      "Seimiya Rei",
      "Tamura Mayu",
      "Tsujii Ayame",
      "Hayakawa Seira"
    ],
    addgroups: [
      {
        id: "gen5",
        has: [
          "Ioki Mao",
          "Ikeda Teresa",
          "Ichinose Miku",
          "Inoue Nagi",
          "Ogawa Aya",
          "Okuda Iroha",
          "Sugawara Satsuki",
          "Tomisato Nao"
        ]
      },
      {
        id: "grad",
        has: [
          "Kitano Hinako"
        ]
      }
    ],
    table: [
      {
        member: "Higuchi Hina",
        slotsSold: [
          "3|3|3|4|4",
          "||||",
          "||||",
          "||||",
          "||||",
          "20||||16"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Kitano Hinako",
        slotsSold: [
          "3|3|3|3|3",
          "3|3|3|3|3",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "4|4|4|5|5",
          "9|9|8|9|7",
          "11|12|9|11|10",
          "14|14|12|14|12",
          "17|17|16|16|16",
          "16|17|15|14|4"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "||||x",
          "||||x",
          "7|8|6|4|x",
          "||||x",
          "||18|18|x",
          "18|18|18|11|x"
        ]
      },
      {
        member: "Ito Riria",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "3|3|2|3|3",
          "9|8|6|8|6",
          "7|5|5|7|6",
          "10|8|6|8|6",
          "10|8|7|7|7",
          "10|9|4|6|4"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "2|2|2|2|3",
          "2|3|2|3|3",
          "2|2|2|2|3",
          "2|2|2|3|3",
          "2|2|3|3|3",
          "3|2|3|3|3"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "2|2|2|2|2",
          "3|2|3|3|3",
          "2|2|2|2|2",
          "2|2|2|3|3",
          "3|2|3|3|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "6|4|3|7|8",
          "||||",
          "||12||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "8|8|6|8|8",
          "||||",
          "|12|8|10|12",
          "||14||",
          "||18||",
          "||||20"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "2|1|1|2|1",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|1|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yoda Yuuki",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "1|2|2|1|2",
          "2|2|x|x|x"
        ]
      },
      {
        member: "Endo Sakura",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kaki Haruka",
        slotsSold: [
          "1|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "3|3|3|3|4",
          "7|5|5|7|7",
          "5|4|3|4|6",
          "7|4|4|5|7",
          "9|5|3|7|6",
          "7|6|4|4|5"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "8|8|7|8|8",
          "||||",
          "|12|12||12",
          "||14|14|",
          "||17|18|17",
          "19|18|17|17|15"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "||||",
          "||||",
          "?|?|?|?|?",
          "||||",
          "?|?|?|?|?",
          "?|?|?|?|?"
        ]
      },
      {
        member: "Kuromi Haruka",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||14|18|",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Sato Rika",
        slotsSold: [
          "6|7|6|7|7",
          "||10||",
          "||10||",
          "||||",
          "||||",
          "20|20|19|19|14"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "3|3|3|3|3",
          "5|4|4|4|4",
          "4|4|3|4|5",
          "5|5|4|5|5",
          "5|5|5|5|5",
          "4|5|4|4|3"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "x|x|3|5|4",
          "||||",
          "11|8|9|9|10",
          "||13|14|13",
          "17|17|15|15|12",
          "14|14|10|12|6"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "3|3|2|3|3",
          "3|3|3|3|3",
          "3|3|3|3|3",
          "3|3|3|3|3",
          "3|3|3|3|3",
          "3|3|3|3|3"
        ]
      },
      {
        member: "Tsujii Ayame",
        slotsSold: [
          "3|3|3|4|5",
          "||||",
          "6|4|4|5|6",
          "3|3|3|3|3",
          "7|7|5|6|7",
          "7|6|5|6|6"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|2",
          "x|x|x|x|x",
          "3|2|2|2|2",
          "3|3|2|2|3"
        ]
      },
      {
        member: "Hayashi Runa",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||17",
          "||||20"
        ]
      },
      {
        member: "Matsuo Miyu",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yumiki Nao",
        slotsSold: [
          "5|5|5|5|5",
          "||10||10",
          "12|11|11|11|9",
          "14||14|14|14",
          "16|16|16|15|15",
          "15|15|14|14|12"
        ]
      },
      {
        member: "Ioki Mao",
        slotsSold: [
          "x|6|6|7|x",
          "x|7|7|7|x",
          "x|6|7|7|x",
          "x|6|7|7|x",
          "x|7|8|8|x",
          "x|7|7|7|x"
        ]
      },
      {
        member: "Ikeda Teresa",
        slotsSold: [
          "x||||x",
          "x||||x",
          "x||||x",
          "x|13|13|13|x",
          "x|13|14|14|x",
          "x|13|14|14|x"
        ]
      },
      {
        member: "Ichinose Miku",
        slotsSold: [
          "x|6|6|7|x",
          "x|7|7|7|x",
          "x|7|7|7|x",
          "x|7|7|7|x",
          "x|7|7|7|x",
          "x|7|7|7|x"
        ]
      },
      {
        member: "Inoue Nagi",
        slotsSold: [
          "x|6|6|6|x",
          "x|6|6|7|x",
          "x|7|6|7|x",
          "x|6|6|6|x",
          "x|7|7|7|x",
          "x|7|7|7|x"
        ]
      },
      {
        member: "Ogawa Aya",
        slotsSold: [
          "x|7|7|7|x",
          "x|8|8|8|x",
          "x|8|8|8|x",
          "x|7|9|8|x",
          "x|8|9|9|x",
          "x|8|9|8|x"
        ]
      },
      {
        member: "Okuda Iroha",
        slotsSold: [
          "x||||x",
          "x||||x",
          "x||||x",
          "x||||x",
          "x||||x",
          "x||||x"
        ]
      },
      {
        member: "Sugawara Satsuki",
        slotsSold: [
          "x|6|6|6|x",
          "x|6|6|6|x",
          "x|7|6|6|x",
          "x|6|6|6|x",
          "x|6|6|6|x",
          "x|6|6|6|x"
        ]
      },
      {
        member: "Tomisato Nao",
        slotsSold: [
          "x|6|7|8|x",
          "x|8|9|8|x",
          "x|8|8|8|x",
          "x|8|10|9|x",
          "x|10|9|10|x",
          "x|10|9|9|x"
        ]
      }
    ]
  },
  {
    cd: {
      num: 30,
      type: "Single"
    },
    lastDraw: 2,
    meetDates: [
      "2022-09-03",
      "2022-09-17",
      "2022-09-24",
      "2022-10-08",
      "2022-11-12",
      "2022-12-03"
    ],
    sbt: [
      "Iwamoto Renka",
      "Umezawa Minami",
      "Kubo Shiori",
      "Sato Kaede",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Kakehashi Sayaka",
      "Kanagawa Saya",
      "Shibata Yuna",
      "Seimiya Rei",
      "Tamura Mayu",
      "Tsujii Ayame",
      "Yumiki Nao"
    ],
    addgroups: [
      {
        id: "gen5",
        has: [
          "Ioki Mao",
          "Ikeda Teresa",
          "Ichinose Miku",
          "Inoue Nagi",
          "Okamoto Hina",
          "Ogawa Aya",
          "Okuda Iroha",
          "Kawasaki Sakura",
          "Sugawara Satsuki",
          "Tomisato Nao",
          "Nakanishi Aruno"
        ]
      }
    ],
    table: [
      {
        member: "Wada Maaya",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||2"
        ]
      },
      {
        member: "Ito Riria",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||2"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "x|x|x|x|x",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "2||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "2|1|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "2|2|1|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yoda Yuuki",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|1|2|2|2",
          "x|x|1|1|x"
        ]
      },
      {
        member: "Endo Sakura",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kaki Haruka",
        slotsSold: [
          "2|1|2|2|2",
          "2|2|2|2|2",
          "1|1|1|2|2",
          "2|1|2|1|2",
          "2|2|1|1|2",
          "1|2|2|2|2"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "2|2|2||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||2"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "2|2|2|2|2",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||2"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Kuromi Haruka",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Rika",
        slotsSold: [
          "||||",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "|2|2|2|",
          "||||",
          "||||",
          "||||",
          "||||",
          "||2|2|2"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "2|2|2|2|",
          "||2||",
          "||||",
          "2||2|2|",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Tsujii Ayame",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Hayashi Runa",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Matsuo Miyu",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yumiki Nao",
        slotsSold: [
          "2|2|2|2|2",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||2"
        ]
      },
      {
        member: "Ioki Mao",
        slotsSold: [
          "x|2|2|2|",
          "x||||",
          "x||||",
          "x||||",
          "x|2|||",
          "x|2|2|2|"
        ]
      },
      {
        member: "Ikeda Teresa",
        slotsSold: [
          "x|2|2|2|2",
          "x||2||",
          "x||||",
          "x||||",
          "x||||",
          "x|2|||"
        ]
      },
      {
        member: "Ichinose Miku",
        slotsSold: [
          "x|2|2|2|",
          "x||||",
          "x|2|||",
          "x|2|||",
          "x|2|||",
          "x|2|||"
        ]
      },
      {
        member: "Inoue Nagi",
        slotsSold: [
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2"
        ]
      },
      {
        member: "Okamoto Hina",
        slotsSold: [
          "x||||",
          "x||||",
          "x||||",
          "x||||",
          "x||||",
          "x||||"
        ]
      },
      {
        member: "Ogawa Aya",
        slotsSold: [
          "x||||",
          "x||||",
          "x||||",
          "x||||",
          "x||||",
          "x||||"
        ]
      },
      {
        member: "Okuda Iroha",
        slotsSold: [
          "x||||",
          "x||||",
          "x||||",
          "x||||",
          "x||||",
          "x||||"
        ]
      },
      {
        member: "Kawasaki Sakura",
        slotsSold: [
          "x|2|2|2|2",
          "x|2|2|2|",
          "x||||",
          "x|2|2||",
          "x|2|2||",
          "x|2|2||"
        ]
      },
      {
        member: "Sugawara Satsuki",
        slotsSold: [
          "x|2|2|2|2",
          "x|2|2||",
          "x|2|2||",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2"
        ]
      },
      {
        member: "Tomisato Nao",
        slotsSold: [
          "x|2|2|2|",
          "x|2|2|2|2",
          "x||||",
          "x|2|||",
          "x||||",
          "x||2||"
        ]
      },
      {
        member: "Nakanishi Aruno",
        slotsSold: [
          "x|2|2||",
          "x||||",
          "x||||",
          "x||||",
          "x||||",
          "x||||"
        ]
      }
    ]
  }
];
const members = [
  {
    member: "Akimoto Manatsu",
    kanji: "\u79CB\u5143 \u771F\u590F",
    furi: "\u3042\u304D\u3082\u3068 \u307E\u306A\u3064",
    gen: 1,
    dob: "1993-08-20",
    from: "\u57FC\u7389",
    bloodtype: "B",
    height: 154,
    status: "senbatsu"
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
    status: "senbatsu"
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
    member: "Higuchi Hina",
    kanji: "\u6A0B\u53E3 \u65E5\u5948",
    furi: "\u3055\u3044\u3068\u3046  \u3042\u3059\u304B",
    gen: 1,
    dob: "1998-01-31",
    from: "\u6771\u4EAC",
    bloodtype: "A",
    height: 161,
    status: "senbatsu"
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
    status: "under"
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
    kanji: "\u5BFA\u7530\u862D\u4E16",
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
    status: "senbatsu"
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
    member: "Ito Riria",
    kanji: "\u4F0A\u85E4 \u7406\u3005\u674F",
    furi: "\u3044\u3068\u3046 \u308A\u308A\u3042",
    gen: 3,
    dob: "2002-10-08",
    from: "\u6C96\u7E04",
    bloodtype: "B",
    height: 154,
    status: "under"
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
    status: "senbatsu"
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
    status: "senbatsu"
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
    status: "senbatsu"
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
    status: "under"
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
    status: "senbatsu"
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
    status: "under"
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
    status: "under"
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
    status: "senbatsu"
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
    status: "under"
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
    status: "senbatsu"
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
    status: "senbatsu"
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
    status: "senbatsu"
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
    status: "senbatsu"
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
    status: "senbatsu"
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
    status: "under"
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
    status: "under"
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
    status: "under"
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
    status: "senbatsu"
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
    status: "senbatsu"
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
    status: "senbatsu"
  },
  {
    member: "Tsujii Ayame",
    kanji: "\u7B52\u4E95 \u3042\u3084\u3081",
    furi: "\u3064\u3064\u3044 \u3042\u3084\u3081",
    gen: 4,
    dob: "2004-06-08",
    from: "\u611B\u77E5",
    bloodtype: "O",
    height: 160,
    status: "senbatsu"
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
    status: "under"
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
    status: "under"
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
    status: "under"
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
    status: "senbatsu"
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
function expandMBData(mb, groups, compare = null) {
  let res = { member: mb.member, slotsSoldex: [], numSold: [0, 0], group: "" };
  res.slotsSoldex = mb.slotsSold.map((x) => x.split("|"));
  let f = res.slotsSoldex.flat();
  res.numSold = [
    f.filter((x) => x.match(/^\d+$/) ? parseInt(x) > 0 : false).length,
    f.filter((x) => x != "x" && x != "?").length
  ];
  res.group = groups == "" ? "" : determineGroup(mb, groups);
  if (compare) {
    console.log("compare called: ", compare);
    let [n, total] = getNumSold(res.member, compare.cdData, compare.atdraw);
    let d = n !== "N/A" ? `${res.numSold[0] - n > 0 ? "+" : ""}${res.numSold[0] - n}` : "";
    let lastTimeSoldout = total == n, currentSoldout = res.numSold[0] == res.numSold[1];
    res["compare"] = {
      lasttime: n,
      current: res.numSold[0],
      diff: lastTimeSoldout ? currentSoldout ? `\u5B8C\u58F2` : d : d
    };
  }
  return res;
}
function expandDataList(cdData2, compare = null) {
  let groups = concat(
    [
      { id: "sbt", has: cdData2.sbt },
      { id: "und", has: getUnderList(cdData2) }
    ],
    cdData2.addgroups ? cdData2.addgroups : []
  );
  return cdData2.table.map((x) => expandMBData(x, groups, compare));
}
function getNumSold(mb, cdData2, atdraw) {
  let data2 = find(cdData2.table, ["member", mb]);
  if (!data2)
    return ["N/A", "N/A"];
  let expanded = data2.slotsSold.map((x) => x.split("|")).flat();
  return [
    expanded.filter((x) => x.match(/^\d+$/) ? parseInt(x) <= atdraw : false).length,
    expanded.filter((x) => x != "x" && x != "?").length
  ];
}
function nth(n) {
  return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th";
}
function cdData(cd) {
  let value = `${cd.num}${cd.type}`;
  let type;
  switch (cd.type) {
    case "Best":
      type = "Best Album";
      break;
    default:
      type = cd.type;
      break;
  }
  let display = `${cd.num}${nth(cd.num)} ${type}`;
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
function getMember(name) {
  let res = members.filter((x) => x.member == name);
  return res.length == 0 ? { memebr: name, kanji: name, furi: name, gen: 0, dob: "1900-01-01", from: "", status: "none" } : res[0];
}
function getMembers(listOfNames) {
  return listOfNames.map((x) => getMember(x));
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
      return "\u5352\u696D\u30BD\u30ED";
    default:
      if (id.match(/^(gen)\d+$/))
        return `${id.slice(3)}\u671F\u751F`;
      return `?`;
  }
};
const ordering = {
  gen: (a, b) => a - b,
  group: (a, b) => {
    let o = ["grad", "sbt", "und", ...[...Array(5).keys()].map((x) => `gen${x + 1}`)];
    return o.indexOf(a) - o.indexOf(b);
  },
  "dob-year": (a, b) => a - b,
  soldstatus: (a, b) => a ? -1 : b ? 1 : 0
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
  console.log("Sorting by ", opt);
  return "has" in datalist[0] ? datalist.map((x) => {
    return { label: x.label, value: x.value, has: sortPlainList(x.has, opt) };
  }) : sortPlainList(datalist, opt);
}
function sortPlainList(mbdatalist, opt = "kana") {
  switch (opt) {
    case "numsold":
      let t = isExpandedDatalist(mbdatalist) ? mbdatalist : mbdatalist.map((x) => expandMBData(x, ""));
      return t.sort((a, b) => {
        let soldout = [a, b].map((x) => x.numSold[0] == x.numSold[1]);
        console.log(`${a.member}: soldout=${soldout[0]}`);
        if (soldout[0])
          return soldout[1] ? b.numSold[0] - a.numSold[0] : -1;
        else
          return soldout[1] ? 1 : b.numSold[0] - a.numSold[0];
      });
    case "kana":
      return mbdatalist.sort((a, b) => {
        let [aa, bb] = getMembers([a.member, b.member]);
        return aa.furi.localeCompare(bb.furi, "ja");
      });
    default:
      return mbdatalist;
  }
}
const DataRow_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: `.soldFraction.svelte-17t34yj{display:inline;float:right;color:#777}.memberName.svelte-17t34yj{width:240px;max-width:300px;padding-left:.4em;padding-right:.2em;border-right:1px solid black;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.NAslot.svelte-17t34yj{width:26px;height:1.8ch;padding:0;box-sizing:border-box;border:1px solid #ddd;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>");background-repeat:no-repeat;background-position:center center;background-size:100% 1.75ch}.slot.svelte-17t34yj{width:26px;height:1.8ch;padding:0;overflow:clip;box-sizing:border-box;border:1px solid #ddd;text-align:center}.lastDrawSlot.svelte-17t34yj{background-color:yellow}.lastlastDrawSlot.svelte-17t34yj{background-color:hsl(86, 80%, 50%)}.lastcell.svelte-17t34yj{border-right:1px solid black !important}.topRow.svelte-17t34yj{border-top:1px solid black !important}.bottomRow.svelte-17t34yj{border-bottom:1px solid black !important}.compareCell.svelte-17t34yj{border:1px solid #ddd}.compareGrid.svelte-17t34yj{width:125px;min-height:100%;height:100%;margin:0;display:grid;gap:0;grid-template-columns:35px 12px 30px 48px;grid-template-rows:100%;justify-items:center;align-items:stretch;align-content:stretch}.plusCell.svelte-17t34yj{color:hsl(120, 100%, 40%)}.minusCell.svelte-17t34yj{color:red}`,
  map: null
};
const DataRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mbInfo;
  let decoratedTbl;
  let classesOnMbCell;
  let compareCellClasses;
  let { row } = $$props;
  let { lastDraw } = $$props;
  let { addClasses = "" } = $$props;
  let { compare = null } = $$props;
  const decoratedItem = (c) => {
    if (c == "x")
      return { content: "", classes: "NAslot" };
    if (lastDraw == parseInt(c))
      return { content: c, classes: "slot lastDrawSlot" };
    if (lastDraw - 1 > 0 && lastDraw - 1 == parseInt(c))
      return {
        content: c,
        classes: "slot lastlastDrawSlot"
      };
    return { content: c, classes: "slot" };
  };
  if ($$props.row === void 0 && $$bindings.row && row !== void 0)
    $$bindings.row(row);
  if ($$props.lastDraw === void 0 && $$bindings.lastDraw && lastDraw !== void 0)
    $$bindings.lastDraw(lastDraw);
  if ($$props.addClasses === void 0 && $$bindings.addClasses && addClasses !== void 0)
    $$bindings.addClasses(addClasses);
  if ($$props.compare === void 0 && $$bindings.compare && compare !== void 0)
    $$bindings.compare(compare);
  $$result.css.add(css$3);
  mbInfo = getMember(row.member);
  decoratedTbl = row.slotsSoldex.map((dayslots) => {
    let res = [];
    for (let s of dayslots) {
      let itm = decoratedItem(s);
      itm.classes += ` ${addClasses}`;
      res.push(itm);
    }
    return res;
  });
  classesOnMbCell = `memberName ${addClasses}`;
  compareCellClasses = `compareCell lastcell ${addClasses}`;
  return `<td class="${escape(null_to_empty(classesOnMbCell), true) + " svelte-17t34yj"}">${escape(mbInfo.kanji)}
    <div class="${"soldFraction svelte-17t34yj"}">${escape(row.numSold[0])}/${escape(row.numSold[1])}</div></td>


${each(decoratedTbl, (daySlots) => {
    return `${each(daySlots, (slot, i) => {
      return `   
    <td class="${[
        escape(null_to_empty(slot.classes), true) + " svelte-17t34yj",
        i == daySlots.length - 1 ? "lastcell" : ""
      ].join(" ").trim()}">${escape(slot.content)}</td>`;
    })}`;
  })}
${compare ? `<td class="${escape(null_to_empty(compareCellClasses), true) + " svelte-17t34yj"}"><div class="${"compareGrid svelte-17t34yj"}"><div>${escape(row.compare.lasttime)}</div>
            <div>\u2192</div>
            <div>${escape(row.compare.current)}</div>
            <div class="${[
    "svelte-17t34yj",
    (row.compare.diff[0] === "+" ? "plusCell" : "") + " " + (row.compare.diff[0] === "-" ? "minusCell" : "")
  ].join(" ").trim()}">${row.compare.diff == `\u5B8C\u58F2` ? `[\u5B8C\u58F2]` : `${row.compare.diff != 0 ? `<span class="${"color:black"}">[ </span>
                    ${escape(row.compare.diff)}
                    <span class="${"color:black"}">]</span>` : ``}`}</div></div></td>` : ``}`;
});
const RowGroups_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".tagCell.svelte-179mrzs{font-size:small;width:25px;border:1px solid black;padding-left:2px;padding-right:2px;text-align:center;background-color:white;overflow:clip;box-sizing:border-box}.tagCellHover{background-color:hsl(291, 37%, 85%) !important;outline:1px solid red}tr.svelte-179mrzs{line-height:1.8ch}tr.svelte-179mrzs:hover{background-color:#ddd}",
  map: null
};
const RowGroups = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { group } = $$props;
  let { lastDraw } = $$props;
  let { compare = null } = $$props;
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.lastDraw === void 0 && $$bindings.lastDraw && lastDraw !== void 0)
    $$bindings.lastDraw(lastDraw);
  if ($$props.compare === void 0 && $$bindings.compare && compare !== void 0)
    $$bindings.compare(compare);
  $$result.css.add(css$2);
  return `<tr class="${"taggedRow svelte-179mrzs"}"><td${add_attribute("rowspan", group.has.length, 0)} class="${"tagCell svelte-179mrzs"}">${escape(group.label)}</td>
	${validate_component(DataRow, "DataRow").$$render(
    $$result,
    {
      row: group.has[0],
      lastDraw,
      addClasses: group.has.length == 1 ? "topRow bottomRow" : "topRow",
      compare
    },
    {},
    {}
  )}</tr>
${each(group.has.slice(1, -1), (row) => {
    return `<tr class="${"normalRow svelte-179mrzs"}">${validate_component(DataRow, "DataRow").$$render($$result, { row, lastDraw, compare }, {}, {})}
	</tr>`;
  })}
${group.has.length > 1 ? `<tr class="${"svelte-179mrzs"}">${validate_component(DataRow, "DataRow").$$render(
    $$result,
    {
      row: group.has[group.has.length - 1],
      lastDraw,
      addClasses: "bottomRow",
      compare
    },
    {},
    {}
  )}</tr>` : ``}`;
});
const SlotTable_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".table-bordered.svelte-1hzf9ls.svelte-1hzf9ls{margin:0 auto;table-layout:fixed;border:1px solid #ddd !important;border-spacing:0!important;border-collapse:collapse}table.svelte-1hzf9ls caption.svelte-1hzf9ls{font-size:large;font-weight:bold;padding:.5em 0}th.svelte-1hzf9ls.svelte-1hzf9ls{font-size:large;font-weight:bold;border:1px solid black;border-bottom:2px solid black;padding:0}@media screen and (max-width: 767px){table.svelte-1hzf9ls caption.svelte-1hzf9ls{display:none}}.soldFraction.svelte-1hzf9ls.svelte-1hzf9ls{display:inline;float:right;margin-right:3px;font-size:small;font-weight:normal;color:#777}",
  map: null
};
const SlotTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let expandedData;
  let finalTb;
  let lastDraw;
  let totalSold;
  let { data: data2 } = $$props;
  let { filterOpt } = $$props;
  let { groupOpt } = $$props;
  let { sortOpt } = $$props;
  let { compare = null } = $$props;
  function filterList(list, option = filterOpt) {
    switch (option) {
      case "showall":
        return list;
      case "hasunsold":
        return list.filter((x) => x.numSold[0] < x.numSold[1]);
      case "hassoldout":
        return list.filter((x) => x.numSold[0] > 0);
      case "hassoldoutnonfull":
        return list.filter((x) => x.numSold[0] > 0 && x.numSold[0] < x.numSold[1]);
      case "selectmb":
        return list;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data2 !== void 0)
    $$bindings.data(data2);
  if ($$props.filterOpt === void 0 && $$bindings.filterOpt && filterOpt !== void 0)
    $$bindings.filterOpt(filterOpt);
  if ($$props.groupOpt === void 0 && $$bindings.groupOpt && groupOpt !== void 0)
    $$bindings.groupOpt(groupOpt);
  if ($$props.sortOpt === void 0 && $$bindings.sortOpt && sortOpt !== void 0)
    $$bindings.sortOpt(sortOpt);
  if ($$props.compare === void 0 && $$bindings.compare && compare !== void 0)
    $$bindings.compare(compare);
  $$result.css.add(css$1);
  title = cdData(data2.cd).display;
  expandedData = expandDataList(data2, compare);
  finalTb = sortList(partitionToGroup(filterList(expandedData, filterOpt), groupOpt), sortOpt);
  lastDraw = data2.lastDraw;
  totalSold = expandedData.reduce((prev, curr) => {
    return {
      numSold: [prev.numSold[0] + curr.numSold[0], prev.numSold[1] + curr.numSold[1]]
    };
  }).numSold;
  return `

<table class="${"table-bordered svelte-1hzf9ls"}"><caption class="${"text-center svelte-1hzf9ls"}">${escape(title)} (\u6700\u5F8C\u66F4\u65B0\uFF1A${escape(lastDraw)}\u6B21\u53D7\u4ED8)</caption>
  <thead><tr>
      <th class="${"svelte-1hzf9ls"}"></th>
      <th class="${"svelte-1hzf9ls"}"><div class="${"soldFraction svelte-1hzf9ls"}">${escape(totalSold[0])}/${escape(totalSold[1])}</div></th>
      ${each(data2.meetDates, (date) => {
    return `<th colspan="${"5"}" class="${"svelte-1hzf9ls"}">${escape(date)}</th>`;
  })}
      ${compare ? `<th class="${"svelte-1hzf9ls"}">\u904E\u53BB\u3068\u306E\u5DEE</th>` : ``}</tr></thead>
  <tbody>${groupOpt == "none" ? `${each(data2.table, (row) => {
    return `<tr>${validate_component(DataRow, "DataRow").$$render($$result, { row, lastDraw, compare }, {}, {})}</tr>`;
  })}` : `${each(finalTb, (rowGp) => {
    return `${validate_component(RowGroups, "RowGroups").$$render($$result, { group: rowGp, lastDraw, compare }, {}, {})}`;
  })}`}</tbody></table>

`;
});
const index_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{font-family:Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,\n		Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;--font-mono:'Fira Mono', monospace;--pure-white:#ffffff;--primary-color:#b9c6d2;--secondary-color:#d0dde9;--tertiary-color:#edf0f8;--accent-color:#444444;--heading-color:rgba(0, 0, 0, 0.7);--text-color:#444444;--background-without-opacity:rgba(255, 255, 255, 0.7);--column-width:42rem;--column-margin-top:4rem}a.svelte-7851f5{color:var(--accent-color);text-decoration:none}a.svelte-7851f5:hover{text-decoration:underline}input.svelte-7851f5,button.svelte-7851f5{font-size:inherit;font-family:inherit}button.svelte-7851f5:focus:not(:focus-visible){outline:none}.optionForm.svelte-7851f5{width:60%;margin:0 auto;line-height:3.5ch;padding:5px 10px;border:1px solid black}.inactive.svelte-7851f5{display:none}footer.svelte-7851f5{width:20%;margin:20px auto;display:block;justify-content:center;align-items:center;padding:40px;color:hsl(0, 0%, 65%)}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedCDdata;
  let selectableDraw;
  let compare;
  let cdlist = data.map((x) => cdData(x.cd));
  let selected = cdlist.length - 1;
  let filterMethod = [
    { "display": "\u5168\u30E1\u30F3\u30D0\u30FC", "value": "showall" },
    {
      "display": "\u672A\u5B8C\u58F2\u90E8\u6570\u3042\u308A",
      "value": "hasunsold"
    },
    {
      "display": "\u4E00\u90E8\u4EE5\u4E0A\u5B8C\u58F2",
      "value": "hassoldout"
    },
    {
      "display": "\u4E00\u90E8\u4EE5\u4E0A\u5B8C\u58F2\u3001\u5168\u5B8C\u58F2\u306A\u3057",
      "value": "hassoldoutnonfull"
    }
  ];
  let filterOpt = "showall";
  let groupMethod = [
    { "display": "\u671F\u5225\u5206\u3051", "value": "gen" },
    { "display": "\u9078\u629C\u30FB\u30A2\u30F3\u30C0\u30FC\u30FB\u4ED6", "value": "group" },
    { "display": "\u8A95\u751F\u5E74\u5225", "value": "dob-year" },
    {
      "display": "\u5B8C\u58F2\u30FB\u672A\u5B8C\u58F2",
      "value": "soldstatus"
    }
  ];
  let groupOpt = "gen";
  let sortMethod = [
    { "display": "\u540D\u524D\uFF08\u4E94\u5341\u97F3\uFF09\u9806", "value": "kana" },
    { "display": "\u5B8C\u58F2\u6570\u9806", "value": "numsold" }
  ];
  let sortOpt = "kana";
  let compareCD = false;
  let selected2 = -1;
  function getCompare() {
    return null;
  }
  function isSelectedGood(s) {
    return s < 0 ? false : s >= cdlist.length ? false : true;
  }
  $$result.css.add(css);
  selectedCDdata = data[selected];
  selectableDraw = isSelectedGood(selected2) ? min([data[selected2].lastDraw, selectedCDdata.lastDraw]) : 0;
  compare = getCompare();
  {
    {
      compare = null;
    }
  }
  return `${$$result.head += `${$$result.title = `<title>\u5B8C\u58F2\u8868DB</title>`, ""}<meta name="${"description"}" content="${"Svelte demo app"}" data-svelte="svelte-xhkfe6">`, ""}

<div class="${"optionForm svelte-7851f5"}"><label for="${"cdSelect"}">CD:</label>
    <select id="${"cdSelect"}" name="${"cd"}" style="${"margin-left: 15px; margin-right: 15px"}">${each(cdlist, (cd, i) => {
    return `<option${add_attribute("value", i, 0)}>${escape(cd.display)}</option>`;
  })}</select>
    
    
    <div id="${"filterOptDiv"}">Filter:
        ${each(filterMethod, (filt) => {
    return `<label><input type="${"radio"}" name="${"filterOpt"}"${add_attribute("id", filt.value, 0)}${add_attribute("value", filt.value, 0)} class="${"svelte-7851f5"}"${filt.value === filterOpt ? add_attribute("checked", true, 1) : ""}>
            ${escape(filt.display)}
        </label>`;
  })}
        </div>

    <div id="${"groupDiv"}">Group:
        ${each(groupMethod, (grp) => {
    return `<label><input type="${"radio"}" name="${"groupOpt"}"${add_attribute("id", grp.value, 0)}${add_attribute("value", grp.value, 0)} class="${"svelte-7851f5"}"${grp.value === groupOpt ? add_attribute("checked", true, 1) : ""}>
            ${escape(grp.display)}
        </label>`;
  })}</div>

    <div id="${"sortDiv"}">Sort: 
        ${each(sortMethod, (sort) => {
    return `<label><input type="${"radio"}" name="${"sortOpt"}"${add_attribute("id", sort.value, 0)}${add_attribute("value", sort.value, 0)} class="${"svelte-7851f5"}"${sort.value === sortOpt ? add_attribute("checked", true, 1) : ""}>
            ${escape(sort.display)}
        </label>`;
  })}		
        </div></div>
<div class="${"optionForm svelte-7851f5"}"><label><input type="${"checkbox"}" name="${"compareCD"}" id="${"compareCD"}" class="${"svelte-7851f5"}"${add_attribute("checked", compareCD, 1)}>
        \u904E\u53BB\u306E\u58F2\u308A\u4E0A\u3052\u3068\u306E\u5DEE
    </label>
    <span class="${["svelte-7851f5", "inactive"].join(" ").trim()}"><label for="${"cd2Select"}">\u2192 \u5BFE\u8C61CD:</label>
        <select id="${"cd2Select"}" name="${"cd2"}" style="${"margin-left: 5px; margin-right: 5px"}">${each(cdlist, (cd, i) => {
    return `${i != selected ? `<option${add_attribute("value", i, 0)}>${escape(cd.display)}</option>` : ``}`;
  })}</select>
        ${isSelectedGood(selected2) ? `<select id="${"drawSelect"}" name="${"drawSelect"}" style="${"margin-left: 2px; margin-right: 2px"}">${each([...Array(selectableDraw).keys()], (i) => {
    return `<option${add_attribute("value", i + 1, 0)}>${escape(i + 1)}</option>`;
  })}</select><label for="${"drawSelect"}">\u6B21\u53D7\u4ED8</label>` : ``}
        ${``}</span></div>

${validate_component(SlotTable, "SlotTable").$$render(
    $$result,
    {
      data: selectedCDdata,
      filterOpt,
      groupOpt,
      sortOpt,
      compare
    },
    {},
    {}
  )}

<footer class="${"svelte-7851f5"}">Author: <a href="${"https://github.com/universallyleo"}" class="${"svelte-7851f5"}">universallyleo</a>.  Soruce: <a href="${"https://github.com/universallyleo/ngzkMeetData"}" class="${"svelte-7851f5"}">Github</a>	
</footer>`;
});
export {
  Routes as default
};
