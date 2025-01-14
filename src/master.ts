type questionMasterType = {
  questionNum: number;
  question: string;
  choices: string[];
  inputValue: "animal" | "building" | "floorSpace" | "service";
  isRadioButton: boolean;
};

export const questionMaster: questionMasterType[] = [
  {
    questionNum: 1,
    question: "駆除を依頼したい害獣の種類はどれですか？",
    choices: [
      "ネズミ",
      "イタチ",
      "アライグマ",
      "ハクビシン",
      "その他 種類が分からない",
    ],
    inputValue: "animal",
    isRadioButton: true,
  },
  {
    questionNum: 2,
    question: "被害を受けている建物の種類は何ですか？",
    choices: [
      "戸建て(長屋)",
      "戸建て (2階建て以上)",
      "アパート",
      "マンション",
      "飲食店",
      "その他",
    ],
    inputValue: "building",
    isRadioButton: true,
  },
  {
    questionNum: 3,
    question: "建物の床面積はどれくらいの広さですか？",
    choices: ["50㎡以下", "100㎡以下", "101㎡以上", "200㎡以上", "300㎡以上"],
    inputValue: "floorSpace",
    isRadioButton: true,
  },
  {
    questionNum: 4,
    question: "どのサービスの依頼を希望しますか？ ※複数選択可能",
    choices: [
      "害獣駆除",
      "害虫駆除",
      "再発防止対策",
      "清掃作業",
      "消毒・除菌・消臭",
    ],
    inputValue: "service",
    isRadioButton: false,
  },
];

export const serviceMaster = [
  {
    name: "害獣駆除",
    prices: [
      { type: "50㎡以下", price: 22500 },
      { type: "100㎡以下", price: 60000 },
      { type: "101㎡以上", price: 105000 },
      { type: "200㎡以上", price: 150000 },
      { type: "300㎡以上", price: 210000 },
    ],
  },
  {
    name: "害虫駆除",
    prices: [
      { type: "50㎡以下", price: 15000 },
      { type: "100㎡以下", price: 37500 },
      { type: "101㎡以上", price: 67500 },
      { type: "200㎡以上", price: 100000 },
      { type: "300㎡以上", price: 122500 },
    ],
  },
  {
    name: "再発防止対策",
    prices: [
      { type: "50㎡以下", price: 20000 },
      { type: "100㎡以下", price: 30000 },
      { type: "101㎡以上", price: 52500 },
      { type: "200㎡以上", price: 75000 },
      { type: "300㎡以上", price: 105000 },
    ],
  },
  {
    name: "清掃作業",
    prices: [
      { type: "50㎡以下", price: 12500 },
      { type: "100㎡以下", price: 30000 },
      { type: "101㎡以上", price: 45000 },
      { type: "200㎡以上", price: 62500 },
      { type: "300㎡以上", price: 87500 },
    ],
  },
  {
    name: "消毒・除菌・消臭",
    prices: [
      { type: "50㎡以下", price: 12500 },
      { type: "100㎡以下", price: 30000 },
      { type: "101㎡以上", price: 52500 },
      { type: "200㎡以上", price: 75000 },
      { type: "300㎡以上", price: 105000 },
    ],
  },
];
