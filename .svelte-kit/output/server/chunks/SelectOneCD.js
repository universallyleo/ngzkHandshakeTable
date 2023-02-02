import { c as create_ssr_component, f as each, h as add_attribute, e as escape } from "./index.js";
import { range, concat, pullAll, without, differenceWith, isEqual, findIndex, zip } from "lodash-es";
const data = [
  {
    cd: {
      num: 17,
      type: "Single",
      title: "インフルエンサー",
      release: "2017-03-22"
    },
    lastDraw: 14,
    meetDates: [
      "2017-04-09",
      "2017-04-23",
      "2017-04-29",
      "2017-05-07",
      "2017-05-14",
      "2017-05-28",
      "2017-06-11",
      "2017-06-17"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Ikuta Erika",
      "Ikoma Rina",
      "Itou Marika",
      "Inoue Sayuri",
      "Etou Misa",
      "Saito Asuka",
      "Saitou Yuuri",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Higuchi Hina",
      "Hoshino Minami",
      "Takayama Kazumi",
      "Nakada Kana",
      "Nishino Nanase",
      "Matsumura Sayuri",
      "Wakatsuki Yumi",
      "Kitano Hinako",
      "Terada Ranze",
      "Hori Miona",
      "Shinuchi Mai"
    ],
    table: [
      {
        member: "Akimoto Manatsu",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Ikuta Erika",
        slotsSold: [
          "2|2|2|2|2",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "4|4|4|4|4",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Ikoma Rina",
        slotsSold: [
          "5|4|3|4|5",
          "5|4|3|4|6",
          "7|4|3|5|7",
          "7|6|4|5|6",
          "7|7|6|6|8",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "8|8|6|7|7"
        ]
      },
      {
        member: "Itou Marika",
        slotsSold: [
          "3|2|2|2|4",
          "3|2|2|2|4",
          "4|3|2|3|4",
          "4|4|2|3|3",
          "x|x|x|x|x",
          "4|3|2|2|3",
          "4|3|2|3|3",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "2|2|2|2|3",
          "2|2|2|2|3",
          "3|3|2|2|3",
          "3|3|2|2|2",
          "5|4|5|5|5",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "4|5|4|4|4"
        ]
      },
      {
        member: "Etou Misa",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Kawago Hina",
        slotsSold: [
          "x|x|x|6|",
          "x|x|x|8|",
          "x|x|x||",
          "x|x|x||",
          "x|x|x|x|x",
          "x|x|x||",
          "x|x|x|12|13",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Kawamura Mahiro",
        slotsSold: [
          "x|x|x|x|4",
          "x|x|x|x|7",
          "x|x|x|x|9",
          "x|x|x|x|5",
          "x|x|x|x|x",
          "x|x|x|x|7",
          "x|x|x|x|10",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Saito Asuka",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Saitou Chiharu",
        slotsSold: [
          "||4|x|x",
          "||4|x|x",
          "||5|x|x",
          "||6|x|x",
          "x|x|x|4|5",
          "|12|4|x|x",
          "14|12|5|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Saitou Yuuri",
        slotsSold: [
          "4|4|3|3|5",
          "5|3|3|3|5",
          "5|4|3|3|5",
          "5|4|3|3|3",
          "x|x|x|x|x",
          "4|3|2|3|4",
          "5|4|3|3|5",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Sakurai Reika",
        slotsSold: [
          "3|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|2",
          "3|3|2|2|2",
          "x|x|x|x|x",
          "2|3|2|2|2",
          "3|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Takayama Kazumi",
        slotsSold: [
          "2|2|2|2|3",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "3|3|2|2|2",
          "x|x|x|x|x",
          "2|3|2|2|2",
          "3|2|2|2|3",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "4|4|3|3|5",
          "6|4|3|4|5",
          "4|6|4|4|5",
          "6|5|4|4|4",
          "x|x|x|x|x",
          "5|4|3|4|4",
          "6|4|4|4|4",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Nishino Nanase",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Noujou Ami",
        slotsSold: [
          "x|x|x|x|x",
          "|7|4|x|x",
          "x|x|x|x|x",
          "x|x|6|5|x",
          "x|x|x|6|x",
          "||8|x|x",
          "14|11|4|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "4|3|2|2|3",
          "4|5|4|x|x",
          "4|3|2|2|4",
          "3|2|2|2|3",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "2|2|2|2|3",
          "3|2|2|2|3",
          "4|3|2|3|3",
          "3|3|2|2|3",
          "x|x|x|x|x",
          "3|3|2|2|3",
          "3|3|2|2|3",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Wakatsuki Yumi",
        slotsSold: [
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|3|2|2|2",
          "4|4|4|4|4",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x|x|",
          "x|x|x|x|5",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|x",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "|||x|x",
          "||x|x|x",
          "x|x|x|x|x",
          "x|x|x||",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|4|8",
          "x|x|x|6|",
          "||x|x|x",
          "x|x|x|x|9",
          "x|x|x|8|12",
          "x|x|x|6|11",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Kitano Hinako",
        slotsSold: [
          "2|2|2|3|3",
          "3|3|2|2|3",
          "4|3|2|2|3",
          "3|3|2|2|3",
          "5|5|5|5|5",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Sagara Iori",
        slotsSold: [
          "x|x|x|4|",
          "x|x|x|4|8",
          "||4|x|x",
          "x|x|x|5|10",
          "x|x|x|x|x",
          "x|x|x|6|",
          "x|x|x|4|5",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|x",
          "x|x|x|x|",
          "x|x|x|x|13",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "3|2|2|2|3",
          "2|2|2|2|3",
          "3|3|2|2|3",
          "3|3|2|2|2",
          "4|5|4|4|4",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "5|5|4|4|4"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "4|4|2|3|x",
          "4|4|3|3|x",
          "6|4|3|3|x",
          "7|6|4|4|x",
          "x|x|x|x|x",
          "7|6|4|4|x",
          "5|4|3|3|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "4|3|2|3|3",
          "4|3|2|3|4",
          "4|4|2|3|4",
          "4|3|2|2|3",
          "x|x|x|x|x",
          "3|3|2|3|3",
          "4|3|2|3|3e",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "5|4|3|3|x",
          "5|5|3|3|x",
          "6|5|4|3|x",
          "4|4|3|3|x",
          "x|x|x|x|x",
          "4|4|3|3|x",
          "4|4|3|3|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "5|4|3|3|x",
          "6|5|3|3|x",
          "6|5|3|4|5",
          "7|6|4|4|5",
          "x|x|x|x|x",
          "7|5|3|3|x",
          "5|5|3|3|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "2|2|x|x|2",
          "2|2|x|x|2",
          "2|2|x|x|2",
          "2|2|x|x|2",
          "x|x|x|x|x",
          "4|4|x|x|8",
          "3|3|x|x|8",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "x|x|3|5|x",
          "x|x|5|6|x",
          "x|x|6|6|x",
          "x|x|6|7|x",
          "x|x|x|x|x",
          "x|x|10|10|x",
          "x|x|5|6|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "2|2|x|x|5",
          "3|2|x|x|5",
          "3|3|x|x|6",
          "3|3|x|x|6",
          "x|x|x|x|x",
          "3|3|x|x|6",
          "3|3|x|x|5",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Oozono Momoko",
        slotsSold: [
          "x|x|2|2|5",
          "x|x|2|2|5",
          "x|x|2|2|6",
          "x|x|3|3|5",
          "x|x|x|x|x",
          "x|x|3|3|6",
          "x|x|2|2|5",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|x|x|x",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "x|x|3|3|x",
          "x|x|3|4|x",
          "x|x|3|4|x",
          "x|x|4|5|x",
          "x|x|x|x|x",
          "x|x|7|7|x",
          "x|x|3|4|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "||x|x|x",
          "||x|x|x",
          "||x|x|x",
          "||x|x|x",
          "x|x|x|x|x",
          "||x|x|x",
          "14|11|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "|4|x|x|x",
          "|6|x|x|x",
          "|5|x|x|x",
          "||x|x|x",
          "x|x|x|x|x",
          "||x|x|x",
          "12|6|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "5|3|x|x|x",
          "|5|x|x|x",
          "|7|x|x|x",
          "||x|x|x",
          "x|x|x|x|x",
          "||x|x|x",
          "10|4|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|x|x|x",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||x|x|x",
          "||x|x|x",
          "||x|x|x",
          "||x|x|x",
          "x|x|x|x|x",
          "||x|x|x",
          "12|10|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Yoda Yuuki",
        slotsSold: [
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|x|x|x",
          "x|x|2|2|4",
          "x|x|2|2|4",
          "x|x|x|x|x"
        ]
      }
    ]
  },
  {
    cd: {
      num: 3,
      type: "Album",
      title: "生まれてから初めて見た夢",
      release: "2017-05-24"
    },
    lastDraw: 10,
    meetDates: [
      "2017-07-16",
      "2017-07-17",
      "2017-07-23"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Ikuta Erika",
      "Ikoma Rina",
      "Itou Marika",
      "Inoue Sayuri",
      "Etou Misa",
      "Saito Asuka",
      "Saitou Yuuri",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Higuchi Hina",
      "Hoshino Minami",
      "Takayama Kazumi",
      "Nakada Kana",
      "Nishino Nanase",
      "Matsumura Sayuri",
      "Wakatsuki Yumi",
      "Kitano Hinako",
      "Terada Ranze",
      "Hori Miona",
      "Shinuchi Mai"
    ],
    table: [
      {
        member: "Akimoto Manatsu",
        slotsSold: [
          "2|3|3|3|3",
          "3|3|3|3|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Ikoma Rina",
        slotsSold: [
          "||||",
          "||||",
          "6|4|4|6|7"
        ]
      },
      {
        member: "Itou Marika",
        slotsSold: [
          "|8|7|9|4",
          "||||",
          "3|3|3|3|4"
        ]
      },
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "|9|7|9|9",
          "||||",
          "3|2|3|3|3"
        ]
      },
      {
        member: "Etou Misa",
        slotsSold: [
          "3|2|3|3|3",
          "3|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kawago Hina",
        slotsSold: [
          "x|x|x||",
          "||x|x|x",
          "x|x|x|8|"
        ]
      },
      {
        member: "Kawamura Mahiro",
        slotsSold: [
          "x|x|x||",
          "||x|x|x",
          "x|x|x|4|5"
        ]
      },
      {
        member: "Saito Asuka",
        slotsSold: [
          "3|2|3|2|2",
          "2|2|2|3|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Saitou Chiharu",
        slotsSold: [
          "x|x|x||",
          "||x|x|x",
          "x|x|x|5|6"
        ]
      },
      {
        member: "Saitou Yuuri",
        slotsSold: [
          "||||",
          "||||",
          "3|3|3|3|3"
        ]
      },
      {
        member: "Sakurai Reika",
        slotsSold: [
          "6|5|4|5|5",
          "8|6|6|6|5",
          "2|2|3|2|2"
        ]
      },
      {
        member: "Takayama Kazumi",
        slotsSold: [
          "4|4|4|3|3",
          "8|6|5|4|5",
          "2|2|2|2|3"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "||||",
          "||||",
          "8|4|4|5|8"
        ]
      },
      {
        member: "Nakamoto Himeka",
        slotsSold: [
          "5|4|3|5|4",
          "||||",
          "2|2|2|3|3"
        ]
      },
      {
        member: "Noujou Ami",
        slotsSold: [
          "x|x|||x",
          "x|||x|x",
          "x|x|9|9|x"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "||||",
          "||||",
          "4|3|3|3|4"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "6|5|4|5|6",
          "|9|9||9",
          "3|3|3|3|3"
        ]
      },
      {
        member: "Wakatsuki Yumi",
        slotsSold: [
          "3|3|3|3|3",
          "4|4|4|4|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x|x|",
          "|x|x|x|x",
          "x|x|x|x|"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "x|x|||x",
          "x|||x|x",
          "x|x|4|6|x"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "x|x|||x",
          "x|||x|x",
          "x|x|5|6|x"
        ]
      },
      {
        member: "Kitano Hinako",
        slotsSold: [
          "||||",
          "||9||",
          "3|3|3|3|4"
        ]
      },
      {
        member: "Sagara Iori",
        slotsSold: [
          "x|x|||x",
          "x|||x|x",
          "x|x|6|6|x"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "x|x|x|x|",
          "|x|x|x|x",
          "x|x|x|x|4"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "6|5|6|6|8",
          "8|6|6|6|8",
          "2|2|2|2|3"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "||||",
          "||||",
          "6|4|3|4|6"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "8|7|6|6|7",
          "||||5",
          "3|3|2|3|3"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "4|3|3|3|4",
          "5|5|6|5|5",
          "2|2|3|3|3"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "||||",
          "||||",
          "5|3|3|4|5"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "||||",
          "||||",
          "3|3|4|3|4"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "4|4|x|x|x",
          "x|x|x|5|5",
          "2|2|x|x|x"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "7|5|x|x|x",
          "x|x|x|7|",
          "3|2|x|x|x"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "4|3|x|x|x",
          "x|x|x|5|6",
          "2|2|x|x|x"
        ]
      },
      {
        member: "Oozono Momoko",
        slotsSold: [
          "4|3|x|x|x",
          "x|x|x|4|5",
          "2|2|x|x|x"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "3|3|2|x|x",
          "x|x|3|3|4",
          "2|2|2|x|x"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "x|x|6|7|x",
          "x||8|x|x",
          "x|x|3|3|x"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "x|x|x|x|",
          "|x|x|x|x",
          "x|x|x|x|3"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "x|x|x|x|",
          "|x|x|x|x",
          "x|x|x|x|3"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||x|x|x",
          "x|x|x||",
          "4|3|x|x|x"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "2|2|2|x|x",
          "x|x|2|2|3",
          "2|2|2|x|x"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "x|x|x|x|",
          "|x|x|x|x",
          "x|x|x|x|3"
        ]
      },
      {
        member: "Yoda Yuuki",
        slotsSold: [
          "2|2|2|x|x",
          "x|x|2|2|2",
          "2|2|2|x|x"
        ]
      }
    ]
  },
  {
    cd: {
      num: 18,
      type: "Single",
      title: "逃げ水",
      release: "2017-08-09"
    },
    lastDraw: 20,
    meetDates: [
      "2017-09-18",
      "2017-09-24",
      "2017-09-30",
      "2017-10-28",
      "2017-11-04",
      "2017-12-23"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Ikuta Erika",
      "Ikoma Rina",
      "Itou Marika",
      "Inoue Sayuri",
      "Etou Misa",
      "Saito Asuka",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Hoshino Minami",
      "Takayama Kazumi",
      "Nishino Nanase",
      "Matsumura Sayuri",
      "Wakatsuki Yumi",
      "Hori Miona",
      "Shinuchi Mai",
      "Oozono Momoko",
      "Yoda Yuuki"
    ],
    table: [
      {
        member: "Akimoto Manatsu",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Ikuta Erika",
        slotsSold: [
          "2|2|2|2|2",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Ikoma Rina",
        slotsSold: [
          "5|5|4|5|5",
          "6|4|4|4|6",
          "10|10|6|9|10",
          "7|5|4|5|6",
          "10|6|4|5|8",
          "11|7|6|6|8"
        ]
      },
      {
        member: "Itou Marika",
        slotsSold: [
          "3|3|2|3|3",
          "x|x|x|x|x",
          "5|5|4|5|4",
          "3|3|2|2|3",
          "4|4|2|3|4",
          "6|6|5|5|5"
        ]
      },
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "3|3|2|3|3",
          "3|3|2|3|3",
          "4|4|2|3|4",
          "3|2|2|2|3",
          "4|4|2|3|3",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Etou Misa",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Kawago Hina",
        slotsSold: [
          "x|x|x|8|",
          "x|x|x||",
          "x|x|x||",
          "x|x|x|6|9",
          "x|x|x||",
          "x|x|x|20|19"
        ]
      },
      {
        member: "Kawamura Mahiro",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x||",
          "x|x|x||",
          "x|x|x||",
          "x|x|x||"
        ]
      },
      {
        member: "Saito Asuka",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Saitou Chiharu",
        slotsSold: [
          "x|x|x|5|7",
          "x|x|x|4|6",
          "x|x|x|7|7",
          "x|x|x|3|5",
          "x|x|x|4|5",
          "x|x|x|11|14"
        ]
      },
      {
        member: "Saitou Yuuri",
        slotsSold: [
          "4|3|3|3|4",
          "5|4|3|3|5",
          "5|5|3|3|3",
          "4|3|3|3|3",
          "5|5|4|4|4",
          "8|7|5|6|6"
        ]
      },
      {
        member: "Sakurai Reika",
        slotsSold: [
          "2|2|2|2|2",
          "x|x|x|x|x",
          "4|3|2|2|2",
          "2|2|2|2|2",
          "3|3|2|2|2",
          "5|5|4|4|4"
        ]
      },
      {
        member: "Takayama Kazumi",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|3|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "6|5|4|4|5",
          "9|6|4|5|6",
          "10|10|7|8|9",
          "6|5|4|4|5",
          "12|9|6|5|7",
          "18|12|8|8|8"
        ]
      },
      {
        member: "Noujou Ami",
        slotsSold: [
          "x|x|x|4|7",
          "x|x|x|6|7",
          "x|x|x|7|7",
          "x|x|4|4|4",
          "12|6|x|x|x",
          "x|x|x|9|10"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "4|4|3|3|4",
          "5|4|3|3|5",
          "6|6|4|4|4",
          "5|4|3|3|4",
          "5|5|3|4|4",
          "9|8|6|7|5"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "3|2|2|2|3",
          "3|2|2|2|3",
          "4|3|2|3|3",
          "3|2|2|2|3",
          "3|2|2|2|2",
          "6|5|5|5|5"
        ]
      },
      {
        member: "Wakatsuki Yumi",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "|7|4|x|x",
          "|6|4|x|x",
          "|||x|x",
          "6|4|x|x|x",
          "|8|x|x|x",
          "||11|x|x"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "6|5|x|x|x",
          "6|4|x|x|x",
          "|10|x|x|x",
          "6|4|x|x|x",
          "x|x|7|7|8",
          "17|8|x|x|x"
        ]
      },
      {
        member: "Kitano Hinako",
        slotsSold: [
          "3|2|2|2|3",
          "4|4|3|4|4",
          "6|6|5|5|5",
          "5|4|3|3|4",
          "6|5|4|4|5",
          "7|6|5|5|5"
        ]
      },
      {
        member: "Sagara Iori",
        slotsSold: [
          "x|x|x|3|5",
          "x|x|x|4|6",
          "x|x|x|9|",
          "x|x|x|3|4",
          "x|x|12|12|13",
          "x|x|x|8|10"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "x|x|x|x|3",
          "x|x|x|x|5",
          "x|x|x|x|6",
          "x|x|x|x|4",
          "x|x|x|x|4",
          "x|x|x|x|6"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "3|2|2|2|3",
          "3|2|2|2|3",
          "4|4|2|2|3",
          "3|2|2|2|2",
          "4|3|2|2|2",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "7|5|3|4|4",
          "7|5|4|4|6",
          "||6|7|9",
          "6|4|3|3|4",
          "14|7|5|5|7",
          "14|9|6|7|7"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "3|3|2|2|3",
          "3|2|2|2|2",
          "4|4|3|4|4",
          "4|2|2|2|2",
          "4|4|2|2|2",
          "5|5|5|5|4"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "5|4|4|4|4",
          "6|5|4|4|4",
          "6|7|4|5|4",
          "5|4|3|3|4",
          "8|6|4|6|6",
          "9|9|7|6|6"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "5|4|3|3|4",
          "5|4|3|3|4",
          "6|6|4|4|5",
          "4|3|2|3|3",
          "6|6|4|4|4",
          "8|7|6|6|6"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "2|2|2|x|x",
          "2|2|2|x|x",
          "3|3|2|x|x",
          "2|2|2|x|x",
          "3|2|2|x|x",
          "4|4|4|x|x"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "3|3|2|x|x",
          "4|3|2|x|x",
          "5|5|3|x|x",
          "3|3|2|x|x",
          "6|5|3|x|x",
          "6|5|4|x|x"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "2|2|2|x|2",
          "2|2|2|x|2",
          "3|3|2|x|2",
          "2|2|2|x|2",
          "2|2|2|x|2",
          "4|4|4|x|4"
        ]
      },
      {
        member: "Oozono Momoko",
        slotsSold: [
          "2|2|2|2|x",
          "2|2|2|2|x",
          "4|4|3|3|x",
          "3|2|2|2|x",
          "4|3|2|2|x",
          "4|4|4|4|x"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "4|4|4|4|x"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "4|3|2|x|x",
          "4|3|3|x|x",
          "6|6|3|x|x",
          "4|3|2|x|x",
          "5|4|2|x|x",
          "6|6|4|x|x"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "x|x|3|x|4",
          "x|x|3|x|4",
          "x|x|4|x|5",
          "x|x|3|x|4",
          "x|x|4|x|5",
          "x|x|5|x|6"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "x|x|x|3|4",
          "x|x|x|3|4",
          "x|x|x|5|5",
          "x|x|x|3|4",
          "x|x|x|4|6",
          "x|x|x|7|7"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "x|x|3|3|4",
          "x|x|3|4|5",
          "x|x|5|7|6",
          "x|x|2|3|4",
          "6|5|x|x|x",
          "x|x|6|7|7"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "4|4|4|4|x"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "5|4|x|x|x",
          "4|3|x|x|x",
          "10|8|x|x|x",
          "5|4|x|x|x",
          "x|x|x|3|5",
          "9|7|x|x|x"
        ]
      },
      {
        member: "Yoda Yuuki",
        slotsSold: [
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "4|4|4|4|x"
        ]
      }
    ]
  },
  {
    cd: {
      num: 19,
      type: "Single",
      title: "いつかできるから今日できる",
      release: "2018-04-25"
    },
    lastDraw: 14,
    meetDates: [
      "2018-01-30",
      "2018-01-03",
      "2018-02-09",
      "2018-02-17",
      "2018-03-23",
      "2018-03-16"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Ikuta Erika",
      "Ikoma Rina",
      "Inoue Sayuri",
      "Etou Misa",
      "Saito Asuka",
      "Saitou Yuuri",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Higuchi Hina",
      "Hoshino Minami",
      "Takayama Kazumi",
      "Nakada Kana",
      "Nishino Nanase",
      "Matsumura Sayuri",
      "Wakatsuki Yumi",
      "Hori Miona",
      "Kitano Hinako",
      "Shinuchi Mai"
    ],
    table: [
      {
        member: "Ikuta Erika",
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
        member: "Ikoma Rina",
        slotsSold: [
          "|13|10|13|",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "5|4|4|5|5",
          "x|x|x|x|x",
          "11|8|5|9|10"
        ]
      },
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "3|2|2|2|2",
          "3|2|2|2|3",
          "3|3|2|3|3",
          "3|2|2|2|3",
          "3|3|2|2|3",
          "3|2|2|2|3"
        ]
      },
      {
        member: "Etou Misa",
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
        member: "Kawago Hina",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "||x|x|x",
          "|18|x|x|x",
          "18|13|x|x|x",
          "|18|x|x|x"
        ]
      },
      {
        member: "Kawamura Mahiro",
        slotsSold: [
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "|20|x|x|x",
          "x|x|x|x|19"
        ]
      },
      {
        member: "Saito Asuka",
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
        member: "Saitou Chiharu",
        slotsSold: [
          "|||x|x",
          "||10|x|x",
          "x|x|||",
          "x|x|7|8|9",
          "|21|17|x|x",
          "||16|x|x"
        ]
      },
      {
        member: "Saitou Yuuri",
        slotsSold: [
          "4|4|3|4|4",
          "5|3|3|4|5",
          "7|5|4|5|6",
          "4|3|3|4|5",
          "6|4|4|4|5",
          "5|4|3|4|4"
        ]
      },
      {
        member: "Takayama Kazumi",
        slotsSold: [
          "3|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|2",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "13|12|11|11|10",
          "13|7|5|6|10",
          "15|14|9|13|15",
          "13|9|5|6|10",
          "16|13|9|6|13",
          "17|15|10|14|10"
        ]
      },
      {
        member: "Noujou Ami",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "|||x|x",
          "x|x|18||",
          "x|x|x|x|x",
          "x|x|||"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "6|5|4|4|4",
          "4|3|3|3|4",
          "6|5|4|5|6",
          "5|4|4|4|",
          "5|4|5|4|5",
          "6|5|3|4|4"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "4|3|3|3|3",
          "3|3|3|3|4",
          "3|2|2|3|3",
          "3|3|2|3|3",
          "4|3|3|3|4",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Wakatsuki Yumi",
        slotsSold: [
          "x|x|x|x|x",
          "3|3|3|3|3",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|",
          "x|x|x|x|"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "x|x|x|8|",
          "x|x|x|5|",
          "|12|x|x|x",
          "16|6|x|x|x",
          "x|x|x|7|17",
          "x|x|x|10|17"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "x|x|x||",
          "x|x|x|4|7",
          "|15|x|x|x",
          "16|6|x|x|x",
          "x|x|x|6|12",
          "x|x|x|15|16"
        ]
      },
      {
        member: "Sagara Iori",
        slotsSold: [
          "x|x|x||",
          "x|x|x|7|",
          "||x|x|x",
          "17|6|x|x|x",
          "x|x|x|9|17",
          "x|x|x||"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "x|x|x||",
          "x|x|x|8|",
          "||x|x|x",
          "18|9|x|x|x",
          "x|x|x|10|17",
          "x|x|x|15|17"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|3",
          "4|3|3|3|3",
          "3|2|2|2|3",
          "3|3|3|3|3",
          "3|3|3|3|3"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "13|12|7|9|10",
          "|7|4|5|13",
          "|11|7|9|15",
          "10|7|4|4|7",
          "9|6|4|4|5",
          "16|11|7|9|10"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "4|3|3|3|3",
          "4|3|3|3|3",
          "5|4|3|4|4",
          "4|3|3|3|3",
          "5|4|4|3|4",
          "4|4|3|4|3"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "8|6|5|5|5",
          "10|5|5|5|8",
          "10|9|6|6|7",
          "9|5|5|4|6",
          "11|9|5|6|7",
          "11|10|7|5|7"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "6|6|5|5|5",
          "6|5|4|5|6",
          "9|6|5|5|6",
          "6|4|3|4|5",
          "8|5|4|5|6",
          "6|6|4|5|4"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "3|3|2|2|3",
          "2|2|2|2|2",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "x|x|2|2|3",
          "3|3|2|2|3"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "6|5|4|5|5",
          "6|4|4|5|5",
          "5|4|3|4|4",
          "5|4|4|4|5",
          "7|5|5|5|6",
          "8|5|5|4|5"
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
        member: "Oozono Momoko",
        slotsSold: [
          "3|3|2|3|3",
          "3|3|2|2|3",
          "3|3|3|3|3",
          "3|2|3|2|3",
          "3|3|3|3|3",
          "3|2|2|2|2"
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
          "10|6|4|4|x",
          "7|5|4|4|x",
          "10|7|5|5|x",
          "7|5|4|4|x",
          "10|6|5|5|6",
          "11|7|5|4|x"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "9|7|4|x|x",
          "8|6|4|x|x",
          "x|x|4|5|7",
          "x|x|4|5|6",
          "6|4|4|x|x",
          "9|8|4|x|x"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||7|x|x",
          "|8|5|x|x",
          "x|x|9|10|14",
          "x|x|5|6|7",
          "16|11|5|x|x",
          "17|10|5|x|x"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||7|7|",
          "|7|4|4|x",
          "|9|6|6|x",
          "15|6|4|4|x",
          "16|8|5|5|x",
          "19|16|9|10|x"
        ]
      },
      {
        member: "Yamashita Mizuki",
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
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||10|x|x",
          "|9|5|x|x",
          "x|x|10|13|15",
          "x|x|5|6|9",
          "18|15|7|x|x",
          "20|18|10|x|x"
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
      }
    ]
  },
  {
    cd: {
      num: 1,
      type: "U.Album",
      title: "僕だけの君",
      release: "2018-01-10"
    },
    lastDraw: 13,
    meetDates: [
      "2018-01-14",
      "2018-02-17",
      "2018-03-25"
    ],
    sbt: [],
    table: [
      {
        member: "Kawago Hina",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "|||x|x"
        ]
      },
      {
        member: "Kawamura Mahiro",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x|12|11"
        ]
      },
      {
        member: "Saitou Chiharu",
        slotsSold: [
          "|||x|x",
          "||||7",
          "|||x|x"
        ]
      },
      {
        member: "Noujou Ami",
        slotsSold: [
          "||||",
          "|||x|x",
          "|||x|x"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "3|2|2|3|",
          "8|8|8|7|7",
          "x|x|x|x|2"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x||"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "||||x"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "|||x|x"
        ]
      },
      {
        member: "Sagara Iori",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "x|x|x||"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x||"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "|4|3||",
          "||||",
          "11|9|9|10|12"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "2|2|2|3|2",
          "4|5|5|6|4",
          "4|5|6|4|3"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "3|3|2|4|4",
          "5|6|7|7|5",
          "9|7|7|8|8"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "|3|3|3|",
          "|8|8|7|5",
          "13|10|9|10|11"
        ]
      }
    ]
  },
  {
    cd: {
      num: 20,
      type: "Single",
      title: "シンクロニシティ",
      release: "2018-04-25"
    },
    lastDraw: 14,
    meetDates: [
      "2018-04-30",
      "2018-05-03",
      "2018-06-09",
      "2018-06-17",
      "2018-06-23",
      "2018-07-16"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Ikuta Erika",
      "Ikoma Rina",
      "Inoue Sayuri",
      "Etou Misa",
      "Saito Asuka",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Higuchi Hina",
      "Hoshino Minami",
      "Takayama Kazumi",
      "Nishino Nanase",
      "Matsumura Sayuri",
      "Wakatsuki Yumi",
      "Hori Miona",
      "Shinuchi Mai",
      "Terada Ranze",
      "Oozono Momoko",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki"
    ],
    table: [
      {
        member: "Akimoto Manatsu",
        slotsSold: [
          "2|2|2|2|x",
          "x|x|x|x|x",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2"
        ]
      },
      {
        member: "Ikuta Erika",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "4|4|4|4|4",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kawago Hina",
        slotsSold: [
          "x|5|x|x|x",
          "x|5|x|x|x",
          "x|x|x|4|x",
          "x|10|x|x|x",
          "x|x||4|x",
          "x|x|14|5|x"
        ]
      },
      {
        member: "Etou Misa",
        slotsSold: [
          "2|2|2|2|x",
          "x|x|x|x|x",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2"
        ]
      },
      {
        member: "Saito Asuka",
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
        member: "Saitou Chiharu",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "||6|x|x",
          "|||x|x",
          "12|12|9|x|x",
          "12|12|11|x|14"
        ]
      },
      {
        member: "Saitou Yuuri",
        slotsSold: [
          "4|3|3|3|4",
          "4|4|3|3|4",
          "4|3|2|2|4",
          "9|7|7|10|6",
          "4|3|3|3|3",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Takayama Kazumi",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|3|3|3|3",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "|5|5|5|",
          "||||5",
          "6|4|5|5|5",
          "||11||",
          "6|5|4|4|4",
          "7|5|4|4|5"
        ]
      },
      {
        member: "Noujou Ami",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "|6|x|x|x",
          "x|x|x||",
          "|9|x|x|x",
          "|11|x|x|x"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "5|4|3|4|4",
          "5|5|5|5|5",
          "4|3|3|3|3",
          "|10|7|10|9",
          "4|3|3|3|4",
          "5|3|3|3|4"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|3|3|4|4",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "|x|x|x|x",
          "|x|x|x|x",
          "x|x|8|x|x",
          "|x|x|x|x",
          "x|x|12|x|x",
          "x|x|12|x|x"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "10|5|4|x|x",
          "|||x|x",
          "12|6|4|x|x",
          "13|9|5|x|x"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x|4|6",
          "x|x|x||",
          "x|x|x|5|7",
          "x|x|x|5|7"
        ]
      },
      {
        member: "Sagara Iori",
        slotsSold: [
          "x|x|4|x|x",
          "x|x|3|x|x",
          "x|x|x|9|3",
          "x|x|5|10|x",
          "x||x|9|4",
          "x|14|x|10|4"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x|9|10",
          "x|x|x||",
          "x|x|x|8|11",
          "x|x|x|10|13"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "3|2|2|2|3",
          "3|2|2|2|2",
          "2|2|2|2|2",
          "4|4|3|4|4",
          "3|2|2|2|2",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "4|3|3|3|4",
          "x|x|x|x|x",
          "3|2|2|2|3",
          "8|6|5|6|7",
          "4|3|2|3|4",
          "4|3|3|3|4"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "5|3|3|3|4",
          "4|3|3|2|3",
          "4|3|3|3|3",
          "5|5|5|5|5",
          "4|3|2|3|3",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|3|3|3|3",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "|5|4|5|5",
          "||5||5",
          "4|3|2|3|3",
          "|||11|11",
          "5|4|4|4|4",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "5|4|4|4|4",
          "5|4|3|4|3",
          "4|2|2|3|4",
          "9|9|8|8|5",
          "5|3|3|3|4",
          "5|4|3|3|4"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "3|2|2|3|3",
          "3|2|2|2|3",
          "2|2|2|2|2",
          "4|4|4|4|4",
          "2|2|2|2|2",
          "2|2|2|2|3"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "5|5|4|5|5",
          "5|5|3|4|5",
          "3|3|2|2|3",
          "6|6|5|6|5",
          "4|3|3|3|3",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|3|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Oozono Momoko",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|3|3|4|4",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "|4|5|5|",
          "|5|5|5|5",
          "5|4|3|4|4",
          "|||11|11",
          "6|5|4|4|5",
          "6|4|4|5|5"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "|4|5|5|",
          "||4|5|",
          "6|4|4|4|4",
          "||11||",
          "6|5|4|4|5",
          "6|5|4|4|5"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "||||",
          "|10|6|8|10",
          "||||",
          "|10|7|8|11",
          "13|8|6|8|11"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||||",
          "||5||",
          "6|5|4|4|6",
          "||||",
          "7|4|4|4|7",
          "8|4|4|5|5"
        ]
      },
      {
        member: "Yamashita Mizuki",
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
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||||",
          "|9|5|5|9",
          "||||",
          "|9|6|7|11",
          "13|8|6|8|11"
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
      }
    ]
  },
  {
    cd: {
      num: 21,
      type: "Single",
      title: "ジコチューで行こう!",
      release: "2018-08-08"
    },
    lastDraw: 21,
    meetDates: [
      "2018-08-12",
      "2018-09-29",
      "2018-10-13",
      "2018-10-21",
      "2018-10-27",
      "2018-12-15"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Ikuta Erika",
      "Inoue Sayuri",
      "Etou Misa",
      "Saito Asuka",
      "Saitou Yuuri",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Hoshino Minami",
      "Takayama Kazumi",
      "Nishino Nanase",
      "Matsumura Sayuri",
      "Wakatsuki Yumi",
      "Hori Miona",
      "Shinuchi Mai",
      "Suzuki Ayane",
      "Iwamoto Renka",
      "Umezawa Minami",
      "Oozono Momoko",
      "Yamashita Mizuki",
      "Yoda Yuuki"
    ],
    table: [
      {
        member: "Ikuta Erika",
        slotsSold: [
          "2|2|2|2|2",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "3|2|2|2|3",
          "x|x|x|x|x",
          "2|2|2|2|3",
          "3|2|2|2|3",
          "2|2|2|2|3",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Kawago Hina",
        slotsSold: [
          "||||",
          "||||",
          "|||x|x",
          "|||x|x",
          "x|x|15|15|15",
          "18|15|7|x|x"
        ]
      },
      {
        member: "Saito Asuka",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Saitou Yuuri",
        slotsSold: [
          "3|3|3|3|3",
          "7|6|6|7|4",
          "3|3|3|3|4",
          "4|3|3|3|4",
          "3|3|3|3|3",
          "6|6|6|6|6"
        ]
      },
      {
        member: "Sakurai Reika",
        slotsSold: [
          "|2|2|2|",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Takayama Kazumi",
        slotsSold: [
          "2|2|2|x|x",
          "x|x|x|x|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "2|2|2|2|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "5|5|4|5|5",
          "x|x|x|x|x",
          "6|5|4|4|5",
          "8|5|5|5|7",
          "6|4|4|4|5",
          "7|6|6|5|6"
        ]
      },
      {
        member: "Noujou Ami",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "||||",
          "||||",
          "x|x|13|14|13",
          "15|13|9|x|x"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "4|3|3|3|3",
          "8|7|7|6|5",
          "4|3|3|3|3",
          "4|3|3|3|4",
          "4|3|3|3|3",
          "6|6|6|6|5"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "2|2|2|2|2",
          "4|3|3|3|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x||",
          "x|x|x||",
          "x|x|x||",
          "x|x|x||"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||15||",
          "|18|12|18|",
          "|17|10|12|14"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "|5|4|x|x",
          "|||x|x",
          "11|7|5|x|x",
          "11|7|5|x|x",
          "10|6|5|5|6",
          "10|9|9|8|8"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x|6|8",
          "x|x|x|8|15",
          "x|x|x|6|10",
          "x|x|x|8|9"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "3|2|2|2|2",
          "4|3|3|3|3",
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "3|3|2|3|3",
          "5|5|5|5|4",
          "3|3|2|2|3",
          "4|3|2|3|3",
          "3|3|2|3|3",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "4|3|3|3|3",
          "x|x|x|x|x",
          "4|3|3|3|3",
          "4|3|3|3|3",
          "4|3|2|3|3",
          "6|5|5|5|5"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "2|2|2|2|2",
          "3|3|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "5|5|4|4|4",
          "5|7|7|6|4",
          "7|6|4|6|7",
          "7|5|5|6|5",
          "4|3|3|4|4",
          "7|6|6|6|6"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "4|4|4|3|3",
          "x|x|x|x|x",
          "4|3|3|4|4",
          "5|4|3|3|4",
          "3|3|3|3|3",
          "6|6|5|5|5"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "3|2|2|2|3",
          "6|5|5|4|4",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "5|5|5|6|6"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "3|3|3|3|3",
          "8|7|6|6|4",
          "4|3|2|3|3",
          "4|3|3|3|4",
          "3|3|3|3|3",
          "6|6|6|6|6"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Oozono Momoko",
        slotsSold: [
          "2|2|2|2|2",
          "3|3|3|3|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "5|4|4|4|4",
          "||||",
          "6|5|4|5|6",
          "6|5|4|4|6",
          "5|4|3|4|4",
          "7|7|6|6|7"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "4|3|3|4|3",
          "10|10|7|8|9",
          "5|3|3|3|4",
          "5|4|3|4|5",
          "4|3|3|3|3",
          "6|6|6|6|5"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "||||",
          "||14||",
          "|14|7|13|",
          "|14|9|11|16",
          "17|13|10|10|11"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "|5|5|5|5",
          "||||",
          "7|5|4|4|7",
          "8|5|5|6|9",
          "7|5|4|5|6",
          "9|7|7|7|7"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "5|5|5|5|5"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||||",
          "|12|6|8|",
          "|14|9|9|",
          "|12|7|8|10",
          "14|9|8|8|11"
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
          "5|5|5|5|5"
        ]
      }
    ]
  },
  {
    cd: {
      num: 22,
      type: "Single",
      title: "帰り道は遠回りしたくなる",
      release: "2018-11-14"
    },
    lastDraw: 19,
    meetDates: [
      "2019-01-06",
      "2019-01-14",
      "2019-01-20",
      "2019-02-03",
      "2019-02-16",
      "2019-03-17"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Hori Miona",
      "Ikuta Erika",
      "Inoue Sayuri",
      "Etou Misa",
      "Saito Asuka",
      "Saitou Yuuri",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Takayama Kazumi",
      "Nishino Nanase",
      "Hoshino Minami",
      "Matsumura Sayuri",
      "Wakatsuki Yumi",
      "Itou Riria",
      "Umezawa Minami",
      "Oozono Momoko",
      "Sato Kaede",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Shinuchi Mai"
    ],
    table: [
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "2|2|2|2|2",
          "3|3|2|3|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Saito Asuka",
        slotsSold: [
          "2|2|2|2|2",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Saitou Yuuri",
        slotsSold: [
          "3|3|2|3|3",
          "5|4|4|4|4",
          "3|3|3|3|4",
          "4|3|3|3|4",
          "3|3|3|3|3",
          "3|3|3|3|3"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "5|4|4|4|5",
          "11|8|7|8|9",
          "7|5|5|5|7",
          "9|6|5|6|8",
          "6|5|4|4|5",
          "6|5|4|4|4"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "3|2|2|3|3",
          "4|4|4|4|4",
          "3|3|2|3|3",
          "3|3|2|3|3",
          "3|3|3|3|3",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "2|2|2|2|2",
          "2|3|2|3|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x||",
          "x|x|x|x|x",
          "x|x|x||",
          "x|x|x||",
          "x|x|x||",
          "x|x|x||"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "|10|10||",
          "||||",
          "||||",
          "||||",
          "||15||",
          "17|14|9|13|13"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "10|6|4|6|",
          "x|x|x|x|x",
          "|6|5|7|",
          "|11|7|9|",
          "|10|6|6|13",
          "15|7|6|8|11"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "|9|6|x|x",
          "x|x|x|x|x",
          "||9|x|x",
          "||13|x|x",
          "||12|x|x",
          "|13|11|x|x"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "2|2|2|2|2",
          "3|3|3|3|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "2|2|2|2|3",
          "x|x|x|x|x",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "3|2|2|3|3",
          "x|x|x|x|x",
          "4|3|2|3|3",
          "4|3|3|3|4",
          "4|3|2|3|3",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|3|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "4|3|3|4|4",
          "6|5|5|5|5",
          "5|4|4|4|5",
          "5|4|4|4|5",
          "5|4|4|4|4",
          "5|4|3|4|3"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "4|3|3|3|4",
          "5|5|5|5|5",
          "5|3|3|4|5",
          "4|3|3|4|4",
          "4|3|3|3|4",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "3|2|2|2|3",
          "3|3|3|3|4",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "3|2|2|2|3",
          "5|5|4|5|5",
          "4|3|3|3|4",
          "3|3|2|3|3",
          "4|3|3|3|4",
          "3|3|2|3|3"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "2|2|2|2|2",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Oozono Momoko",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|3|2|2",
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
          "4|3|3|4|4",
          "7|7|6|6|7",
          "5|4|3|4|5",
          "6|4|4|4|5",
          "5|4|4|5|5",
          "4|4|3|4|4"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "3|3|3|3|3",
          "4|4|4|4|4",
          "3|3|3|3|4",
          "4|3|3|3|4",
          "4|3|3|3|4",
          "3|2|2|3|3"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "|6|5|6|10",
          "||||",
          "x|x|x|x|x",
          "|7|6|8|",
          "|12|7|8|14",
          "12|6|5|6|8"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "8|5|4|6|6",
          "|10|7||",
          "10|5|5|7|10",
          "13|6|6|7|12",
          "8|5|5|6|7",
          "7|5|5|5|5"
        ]
      },
      {
        member: "Yamashita Mizuki",
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
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "|8|6|9|",
          "||||",
          "||9||",
          "||13||",
          "|13|6|8|15",
          "16|9|6|7|14"
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
      }
    ]
  },
  {
    cd: {
      num: 4,
      type: "Album",
      title: "今が思い出になるまで",
      release: "2019-04-17"
    },
    lastDraw: 7,
    meetDates: [
      "2019-04-28",
      "2019-05-01",
      "2019-05-11"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Hori Miona",
      "Ikuta Erika",
      "Inoue Sayuri",
      "Etou Misa",
      "Saito Asuka",
      "Saitou Yuuri",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Takayama Kazumi",
      "Nishino Nanase",
      "Hoshino Minami",
      "Matsumura Sayuri",
      "Wakatsuki Yumi",
      "Itou Riria",
      "Umezawa Minami",
      "Oozono Momoko",
      "Sato Kaede",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Shinuchi Mai"
    ],
    addgroups: [
      {
        id: "gen4",
        has: [
          "Endo Sakura",
          "Kaki Haruka",
          "Kakehashi Sayaka",
          "Kanagawa Saya",
          "Kitagawa Yuri",
          "Shibata Yuna",
          "Seimiya Rei",
          "Tamura Mayu",
          "Tsutsui Ayame",
          "Hayakawa Seira",
          "Yakubo Mio"
        ]
      }
    ],
    table: [
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "3|3|3|3|3",
          "2|2|2|2|2",
          "3|3|2|3|3"
        ]
      },
      {
        member: "Saito Asuka",
        slotsSold: [
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Saitou Yuuri",
        slotsSold: [
          "4|3|3|3|4",
          "2|2|2|2|2",
          "4|4|3|3|2"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "5|6|5|6|4",
          "4|4|3|4|4",
          "5|6|5|4|4"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "|||x|x"
        ]
      },
      {
        member: "Itou Karin",
        slotsSold: [
          "6|6|6|5|6",
          "6|6|5|6|5",
          "5|5|5|5|4"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "||||",
          "6|5|4|5|5",
          "||||"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x||"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|3|2|2|3"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "3|2|2|3|4",
          "2|2|2|2|2",
          "3|3|2|3|3"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "3|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "|6|5||",
          "4|4|4|4|4",
          "4|4|4|5|4"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "4|4|3|3|4",
          "2|2|2|2|2",
          "4|4|3|3|3"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "4|3|3|3|3",
          "2|2|2|2|2",
          "5|4|3|4|3"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "4|3|3|4|4",
          "3|3|2|2|2",
          "5|5|4|5|4"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Oozono Momoko",
        slotsSold: [
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
          "2|2|2|2|2"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "5|4|4|4|5",
          "3|3|3|3|3",
          "6|5|4|5|5"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "4|3|3|3|4",
          "2|2|2|2|2",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "|6|5|6|",
          "||||"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||||",
          "4|3|4|4|4",
          "||||5"
        ]
      },
      {
        member: "Yamashita Mizuki",
        slotsSold: [
          "2|2|2|2|1",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||5|6|",
          "||||"
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
          "x|x|2|2|5",
          "x|x|2|2|5",
          "x|x|2|2|5"
        ]
      },
      {
        member: "Kaki Haruka",
        slotsSold: [
          "x|x|2|2|5",
          "x|x|2|2|5",
          "x|x|2|2|5"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "2|2|x|x|5",
          "2|2|x|x|5",
          "2|2|x|x|5"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "2|2|x|x|x",
          "2|2|x|x|x",
          "3|2|x|x|x"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "||x|x|x",
          "5|5|x|x|x",
          "|6|x|x|x"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "2|2|x|x|x",
          "2|2|x|x|x",
          "3|3|x|x|x"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "x|x|3|3|x",
          "x|x|2|2|x",
          "x|x|3|2|x"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "x|x|2|2|5",
          "x|x|2|2|5",
          "x|x|2|2|5"
        ]
      },
      {
        member: "Tsutsui Ayame",
        slotsSold: [
          "x|x|2|2|6",
          "x|x|2|2|5",
          "x|x|2|2|5"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "|5|x|x|x",
          "4|3|x|x|x",
          "7|6|x|x|x"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "x|x|2|2|6",
          "x|x|2|2|5",
          "x|x|2|2|6"
        ]
      }
    ]
  },
  {
    cd: {
      num: 23,
      type: "Single",
      title: "Sing Out!",
      release: "2019-05-29"
    },
    lastDraw: 17,
    meetDates: [
      "2019-06-08",
      "2019-06-30",
      "2019-07-07",
      "2019-07-28",
      "2019-08-10",
      "2019-09-07"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Hori Miona",
      "Kitano Hinako",
      "Suzuki Ayane",
      "Watanabe Miria",
      "Ikuta Erika",
      "Inoue Sayuri",
      "Saito Asuka",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Takayama Kazumi",
      "Hoshino Minami",
      "Matsumura Sayuri",
      "Itou Riria",
      "Iwamoto Renka",
      "Umezawa Minami",
      "Oozono Momoko",
      "Kubo Shiori",
      "Sakaguchi Tamami",
      "Sato Kaede",
      "Yoda Yuuki",
      "Shinuchi Mai"
    ],
    addgroups: [
      {
        id: "gen4",
        has: [
          "Endo Sakura",
          "Kaki Haruka",
          "Kakehashi Sayaka",
          "Kanagawa Saya",
          "Kitagawa Yuri",
          "Shibata Yuna",
          "Seimiya Rei",
          "Tamura Mayu",
          "Tsutsui Ayame",
          "Hayakawa Seira",
          "Yakubo Mio"
        ]
      }
    ],
    table: [
      {
        member: "Inoue Sayuri",
        slotsSold: [
          "4|4|4|4|4",
          "x|x|x|x|x",
          "2|2|2|2|3",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Saito Asuka",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|6|6",
          "x|x|x|x|x",
          "x|x|x|6|6",
          "x|x|x|6|6",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Nakada Kana",
        slotsSold: [
          "||||4",
          "6|4|4|4|7",
          "||8||",
          "10|7|7|7|9",
          "7|6|4|4|4",
          "12|10|9|10|6"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "4|4|4|4|4",
          "2|2|2|2|3",
          "3|3|2|2|3",
          "x|x|x|x|x",
          "3|2|2|2|3",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Hoshino Minami",
        slotsSold: [
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x||",
          "x|x|x||",
          "x|x|x||",
          "||||",
          "x|x|x||",
          "x|x|x||"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "||||",
          "6|4|4|4|6",
          "||7||",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "|13|11|9|8"
        ]
      },
      {
        member: "Kitano Hinako",
        slotsSold: [
          "4|3|3|3|4",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "|||x|x",
          "|||x|x",
          "|||x|x",
          "|||x|x",
          "|||x|x",
          "|||x|x"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "4|3|3|3|3",
          "2|2|2|2|2",
          "3|2|2|2|3",
          "2|2|2|2|3",
          "3|2|2|2|2",
          "3|3|2|2|2"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "||4|4|4",
          "2|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|3|4",
          "4|3|2|2|4",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "||||4",
          "3|2|2|2|3",
          "4|3|3|3|4",
          "4|3|3|3|4",
          "4|3|3|3|3",
          "4|3|3|2|3"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "3|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "||||",
          "6|4|4|4|5",
          "8|5|5|5|5",
          "6|5|5|4|7",
          "8|5|5|5|5",
          "8|6|6|4|4"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "4|4|4|4|4",
          "2|2|2|2|2",
          "4|2|2|3|3",
          "2|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "||||",
          "4|2|3|3|3",
          "4|3|3|3|4",
          "5|4|4|4|4",
          "5|4|4|4|4",
          "6|4|3|3|4"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "||||4",
          "3|2|2|2|3",
          "4|3|4|3|4",
          "4|3|3|3|4",
          "4|3|3|3|3",
          "5|4|3|4|4"
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
        member: "Oozono Momoko",
        slotsSold: [
          "3|3|2|2|3",
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
          "4|3|3|3|5",
          "6|4|4|4|4",
          "7|4|4|4|7",
          "7|5|4|4|5",
          "9|5|4|5|5"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "||4|4|4",
          "3|2|2|2|3",
          "4|4|4|3|5",
          "4|3|2|3|4",
          "4|3|3|2|4",
          "4|2|2|3|3"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "|7|6|7|",
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
          "|5|4|5|6",
          "||||",
          "|11|7|9|",
          "12|8|6|6|4",
          "||||11"
        ]
      },
      {
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||7||",
          "||||",
          "||||",
          "||||",
          "||16|15|14"
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
          "3|3|3||x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x"
        ]
      },
      {
        member: "Kaki Haruka",
        slotsSold: [
          "3|3|3||x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "3|3|3||x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "4|4|4||x",
          "3|2|2|6|x",
          "3|3|3|6|x",
          "3|3|2|7|x",
          "3|3|3|7|x",
          "4|3|3|6|x"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "x|x|x|x|x",
          "6|4|4||x",
          "6|6|5||x",
          "6|5|5|11|x",
          "6|5|5|11|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "||4|x|x",
          "4|3|3||x",
          "4|3|3||x",
          "4|3|3|10|x",
          "4|3|3|9|x",
          "4|4|3|9|x"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "x|x|x|x|x",
          "3|3|2|6|x",
          "3|3|3|6|x",
          "4|3|3|6|x",
          "4|3|3|6|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "3|3|2||x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x",
          "2|2|2|5|x"
        ]
      },
      {
        member: "Tsutsui Ayame",
        slotsSold: [
          "3|3|3||x",
          "2|2|2|5|x",
          "3|2|2|5|x",
          "3|2|2|5|x",
          "3|2|2|5|x",
          "3|2|2|5|x"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "|||x|x",
          "4|4|4||x",
          "5|4|4||x",
          "5|4|4|10|x",
          "5|5|4|9|x",
          "5|4|4|9|x"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "x|x|x|x|x",
          "3|3|2|7|x",
          "4|3|3|7|x",
          "4|3|3|7|x",
          "4|3|3|7|x",
          "x|x|x|x|x"
        ]
      }
    ]
  },
  {
    cd: {
      num: 24,
      type: "Single",
      title: "夜明けまで強がらなくてもいい",
      release: "2019-09-04"
    },
    lastDraw: 17,
    meetDates: [
      "2019-09-16",
      "2019-10-22",
      "2019-11-09",
      "2019-11-17",
      "2019-11-24",
      "2019-12-15"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Hori Miona",
      "Kitano Hinako",
      "Ikuta Erika",
      "Saito Asuka",
      "Sakurai Reika",
      "Shiraishi Mai",
      "Takayama Kazumi",
      "Hoshino Minami",
      "Matsumura Sayuri",
      "Umezawa Minami",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Tsutsui Ayame",
      "Shinuchi Mai"
    ],
    addgroups: [
      {
        id: "gen4",
        has: [
          "Endo Sakura",
          "Kaki Haruka",
          "Kakehashi Sayaka",
          "Kanagawa Saya",
          "Kitagawa Yuri",
          "Kuromi Haruka",
          "Sato Rika",
          "Shibata Yuna",
          "Seimiya Rei",
          "Tamura Mayu",
          "Tsutsui Ayame",
          "Hayakawa Seira",
          "Hayashi Runa",
          "Matsuo Miyu",
          "Yakubo Mio",
          "Yumiki Nao"
        ]
      }
    ],
    table: [
      {
        member: "Nakada Kana",
        slotsSold: [
          "||||",
          "||||",
          "|9|8|11|",
          "|10|9||",
          "|13|11|12|",
          "11|8|8|7|5"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "3|2|2|3|3",
          "5|5|4|5|4",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "3|2|2|3|3",
          "3|2|2|3|3"
        ]
      },
      {
        member: "Wada Maaya",
        slotsSold: [
          "x|x|x||",
          "x|x|||",
          "x|x|x||",
          "x|x|||",
          "x|x|x||",
          "x|x|||"
        ]
      },
      {
        member: "Itou Jyunna",
        slotsSold: [
          "||||",
          "||||",
          "10|5|5|7|7",
          "||||",
          "x|x|x|x|x",
          "|16|14|17|17"
        ]
      },
      {
        member: "Kitano Hinako",
        slotsSold: [
          "2|3|3|3|3",
          "5|3|4|4|4",
          "3|2|3|2|3",
          "2|2|2|2|3",
          "3|2|2|2|3",
          "2|2|2|2|3"
        ]
      },
      {
        member: "Sasaki Kotoko",
        slotsSold: [
          "|||x|x",
          "||x|x|x",
          "|||x|x",
          "||x|x|x",
          "|||x|x",
          "||x|x|x"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "2|2|2|2|3",
          "3|3|3|3|3",
          "3|2|2|3|2",
          "3|2|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "3|2|3|3|3",
          "5|4|5|5|5",
          "3|2|2|2|3",
          "3|2|3|3|4",
          "4|3|3|3|3",
          "4|3|3|3|3"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "3|2|2|2|2",
          "4|4|5|4|4",
          "4|3|3|3|3",
          "3|2|3|3|3",
          "3|3|3|3|3",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Hori Miyona",
        slotsSold: [
          "||||",
          "||||",
          "2|2|2|2|2",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "||||",
          "||||",
          "|6|5|7|9",
          "13|6|5|6|11",
          "13|10|9|10|6",
          "6|5|5|5|4"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "3|2|2|3|3",
          "4|4|4|4|4",
          "2|2|2|2|2",
          "3|2|2|2|2",
          "3|2|3|3|3",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "|5|4|5|5",
          "||7|9|",
          "6|4|4|4|5",
          "5|4|4|5|5",
          "6|5|4|5|5",
          "6|4|4|4|5"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "3|3|3|3|3",
          "4|4|4|4|4",
          "3|2|2|3|3",
          "3|2|2|3|3",
          "3|3|2|3|3",
          "3|2|2|2|3"
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
          "2|x|x|x|x",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Sakaguchi Tamami",
        slotsSold: [
          "|5|||",
          "||||",
          "5|3|3|4|3",
          "7|4|4|5|8",
          "9|6|6|6|10",
          "5|4|4|4|6"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "5|4|4|4|5",
          "8|8|8|9|9",
          "4|3|3|3|4",
          "4|3|3|3|4",
          "5|3|3|4|4",
          "4|3|3|3|4"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "||||",
          "||16|17|17"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||||",
          "x|x|x|x|x",
          "|8|9|10|12",
          "||||",
          "x|x|x|x|x",
          "16|15|14|14|10"
        ]
      },
      {
        member: "Yamashita Mizuki",
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
        member: "Yoshida Ayano Cristi",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||17|15|"
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
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4"
        ]
      },
      {
        member: "Kaki Haruka",
        slotsSold: [
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "1|2|2|2|4"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "3|2|2|2|",
          "4|3|3|3|7",
          "3|2|2|2|6",
          "3|2|2|2|7",
          "3|2|2|2|6",
          "3|2|2|2|6"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "||5|5|x",
          "x|x|x|x|x",
          "||||4",
          "|9|8|11|",
          "9|7|5|5|x",
          "11|8|5|5|x"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "3|3|3|3|",
          "5|4|4|5|8",
          "4|3|3|3|8",
          "3|3|3|3|8",
          "4|3|3|4|8",
          "3|3|3|3|8"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "3|3|3|3|",
          "5|5|4|4|9",
          "3|3|3|3|8",
          "3|2|2|3|8",
          "3|3|3|3|7",
          "3|3|3|2|7"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "x|x|x|x|x",
          "2|2|2|2|4"
        ]
      },
      {
        member: "Tsutsui Ayame",
        slotsSold: [
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4",
          "2|2|2|2|4"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "3|2|2|3|",
          "5|4|5|5|7",
          "3|3|2|3|7",
          "3|2|2|2|8",
          "x|x|x|x|x",
          "3|2|2|2|7"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "5|4|4|4|x",
          "||||x",
          "5|4|4|4|",
          "4|4|4|4|",
          "6|4|4|5|14",
          "5|4|4|4|15"
        ]
      }
    ]
  },
  {
    cd: {
      num: 25,
      type: "Single",
      title: "しあわせの保護色",
      release: "2020-03-25"
    },
    lastDraw: 20,
    meetDates: [
      "2020-03-29",
      "2020-04-11",
      "2020-04-25",
      "2020-05-02",
      "2020-05-16",
      "2020-07-11"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Hori Miona",
      "Kitano Hinako",
      "Ikuta Erika",
      "Inoue Sayuri",
      "Saito Asuka",
      "Shiraishi Mai",
      "Takayama Kazumi",
      "Nakada Kana",
      "Higuchi Hina",
      "Hoshino Minami",
      "Matsumura Sayuri",
      "Wada Maaya",
      "Iwamoto Renka",
      "Umezawa Minami",
      "Oozono Momoko",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Shinuchi Mai"
    ],
    table: [
      {
        member: "Nakada Kana",
        slotsSold: [
          "||||",
          "8|6|5|5|6",
          "x|x|x|x|x",
          "||||",
          "8|6|5|4|4",
          "?|?|?|?|?"
        ]
      },
      {
        member: "Higuchi Hina",
        slotsSold: [
          "3|3|3|3|4",
          "3|3|3|3|3",
          "x|x|x|x|x",
          "5|3|3|3|4",
          "x|x|x|x|x",
          "3|3|3|3|3"
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
        member: "Itou Jyunna",
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
          "2|2|2|2|3",
          "3|3|3|3|4",
          "4|3|3|3|4",
          "2|2|2|2|3",
          "4|3|3|3|4",
          "3|2|3|3|4"
        ]
      },
      {
        member: "Shinuchi Mai",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "2|2|2|2|2",
          "x|x|x|x|x",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "3|2|2|2|3",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "3|2|2|2|3",
          "3|2|2|2|3"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "4|2|2|3|3",
          "5|3|4|4|5",
          "5|4|5|5|4",
          "5|4|4|4|4",
          "4|4|3|3|3",
          "4|4|3|3|3"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "13|5|9|10|7",
          "17|15|15|15|4"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "3|2|2|2|3",
          "3|3|2|3|3",
          "3|3|3|3|3",
          "4|3|3|3|3",
          "3|2|2|3|3",
          "3|3|2|3|3"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "|5|5|6|6",
          "|6|6|8|",
          "||10||",
          "10|5|5|5|9",
          "|6|6|9|",
          "18|5|5|6|6"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "2|2|2|2|2",
          "3|2|2|2|2",
          "3|3|2|3|3",
          "3|2|2|2|3",
          "3|3|2|3|3",
          "3|3|3|3|3"
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
        member: "Oozono Momoko",
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
          "|6|5||",
          "||8||",
          "||||",
          "||6|11|",
          "||12||",
          "|12|8|10|17"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "3|3|2|3|3",
          "8|5|5|5|6",
          "9|6|5|6|7",
          "7|5|5|5|6",
          "8|5|4|5|6",
          "6|5|4|5|4"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "x|x|x|x|x",
          "||||",
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
          "||13||"
        ]
      },
      {
        member: "Yamashita Mizuki",
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
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|3",
          "2|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|2|3"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "||||",
          "?|?|?|?|?",
          "?|?|?|?|?",
          "?|?|?|?|?",
          "?|?|?|?|?",
          "?|?|?|?|?"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "3|2|2|3|3",
          "5|3|3|3|3",
          "5|4|4|4|5",
          "4|3|3|3|4",
          "5|4|4|4|5",
          "5|4|3|4|4"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "2|2|2|2|2",
          "x|x|2|2|2",
          "?|?|?|?|?",
          "2|2|2|2|2",
          "?|?|?|?|?",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Tsutsui Ayame",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "x|x|x|x|x",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|2|3",
          "3|2|2|2|3"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "|6|5|5|",
          "8|5|5|4|5",
          "x|x|x|4|5",
          "|7|6|8|11",
          "|||3|4",
          "|||3|4"
        ]
      }
    ]
  },
  {
    cd: {
      num: 26,
      type: "Single",
      title: "僕は僕を好きになる",
      release: "2021-01-27"
    },
    lastDraw: 12,
    meetDates: [
      "2021-01-31",
      "2021-02-07",
      "2021-02-14",
      "2021-02-27",
      "2021-03-14",
      "2021-03-21"
    ],
    sbt: [
      "Iwamoto Renka",
      "Umezawa Minami",
      "Oozono Momoko",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Seimiya Rei",
      "Tamura Mayu",
      "Tsutsui Ayame"
    ],
    addgroups: [
      {
        id: "gen4",
        has: [
          "Endo Sakura",
          "Kaki Haruka",
          "Kakehashi Sayaka",
          "Kanagawa Saya",
          "Kitagawa Yuri",
          "Kuromi Haruka",
          "Sato Rika",
          "Shibata Yuna",
          "Seimiya Rei",
          "Tamura Mayu",
          "Tsutsui Ayame",
          "Hayakawa Seira",
          "Hayashi Runa",
          "Matsuo Miyu",
          "Yakubo Mio",
          "Yumiki Nao"
        ]
      }
    ],
    table: [
      {
        member: "Higuchi Hina",
        slotsSold: [
          "4|5|5|3|4",
          "||||",
          "||||",
          "||||",
          "11|11|11|11|",
          "12|12|11|10|7"
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
        member: "Itou Jyunna",
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
          "5|5|5|4|5",
          "6||6||",
          "6|6|6|6|6",
          "8|7|7|6|7",
          "9|7|7|7|7",
          "8|8|7|7|5"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "||5||",
          "||||",
          "||||",
          "||||",
          "10|10|9|10|10",
          "12|12|12|12|11"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "||||",
          "||||",
          "||7||",
          "||||",
          "||10|11|",
          "11|10|8|8|5"
        ]
      },
      {
        member: "Yamazaki Rena",
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
        member: "Watanabe Miria",
        slotsSold: [
          "|5|5||5",
          "||||",
          "|7|6|7|7",
          "||9||",
          "11|10|9|10|10",
          "11|10|10|9|8"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "x|x|x|x|x",
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
          "|5|||",
          "5|6|5|4|5",
          "6|7|6|7|6",
          "6|7|7|7|6",
          "7|7|7|7|7",
          "7|6|7|6|7"
        ]
      },
      {
        member: "Umezawa Minami",
        slotsSold: [
          "4|3|3|3|4",
          "3|4|4|3|4",
          "3|3|4|3|3",
          "4|4|3|3|3",
          "4|5|4|4|4",
          "4|4|3|5|4"
        ]
      },
      {
        member: "Oozono Momoko",
        slotsSold: [
          "5|5|4|4|4",
          "6|5|5|5|5",
          "5|5|5|5|5",
          "5|5|5|5|5",
          "5|5|6|5|4",
          "6|5|6|5|5"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "4|5|4|4|5",
          "4|5|4|5|4",
          "4|4|4|5|3",
          "4|4|5|4|4",
          "4|4|4|4|4",
          "3|3|3|4|3"
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
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "7|6|6|7|5"
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
          "4|3|3|4|3",
          "3|4|3|3|3",
          "4|3|3|4|3",
          "5|3|4|3|3",
          "7|6|7|6|7",
          "?|?|?|?|?"
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
          "3|4|3|4|3",
          "3|3|3|4|5",
          "4|3|3|4|4",
          "3|3|3|4|4",
          "3|4|3|4|5",
          "3|3|3|3|4"
        ]
      },
      {
        member: "Endo Sakura",
        slotsSold: [
          "3|3|4|3|3",
          "3|4|4|5|3",
          "3|3|3|4|4",
          "4|3|4|3|3",
          "4|3|3|3|3",
          "5|3|4|3|4"
        ]
      },
      {
        member: "Kaki Haruka",
        slotsSold: [
          "4|3|3|4|3",
          "4|4|3|4|4",
          "4|3|4|3|5",
          "3|5|3|3|3",
          "3|3|3|3|4",
          "4|3|4|3|3"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "|4|5|5|5",
          "5|5|6|6|",
          "6|5|5|5|5",
          "7|6|7|7|6",
          "7|6|6|7|7",
          "7|7|5|7|6"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "||||",
          "||||",
          "|7|5|7|",
          "||9||",
          "11|10|8|9|10",
          "11|11|9|9|10"
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
          "x|x|x|x|x",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Rika",
        slotsSold: [
          "||||",
          "||||",
          "||7||",
          "||9||",
          "|10|9|10|11",
          "12|11|11|11|10"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "|11|10|10|",
          "|||12|"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "4|5|||4",
          "5||||",
          "7|5|4|4|5",
          "5|6|5|6|7",
          "5|7|5|7|5",
          "7|6|6|6|5"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "4|4|4|4|5",
          "5|4|4|5|5",
          "3|3|3|4|3",
          "3|4|5|4|4",
          "5|4|4|3|3",
          "4|3|3|4|4"
        ]
      },
      {
        member: "Tsutsui Ayame",
        slotsSold: [
          "5|4|5|4|5",
          "4|5|5|6|5",
          "5|5|4|5|4",
          "5|4|5|5|4",
          "5|6|5|5|6",
          "5|5|6|5|4"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "4|4|3|3|4",
          "4|3|4|4|5",
          "5|4|3|4|4",
          "4|5|4|5|4",
          "4|4|5|4|4",
          "4|4|4|4|4"
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
          "x|x|x|x|x",
          "||||",
          "||||"
        ]
      },
      {
        member: "Yumiki Nao",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      }
    ]
  },
  {
    cd: {
      num: 27,
      type: "Single",
      title: "ごめんねFingers crossed",
      release: "2021-06-09"
    },
    lastDraw: 15,
    meetDates: [
      "2021-06-13",
      "2021-06-27",
      "2021-07-04",
      "2021-07-25",
      "2021-08-08",
      "2021-08-29"
    ],
    sbt: [
      "Higuchi Hina",
      "Matsumura Sayuri",
      "Iwamoto Renka",
      "Umezawa Minami",
      "Oozono Momoko",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Seimiya Rei",
      "Tamura Mayu",
      "Tsutsui Ayame",
      "Hayakawa Seira"
    ],
    addgroups: [
      {
        id: "gen4",
        has: [
          "Endo Sakura",
          "Kaki Haruka",
          "Kakehashi Sayaka",
          "Kanagawa Saya",
          "Kitagawa Yuri",
          "Kuromi Haruka",
          "Sato Rika",
          "Shibata Yuna",
          "Seimiya Rei",
          "Tamura Mayu",
          "Tsutsui Ayame",
          "Hayakawa Seira",
          "Hayashi Runa",
          "Matsuo Miyu",
          "Yakubo Mio",
          "Yumiki Nao"
        ]
      }
    ],
    table: [
      {
        member: "Higuchi Hina",
        slotsSold: [
          "2|3|3|3|4",
          "||||",
          "||||",
          "||11||",
          "||||",
          "11|12|9|9|3"
        ]
      },
      {
        member: "Matsumura Sayuri",
        slotsSold: [
          "||||",
          "7|6|7|7|7",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "x|x|x|x|x"
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
        member: "Itou Jyunna",
        slotsSold: [
          "4|5|5|5|5",
          "x|x|x|x|x",
          "6|6|5|6|6",
          "7|6|5|7|5",
          "7|6|5|6|5",
          "5|5|5|4|5"
        ]
      },
      {
        member: "Kitano Hinako",
        slotsSold: [
          "2|2|2|3|3",
          "4|4|2|4|4",
          "4|2|2|4|3",
          "3|2|2|2|2",
          "5|4|4|4|4",
          "4|4|3|3|2"
        ]
      },
      {
        member: "Suzuki Ayane",
        slotsSold: [
          "4|4|4|5|4",
          "||6||7",
          "||||",
          "||||",
          "||||",
          "||11|10|4"
        ]
      },
      {
        member: "Terada Ranze",
        slotsSold: [
          "3|4|2|4|3",
          "||||",
          "||||",
          "||||",
          "||||",
          "6|5|4|3|2"
        ]
      },
      {
        member: "Yamazaki Rena",
        slotsSold: [
          "3|4|4|4|x",
          "||||x",
          "||||x",
          "||||x",
          "||||x",
          "|||12|x"
        ]
      },
      {
        member: "Watanabe Miria",
        slotsSold: [
          "2|3|3|2|3",
          "4|4|4|4|4",
          "4|4|4|4|4",
          "4|4|4|4|4",
          "4|4|4|4|4",
          "4|4|3|3|2"
        ]
      },
      {
        member: "Itou Riria",
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
          "2|2|2|2|2",
          "4|3|3|3|3",
          "4|3|3|3|3",
          "4|4|3|3|3",
          "4|3|3|3|3",
          "4|3|2|2|2"
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
        member: "Oozono Momoko",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|3|3|3",
          "2|3|3|3|3",
          "3|3|3|3|3",
          "2|2|2|2|3"
        ]
      },
      {
        member: "Kubo Shiori",
        slotsSold: [
          "x|x|x|x|x",
          "x|x|x|x|x",
          "1|1|2|1|2",
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
          "||||12"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "|||12|9"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
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
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "1|2|2|2|2",
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
          "1|2|2|2|2"
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
          "1|2|2|2|1"
        ]
      },
      {
        member: "Kakehashi Sayaka",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|3|3",
          "3|2|2|2|3",
          "2|2|2|2|2",
          "3|2|2|3|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "2|4|3|5|",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||15"
        ]
      },
      {
        member: "Kitagawa Yuri",
        slotsSold: [
          "||||",
          "?|?|?|?|?",
          "?|?|?|?|?",
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
          "x|x|x|x|x",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Rika",
        slotsSold: [
          "4||||",
          "||||",
          "||||",
          "||11||",
          "4|3|3|4|4",
          "||13|14|7"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "4|4|4|4|5",
          "||5||",
          "||8||",
          "||5|10|",
          "||9|12|12",
          "14|13|6|9|9"
        ]
      },
      {
        member: "Seimiya Rei",
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
        member: "Tamura Mayu",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|1|2|2"
        ]
      },
      {
        member: "Tsutsui Ayame",
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
        member: "Hayakawa Seira",
        slotsSold: [
          "x|x|x|x|x",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|1|2|2"
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
          "||15||15"
        ]
      },
      {
        member: "Yakubo Mio",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||11||",
          "||||"
        ]
      },
      {
        member: "Yumiki Nao",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||13"
        ]
      }
    ]
  },
  {
    cd: {
      num: 28,
      type: "Single",
      title: "君に叱られた",
      release: "2021-09-22"
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
      "Tsutsui Ayame",
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
        member: "Itou Riria",
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
        member: "Tsutsui Ayame",
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
      type: "Best",
      title: "Time flies",
      release: "2021-12-15"
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
      "Tsutsui Ayame",
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
        member: "Itou Riria",
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
        member: "Tsutsui Ayame",
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
      type: "Single",
      title: "Actually...",
      release: "2022-03-23"
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
      "Tsutsui Ayame",
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
        member: "Itou Riria",
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
        member: "Tsutsui Ayame",
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
      type: "Single",
      title: "好きというのはロックだぜ!",
      release: "2022-08-31"
    },
    lastDraw: 11,
    meetDates: [
      "2022-09-04",
      "2022-09-18",
      "2022-09-25",
      "2022-10-09",
      "2022-11-13",
      "2022-12-04"
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
      "Tsutsui Ayame",
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
          "7|6|4|3|2"
        ]
      },
      {
        member: "Itou Riria",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||7||5",
          "||||",
          "||||"
        ]
      },
      {
        member: "Iwamoto Renka",
        slotsSold: [
          "3|3|3|3|3",
          "5|5|4|4|4",
          "6|5|4|5|4",
          "6|4|4|4|4",
          "5|4|4|4|4",
          "4|4|3|3|2"
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
          "4|3|3|4|",
          "||||",
          "||||",
          "||9||",
          "5|5|4|5|6",
          "||||8"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "2|3|3|3|3",
          "||6||",
          "||||",
          "||||",
          "||||",
          "|11|10|10|5"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||||",
          "||||",
          "|7|5||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||3||",
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
          "2|2|2|3|3",
          "4|4|4|4|4",
          "3|4|4|4|4",
          "3|3|3|4|4",
          "3|3|3|3|3",
          "3|3|3|3|2"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "2|2|2|2|2",
          "4|4|4|4|3",
          "4|4|4|4|4",
          "4|4|4|4|3",
          "3|4|3|4|3",
          "3|3|3|3|2"
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
          "||4||",
          "||||",
          "||||",
          "||8||",
          "||||",
          "||10||"
        ]
      },
      {
        member: "Sato Rika",
        slotsSold: [
          "3|4|3|4|4",
          "x|x|x|x|x",
          "x|x|x|x|x",
          "5|5|5|6|6",
          "7|8|7|8|8",
          "7|8|7|7|5"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "3|2|2|2|3",
          "5|4|4|4|4",
          "5|4|4|4|4",
          "4|4|3|4|3",
          "4|4|3|3|4",
          "3|3|2|2|2"
        ]
      },
      {
        member: "Seimiya Rei",
        slotsSold: [
          "3|3|3|4|4",
          "||6||",
          "||||",
          "||||",
          "||||",
          "9|9|5|6|4"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "2|2|2|2|3",
          "3|3|2|3|3",
          "3|3|3|3|3",
          "2|3|2|2|3",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Tsutsui Ayame",
        slotsSold: [
          "3|4|3|4|",
          "6|6|5||",
          "7|7|6||",
          "8|7|6|7|8",
          "7|7|4|5|7",
          "5|5|4|4|4"
        ]
      },
      {
        member: "Hayashi Runa",
        slotsSold: [
          "||4||4",
          "||||",
          "||||7",
          "8|7|7|7|6",
          "11|10|10|10|10",
          "11|11|10|10|9"
        ]
      },
      {
        member: "Matsuo Miyu",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "|||7|",
          "||||",
          "10|9|3|6|5"
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
          "3|3|3|3|3",
          "4|4|4|4|3",
          "4|4|4|4|3",
          "4|4|3|3|3",
          "3|3|3|3|2"
        ]
      },
      {
        member: "Ioki Mao",
        slotsSold: [
          "x|2|2|2|3",
          "x|3|3|3|4",
          "x|3|3|4|4",
          "x|3|3|3|4",
          "x|2|3|3|3",
          "x|2|2|2|3"
        ]
      },
      {
        member: "Ikeda Teresa",
        slotsSold: [
          "x|2|2|2|2",
          "x|3|2|3|4",
          "x|3|3|3|4",
          "x|3|3|3|4",
          "x|3|3|3|4",
          "x|2|3|3|3"
        ]
      },
      {
        member: "Ichinose Miku",
        slotsSold: [
          "x|2|2|2|3",
          "x|3|3|3|3",
          "x|2|3|3|4",
          "x|2|3|3|3",
          "x|2|3|3|3",
          "x|2|3|3|3"
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
          "x|3|3|3|3",
          "x|4|5|5|",
          "x|6|6|6|7",
          "x|4|5|6|6",
          "x|4|4|6|6",
          "x|3|4|4|4"
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
          "x|2|2|2|4",
          "x|3|3|4|4",
          "x|2|2|3|4",
          "x|2|2|3|4",
          "x|2|2|3|3"
        ]
      },
      {
        member: "Sugawara Satsuki",
        slotsSold: [
          "x|2|2|2|2",
          "x|2|2|3|3",
          "x|2|2|3|3",
          "x|2|2|2|2",
          "x|2|2|2|2",
          "x|2|2|2|2"
        ]
      },
      {
        member: "Tomisato Nao",
        slotsSold: [
          "x|2|2|2|3",
          "x|2|2|2|2",
          "x|3|3|4|4",
          "x|2|3|4|4",
          "x|3|3|3|4",
          "x|3|2|3|3"
        ]
      },
      {
        member: "Nakanishi Aruno",
        slotsSold: [
          "x|2|2|3|3",
          "x|4|4|6|6",
          "x|6|6|7|7",
          "x|6|6|7|7",
          "x|5|6|7|7",
          "x|4|4|6|4"
        ]
      }
    ]
  },
  {
    cd: {
      num: 31,
      type: "Single",
      title: "ここにはないもの",
      release: "2022-12-07"
    },
    lastDraw: 12,
    meetDates: [
      "2022-12-25",
      "2023-01-08",
      "2023-01-22",
      "2023-02-19",
      "2023-03-05",
      "2023-03-19"
    ],
    sbt: [
      "Akimoto Manatsu",
      "Saito Asuka",
      "Suzuki Ayane",
      "Iwamoto Renka",
      "Umezawa Minami",
      "Kubo Shiori",
      "Yamashita Mizuki",
      "Yoda Yuuki",
      "Endo Sakura",
      "Kaki Haruka",
      "Kanagawa Saya",
      "Shibata Yuna",
      "Tamura Mayu",
      "Tsutsui Ayame",
      "Yumiki Nao",
      "Sakaguchi Tamami",
      "Hayashi Runa",
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
        member: "Itou Riria",
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
          "4|4|3|4|4",
          "6||6||",
          "||||",
          "||11||",
          "||||",
          "||11||12"
        ]
      },
      {
        member: "Sato Kaede",
        slotsSold: [
          "6|5|4|4|4",
          "||||",
          "||||",
          "||||",
          "||||",
          "9|8|6|5|4"
        ]
      },
      {
        member: "Nakamura Reno",
        slotsSold: [
          "||6||",
          "||7||",
          "||||",
          "||||",
          "||||",
          "?|?|?|?|?"
        ]
      },
      {
        member: "Mukai Hazuki",
        slotsSold: [
          "||5||",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
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
          "1|1|2|1|2",
          "2|2|2|2|2",
          "2|2|2|1|1",
          "2|2|2|1|2",
          "1|1|2|1|2"
        ]
      },
      {
        member: "Kanagawa Saya",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "4|4|4|3|3",
          "3|2|2|3|2",
          "4|4|4|4|4",
          "3|3|3|3|2"
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
          "||11||"
        ]
      },
      {
        member: "Kuromi Haruka",
        slotsSold: [
          "||||",
          "x|x|x||",
          "||5|6|",
          "||12||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Sato Rika",
        slotsSold: [
          "2|2|2|2|2",
          "3|4|4|4|5",
          "8|7|6|8|9",
          "8|8|6|8|9",
          "11|12|10|12|11",
          "12|12|11|9|6"
        ]
      },
      {
        member: "Shibata Yuna",
        slotsSold: [
          "2|2|2|2|2",
          "4|4|4|4|4",
          "5|5|4|4|4",
          "6|4|3|4|3",
          "2|2|2|2|2",
          "5|4|4|4|3"
        ]
      },
      {
        member: "Tamura Mayu",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "x|x|x|x|x"
        ]
      },
      {
        member: "Tsutsui Ayame",
        slotsSold: [
          "3|2|2|3|2",
          "3|3|4|4|4",
          "4|4|4|4|5",
          "4|4|4|4|4",
          "5|5|4|5|5",
          "4|4|4|4|4"
        ]
      },
      {
        member: "Hayakawa Seira",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|2",
          "2|2|2|2|2",
          "3|3|2|2|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Hayashi Runa",
        slotsSold: [
          "2|2|3|2|2",
          "3|4|3|4|4",
          "7|5|5|5|6",
          "8|6|4|6|7",
          "10|10|8|9|10",
          "10|10|8|9|6"
        ]
      },
      {
        member: "Matsuo Miyu",
        slotsSold: [
          "6|6|4|5|4",
          "7|6|3|5|4",
          "||||",
          "|||7|",
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
          "||12||",
          "||5||",
          "||||"
        ]
      },
      {
        member: "Yumiki Nao",
        slotsSold: [
          "2|2|2|2|2",
          "2|3|2|3|3",
          "3|4|3|4|3",
          "3|3|2|2|2",
          "4|4|4|4|4",
          "4|4|4|4|2"
        ]
      },
      {
        member: "Ioki Mao",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|3",
          "3|2|2|3|3",
          "3|2|2|3|3",
          "3|3|3|3|3",
          "3|3|2|2|3"
        ]
      },
      {
        member: "Ikeda Teresa",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "3|2|2|2|2",
          "3|2|2|2|2",
          "3|3|2|3|3",
          "3|2|3|2|2"
        ]
      },
      {
        member: "Ichinose Miku",
        slotsSold: [
          "2|2|2|2|2",
          "3|2|2|2|3",
          "3|3|2|3|3",
          "3|2|2|2|3",
          "3|3|3|3|3",
          "3|2|2|2|2"
        ]
      },
      {
        member: "Inoue Nagi",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|1",
          "2|2|2|2|2",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Okamoto Hina",
        slotsSold: [
          "||||6",
          "||||",
          "||||",
          "||||",
          "||||",
          "||||"
        ]
      },
      {
        member: "Ogawa Aya",
        slotsSold: [
          "4|2|2|3|3",
          "6|3|4|5|6",
          "9|7|6|8|9",
          "9|6|4|6|8",
          "10|8|9|9|9",
          "9|9|5|7|6"
        ]
      },
      {
        member: "Okuda Iroha",
        slotsSold: [
          "||||",
          "||||",
          "||||",
          "||||12",
          "||||",
          "||||"
        ]
      },
      {
        member: "Kawasaki Sakura",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|2",
          "2|2|2|2|3",
          "2|2|2|2|2"
        ]
      },
      {
        member: "Sugawara Satsuki",
        slotsSold: [
          "2|2|2|2|2",
          "2|2|2|2|3",
          "3|3|2|3|3",
          "2|2|2|2|3",
          "3|3|3|3|3",
          "2|2|2|3|2"
        ]
      },
      {
        member: "Tomisato Nao",
        slotsSold: [
          "2|2|2|2|2",
          "4|3|3|4|4",
          "6|4|4|4|6",
          "5|3|2|3|4",
          "6|4|4|4|6",
          "6|4|4|4|4"
        ]
      },
      {
        member: "Nakanishi Aruno",
        slotsSold: [
          "3|2|2|2|2",
          "3|3|2|4|4",
          "5|4|4|4|5",
          "6|4|3|4|4",
          "6|4|4|4|4",
          "3|2|2|2|2"
        ]
      }
    ]
  }
];
const now = new Date().toISOString().slice(0, 10);
const monthDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
function dayInYear(mmdd, year) {
  if (year <= 2e3 || year >= 3e3)
    throw new Error(`Year must be in range 2001~2099 (input year ${year})`);
  let m = parseInt(mmdd.slice(0, 2));
  let d = parseInt(mmdd.slice(3));
  return monthDays[m - 1] + d + (year % 4 == 0 && m > 2 ? 1 : 0);
}
function dayFrom(date, from = now) {
  let year = parseInt(from.slice(0, 4));
  let dayAtFrom = dayInYear(from.slice(5), year);
  let noyearDate = date.length > 5 ? date.slice(5) : date;
  let diff = dayInYear(noyearDate, year) - dayAtFrom;
  return diff >= 0 ? diff : dayInYear(noyearDate, year + 1) + (365 + (year % 0 != 0) - dayAtFrom);
}
function datesToRanges(dates) {
  let from = dates[0];
  return dates.map((x) => dayFrom(x, from));
}
function nearestNumberInSortedArr(target, arr) {
  return arr.reduce(
    (best, curr, currIdx) => {
      let diff = target - curr;
      return Math.abs(diff) < Math.abs(best.diff) ? { val: curr, idx: currIdx, diff } : best;
    },
    { val: arr[0], idx: 0, diff: target - arr[0] }
  );
}
function offsetISOdays(date, days) {
  let d = new Date(date);
  d.setDate(d.getDate() + days);
  return { date: d.toISOString().slice(0, 10), obj: d };
}
const isISODate = (d) => d.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
function nth(n) {
  return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th";
}
function nthColor(n) {
  const palette = [
    //from https://sashamaps.net/docs/resources/20-colors
    // c.f. https://stats.stackexchange.com/questions/118033/best-series-of-colors-to-use-for-differentiating-series-in-publication-quality
    "#911eb4",
    //purple
    "#3cb44b",
    //green
    "#4363d8",
    //blue
    "#e6194b",
    //red
    "#42d4f4",
    //cyan
    "#f58231",
    //orange
    "#f032e6",
    //magenta
    "#469990",
    //teal
    "#fabed4",
    //pink
    "#dcbeff",
    //lavender
    "#9a6324",
    //brown
    "#fffac8",
    //beige
    "#800000",
    //maroon
    "#aaffc3",
    //mint
    "#000075",
    //navy
    "#ffe119",
    //yellow
    "#bfef45",
    //lime
    "#808000",
    //olive
    "#ffd8b1",
    //apricot
    "#000000"
    //black
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
const membersdata = [
  {
    member: "Akimoto Manatsu",
    kanji: "秋元 真夏",
    furi: "あきもと まなつ",
    gen: 1,
    dob: "1993-08-20",
    from: "埼玉",
    bloodtype: "B",
    height: 154,
    status: ""
  },
  {
    member: "Ikuta Erika",
    kanji: "生田絵梨花",
    furi: "いくた えりか",
    gen: 1,
    dob: "1997-01-22",
    from: "デュッセルドルフ",
    bloodtype: "A",
    height: 160,
    status: "2021-12-31"
  },
  {
    member: "Ikoma Rina",
    kanji: "生駒 里奈",
    furi: "いこま りな",
    gen: 1,
    dob: "1995-12-29",
    from: "秋田",
    bloodtype: "AB",
    height: 153,
    status: "2018-05-06"
  },
  {
    member: "Itou Marika",
    kanji: "伊藤 万理華",
    furi: "いとう まりか",
    gen: 1,
    dob: "1996-02-20",
    from: "神奈川",
    bloodtype: "O",
    height: 156,
    status: "2017-12-23"
  },
  {
    member: "Inoue Sayuri",
    kanji: "井上 小百合",
    furi: "いのうえ さゆり",
    gen: 1,
    dob: "1994-12-14",
    from: "埼玉",
    bloodtype: "B",
    height: 156,
    status: "2020-04-27"
  },
  {
    member: "Etou Misa",
    kanji: "衛藤 美彩",
    furi: "えとう みさ",
    gen: 1,
    dob: "1993-01-04",
    bloodtype: "AB",
    from: "大分",
    height: 163,
    status: "2019-03-31"
  },
  {
    member: "Kawamura Mahiro",
    kanji: "川村 真洋",
    furi: "かわむら まひろ",
    gen: 1,
    dob: "1995-07-23",
    from: "大阪",
    bloodtype: "A",
    height: 158,
    status: "2018-03-31"
  },
  {
    member: "Kawago Hina",
    kanji: "川後 陽菜",
    furi: "かわご ひな",
    gen: 1,
    dob: "1998-03-22",
    from: "長崎",
    bloodtype: "O",
    height: 161,
    status: "2018-12-20"
  },
  {
    member: "Saito Asuka",
    kanji: "齋藤 飛鳥",
    furi: "さいとう  あすか",
    gen: 1,
    dob: "1998-08-10",
    from: "東京",
    bloodtype: "O",
    height: 158,
    status: ""
  },
  {
    member: "Saitou Chiharu",
    kanji: "斎藤 ちはる",
    furi: "さいとう ちはる",
    gen: 1,
    dob: "1997-02-17",
    from: "埼玉",
    bloodtype: "A",
    height: 166,
    status: "2018-07-16"
  },
  {
    member: "Saitou Yuuri",
    kanji: "斉藤 優里",
    furi: "さいとう ゆうり",
    gen: 1,
    dob: "1993-07-20",
    from: "東京",
    bloodtype: "O",
    height: 157,
    status: "2019-06-30"
  },
  {
    member: "Sakurai Reika",
    kanji: "桜井 玲香",
    furi: "さくらい れいか",
    gen: 1,
    dob: "1994-05-16",
    bloodtype: "A",
    from: "神奈川",
    height: 155,
    status: "2019-09-01"
  },
  {
    member: "Takayama Kazumi",
    kanji: "高山 一実",
    furi: "たかやま かずみ",
    gen: 1,
    dob: "1994-02-08",
    from: "千葉",
    bloodtype: "A",
    height: 162,
    status: "2021-11-21"
  },
  {
    member: "Nakada Kana",
    kanji: "中田 花奈",
    furi: "なかだ かな",
    gen: 1,
    dob: "1994-08-06",
    from: "埼玉",
    bloodtype: "A",
    height: 158,
    status: "2020-10-25"
  },
  {
    member: "Nakamoto Himeka",
    kanji: "中元 日芽香",
    furi: "なかもと ひめか",
    gen: 1,
    dob: "1996-04-13",
    from: "広島",
    bloodtype: "O",
    height: 161,
    status: "2017-11-19"
  },
  {
    member: "Nishino Nanase",
    kanji: "西野 七瀬",
    furi: "にしの ななせ",
    gen: 1,
    dob: "1994-05-25",
    from: "大阪",
    bloodtype: "O",
    height: 159,
    status: "2018-12-31"
  },
  {
    member: "Noujou Ami",
    kanji: "能條 愛未",
    furi: "のうじょう あみ",
    gen: 1,
    dob: "1994-10-18",
    from: "神奈川",
    bloodtype: "A",
    height: 162,
    status: "2018-12-15"
  },
  {
    member: "Hashimoto Nanami",
    kanji: "橋本 奈々未",
    furi: "はしもと ななみ",
    gen: 1,
    dob: "1993-02-20",
    from: "北海道",
    bloodtype: "B",
    height: 163,
    status: "2017-02-20"
  },
  {
    member: "Higuchi Hina",
    kanji: "樋口 日奈",
    furi: "さいとう  あすか",
    gen: 1,
    dob: "1998-01-31",
    from: "東京",
    bloodtype: "A",
    height: 161,
    status: ""
  },
  {
    member: "Fukagawa Mai",
    kanji: "深川 麻衣",
    furi: "ふかがわ まい",
    gen: 1,
    dob: "1991-03-29",
    from: "静岡",
    bloodtype: "O",
    height: 162,
    status: "2016-06-16"
  },
  {
    member: "Hoshino Minami",
    kanji: "星野 みなみ",
    furi: "ほしの みなみ",
    gen: 1,
    dob: "1998-02-06",
    from: "神奈川",
    bloodtype: "B",
    height: 155,
    status: "2022-02-12"
  },
  {
    member: "Matsumura Sayuri",
    kanji: "松村 沙友理",
    furi: "まつむら さゆり",
    gen: 1,
    dob: "1992-08-27",
    from: "大阪",
    bloodtype: "B",
    height: 164,
    status: "2021-07-13"
  },
  {
    member: "Wakatsuki Yumi",
    kanji: "若月 佑美",
    furi: "わかつき ゆみ",
    gen: 1,
    dob: "1994-06-27",
    from: "静岡",
    bloodtype: "O",
    height: 157,
    status: "2018-11-30"
  },
  {
    member: "Wada Maaya",
    kanji: "和田 まあや",
    furi: "わだ まあや",
    gen: 1,
    dob: "1998-04-23",
    from: "広島",
    bloodtype: "O",
    height: 161,
    status: ""
  },
  {
    member: "Itou Karin",
    kanji: "伊藤 かりん",
    furi: "いとう かりん",
    gen: 2,
    dob: "1993-05-26",
    from: "神奈川",
    bloodtype: "O",
    height: 153,
    status: "2019-05-24"
  },
  {
    member: "Itou Jyunna",
    kanji: "伊藤 純奈",
    furi: "いとう じゅんな",
    gen: 2,
    dob: "1998-08-27",
    from: "神奈川",
    bloodtype: "A",
    height: 166,
    status: "2021-08-31"
  },
  {
    member: "Sagara Iori",
    kanji: "相楽 伊織",
    furi: "さがら いおり",
    gen: 2,
    dob: "1997-11-26",
    from: "埼玉",
    bloodtype: "O",
    height: 164,
    status: "2018-07-16"
  },
  {
    member: "Sasaki Kotoko",
    kanji: "佐々木 琴子",
    furi: "ささき ことこ",
    gen: 2,
    dob: "1998-08-28",
    from: "埼玉",
    bloodtype: "A",
    height: 163,
    status: "2020-03-31"
  },
  {
    member: "Shinuchi Mai",
    kanji: "新内 眞衣",
    furi: "しんうち まい",
    gen: 2,
    dob: "1992-01-22",
    from: "埼玉",
    bloodtype: "B",
    height: 165,
    status: "2022-02-10"
  },
  {
    member: "Terada Ranze",
    kanji: "寺田 蘭世",
    furi: "てらだ らんぜ",
    gen: 2,
    dob: "1998-09-23",
    from: "東京",
    bloodtype: "不明",
    height: 155,
    status: "2021-12-12"
  },
  {
    member: "Kitano Hinako",
    kanji: "北野 日奈子",
    furi: "きたの ひなこ",
    gen: 2,
    dob: "1996-07-17",
    from: "千葉",
    bloodtype: "O",
    height: 158,
    status: "2022-04-30"
  },
  {
    member: "Suzuki Ayane",
    kanji: "鈴木 絢音",
    furi: "すずき あやね",
    gen: 2,
    dob: "1999-03-05",
    from: "広島",
    bloodtype: "O",
    height: 161,
    status: ""
  },
  {
    member: "Hori Miyona",
    kanji: "堀 未央奈",
    furi: "ほり みおな",
    gen: 2,
    dob: "1996-10-15",
    from: "岐阜",
    bloodtype: "O",
    height: 162,
    status: "2021-03-28"
  },
  {
    member: "Yamazaki Rena",
    kanji: "山崎 怜奈",
    furi: "やまざき れな",
    gen: 2,
    dob: "1997-05-21",
    from: "東京",
    bloodtype: "B",
    height: 164,
    status: "2022-07-17"
  },
  {
    member: "Watanabe Miria",
    kanji: "渡辺 みり愛",
    furi: "わたなべ みりあ",
    gen: 2,
    dob: "1999-11-01",
    from: "東京",
    bloodtype: "O",
    height: 153,
    status: "2021-08-31"
  },
  {
    member: "Itou Riria",
    kanji: "伊藤 理々杏",
    furi: "いとう りりあ",
    gen: 3,
    dob: "2002-10-08",
    from: "沖縄",
    bloodtype: "B",
    height: 154,
    status: ""
  },
  {
    member: "Iwamoto Renka",
    kanji: "岩本 蓮加",
    furi: "いわもと れんか",
    gen: 3,
    dob: "2004-02-02",
    from: "東京",
    bloodtype: "B",
    height: 159,
    status: ""
  },
  {
    member: "Umezawa Minami",
    kanji: "梅澤 美波",
    furi: "うめざわ みなみ",
    gen: 3,
    dob: "1999-01-06",
    from: "神奈川",
    bloodtype: "A",
    height: 170,
    status: ""
  },
  {
    member: "Oozono Momoko",
    kanji: "大園 桃子",
    furi: "おおぞの ももこ",
    gen: 3,
    dob: "1999-09-13",
    from: "鹿児島",
    bloodtype: "O",
    height: 156,
    status: "2021-09-04"
  },
  {
    member: "Kubo Shiori",
    kanji: "久保 史緒里",
    furi: "くぼ しおり",
    gen: 3,
    dob: "2001-07-14",
    from: "宮城",
    bloodtype: "O",
    height: 161,
    status: ""
  },
  {
    member: "Sakaguchi Tamami",
    kanji: "阪口 珠美",
    furi: "さかぐち たまみ",
    gen: 3,
    dob: "2001-11-10",
    from: "東京",
    bloodtype: "A",
    height: 161,
    status: ""
  },
  {
    member: "Sato Kaede",
    kanji: "佐藤 楓",
    furi: "さとう かえで",
    gen: 3,
    dob: "1998-03-23",
    from: "愛知",
    bloodtype: "A",
    height: 161,
    status: ""
  },
  {
    member: "Nakamura Reno",
    kanji: "中村 麗乃",
    furi: "なかむら れの",
    gen: 3,
    dob: "2001-09-27",
    from: "東京",
    bloodtype: "不明",
    height: 167,
    status: ""
  },
  {
    member: "Mukai Hazuki",
    kanji: "向井 葉月",
    furi: "むかい はづき",
    gen: 3,
    dob: "1999-08-23",
    from: "東京",
    bloodtype: "A",
    height: 152,
    status: ""
  },
  {
    member: "Yamashita Mizuki",
    kanji: "山下 美月",
    furi: "やました みづき",
    gen: 3,
    dob: "1999-07-26",
    from: "東京",
    bloodtype: "O",
    height: 160,
    status: ""
  },
  {
    member: "Yoshida Ayano Cristi",
    kanji: "吉田 綾乃クリスティー",
    furi: "よしだ あやのクリスティー",
    gen: 3,
    dob: "1995-09-06",
    from: "大分",
    bloodtype: "A",
    height: 161,
    status: ""
  },
  {
    member: "Yoda Yuuki",
    kanji: "与田 祐希",
    furi: "よだ ゆうき",
    gen: 3,
    dob: "2000-05-05",
    from: "福岡",
    bloodtype: "O",
    height: 153,
    status: ""
  },
  {
    member: "Endo Sakura",
    kanji: "遠藤 さくら",
    furi: "えんどう さくら",
    gen: 4,
    dob: "2001-10-03",
    from: "愛知",
    bloodtype: "不明",
    height: 164,
    status: ""
  },
  {
    member: "Kaki Haruka",
    kanji: "賀喜 遥香",
    furi: "かき はるか",
    gen: 4,
    dob: "2001-08-08",
    from: "栃木",
    bloodtype: "A",
    height: 166,
    status: ""
  },
  {
    member: "Kakehashi Sayaka",
    kanji: "掛橋 沙耶香",
    furi: "かけはし さやか",
    gen: 4,
    dob: "2002-11-20",
    from: "岡山",
    bloodtype: "B型",
    height: 154,
    status: ""
  },
  {
    member: "Kanagawa Saya",
    kanji: "金川 紗耶",
    furi: "かながわ さや",
    gen: 4,
    dob: "2001-10-31",
    from: "北海道",
    bloodtype: "O",
    height: 165,
    status: ""
  },
  {
    member: "Kitagawa Yuri",
    kanji: "北川 悠理",
    furi: "きたがわ ゆり",
    gen: 4,
    dob: "2001-08-08",
    from: "カリフォルニア州",
    bloodtype: "不明",
    height: 165,
    status: ""
  },
  {
    member: "Kuromi Haruka",
    kanji: "黒見 明香",
    furi: "くろみ はるか",
    gen: 4,
    dob: "2004-01-19",
    from: "東京",
    bloodtype: "O",
    height: 162,
    status: ""
  },
  {
    member: "Sato Rika",
    kanji: "佐藤 璃果",
    furi: "さとう りか",
    gen: 4,
    dob: "2001-08-09",
    from: "岩手",
    bloodtype: "B",
    height: 160,
    status: ""
  },
  {
    member: "Shibata Yuna",
    kanji: "柴田 柚菜",
    furi: "しばた ゆな",
    gen: 4,
    dob: "2003-03-03",
    from: "千葉",
    bloodtype: "A",
    height: 160,
    status: ""
  },
  {
    member: "Seimiya Rei",
    kanji: "清宮 レイ",
    furi: "せいみや レイ",
    gen: 4,
    dob: "2003-08-01",
    from: "埼玉",
    bloodtype: "O",
    height: 164,
    status: ""
  },
  {
    member: "Tamura Mayu",
    kanji: "田村 真佑",
    furi: "たむら まゆ",
    gen: 4,
    dob: "1999-01-12",
    from: "埼玉",
    bloodtype: "A",
    height: 160,
    status: ""
  },
  {
    member: "Tsutsui Ayame",
    kanji: "筒井 あやめ",
    furi: "つつい あやめ",
    gen: 4,
    dob: "2004-06-08",
    from: "愛知",
    bloodtype: "O",
    height: 160,
    status: ""
  },
  {
    member: "Hayakawa Seira",
    kanji: "早川 聖来",
    furi: "はやかわ せいら",
    gen: 4,
    dob: "2000-08-24",
    from: "大阪",
    bloodtype: "A",
    height: 164,
    status: "rest"
  },
  {
    member: "Hayashi Runa",
    kanji: "林 瑠奈",
    furi: "はやし るな",
    gen: 4,
    dob: "2003-10-02",
    from: "神奈川",
    bloodtype: "O",
    height: 164,
    status: ""
  },
  {
    member: "Matsuo Miyu",
    kanji: "松尾 美佑",
    furi: "まつお みゆ",
    gen: 4,
    dob: "2004-01-03",
    from: "千葉",
    bloodtype: "O",
    height: 167,
    status: ""
  },
  {
    member: "Yakubo Mio",
    kanji: "矢久保 美緒",
    furi: "やくぼ みお",
    gen: 4,
    dob: "2002-08-14",
    from: "東京",
    bloodtype: "B",
    height: 153,
    status: ""
  },
  {
    member: "Yumiki Nao",
    kanji: "弓木 奈於",
    furi: "ゆみき なお",
    gen: 4,
    dob: "1999-02-03",
    from: "京都",
    bloodtype: "A",
    height: 165,
    status: ""
  },
  {
    member: "Ioki Mao",
    kanji: "五百城 茉央",
    furi: "いおき まお",
    gen: 5,
    dob: "2005-07-29",
    from: "兵庫",
    bloodtype: "O",
    height: 166,
    status: "5期生"
  },
  {
    member: "Ikeda Teresa",
    kanji: "池田 瑛紗",
    furi: "いけだ てれさ",
    gen: 5,
    dob: "2002-05-12",
    from: "東京",
    bloodtype: "不明",
    height: 159,
    status: "5期生"
  },
  {
    member: "Ichinose Miku",
    kanji: "一ノ瀬 美空",
    furi: "いちのせ みく",
    gen: 5,
    dob: "2003-05-24",
    from: "福岡",
    bloodtype: "B",
    height: 156,
    status: "5期生"
  },
  {
    member: "Inoue Nagi",
    kanji: "井上 和",
    furi: "いのうえ なぎ ",
    gen: 5,
    dob: "2005-02-17",
    from: "神奈川",
    bloodtype: "B",
    height: 156,
    status: "5期生"
  },
  {
    member: "Okamoto Hina",
    kanji: "岡本 姫奈",
    furi: "おかもと ひな",
    gen: 5,
    dob: "2003-12-17",
    from: "愛知",
    bloodtype: "A",
    height: 158,
    status: "5期生"
  },
  {
    member: "Ogawa Aya",
    kanji: "小川 彩",
    furi: "おがわ あや ",
    gen: 5,
    dob: "2007-06-27",
    from: "千葉",
    bloodtype: "B",
    height: 154,
    status: "5期生"
  },
  {
    member: "Okuda Iroha",
    kanji: "奥田 いろは",
    furi: "おくだ いろは",
    gen: 5,
    dob: "2005-08-20",
    from: "千葉",
    bloodtype: "A",
    height: 157,
    status: "5期生"
  },
  {
    member: "Kawasaki Sakura",
    kanji: "川﨑 桜",
    furi: "かわさき さくら",
    gen: 5,
    dob: "2003-04-17",
    from: "神奈川",
    bloodtype: "不明",
    height: 155,
    status: "5期生"
  },
  {
    member: "Sugawara Satsuki",
    kanji: "菅原 咲月",
    furi: "すがわら さつき ",
    gen: 5,
    dob: "2005-10-31",
    from: "千葉",
    bloodtype: "A",
    height: 157,
    status: "5期生"
  },
  {
    member: "Tomisato Nao",
    kanji: "冨里 奈央",
    furi: "とみさと なお",
    gen: 5,
    dob: "2006年9月18",
    from: "千葉",
    bloodtype: "O",
    height: 164,
    status: "5期生"
  },
  {
    member: "Nakanishi Aruno",
    kanji: "中西 アルノ",
    furi: "なかにし アルノ",
    gen: 5,
    dob: "2003年3月17",
    from: "千葉",
    bloodtype: "A",
    height: 157,
    status: "5期生"
  }
];
function getCDDateRange() {
  let cdDates = data.map((x) => {
    return {
      cd: cdAlias(x.cd),
      release: x.cd.release,
      releaset: new Date(x.cd.release),
      meets: x.meetDates
    };
  });
  cdDates.sort((a, b) => a.releaset.getTime() - b.releaset.getTime());
  let endDates = cdDates.slice(1).map((x) => x.release);
  let lastdate = new Date(cdDates[cdDates.length - 1].meets.slice(-1)[0]);
  lastdate.setDate(lastdate.getDate() + 30);
  endDates.push(lastdate.toISOString().slice(0, 10));
  cdDates[0].start = cdDates[0].release;
  cdDates[0].startt = cdDates[0].releaset;
  for (let i = 0; i < cdDates.length; i++) {
    let trueEnd = offsetISOdays(endDates[i], -1);
    cdDates[i].end = trueEnd.date;
    cdDates[i].endt = trueEnd.obj;
    if (i > 0) {
      let trueStart = offsetISOdays(cdDates[i - 1].meets.slice(-1)[0], 1);
      cdDates[i].start = trueStart.date;
      cdDates[i].startt = trueStart.obj;
    }
    cdDates[i].dates = [cdDates[i].start, ...cdDates[i].meets, cdDates[i].end];
    cdDates[i].ranges = datesToRanges(cdDates[i].dates);
  }
  return cdDates;
}
var cdDateRange = getCDDateRange();
function mbBdayInRange(memberName, dateRange) {
  let mb = getMember(memberName);
  let bdayCount = dayFrom(mb.dob, dateRange.start);
  let isInRange = bdayCount <= dateRange.ranges[dateRange.ranges.length - 1];
  let res = {
    inRange: false,
    meetDate: "",
    idx: -1
  };
  if (isInRange) {
    res.inRange = true;
    let rangeInfo = nearestNumberInSortedArr(bdayCount, dateRange.ranges);
    if (rangeInfo.idx == 0) {
      res.idx = 0;
      res.meetDate = dateRange.meets[0];
      return res;
    }
    if (rangeInfo.idx == dateRange.ranges.length - 1) {
      res.idx = dateRange.meets.length;
      res.meetDate = dateRange.meets[dateRange.meets.length - 1];
      return res;
    }
    res.idx = rangeInfo.idx - 1;
    res.meetDate = dateRange.meets[res.idx];
    return res;
  }
  return res;
}
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
function involvedMembers(cdData, dataform = "full") {
  return cdData.table.map((x) => dataform == "name" ? x.member : getMember(x.member));
}
const status2label = (s) => {
  if (isISODate(s)) {
    return "OG";
  } else {
    return "現役";
  }
};
const groupID2label = (id) => {
  switch (id) {
    case "sbt":
      return "選抜";
    case "und":
      return "アンダー";
    case "grad":
      return "卒業予定";
    default:
      if (id.match(/^(gen)\d+$/))
        return `${id.slice(3)}期生`;
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
  dobyear: (a, b) => a - b,
  nextBDay: (a, b) => a - b,
  soldstatus: (a, b) => a ? -1 : b ? 1 : 0,
  genFuri: (a, b) => composeCompares([globalThis.gen, globalThis.furi], [a.gen, a.furi], [b.gen, b.furi]),
  ISODateDescend: compareISODateDescend,
  ISODateAscend: (a, b) => compareISODateDescend(b, a)
};
const opt2label = (opt, val) => {
  switch (opt) {
    case "gen":
      return `${val}期生`;
    case "group":
      return groupID2label(val);
    case "status":
      return status2label(val);
    case "bloodtype":
      return val != "不明" ? `${val}型` : "不明";
    case "dobyear":
      return isISODate(val) ? `${val.slice(0, 4)}年` : `${val}年`;
    case "dobmonth":
      return isISODate(val) ? `${val.slice(5, 7)}月` : `${val}月`;
    case "soldstatus":
      return val ? "完売" : "未完売";
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
      extraprev: `(${finalSoldoutDraw(mbdataCompare)}次)`,
      extracurr: `(${finalSoldoutDraw(mbdataNow)}次)`,
      extradiff: totalThen != "N/A" ? `全完売` : ""
    };
  } else if (lastTimeSoldout && n > m) {
    return {
      prev: `${m}(全)`,
      curr: n,
      diff: "N/A"
    };
  } else if (currentSoldout && n < m) {
    return {
      prev: m,
      curr: `${n}(全)`,
      diff: "N/A"
    };
  } else {
    return {
      prev: totalThen == "N/A" ? "N/A" : m,
      curr: `${n}${currentSoldout ? "(全)" : ""}`,
      diff: m !== "N/A" ? `${n - m > 0 ? "+" : ""}${n - m}` : ""
    };
  }
}
function expandDataList(cdData) {
  let groups = concat(
    [
      { id: "sbt", has: cdData.sbt },
      { id: "und", has: getUnderList(cdData) }
    ],
    cdData.addgroups ? cdData.addgroups : []
  );
  let dateRange = cdDateRange.filter((x) => x.release == cdData.cd.release)[0];
  let res = cdData.table.map((x) => expandMBData(x, groups));
  res.map((x) => {
    let info = mbBdayInRange(x.member, dateRange);
    x["bdayMeet"] = info.inRange ? { bday: getMember(x.member).dob.slice(5), meetDate: info.meetDate, idx: info.idx } : 0;
  });
  return res;
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
      case "dobyear":
        val = mb.dob.slice(0, 4);
        break;
      case "dobmonth":
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
function cdAlias(cd) {
  let value = `${cd.num}${cd.type}`;
  let display = `${cd.num}${nth(cd.num)} ${cd.type}`;
  return { display, value };
}
function getUnderList(cdData) {
  let mblist = cdData.table.map((x) => x.member);
  if ("addgroups" in cdData)
    cdData.addgroups.map((x) => pullAll(mblist, x.has));
  return without(mblist, ...cdData.sbt);
}
function determineGroup(mb, groups) {
  for (let g of groups) {
    if (g.has.indexOf(mb.member) !== -1)
      return g.id;
  }
  return "NoData";
}
const SelectOneCD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedCDData } = $$props;
  let { exclude = [{ value: -1 }] } = $$props;
  let cdlist = data.map((x) => cdAlias(x.cd)).reverse();
  let temp = differenceWith(cdlist, exclude, isEqual);
  let indices = temp.map((x) => findIndex(cdlist, (y) => x.value === y.value));
  let selectables = zip(temp, indices);
  let { selected = selectables[0][1] } = $$props;
  selectedCDData = data[data.length - 1 - selected];
  if ($$props.selectedCDData === void 0 && $$bindings.selectedCDData && selectedCDData !== void 0)
    $$bindings.selectedCDData(selectedCDData);
  if ($$props.exclude === void 0 && $$bindings.exclude && exclude !== void 0)
    $$bindings.exclude(exclude);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  selectedCDData = data[data.length - 1 - selected];
  return `<select id="${"cdSelect"}" size="${"1"}" name="${"cd"}">${each(selectables, (cdidx) => {
    return `<option${add_attribute("value", cdidx[1], 0)}>${escape(cdidx[0].display)}</option>`;
  })}</select>`;
});
export {
  SelectOneCD as S,
  cdAlias as a,
  getNumSold as b,
  compareData as c,
  data as d,
  expandDataList as e,
  finalSoldoutDraw as f,
  getMember as g,
  involvedMembers as i,
  nthColor as n,
  partitionToGroup as p,
  sortList as s
};
