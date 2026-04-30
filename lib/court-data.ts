import { Court } from '@/types/application'

interface CourtEntry {
  prefecture: string
  areas: string[] // 管轄する市区町村・郡（前方一致マッチに使用）
  name: string
  address: string
  stampAmount: number // 予納郵便切手代（参考値・要確認）
}

/**
 * 全国簡易裁判所データ
 * ※ 予納郵便切手代は参考値です。申立前に各裁判所へご確認ください。
 * ※ データは最高裁判所ウェブサイト（https://www.courts.go.jp）を参考に作成しています。
 */
const courtData: CourtEntry[] = [
  // ========== 北海道 ==========
  {
    prefecture: '北海道',
    areas: ['札幌市', '石狩市', '北広島市', '江別市', '恵庭市', '千歳市', '当別町', '新篠津村'],
    name: '札幌簡易裁判所',
    address: '北海道札幌市中央区大通西11丁目',
    stampAmount: 6000,
  },
  {
    prefecture: '北海道',
    areas: ['函館市', '北斗市', '亀田郡七飯町', '上磯郡木古内町', '松前郡', '檜山郡'],
    name: '函館簡易裁判所',
    address: '北海道函館市新川町25-18',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['小樽市', '余市郡', '積丹郡', '古宇郡', '岩内郡'],
    name: '小樽簡易裁判所',
    address: '北海道小樽市色内1丁目2-1',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['旭川市', '上川郡東川町', '上川郡東神楽町', '上川郡当麻町', '上川郡愛別町', '上川郡比布町', '上川郡鷹栖町'],
    name: '旭川簡易裁判所',
    address: '北海道旭川市花咲町4丁目',
    stampAmount: 6000,
  },
  {
    prefecture: '北海道',
    areas: ['室蘭市', '登別市', '白老郡'],
    name: '室蘭簡易裁判所',
    address: '北海道室蘭市入江町1-13',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['伊達市', '有珠郡壮瞥町', '虻田郡洞爺湖町'],
    name: '伊達簡易裁判所',
    address: '北海道伊達市鹿島町57-20',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['釧路市', '釧路郡釧路町', '白糠郡白糠町', '阿寒郡'],
    name: '釧路簡易裁判所',
    address: '北海道釧路市大町1-1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['根室市', '野付郡別海町', '標津郡', '目梨郡'],
    name: '根室簡易裁判所',
    address: '北海道根室市常盤町2-27',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['帯広市', '河東郡', '河西郡', '中川郡池田町', '中川郡本別町', '足寄郡', '広尾郡', '十勝郡'],
    name: '帯広簡易裁判所',
    address: '北海道帯広市東1条南11丁目1',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['北見市', '常呂郡', '紋別郡佐呂間町'],
    name: '北見簡易裁判所',
    address: '北海道北見市大通西3丁目1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['網走市', '斜里郡', '網走郡', '目梨郡羅臼町'],
    name: '網走簡易裁判所',
    address: '北海道網走市南3条東1丁目1',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['紋別市', '紋別郡西興部村', '紋別郡雄武町'],
    name: '紋別簡易裁判所',
    address: '北海道紋別市幸町3丁目1-33',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['紋別郡遠軽町', '紋別郡湧別町', '紋別郡興部町'],
    name: '遠軽簡易裁判所',
    address: '北海道紋別郡遠軽町大通北1丁目',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['網走郡美幌町', '網走郡津別町'],
    name: '美幌簡易裁判所',
    address: '北海道網走郡美幌町字美幌602-2',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['岩見沢市', '美唄市', '三笠市', '空知郡南幌町', '空知郡奈井江町', '空知郡上砂川町'],
    name: '岩見沢簡易裁判所',
    address: '北海道岩見沢市9条西4丁目1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['夕張市', '夕張郡長沼町', '夕張郡栗山町', '夕張郡由仁町'],
    name: '夕張簡易裁判所',
    address: '北海道夕張市末広1丁目',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['滝川市', '砂川市', '歌志内市', '空知郡浦臼町', '空知郡新十津川町'],
    name: '滝川簡易裁判所',
    address: '北海道滝川市東滝川607-8',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['深川市', '雨竜郡北竜町', '雨竜郡秩父別町', '雨竜郡幌加内町', '雨竜郡雨竜町'],
    name: '深川簡易裁判所',
    address: '北海道深川市2条17番1号',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['富良野市', '空知郡南富良野町', '勇払郡占冠村'],
    name: '富良野簡易裁判所',
    address: '北海道富良野市若松町2-3',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['苫小牧市', '勇払郡安平町', '勇払郡むかわ町', '苫小牧市'],
    name: '苫小牧簡易裁判所',
    address: '北海道苫小牧市若草町2-1',
    stampAmount: 4000,
  },
  {
    prefecture: '北海道',
    areas: ['稚内市', '宗谷郡', '天塩郡幌延町', '天塩郡豊富町'],
    name: '稚内簡易裁判所',
    address: '北海道稚内市中央3丁目13-8',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['留萌市', '留萌郡小平町', '増毛郡増毛町', '苫前郡', '天塩郡'],
    name: '留萌簡易裁判所',
    address: '北海道留萌市大町2丁目25',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['名寄市', '士別市', '中川郡美深町', '中川郡音威子府村', '中川郡中川町'],
    name: '名寄簡易裁判所',
    address: '北海道名寄市大通南10丁目',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['浦河郡浦河町', '日高郡新ひだか町', '様似郡様似町', '幌泉郡えりも町', '沙流郡日高町', '沙流郡平取町', '新冠郡'],
    name: '浦河簡易裁判所',
    address: '北海道浦河郡浦河町大通3丁目',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['虻田郡倶知安町', '虻田郡ニセコ町', '虻田郡真狩村', '虻田郡留寿都村', '虻田郡喜茂別町', '虻田郡京極町', '磯谷郡蘭越町', '寿都郡', '島牧郡'],
    name: '倶知安簡易裁判所',
    address: '北海道虻田郡倶知安町北2条東3丁目',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['江差簡易裁判所', '厚沢部町', '上ノ国町', '乙部町', '奥尻郡奥尻町'],
    name: '江差簡易裁判所',
    address: '北海道檜山郡江差町字姥神町20',
    stampAmount: 3000,
  },
  {
    prefecture: '北海道',
    areas: ['標津郡中標津町', '野付郡別海町', '標津郡標津町'],
    name: '中標津簡易裁判所',
    address: '北海道標津郡中標津町東1条南2丁目',
    stampAmount: 3000,
  },

  // ========== 青森県 ==========
  {
    prefecture: '青森県',
    areas: ['青森市', '東津軽郡', '西津軽郡鰺ヶ沢町', '西津軽郡深浦町'],
    name: '青森簡易裁判所',
    address: '青森県青森市長島1丁目3-1',
    stampAmount: 6000,
  },
  {
    prefecture: '青森県',
    areas: ['弘前市', '中津軽郡', '西津軽郡', '南津軽郡'],
    name: '弘前簡易裁判所',
    address: '青森県弘前市大字下白銀町1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '青森県',
    areas: ['八戸市', '三戸郡', '上北郡おいらせ町'],
    name: '八戸簡易裁判所',
    address: '青森県八戸市内丸1丁目3-1',
    stampAmount: 4000,
  },
  {
    prefecture: '青森県',
    areas: ['むつ市', '下北郡'],
    name: 'むつ簡易裁判所',
    address: '青森県むつ市小川町2-1-6',
    stampAmount: 3000,
  },
  {
    prefecture: '青森県',
    areas: ['十和田市', '上北郡六戸町', '上北郡東北町', '上北郡七戸町', '上北郡野辺地町'],
    name: '十和田簡易裁判所',
    address: '青森県十和田市西三番町14-4',
    stampAmount: 3000,
  },
  {
    prefecture: '青森県',
    areas: ['五所川原市', '北津軽郡', 'つがる市'],
    name: '五所川原簡易裁判所',
    address: '青森県五所川原市字岩木町12-1',
    stampAmount: 3000,
  },
  {
    prefecture: '青森県',
    areas: ['黒石市', '南津軽郡藤崎町', '南津軽郡大鰐町', '南津軽郡田舎館村'],
    name: '黒石簡易裁判所',
    address: '青森県黒石市黒石1丁目',
    stampAmount: 3000,
  },

  // ========== 岩手県 ==========
  {
    prefecture: '岩手県',
    areas: ['盛岡市', '紫波郡', '岩手郡雫石町', '岩手郡滝沢市'],
    name: '盛岡簡易裁判所',
    address: '岩手県盛岡市内丸9-1',
    stampAmount: 6000,
  },
  {
    prefecture: '岩手県',
    areas: ['花巻市', '稗貫郡'],
    name: '花巻簡易裁判所',
    address: '岩手県花巻市城内9-30',
    stampAmount: 4000,
  },
  {
    prefecture: '岩手県',
    areas: ['奥州市', '胆沢郡'],
    name: '水沢簡易裁判所',
    address: '岩手県奥州市水沢大手町4-1',
    stampAmount: 4000,
  },
  {
    prefecture: '岩手県',
    areas: ['一関市', '西磐井郡'],
    name: '一関簡易裁判所',
    address: '岩手県一関市竹山町4-1',
    stampAmount: 4000,
  },
  {
    prefecture: '岩手県',
    areas: ['大船渡市', '気仙郡'],
    name: '大船渡簡易裁判所',
    address: '岩手県大船渡市大船渡町野々田18-3',
    stampAmount: 3000,
  },
  {
    prefecture: '岩手県',
    areas: ['宮古市', '下閉伊郡'],
    name: '宮古簡易裁判所',
    address: '岩手県宮古市末広町1-10',
    stampAmount: 3000,
  },
  {
    prefecture: '岩手県',
    areas: ['二戸市', '二戸郡'],
    name: '二戸簡易裁判所',
    address: '岩手県二戸市石切所字荷渡6-1',
    stampAmount: 3000,
  },
  {
    prefecture: '岩手県',
    areas: ['久慈市', '九戸郡'],
    name: '久慈簡易裁判所',
    address: '岩手県久慈市川崎第2地割5-10',
    stampAmount: 3000,
  },
  {
    prefecture: '岩手県',
    areas: ['北上市', '和賀郡'],
    name: '北上簡易裁判所',
    address: '岩手県北上市大通り2丁目1-1',
    stampAmount: 3000,
  },

  // ========== 宮城県 ==========
  {
    prefecture: '宮城県',
    areas: ['仙台市', '仙台市青葉区', '仙台市宮城野区', '仙台市若林区', '仙台市太白区', '仙台市泉区', '名取市', '岩沼市', '黒川郡'],
    name: '仙台簡易裁判所',
    address: '宮城県仙台市青葉区片平1-6-1',
    stampAmount: 6000,
  },
  {
    prefecture: '宮城県',
    areas: ['大河原町', '柴田郡', '伊具郡', '刈田郡', '白石市', '角田市'],
    name: '大河原簡易裁判所',
    address: '宮城県柴田郡大河原町字旭78-1',
    stampAmount: 4000,
  },
  {
    prefecture: '宮城県',
    areas: ['大崎市', '加美郡', '遠田郡', '玉造郡'],
    name: '古川簡易裁判所',
    address: '宮城県大崎市古川旭5丁目7-20',
    stampAmount: 4000,
  },
  {
    prefecture: '宮城県',
    areas: ['石巻市', '東松島市', '牡鹿郡'],
    name: '石巻簡易裁判所',
    address: '宮城県石巻市泉町4丁目2-11',
    stampAmount: 4000,
  },
  {
    prefecture: '宮城県',
    areas: ['気仙沼市', '本吉郡'],
    name: '気仙沼簡易裁判所',
    address: '宮城県気仙沼市古町3丁目3-5',
    stampAmount: 3000,
  },

  // ========== 秋田県 ==========
  {
    prefecture: '秋田県',
    areas: ['秋田市', '男鹿市', '潟上市', '南秋田郡'],
    name: '秋田簡易裁判所',
    address: '秋田県秋田市山王7丁目1-2',
    stampAmount: 6000,
  },
  {
    prefecture: '秋田県',
    areas: ['大館市', '北秋田郡'],
    name: '大館簡易裁判所',
    address: '秋田県大館市字中城1-2',
    stampAmount: 4000,
  },
  {
    prefecture: '秋田県',
    areas: ['横手市', '平鹿郡'],
    name: '横手簡易裁判所',
    address: '秋田県横手市駅前町6-1',
    stampAmount: 4000,
  },
  {
    prefecture: '秋田県',
    areas: ['能代市', '山本郡'],
    name: '能代簡易裁判所',
    address: '秋田県能代市柳町2-26',
    stampAmount: 3000,
  },
  {
    prefecture: '秋田県',
    areas: ['由利本荘市', 'にかほ市'],
    name: '本荘簡易裁判所',
    address: '秋田県由利本荘市尾崎17',
    stampAmount: 3000,
  },
  {
    prefecture: '秋田県',
    areas: ['大仙市', '仙北市', '仙北郡'],
    name: '大曲簡易裁判所',
    address: '秋田県大仙市大曲通町11-11',
    stampAmount: 3000,
  },
  {
    prefecture: '秋田県',
    areas: ['鹿角市', '鹿角郡'],
    name: '鹿角簡易裁判所',
    address: '秋田県鹿角市花輪字上花輪31',
    stampAmount: 3000,
  },

  // ========== 山形県 ==========
  {
    prefecture: '山形県',
    areas: ['山形市', '上山市', '天童市', '東村山郡'],
    name: '山形簡易裁判所',
    address: '山形県山形市旅篭町2丁目3-46',
    stampAmount: 6000,
  },
  {
    prefecture: '山形県',
    areas: ['米沢市', '東置賜郡', '西置賜郡'],
    name: '米沢簡易裁判所',
    address: '山形県米沢市丸の内1丁目2-4',
    stampAmount: 4000,
  },
  {
    prefecture: '山形県',
    areas: ['鶴岡市', '東田川郡'],
    name: '鶴岡簡易裁判所',
    address: '山形県鶴岡市馬場町13-30',
    stampAmount: 4000,
  },
  {
    prefecture: '山形県',
    areas: ['酒田市', '飽海郡'],
    name: '酒田簡易裁判所',
    address: '山形県酒田市本町2丁目3-55',
    stampAmount: 4000,
  },
  {
    prefecture: '山形県',
    areas: ['新庄市', '最上郡'],
    name: '新庄簡易裁判所',
    address: '山形県新庄市沖の町10-56',
    stampAmount: 3000,
  },
  {
    prefecture: '山形県',
    areas: ['村山市', '東根市', '寒河江市', '西村山郡'],
    name: '村山簡易裁判所',
    address: '山形県村山市楯岡8554-6',
    stampAmount: 3000,
  },

  // ========== 福島県 ==========
  {
    prefecture: '福島県',
    areas: ['福島市', '伊達市', '伊達郡', '信夫郡'],
    name: '福島簡易裁判所',
    address: '福島県福島市霞町1-46',
    stampAmount: 6000,
  },
  {
    prefecture: '福島県',
    areas: ['郡山市', '岩瀬郡'],
    name: '郡山簡易裁判所',
    address: '福島県郡山市字三本松11-10',
    stampAmount: 4000,
  },
  {
    prefecture: '福島県',
    areas: ['会津若松市', '耶麻郡', '河沼郡', '大沼郡'],
    name: '会津若松簡易裁判所',
    address: '福島県会津若松市追手町1-34',
    stampAmount: 4000,
  },
  {
    prefecture: '福島県',
    areas: ['いわき市'],
    name: 'いわき簡易裁判所',
    address: '福島県いわき市平字梅本15',
    stampAmount: 4000,
  },
  {
    prefecture: '福島県',
    areas: ['白河市', '西白河郡', '東白川郡'],
    name: '白河簡易裁判所',
    address: '福島県白河市郭内1-25',
    stampAmount: 4000,
  },
  {
    prefecture: '福島県',
    areas: ['須賀川市', '石川郡', '岩瀬郡天栄村'],
    name: '須賀川簡易裁判所',
    address: '福島県須賀川市八幡町135',
    stampAmount: 3000,
  },
  {
    prefecture: '福島県',
    areas: ['相馬市', '南相馬市', '相馬郡'],
    name: '相馬簡易裁判所',
    address: '福島県相馬市中村字北町63',
    stampAmount: 3000,
  },
  {
    prefecture: '福島県',
    areas: ['東白川郡棚倉町', '東白川郡矢祭町', '東白川郡塙町', '東白川郡鮫川村'],
    name: '棚倉簡易裁判所',
    address: '福島県東白川郡棚倉町大字棚倉字城跡88',
    stampAmount: 3000,
  },
  {
    prefecture: '福島県',
    areas: ['喜多方市', '耶麻郡西会津町', '耶麻郡北塩原村'],
    name: '喜多方簡易裁判所',
    address: '福島県喜多方市字押切2-109',
    stampAmount: 3000,
  },

  // ========== 茨城県 ==========
  {
    prefecture: '茨城県',
    areas: ['水戸市', '那珂市', '東茨城郡', '那珂郡'],
    name: '水戸簡易裁判所',
    address: '茨城県水戸市大町1丁目1-38',
    stampAmount: 6000,
  },
  {
    prefecture: '茨城県',
    areas: ['土浦市', 'つくば市', 'かすみがうら市', '石岡市', '小美玉市'],
    name: '土浦簡易裁判所',
    address: '茨城県土浦市中央1丁目13-12',
    stampAmount: 4000,
  },
  {
    prefecture: '茨城県',
    areas: ['下妻市', '筑西市', '桜川市', '結城市', '結城郡'],
    name: '下妻簡易裁判所',
    address: '茨城県下妻市下妻甲77',
    stampAmount: 4000,
  },
  {
    prefecture: '茨城県',
    areas: ['龍ケ崎市', '牛久市', '取手市', '守谷市', '稲敷市', '稲敷郡', '北相馬郡'],
    name: '龍ケ崎簡易裁判所',
    address: '茨城県龍ケ崎市4918-1',
    stampAmount: 4000,
  },
  {
    prefecture: '茨城県',
    areas: ['行方市', '潮来市', '鹿嶋市', '神栖市', '鉾田市', '行方郡'],
    name: '麻生簡易裁判所',
    address: '茨城県行方市麻生143-2',
    stampAmount: 3000,
  },
  {
    prefecture: '茨城県',
    areas: ['日立市', '常陸太田市', '高萩市', '北茨城市', '久慈郡'],
    name: '日立簡易裁判所',
    address: '茨城県日立市幸町2丁目9-4',
    stampAmount: 4000,
  },
  {
    prefecture: '茨城県',
    areas: ['常陸大宮市', '久慈郡大子町'],
    name: '常陸太田簡易裁判所',
    address: '茨城県常陸太田市金井町3324',
    stampAmount: 3000,
  },
  {
    prefecture: '茨城県',
    areas: ['古河市', '坂東市', '猿島郡'],
    name: '古河簡易裁判所',
    address: '茨城県古河市横山町2丁目2-57',
    stampAmount: 4000,
  },

  // ========== 栃木県 ==========
  {
    prefecture: '栃木県',
    areas: ['宇都宮市', '上三川町', '河内郡'],
    name: '宇都宮簡易裁判所',
    address: '栃木県宇都宮市小幡2丁目1-11',
    stampAmount: 6000,
  },
  {
    prefecture: '栃木県',
    areas: ['足利市'],
    name: '足利簡易裁判所',
    address: '栃木県足利市伊勢町4丁目5-3',
    stampAmount: 4000,
  },
  {
    prefecture: '栃木県',
    areas: ['栃木市', '小山市', '下都賀郡', '都賀郡'],
    name: '栃木簡易裁判所',
    address: '栃木県栃木市旭町23-1',
    stampAmount: 4000,
  },
  {
    prefecture: '栃木県',
    areas: ['大田原市', '那須塩原市', '那須郡'],
    name: '大田原簡易裁判所',
    address: '栃木県大田原市本町1丁目2625-1',
    stampAmount: 4000,
  },
  {
    prefecture: '栃木県',
    areas: ['日光市', '塩谷郡'],
    name: '今市簡易裁判所',
    address: '栃木県日光市今市762-1',
    stampAmount: 3000,
  },
  {
    prefecture: '栃木県',
    areas: ['矢板市', '塩谷郡塩谷町', '塩谷郡高根沢町'],
    name: '矢板簡易裁判所',
    address: '栃木県矢板市本町17',
    stampAmount: 3000,
  },
  {
    prefecture: '栃木県',
    areas: ['真岡市', '芳賀郡'],
    name: '真岡簡易裁判所',
    address: '栃木県真岡市荒町2丁目3-1',
    stampAmount: 3000,
  },

  // ========== 群馬県 ==========
  {
    prefecture: '群馬県',
    areas: ['前橋市', '伊勢崎市', '渋川市', '北群馬郡', '佐波郡'],
    name: '前橋簡易裁判所',
    address: '群馬県前橋市大手町3丁目1-10',
    stampAmount: 6000,
  },
  {
    prefecture: '群馬県',
    areas: ['高崎市', '安中市', '富岡市', '甘楽郡'],
    name: '高崎簡易裁判所',
    address: '群馬県高崎市高松町26-2',
    stampAmount: 4000,
  },
  {
    prefecture: '群馬県',
    areas: ['桐生市', 'みどり市'],
    name: '桐生簡易裁判所',
    address: '群馬県桐生市錦町1丁目4-7',
    stampAmount: 4000,
  },
  {
    prefecture: '群馬県',
    areas: ['太田市', '邑楽郡', '館林市'],
    name: '太田簡易裁判所',
    address: '群馬県太田市小舞木町135-2',
    stampAmount: 4000,
  },
  {
    prefecture: '群馬県',
    areas: ['沼田市', '利根郡'],
    name: '沼田簡易裁判所',
    address: '群馬県沼田市西倉内町594-1',
    stampAmount: 3000,
  },
  {
    prefecture: '群馬県',
    areas: ['藤岡市', '多野郡'],
    name: '藤岡簡易裁判所',
    address: '群馬県藤岡市藤岡504',
    stampAmount: 3000,
  },
  {
    prefecture: '群馬県',
    areas: ['吾妻郡'],
    name: '吾妻簡易裁判所',
    address: '群馬県吾妻郡中之条町大字中之条1106-1',
    stampAmount: 3000,
  },

  // ========== 埼玉県 ==========
  {
    prefecture: '埼玉県',
    areas: ['さいたま市', 'さいたま市大宮区', 'さいたま市浦和区', 'さいたま市中央区', 'さいたま市西区', 'さいたま市北区', 'さいたま市緑区', 'さいたま市見沼区', 'さいたま市桜区', 'さいたま市岩槻区', 'さいたま市南区', '上尾市', '桶川市', '北本市', '伊奈町', '白岡市'],
    name: 'さいたま簡易裁判所',
    address: '埼玉県さいたま市浦和区高砂3丁目16-45',
    stampAmount: 6000,
  },
  {
    prefecture: '埼玉県',
    areas: ['川越市', '坂戸市', '鶴ヶ島市', '比企郡', '入間郡川越'],
    name: '川越簡易裁判所',
    address: '埼玉県川越市宮下町4丁目1-2',
    stampAmount: 4000,
  },
  {
    prefecture: '埼玉県',
    areas: ['熊谷市', '深谷市', '行田市', '本庄市', '大里郡', '児玉郡'],
    name: '熊谷簡易裁判所',
    address: '埼玉県熊谷市宮町2丁目48-1',
    stampAmount: 4000,
  },
  {
    prefecture: '埼玉県',
    areas: ['川口市', '蕨市', '戸田市', '鳩ヶ谷市'],
    name: '川口簡易裁判所',
    address: '埼玉県川口市青木2丁目8-1',
    stampAmount: 4000,
  },
  {
    prefecture: '埼玉県',
    areas: ['秩父市', '秩父郡'],
    name: '秩父簡易裁判所',
    address: '埼玉県秩父市山田1444',
    stampAmount: 3000,
  },
  {
    prefecture: '埼玉県',
    areas: ['春日部市', '越谷市', '草加市', '三郷市', '八潮市', '吉川市', '松伏町'],
    name: '春日部簡易裁判所',
    address: '埼玉県春日部市粕壁6丁目1-2',
    stampAmount: 4000,
  },
  {
    prefecture: '埼玉県',
    areas: ['所沢市', '狭山市', '入間市', '飯能市', '日高市', '入間郡'],
    name: '所沢簡易裁判所',
    address: '埼玉県所沢市くすのき台1丁目11-3',
    stampAmount: 4000,
  },
  {
    prefecture: '埼玉県',
    areas: ['加須市', '久喜市', '幸手市', '蓮田市', '南埼玉郡', '北葛飾郡'],
    name: '久喜簡易裁判所',
    address: '埼玉県久喜市久喜中央2丁目21-1',
    stampAmount: 4000,
  },

  // ========== 千葉県 ==========
  {
    prefecture: '千葉県',
    areas: ['千葉市', '千葉市中央区', '千葉市花見川区', '千葉市稲毛区', '千葉市若葉区', '千葉市緑区', '千葉市美浜区', '習志野市', '八千代市', '四街道市', '佐倉市一部'],
    name: '千葉簡易裁判所',
    address: '千葉県千葉市中央区中央4丁目11-27',
    stampAmount: 6000,
  },
  {
    prefecture: '千葉県',
    areas: ['松戸市', '流山市', '野田市', '柏市', '我孫子市', '鎌ケ谷市'],
    name: '松戸簡易裁判所',
    address: '千葉県松戸市岩瀬無番地',
    stampAmount: 4000,
  },
  {
    prefecture: '千葉県',
    areas: ['佐倉市', '成田市', '印西市', '富里市', '印旛郡'],
    name: '佐倉簡易裁判所',
    address: '千葉県佐倉市裁判所通り1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '千葉県',
    areas: ['木更津市', '君津市', '富津市', '袖ケ浦市'],
    name: '木更津簡易裁判所',
    address: '千葉県木更津市富士見2丁目3-1',
    stampAmount: 4000,
  },
  {
    prefecture: '千葉県',
    areas: ['館山市', '南房総市', '安房郡'],
    name: '館山簡易裁判所',
    address: '千葉県館山市北条1073-1',
    stampAmount: 3000,
  },
  {
    prefecture: '千葉県',
    areas: ['銚子市', '旭市', '香取市', '香取郡'],
    name: '銚子簡易裁判所',
    address: '千葉県銚子市新生町2丁目3-17',
    stampAmount: 3000,
  },
  {
    prefecture: '千葉県',
    areas: ['匝瑳市', '山武市', '山武郡'],
    name: '八日市場簡易裁判所',
    address: '千葉県匝瑳市八日市場ハ891-1',
    stampAmount: 3000,
  },
  {
    prefecture: '千葉県',
    areas: ['勝浦市', 'いすみ市', '夷隅郡', '長生郡', '茂原市', '長柄町'],
    name: '夷隅簡易裁判所',
    address: '千葉県勝浦市出水1209-3',
    stampAmount: 3000,
  },

  // ========== 東京都 ==========
  {
    prefecture: '東京都',
    areas: [
      '千代田区', '中央区', '港区', '新宿区', '文京区', '台東区', '墨田区', '江東区',
      '品川区', '目黒区', '大田区', '世田谷区', '渋谷区', '中野区', '杉並区', '豊島区',
      '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区',
    ],
    name: '東京簡易裁判所',
    address: '東京都千代田区霞が関1-1-2',
    stampAmount: 6000,
  },
  {
    prefecture: '東京都',
    areas: ['八王子市', '高尾', '南大沢'],
    name: '八王子簡易裁判所',
    address: '東京都八王子市明神町4-21-1',
    stampAmount: 4000,
  },
  {
    prefecture: '東京都',
    areas: ['立川市', '昭島市', '国分寺市', '国立市', '府中市', '日野市', '小金井市', '小平市', '東村山市', '清瀬市', '東久留米市', '西東京市', '武蔵野市', '三鷹市', '調布市', '稲城市', '多摩市'],
    name: '立川簡易裁判所',
    address: '東京都立川市緑町10-4',
    stampAmount: 4000,
  },
  {
    prefecture: '東京都',
    areas: ['青梅市', '福生市', '羽村市', 'あきる野市', '西多摩郡'],
    name: '青梅簡易裁判所',
    address: '東京都青梅市東青梅1丁目167-3',
    stampAmount: 3000,
  },
  {
    prefecture: '東京都',
    areas: ['町田市'],
    name: '町田簡易裁判所',
    address: '東京都町田市森野2丁目2-22',
    stampAmount: 4000,
  },

  // ========== 神奈川県 ==========
  {
    prefecture: '神奈川県',
    areas: ['横浜市', '横浜市鶴見区', '横浜市神奈川区', '横浜市西区', '横浜市中区', '横浜市南区', '横浜市港南区', '横浜市保土ケ谷区', '横浜市旭区', '横浜市磯子区', '横浜市金沢区', '横浜市港北区', '横浜市都筑区', '横浜市緑区', '横浜市青葉区', '横浜市瀬谷区', '横浜市戸塚区', '横浜市栄区', '横浜市泉区'],
    name: '横浜簡易裁判所',
    address: '神奈川県横浜市中区寿町1-2',
    stampAmount: 6000,
  },
  {
    prefecture: '神奈川県',
    areas: ['川崎市', '川崎市川崎区', '川崎市幸区', '川崎市中原区', '川崎市高津区', '川崎市宮前区', '川崎市多摩区', '川崎市麻生区'],
    name: '川崎簡易裁判所',
    address: '神奈川県川崎市川崎区富士見2-1-4',
    stampAmount: 6000,
  },
  {
    prefecture: '神奈川県',
    areas: ['相模原市', '相模原市中央区', '相模原市緑区', '相模原市南区', '座間市', '大和市'],
    name: '相模原簡易裁判所',
    address: '神奈川県相模原市中央区富士見6-1-1',
    stampAmount: 6000,
  },
  {
    prefecture: '神奈川県',
    areas: ['横須賀市', '三浦市', '逗子市', '葉山町', '鎌倉市'],
    name: '横須賀簡易裁判所',
    address: '神奈川県横須賀市大滝町1丁目42',
    stampAmount: 4000,
  },
  {
    prefecture: '神奈川県',
    areas: ['小田原市', '南足柄市', '足柄上郡', '足柄下郡'],
    name: '小田原簡易裁判所',
    address: '神奈川県小田原市本町1丁目4-1',
    stampAmount: 4000,
  },
  {
    prefecture: '神奈川県',
    areas: ['平塚市', '藤沢市', '秦野市', '伊勢原市', '茅ヶ崎市', '寒川町', '大磯町', '二宮町', '厚木市', '海老名市', '綾瀬市', '高座郡'],
    name: '平塚簡易裁判所',
    address: '神奈川県平塚市追分4-12',
    stampAmount: 4000,
  },

  // ========== 新潟県 ==========
  {
    prefecture: '新潟県',
    areas: ['新潟市', '新潟市北区', '新潟市東区', '新潟市中央区', '新潟市江南区', '新潟市秋葉区', '新潟市南区', '新潟市西区', '新潟市西蒲区', '阿賀野市', '北蒲原郡'],
    name: '新潟簡易裁判所',
    address: '新潟県新潟市中央区西大畑町5191',
    stampAmount: 6000,
  },
  {
    prefecture: '新潟県',
    areas: ['長岡市', '三島郡', '南蒲原郡'],
    name: '長岡簡易裁判所',
    address: '新潟県長岡市学校町1丁目2-2',
    stampAmount: 4000,
  },
  {
    prefecture: '新潟県',
    areas: ['三条市', '燕市', '加茂市', '田上町'],
    name: '三条簡易裁判所',
    address: '新潟県三条市旭町2丁目5-1',
    stampAmount: 4000,
  },
  {
    prefecture: '新潟県',
    areas: ['柏崎市', '刈羽郡'],
    name: '柏崎簡易裁判所',
    address: '新潟県柏崎市中央町5-63',
    stampAmount: 3000,
  },
  {
    prefecture: '新潟県',
    areas: ['新発田市', '胎内市', '豊浦町', '紫雲寺町', '中条町', '聖籠町'],
    name: '新発田簡易裁判所',
    address: '新潟県新発田市諏訪町1丁目4-4',
    stampAmount: 4000,
  },
  {
    prefecture: '新潟県',
    areas: ['十日町市', '中魚沼郡'],
    name: '十日町簡易裁判所',
    address: '新潟県十日町市千歳町2丁目',
    stampAmount: 3000,
  },
  {
    prefecture: '新潟県',
    areas: ['南魚沼市', '魚沼市', '南魚沼郡'],
    name: '六日町簡易裁判所',
    address: '新潟県南魚沼市六日町11-1',
    stampAmount: 3000,
  },
  {
    prefecture: '新潟県',
    areas: ['佐渡市'],
    name: '佐渡簡易裁判所',
    address: '新潟県佐渡市両津夷304-17',
    stampAmount: 3000,
  },

  // ========== 富山県 ==========
  {
    prefecture: '富山県',
    areas: ['富山市', '中新川郡', '射水市', '滑川市'],
    name: '富山簡易裁判所',
    address: '富山県富山市中央通り1丁目1',
    stampAmount: 6000,
  },
  {
    prefecture: '富山県',
    areas: ['高岡市', '氷見市', '砺波市', '小矢部市', '南砺市', '射水市一部'],
    name: '高岡簡易裁判所',
    address: '富山県高岡市守山町48',
    stampAmount: 4000,
  },
  {
    prefecture: '富山県',
    areas: ['魚津市', '黒部市', '下新川郡'],
    name: '魚津簡易裁判所',
    address: '富山県魚津市吉島1533-1',
    stampAmount: 3000,
  },

  // ========== 石川県 ==========
  {
    prefecture: '石川県',
    areas: ['金沢市', 'かほく市', '津幡町', '内灘町', '野々市市'],
    name: '金沢簡易裁判所',
    address: '石川県金沢市丸の内7-1',
    stampAmount: 6000,
  },
  {
    prefecture: '石川県',
    areas: ['小松市', '加賀市', '能美市', '川北町'],
    name: '小松簡易裁判所',
    address: '石川県小松市土居原町487',
    stampAmount: 4000,
  },
  {
    prefecture: '石川県',
    areas: ['七尾市', '羽咋市', '中能登町', '鹿島郡', '羽咋郡'],
    name: '七尾簡易裁判所',
    address: '石川県七尾市馬出町ム部1-1',
    stampAmount: 3000,
  },
  {
    prefecture: '石川県',
    areas: ['輪島市', '珠洲市', '鳳珠郡'],
    name: '輪島簡易裁判所',
    address: '石川県輪島市河井町15部1-2',
    stampAmount: 3000,
  },

  // ========== 福井県 ==========
  {
    prefecture: '福井県',
    areas: ['福井市', 'あわら市', '坂井市', '吉田郡', '丹生郡'],
    name: '福井簡易裁判所',
    address: '福井県福井市春山1丁目1-54',
    stampAmount: 6000,
  },
  {
    prefecture: '福井県',
    areas: ['越前市', '越前町', '南条郡', '今立郡'],
    name: '武生簡易裁判所',
    address: '福井県越前市府中1丁目13-10',
    stampAmount: 4000,
  },
  {
    prefecture: '福井県',
    areas: ['小浜市', '遠敷郡', '大飯郡', '三方郡', '三方上中郡'],
    name: '小浜簡易裁判所',
    address: '福井県小浜市城内1丁目3-2',
    stampAmount: 3000,
  },
  {
    prefecture: '福井県',
    areas: ['大野市', '勝山市'],
    name: '大野簡易裁判所',
    address: '福井県大野市天神町1-17',
    stampAmount: 3000,
  },

  // ========== 山梨県 ==========
  {
    prefecture: '山梨県',
    areas: ['甲府市', '甲斐市', '笛吹市', '中央市', '南アルプス市', '甲府市周辺'],
    name: '甲府簡易裁判所',
    address: '山梨県甲府市丸の内1丁目1-18',
    stampAmount: 6000,
  },
  {
    prefecture: '山梨県',
    areas: ['都留市', '大月市', '上野原市', '南都留郡', '北都留郡'],
    name: '都留簡易裁判所',
    address: '山梨県都留市田原2丁目14-42',
    stampAmount: 3000,
  },
  {
    prefecture: '山梨県',
    areas: ['山梨市', '甲州市', '韮崎市', '北杜市', '東山梨郡'],
    name: '山梨簡易裁判所',
    address: '山梨県山梨市落合450',
    stampAmount: 3000,
  },

  // ========== 長野県 ==========
  {
    prefecture: '長野県',
    areas: ['長野市', '須坂市', '千曲市', '埴科郡', '上水内郡', '上高井郡'],
    name: '長野簡易裁判所',
    address: '長野県長野市大字長野旭町1108',
    stampAmount: 6000,
  },
  {
    prefecture: '長野県',
    areas: ['上田市', '東御市', '小県郡'],
    name: '上田簡易裁判所',
    address: '長野県上田市大手2丁目8-4',
    stampAmount: 4000,
  },
  {
    prefecture: '長野県',
    areas: ['松本市', '塩尻市', '安曇野市', '東筑摩郡'],
    name: '松本簡易裁判所',
    address: '長野県松本市丸の内10-1',
    stampAmount: 4000,
  },
  {
    prefecture: '長野県',
    areas: ['飯田市', '下伊那郡'],
    name: '飯田簡易裁判所',
    address: '長野県飯田市追手町2丁目678',
    stampAmount: 4000,
  },
  {
    prefecture: '長野県',
    areas: ['諏訪市', '岡谷市', '茅野市', '諏訪郡'],
    name: '諏訪簡易裁判所',
    address: '長野県諏訪市上川1丁目1644-7',
    stampAmount: 4000,
  },
  {
    prefecture: '長野県',
    areas: ['伊那市', '駒ヶ根市', '上伊那郡'],
    name: '伊那簡易裁判所',
    address: '長野県伊那市荒井3517',
    stampAmount: 3000,
  },
  {
    prefecture: '長野県',
    areas: ['佐久市', '小諸市', '南佐久郡', '北佐久郡'],
    name: '佐久簡易裁判所',
    address: '長野県佐久市中込3057',
    stampAmount: 3000,
  },
  {
    prefecture: '長野県',
    areas: ['大町市', '北安曇郡'],
    name: '大町簡易裁判所',
    address: '長野県大町市大町3613',
    stampAmount: 3000,
  },
  {
    prefecture: '長野県',
    areas: ['木曽郡'],
    name: '木曽福島簡易裁判所',
    address: '長野県木曽郡木曽町福島2780-1',
    stampAmount: 3000,
  },
  {
    prefecture: '長野県',
    areas: ['中野市', '飯山市', '下水内郡', '下高井郡'],
    name: '中野簡易裁判所',
    address: '長野県中野市中央1丁目4-1',
    stampAmount: 3000,
  },

  // ========== 岐阜県 ==========
  {
    prefecture: '岐阜県',
    areas: ['岐阜市', '羽島市', '本巣市', '羽島郡', '本巣郡'],
    name: '岐阜簡易裁判所',
    address: '岐阜県岐阜市司町40-1',
    stampAmount: 6000,
  },
  {
    prefecture: '岐阜県',
    areas: ['大垣市', '海津市', '養老郡', '不破郡', '安八郡', '揖斐郡'],
    name: '大垣簡易裁判所',
    address: '岐阜県大垣市丸の内2丁目26',
    stampAmount: 4000,
  },
  {
    prefecture: '岐阜県',
    areas: ['高山市', '飛騨市', '大野郡'],
    name: '高山簡易裁判所',
    address: '岐阜県高山市丸の内町1-76',
    stampAmount: 3000,
  },
  {
    prefecture: '岐阜県',
    areas: ['多治見市', '瑞浪市', '土岐市', '可児市', '可児郡'],
    name: '多治見簡易裁判所',
    address: '岐阜県多治見市上野町2丁目75',
    stampAmount: 4000,
  },
  {
    prefecture: '岐阜県',
    areas: ['中津川市', '恵那市'],
    name: '中津川簡易裁判所',
    address: '岐阜県中津川市太田町2-3-1',
    stampAmount: 3000,
  },
  {
    prefecture: '岐阜県',
    areas: ['美濃加茂市', '関市', '美濃市', '郡上市', '加茂郡'],
    name: '御嵩簡易裁判所',
    address: '岐阜県可児郡御嵩町御嵩1617-1',
    stampAmount: 3000,
  },

  // ========== 静岡県 ==========
  {
    prefecture: '静岡県',
    areas: ['静岡市', '静岡市葵区', '静岡市駿河区', '静岡市清水区', '焼津市', '藤枝市', '島田市'],
    name: '静岡簡易裁判所',
    address: '静岡県静岡市葵区追手町10-80',
    stampAmount: 6000,
  },
  {
    prefecture: '静岡県',
    areas: ['浜松市', '浜松市中区', '浜松市東区', '浜松市西区', '浜松市南区', '浜松市北区', '浜松市浜北区', '浜松市天竜区', '湖西市'],
    name: '浜松簡易裁判所',
    address: '静岡県浜松市中区利町329',
    stampAmount: 6000,
  },
  {
    prefecture: '静岡県',
    areas: ['沼津市', '富士宮市', '富士市', '御殿場市', '裾野市', '駿東郡'],
    name: '沼津簡易裁判所',
    address: '静岡県沼津市御幸町16-1',
    stampAmount: 4000,
  },
  {
    prefecture: '静岡県',
    areas: ['熱海市', '伊東市', '伊豆市', '伊豆の国市', '田方郡'],
    name: '熱海簡易裁判所',
    address: '静岡県熱海市中央町1-26',
    stampAmount: 3000,
  },
  {
    prefecture: '静岡県',
    areas: ['掛川市', '袋井市', '磐田市', '周智郡', '菊川市'],
    name: '掛川簡易裁判所',
    address: '静岡県掛川市長谷1-1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '静岡県',
    areas: ['下田市', '賀茂郡'],
    name: '下田簡易裁判所',
    address: '静岡県下田市三の岡1-3-1',
    stampAmount: 3000,
  },

  // ========== 愛知県 ==========
  {
    prefecture: '愛知県',
    areas: ['名古屋市', '名古屋市千種区', '名古屋市東区', '名古屋市北区', '名古屋市西区', '名古屋市中村区', '名古屋市中区', '名古屋市昭和区', '名古屋市瑞穂区', '名古屋市熱田区', '名古屋市中川区', '名古屋市港区', '名古屋市南区', '名古屋市守山区', '名古屋市緑区', '名古屋市名東区', '名古屋市天白区', '清須市', '北名古屋市', '西春日井郡'],
    name: '名古屋簡易裁判所',
    address: '愛知県名古屋市中区三の丸1-7-1',
    stampAmount: 6000,
  },
  {
    prefecture: '愛知県',
    areas: ['岡崎市', '西尾市', '幸田町'],
    name: '岡崎簡易裁判所',
    address: '愛知県岡崎市明大寺町字奈良井1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '愛知県',
    areas: ['一宮市', '稲沢市', '江南市', '丹羽郡', '尾西市'],
    name: '一宮簡易裁判所',
    address: '愛知県一宮市今伊勢町宮後字郷南18',
    stampAmount: 4000,
  },
  {
    prefecture: '愛知県',
    areas: ['豊橋市', '豊川市', '蒲郡市', '田原市', '新城市', '北設楽郡', '東三河'],
    name: '豊橋簡易裁判所',
    address: '愛知県豊橋市八町通3丁目7',
    stampAmount: 4000,
  },
  {
    prefecture: '愛知県',
    areas: ['豊田市', 'みよし市', '額田郡'],
    name: '豊田簡易裁判所',
    address: '愛知県豊田市小坂本町1丁目25',
    stampAmount: 4000,
  },
  {
    prefecture: '愛知県',
    areas: ['半田市', '常滑市', '東海市', '大府市', '知多市', '阿久比町', '東浦町', '南知多町', '美浜町', '武豊町'],
    name: '半田簡易裁判所',
    address: '愛知県半田市広小路町9番地',
    stampAmount: 4000,
  },
  {
    prefecture: '愛知県',
    areas: ['津島市', '愛西市', '弥富市', 'あま市', '海部郡'],
    name: '津島簡易裁判所',
    address: '愛知県津島市西柳原町1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '愛知県',
    areas: ['瀬戸市', '尾張旭市', '長久手市', '愛知郡'],
    name: '瀬戸簡易裁判所',
    address: '愛知県瀬戸市追分町95-1',
    stampAmount: 3000,
  },

  // ========== 三重県 ==========
  {
    prefecture: '三重県',
    areas: ['津市', '多気郡', '一志郡'],
    name: '津簡易裁判所',
    address: '三重県津市丸之内26-8',
    stampAmount: 6000,
  },
  {
    prefecture: '三重県',
    areas: ['四日市市', '桑名市', '員弁郡', '三重郡', '桑名郡'],
    name: '四日市簡易裁判所',
    address: '三重県四日市市裁判所通り1',
    stampAmount: 4000,
  },
  {
    prefecture: '三重県',
    areas: ['伊賀市', '名張市'],
    name: '伊賀簡易裁判所',
    address: '三重県伊賀市上野丸之内116',
    stampAmount: 3000,
  },
  {
    prefecture: '三重県',
    areas: ['松阪市', '多気郡多気町', '多気郡明和町', '多気郡大台町'],
    name: '松阪簡易裁判所',
    address: '三重県松阪市日野町13',
    stampAmount: 4000,
  },
  {
    prefecture: '三重県',
    areas: ['熊野市', '南牟婁郡'],
    name: '熊野簡易裁判所',
    address: '三重県熊野市井戸町372',
    stampAmount: 3000,
  },
  {
    prefecture: '三重県',
    areas: ['尾鷲市', '北牟婁郡'],
    name: '尾鷲簡易裁判所',
    address: '三重県尾鷲市中央町6-7',
    stampAmount: 3000,
  },
  {
    prefecture: '三重県',
    areas: ['伊勢市', '鳥羽市', '志摩市', '度会郡'],
    name: '伊勢簡易裁判所',
    address: '三重県伊勢市岩渕1丁目7-27',
    stampAmount: 4000,
  },

  // ========== 滋賀県 ==========
  {
    prefecture: '滋賀県',
    areas: ['大津市', '草津市', '守山市', '栗東市', '湖南市'],
    name: '大津簡易裁判所',
    address: '滋賀県大津市御陵町1-35',
    stampAmount: 6000,
  },
  {
    prefecture: '滋賀県',
    areas: ['彦根市', '愛知郡', '犬上郡'],
    name: '彦根簡易裁判所',
    address: '滋賀県彦根市古沢町8-1',
    stampAmount: 4000,
  },
  {
    prefecture: '滋賀県',
    areas: ['長浜市', '米原市'],
    name: '長浜簡易裁判所',
    address: '滋賀県長浜市公園町14-53',
    stampAmount: 4000,
  },
  {
    prefecture: '滋賀県',
    areas: ['東近江市', '近江八幡市', '蒲生郡'],
    name: '東近江簡易裁判所',
    address: '滋賀県東近江市八日市緑町4-2',
    stampAmount: 3000,
  },
  {
    prefecture: '滋賀県',
    areas: ['甲賀市', '湖南市一部'],
    name: '水口簡易裁判所',
    address: '滋賀県甲賀市水口町水口6161-1',
    stampAmount: 3000,
  },

  // ========== 京都府 ==========
  {
    prefecture: '京都府',
    areas: ['京都市', '京都市北区', '京都市上京区', '京都市左京区', '京都市中京区', '京都市東山区', '京都市下京区', '京都市南区', '京都市右京区', '京都市伏見区', '京都市山科区', '京都市西京区', '向日市', '長岡京市', '乙訓郡'],
    name: '京都簡易裁判所',
    address: '京都府京都市中京区菊屋町803',
    stampAmount: 6000,
  },
  {
    prefecture: '京都府',
    areas: ['福知山市', '綾部市'],
    name: '福知山簡易裁判所',
    address: '京都府福知山市内記1丁目',
    stampAmount: 4000,
  },
  {
    prefecture: '京都府',
    areas: ['舞鶴市'],
    name: '舞鶴簡易裁判所',
    address: '京都府舞鶴市字浜2020',
    stampAmount: 3000,
  },
  {
    prefecture: '京都府',
    areas: ['宮津市', '与謝郡', '京丹後市'],
    name: '宮津簡易裁判所',
    address: '京都府宮津市鶴賀2164',
    stampAmount: 3000,
  },
  {
    prefecture: '京都府',
    areas: ['木津川市', '宇治市', '城陽市', '八幡市', '京田辺市', '久世郡', '綴喜郡', '相楽郡'],
    name: '木津簡易裁判所',
    address: '京都府木津川市木津内田2',
    stampAmount: 4000,
  },

  // ========== 大阪府 ==========
  {
    prefecture: '大阪府',
    areas: ['大阪市', '大阪市都島区', '大阪市福島区', '大阪市此花区', '大阪市西区', '大阪市港区', '大阪市大正区', '大阪市天王寺区', '大阪市浪速区', '大阪市西淀川区', '大阪市淀川区', '大阪市東淀川区', '大阪市東成区', '大阪市生野区', '大阪市旭区', '大阪市城東区', '大阪市鶴見区', '大阪市阿倍野区', '大阪市住之江区', '大阪市住吉区', '大阪市東住吉区', '大阪市西成区', '大阪市平野区', '大阪市北区', '大阪市中央区'],
    name: '大阪簡易裁判所',
    address: '大阪府大阪市北区西天満2-9-6',
    stampAmount: 6000,
  },
  {
    prefecture: '大阪府',
    areas: ['堺市', '堺市堺区', '堺市中区', '堺市東区', '堺市西区', '堺市南区', '堺市北区', '堺市美原区'],
    name: '堺簡易裁判所',
    address: '大阪府堺市堺区南瓦町2-29',
    stampAmount: 6000,
  },
  {
    prefecture: '大阪府',
    areas: ['岸和田市', '泉大津市', '和泉市', '高石市', '泉北郡'],
    name: '岸和田簡易裁判所',
    address: '大阪府岸和田市今福町1-6-2',
    stampAmount: 4000,
  },
  {
    prefecture: '大阪府',
    areas: ['富田林市', '河内長野市', '松原市', '大阪狭山市', '羽曳野市', '藤井寺市', '南河内郡'],
    name: '富田林簡易裁判所',
    address: '大阪府富田林市本町2-30',
    stampAmount: 4000,
  },
  {
    prefecture: '大阪府',
    areas: ['守口市', '門真市', '枚方市', '寝屋川市', '交野市', '四條畷市', '大東市'],
    name: '守口簡易裁判所',
    address: '大阪府守口市京阪本通2丁目5-4',
    stampAmount: 4000,
  },
  {
    prefecture: '大阪府',
    areas: ['池田市', '箕面市', '豊中市', '吹田市', '摂津市', '茨木市', '高槻市', '三島郡'],
    name: '池田簡易裁判所',
    address: '大阪府池田市城南1丁目3-35',
    stampAmount: 4000,
  },
  {
    prefecture: '大阪府',
    areas: ['東大阪市', '八尾市', '柏原市'],
    name: '東大阪簡易裁判所',
    address: '大阪府東大阪市高井田元町2丁目8-34',
    stampAmount: 4000,
  },
  {
    prefecture: '大阪府',
    areas: ['泉佐野市', '貝塚市', '泉南市', '阪南市', '熊取町', '田尻町', '岬町', '泉南郡'],
    name: '泉佐野簡易裁判所',
    address: '大阪府泉佐野市上町1-3-28',
    stampAmount: 3000,
  },

  // ========== 兵庫県 ==========
  {
    prefecture: '兵庫県',
    areas: ['神戸市', '神戸市東灘区', '神戸市灘区', '神戸市兵庫区', '神戸市長田区', '神戸市須磨区', '神戸市垂水区', '神戸市北区', '神戸市中央区', '神戸市西区', '芦屋市', '西宮市', '宝塚市', '川西市', '三田市', '猪名川町'],
    name: '神戸簡易裁判所',
    address: '兵庫県神戸市中央区橘通2丁目4-3',
    stampAmount: 6000,
  },
  {
    prefecture: '兵庫県',
    areas: ['姫路市', '相生市', '赤穂市', '宍粟市', '揖保郡', '赤穂郡', '佐用郡'],
    name: '姫路簡易裁判所',
    address: '兵庫県姫路市本町68-170',
    stampAmount: 4000,
  },
  {
    prefecture: '兵庫県',
    areas: ['尼崎市', '伊丹市', '加古川市', '明石市', '高砂市', '播磨町', '稲美町', '加古郡'],
    name: '尼崎簡易裁判所',
    address: '兵庫県尼崎市東七松町1丁目23-1',
    stampAmount: 4000,
  },
  {
    prefecture: '兵庫県',
    areas: ['豊岡市', '養父市', '朝来市', '美方郡', '城崎郡'],
    name: '豊岡簡易裁判所',
    address: '兵庫県豊岡市大手町8-31',
    stampAmount: 4000,
  },
  {
    prefecture: '兵庫県',
    areas: ['たつの市', '太子町', '龍野市'],
    name: '龍野簡易裁判所',
    address: '兵庫県たつの市龍野町富永1009',
    stampAmount: 3000,
  },
  {
    prefecture: '兵庫県',
    areas: ['洲本市', '南あわじ市', '淡路市'],
    name: '洲本簡易裁判所',
    address: '兵庫県洲本市山手1丁目1-18',
    stampAmount: 3000,
  },
  {
    prefecture: '兵庫県',
    areas: ['丹波市', '篠山市', '丹波篠山市'],
    name: '柏原簡易裁判所',
    address: '兵庫県丹波市柏原町柏原683',
    stampAmount: 3000,
  },
  {
    prefecture: '兵庫県',
    areas: ['西脇市', '小野市', '加西市', '加東市', '多可郡'],
    name: '西脇簡易裁判所',
    address: '兵庫県西脇市野村町1795-14',
    stampAmount: 3000,
  },

  // ========== 奈良県 ==========
  {
    prefecture: '奈良県',
    areas: ['奈良市', '大和郡山市', '天理市', '山辺郡'],
    name: '奈良簡易裁判所',
    address: '奈良県奈良市登大路町36-1',
    stampAmount: 6000,
  },
  {
    prefecture: '奈良県',
    areas: ['大和高田市', '橿原市', '桜井市', '香芝市', '葛城市', '高市郡', '北葛城郡'],
    name: '大和高田簡易裁判所',
    address: '奈良県大和高田市大中106-1',
    stampAmount: 4000,
  },
  {
    prefecture: '奈良県',
    areas: ['五條市', '吉野郡'],
    name: '五條簡易裁判所',
    address: '奈良県五條市本町1丁目1-5',
    stampAmount: 3000,
  },

  // ========== 和歌山県 ==========
  {
    prefecture: '和歌山県',
    areas: ['和歌山市', '海南市', '岩出市', '紀の川市', '海草郡'],
    name: '和歌山簡易裁判所',
    address: '和歌山県和歌山市二番丁1',
    stampAmount: 6000,
  },
  {
    prefecture: '和歌山県',
    areas: ['田辺市', '西牟婁郡'],
    name: '田辺簡易裁判所',
    address: '和歌山県田辺市新万2001',
    stampAmount: 4000,
  },
  {
    prefecture: '和歌山県',
    areas: ['新宮市', '東牟婁郡'],
    name: '新宮簡易裁判所',
    address: '和歌山県新宮市春日2丁目2-26',
    stampAmount: 3000,
  },
  {
    prefecture: '和歌山県',
    areas: ['御坊市', '日高郡'],
    name: '御坊簡易裁判所',
    address: '和歌山県御坊市島2丁目1-36',
    stampAmount: 3000,
  },
  {
    prefecture: '和歌山県',
    areas: ['橋本市', '伊都郡'],
    name: '橋本簡易裁判所',
    address: '和歌山県橋本市東家3丁目3-13',
    stampAmount: 3000,
  },

  // ========== 鳥取県 ==========
  {
    prefecture: '鳥取県',
    areas: ['鳥取市', '岩美郡', '八頭郡'],
    name: '鳥取簡易裁判所',
    address: '鳥取県鳥取市東町2丁目315',
    stampAmount: 6000,
  },
  {
    prefecture: '鳥取県',
    areas: ['米子市', '境港市', '西伯郡', '日野郡'],
    name: '米子簡易裁判所',
    address: '鳥取県米子市法勝寺町1',
    stampAmount: 4000,
  },
  {
    prefecture: '鳥取県',
    areas: ['倉吉市', '東伯郡'],
    name: '倉吉簡易裁判所',
    address: '鳥取県倉吉市仲ノ町3516-1',
    stampAmount: 3000,
  },

  // ========== 島根県 ==========
  {
    prefecture: '島根県',
    areas: ['松江市', '安来市', '仁多郡', '隠岐郡'],
    name: '松江簡易裁判所',
    address: '島根県松江市殿町1',
    stampAmount: 6000,
  },
  {
    prefecture: '島根県',
    areas: ['浜田市', '江津市', '邑智郡'],
    name: '浜田簡易裁判所',
    address: '島根県浜田市殿町113-2',
    stampAmount: 4000,
  },
  {
    prefecture: '島根県',
    areas: ['益田市', '鹿足郡'],
    name: '益田簡易裁判所',
    address: '島根県益田市あけぼの東町14-34',
    stampAmount: 3000,
  },
  {
    prefecture: '島根県',
    areas: ['出雲市', '簸川郡'],
    name: '出雲簡易裁判所',
    address: '島根県出雲市今市町1丁目52',
    stampAmount: 4000,
  },
  {
    prefecture: '島根県',
    areas: ['大田市', '飯石郡'],
    name: '大田簡易裁判所',
    address: '島根県大田市大田町大田イ1',
    stampAmount: 3000,
  },

  // ========== 岡山県 ==========
  {
    prefecture: '岡山県',
    areas: ['岡山市', '岡山市北区', '岡山市中区', '岡山市東区', '岡山市南区', '玉野市', '瀬戸内市', '赤磐市', '加賀郡'],
    name: '岡山簡易裁判所',
    address: '岡山県岡山市北区南方1丁目8-42',
    stampAmount: 6000,
  },
  {
    prefecture: '岡山県',
    areas: ['倉敷市', '総社市', '浅口市', '浅口郡', '都窪郡'],
    name: '倉敷簡易裁判所',
    address: '岡山県倉敷市幸町3-33',
    stampAmount: 4000,
  },
  {
    prefecture: '岡山県',
    areas: ['津山市', '美作市', '美咲町', '苫田郡', '勝田郡', '英田郡', '久米郡'],
    name: '津山簡易裁判所',
    address: '岡山県津山市山下97',
    stampAmount: 4000,
  },
  {
    prefecture: '岡山県',
    areas: ['笠岡市', '井原市', '小田郡'],
    name: '笠岡簡易裁判所',
    address: '岡山県笠岡市中央町1-50',
    stampAmount: 3000,
  },
  {
    prefecture: '岡山県',
    areas: ['備前市', '和気郡'],
    name: '備前簡易裁判所',
    address: '岡山県備前市東片上112',
    stampAmount: 3000,
  },

  // ========== 広島県 ==========
  {
    prefecture: '広島県',
    areas: ['広島市', '広島市中区', '広島市東区', '広島市南区', '広島市西区', '広島市安佐南区', '広島市安佐北区', '広島市安芸区', '広島市佐伯区', '廿日市市', '大竹市', '安芸郡'],
    name: '広島簡易裁判所',
    address: '広島県広島市中区上八丁堀2-29',
    stampAmount: 6000,
  },
  {
    prefecture: '広島県',
    areas: ['福山市', '府中市', '笠岡市', '神石郡'],
    name: '福山簡易裁判所',
    address: '広島県福山市三吉町1丁目7-1',
    stampAmount: 4000,
  },
  {
    prefecture: '広島県',
    areas: ['尾道市', '三原市', '世羅郡'],
    name: '尾道簡易裁判所',
    address: '広島県尾道市西御所町9-1',
    stampAmount: 4000,
  },
  {
    prefecture: '広島県',
    areas: ['三次市', '庄原市', '双三郡'],
    name: '三次簡易裁判所',
    address: '広島県三次市三次町1519-2',
    stampAmount: 3000,
  },
  {
    prefecture: '広島県',
    areas: ['呉市', '江田島市'],
    name: '呉簡易裁判所',
    address: '広島県呉市中央4丁目1-6',
    stampAmount: 4000,
  },

  // ========== 山口県 ==========
  {
    prefecture: '山口県',
    areas: ['山口市', '防府市', '萩市', '美祢市', '阿武郡'],
    name: '山口簡易裁判所',
    address: '山口県山口市大手町2-1',
    stampAmount: 6000,
  },
  {
    prefecture: '山口県',
    areas: ['下関市', '長門市'],
    name: '下関簡易裁判所',
    address: '山口県下関市南部町23-2',
    stampAmount: 4000,
  },
  {
    prefecture: '山口県',
    areas: ['周南市', '下松市', '光市'],
    name: '徳山簡易裁判所',
    address: '山口県周南市孤松町2-1',
    stampAmount: 4000,
  },
  {
    prefecture: '山口県',
    areas: ['宇部市', '山陽小野田市'],
    name: '宇部簡易裁判所',
    address: '山口県宇部市東梶返2丁目5-8',
    stampAmount: 4000,
  },
  {
    prefecture: '山口県',
    areas: ['岩国市', '柳井市', '玖珂郡', '熊毛郡'],
    name: '岩国簡易裁判所',
    address: '山口県岩国市麻里布町3丁目3-12',
    stampAmount: 4000,
  },

  // ========== 徳島県 ==========
  {
    prefecture: '徳島県',
    areas: ['徳島市', '鳴門市', '小松島市', '阿南市', '勝浦郡', '名東郡', '名西郡', '板野郡', '阿波市'],
    name: '徳島簡易裁判所',
    address: '徳島県徳島市徳島町城内6-2',
    stampAmount: 6000,
  },
  {
    prefecture: '徳島県',
    areas: ['美馬市', '吉野川市', '美馬郡'],
    name: '脇町簡易裁判所',
    address: '徳島県美馬市脇町大字猪尻字西分8-1',
    stampAmount: 3000,
  },
  {
    prefecture: '徳島県',
    areas: ['那賀郡', '海部郡'],
    name: '牟岐簡易裁判所',
    address: '徳島県海部郡牟岐町大字中村字本村189-1',
    stampAmount: 3000,
  },
  {
    prefecture: '徳島県',
    areas: ['三好市', '三好郡'],
    name: '池田簡易裁判所',
    address: '徳島県三好市池田町マチ2458-3',
    stampAmount: 3000,
  },

  // ========== 香川県 ==========
  {
    prefecture: '香川県',
    areas: ['高松市', 'さぬき市', '東かがわ市', '木田郡', '香川郡'],
    name: '高松簡易裁判所',
    address: '香川県高松市丸の内1-36',
    stampAmount: 6000,
  },
  {
    prefecture: '香川県',
    areas: ['丸亀市', '坂出市', '善通寺市', '綾歌郡', '仲多度郡'],
    name: '丸亀簡易裁判所',
    address: '香川県丸亀市大手町2丁目4-21',
    stampAmount: 4000,
  },
  {
    prefecture: '香川県',
    areas: ['観音寺市', '三豊市'],
    name: '観音寺簡易裁判所',
    address: '香川県観音寺市花稲町地番なし',
    stampAmount: 3000,
  },

  // ========== 愛媛県 ==========
  {
    prefecture: '愛媛県',
    areas: ['松山市', '伊予市', '東温市', '伊予郡'],
    name: '松山簡易裁判所',
    address: '愛媛県松山市南堀端町5',
    stampAmount: 6000,
  },
  {
    prefecture: '愛媛県',
    areas: ['今治市', '越智郡'],
    name: '今治簡易裁判所',
    address: '愛媛県今治市別宮町3丁目1-12',
    stampAmount: 4000,
  },
  {
    prefecture: '愛媛県',
    areas: ['宇和島市', '北宇和郡', '南宇和郡'],
    name: '宇和島簡易裁判所',
    address: '愛媛県宇和島市丸之内2-1',
    stampAmount: 4000,
  },
  {
    prefecture: '愛媛県',
    areas: ['西条市', '新居浜市', '四国中央市'],
    name: '西条簡易裁判所',
    address: '愛媛県西条市明屋敷164-2',
    stampAmount: 4000,
  },
  {
    prefecture: '愛媛県',
    areas: ['八幡浜市', '西宇和郡', '大洲市', '喜多郡'],
    name: '八幡浜簡易裁判所',
    address: '愛媛県八幡浜市松柏甲824',
    stampAmount: 3000,
  },

  // ========== 高知県 ==========
  {
    prefecture: '高知県',
    areas: ['高知市', '土佐市', '南国市', '香美市', '香南市', '長岡郡', '土佐郡', '吾川郡'],
    name: '高知簡易裁判所',
    address: '高知県高知市丸ノ内2丁目4-1',
    stampAmount: 6000,
  },
  {
    prefecture: '高知県',
    areas: ['須崎市', '高岡郡'],
    name: '須崎簡易裁判所',
    address: '高知県須崎市青葉町1-1-20',
    stampAmount: 3000,
  },
  {
    prefecture: '高知県',
    areas: ['四万十市', '幡多郡'],
    name: '中村簡易裁判所',
    address: '高知県四万十市中村大橋通2丁目1-1',
    stampAmount: 3000,
  },
  {
    prefecture: '高知県',
    areas: ['宿毛市', '幡多郡大月町', '幡多郡黒潮町'],
    name: '宿毛簡易裁判所',
    address: '高知県宿毛市中央1丁目8-12',
    stampAmount: 3000,
  },
  {
    prefecture: '高知県',
    areas: ['安芸市', '安芸郡'],
    name: '安芸簡易裁判所',
    address: '高知県安芸市矢ノ丸1丁目4-5',
    stampAmount: 3000,
  },

  // ========== 福岡県 ==========
  {
    prefecture: '福岡県',
    areas: ['福岡市', '福岡市東区', '福岡市博多区', '福岡市中央区', '福岡市南区', '福岡市西区', '福岡市城南区', '福岡市早良区', '糸島市', '那珂川市'],
    name: '福岡簡易裁判所',
    address: '福岡県福岡市中央区城内1-1',
    stampAmount: 6000,
  },
  {
    prefecture: '福岡県',
    areas: ['北九州市', '北九州市門司区', '北九州市若松区', '北九州市戸畑区', '北九州市小倉北区', '北九州市小倉南区', '北九州市八幡東区', '北九州市八幡西区', '遠賀郡', '中間市'],
    name: '小倉簡易裁判所',
    address: '福岡県北九州市小倉北区金Fields1-4-1',
    stampAmount: 6000,
  },
  {
    prefecture: '福岡県',
    areas: ['飯塚市', '嘉麻市', '嘉穂郡', '田川市', '田川郡'],
    name: '飯塚簡易裁判所',
    address: '福岡県飯塚市新立岩8-1',
    stampAmount: 4000,
  },
  {
    prefecture: '福岡県',
    areas: ['久留米市', '大川市', '小郡市', 'うきは市', '三井郡', '三潴郡', '朝倉市', '朝倉郡'],
    name: '久留米簡易裁判所',
    address: '福岡県久留米市城南町15-1',
    stampAmount: 4000,
  },
  {
    prefecture: '福岡県',
    areas: ['直方市', '宮若市', '鞍手郡'],
    name: '直方簡易裁判所',
    address: '福岡県直方市感田1丁目1-1',
    stampAmount: 3000,
  },
  {
    prefecture: '福岡県',
    areas: ['行橋市', '豊前市', '京都郡', '築上郡'],
    name: '行橋簡易裁判所',
    address: '福岡県行橋市中央1丁目12-35',
    stampAmount: 3000,
  },
  {
    prefecture: '福岡県',
    areas: ['柳川市', '大牟田市', 'みやま市', '三潴郡大木町'],
    name: '柳川簡易裁判所',
    address: '福岡県柳川市三橋町垂見2-1',
    stampAmount: 3000,
  },
  {
    prefecture: '福岡県',
    areas: ['八女市', '筑後市', '八女郡'],
    name: '八女簡易裁判所',
    address: '福岡県八女市本町602-5',
    stampAmount: 3000,
  },
  {
    prefecture: '福岡県',
    areas: ['宗像市', '古賀市', '福津市', '糟屋郡', '春日市', '大野城市', '太宰府市', '筑紫野市', '筑紫郡'],
    name: '福岡簡易裁判所',
    address: '福岡県福岡市中央区城内1-1',
    stampAmount: 6000,
  },

  // ========== 佐賀県 ==========
  {
    prefecture: '佐賀県',
    areas: ['佐賀市', '小城市', '神埼市', '神埼郡'],
    name: '佐賀簡易裁判所',
    address: '佐賀県佐賀市城内1丁目1-45',
    stampAmount: 6000,
  },
  {
    prefecture: '佐賀県',
    areas: ['唐津市', '東松浦郡'],
    name: '唐津簡易裁判所',
    address: '佐賀県唐津市西城内1-36',
    stampAmount: 4000,
  },
  {
    prefecture: '佐賀県',
    areas: ['武雄市', '伊万里市', '嬉野市', '鹿島市', '杵島郡', '藤津郡'],
    name: '武雄簡易裁判所',
    address: '佐賀県武雄市武雄町大字武雄5101-4',
    stampAmount: 3000,
  },

  // ========== 長崎県 ==========
  {
    prefecture: '長崎県',
    areas: ['長崎市', '西海市', '西彼杵郡'],
    name: '長崎簡易裁判所',
    address: '長崎県長崎市万才町9-34',
    stampAmount: 6000,
  },
  {
    prefecture: '長崎県',
    areas: ['佐世保市', '松浦市', '平戸市', '東彼杵郡', '北松浦郡'],
    name: '佐世保簡易裁判所',
    address: '長崎県佐世保市裁判所通1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '長崎県',
    areas: ['島原市', '南島原市', '雲仙市', '南高来郡'],
    name: '島原簡易裁判所',
    address: '長崎県島原市城内1丁目1117',
    stampAmount: 3000,
  },
  {
    prefecture: '長崎県',
    areas: ['五島市', '南松浦郡'],
    name: '福江簡易裁判所',
    address: '長崎県五島市栄町1-1',
    stampAmount: 3000,
  },
  {
    prefecture: '長崎県',
    areas: ['対馬市'],
    name: '厳原簡易裁判所',
    address: '長崎県対馬市厳原町国分1437',
    stampAmount: 3000,
  },
  {
    prefecture: '長崎県',
    areas: ['壱岐市'],
    name: '郷ノ浦簡易裁判所',
    address: '長崎県壱岐市郷ノ浦町郷ノ浦562-4',
    stampAmount: 3000,
  },

  // ========== 熊本県 ==========
  {
    prefecture: '熊本県',
    areas: ['熊本市', '熊本市中央区', '熊本市東区', '熊本市西区', '熊本市南区', '熊本市北区', '合志市', '菊池郡'],
    name: '熊本簡易裁判所',
    address: '熊本県熊本市中央区京町1丁目12-5',
    stampAmount: 6000,
  },
  {
    prefecture: '熊本県',
    areas: ['八代市', '氷川郡'],
    name: '八代簡易裁判所',
    address: '熊本県八代市松江城町1-25',
    stampAmount: 4000,
  },
  {
    prefecture: '熊本県',
    areas: ['人吉市', '球磨郡'],
    name: '人吉簡易裁判所',
    address: '熊本県人吉市下城本町777-4',
    stampAmount: 3000,
  },
  {
    prefecture: '熊本県',
    areas: ['玉名市', '荒尾市', '玉名郡'],
    name: '玉名簡易裁判所',
    address: '熊本県玉名市繁根木187',
    stampAmount: 3000,
  },
  {
    prefecture: '熊本県',
    areas: ['天草市', '上天草市', '天草郡'],
    name: '本渡簡易裁判所',
    address: '熊本県天草市今釜新町3514',
    stampAmount: 3000,
  },
  {
    prefecture: '熊本県',
    areas: ['山鹿市', '菊池市', '阿蘇市', '阿蘇郡'],
    name: '山鹿簡易裁判所',
    address: '熊本県山鹿市山鹿987',
    stampAmount: 3000,
  },

  // ========== 大分県 ==========
  {
    prefecture: '大分県',
    areas: ['大分市', '由布市'],
    name: '大分簡易裁判所',
    address: '大分県大分市荷揚町7-5',
    stampAmount: 6000,
  },
  {
    prefecture: '大分県',
    areas: ['別府市', '速見郡'],
    name: '別府簡易裁判所',
    address: '大分県別府市北浜2丁目9-14',
    stampAmount: 4000,
  },
  {
    prefecture: '大分県',
    areas: ['中津市', '豊後高田市', '宇佐市', '下毛郡'],
    name: '中津簡易裁判所',
    address: '大分県中津市大塚362-1',
    stampAmount: 4000,
  },
  {
    prefecture: '大分県',
    areas: ['佐伯市'],
    name: '佐伯簡易裁判所',
    address: '大分県佐伯市城下東町1-45',
    stampAmount: 3000,
  },
  {
    prefecture: '大分県',
    areas: ['日田市', '玖珠郡'],
    name: '日田簡易裁判所',
    address: '大分県日田市田島2丁目6-1',
    stampAmount: 3000,
  },
  {
    prefecture: '大分県',
    areas: ['竹田市', '豊後大野市', '直入郡'],
    name: '竹田簡易裁判所',
    address: '大分県竹田市大字竹田2051-1',
    stampAmount: 3000,
  },

  // ========== 宮崎県 ==========
  {
    prefecture: '宮崎県',
    areas: ['宮崎市', '日南市', '串間市', '東諸県郡', '西諸県郡一部'],
    name: '宮崎簡易裁判所',
    address: '宮崎県宮崎市旭1丁目8-28',
    stampAmount: 6000,
  },
  {
    prefecture: '宮崎県',
    areas: ['都城市', '小林市', 'えびの市', '北諸県郡', '西諸県郡'],
    name: '都城簡易裁判所',
    address: '宮崎県都城市姫城町6-1',
    stampAmount: 4000,
  },
  {
    prefecture: '宮崎県',
    areas: ['延岡市', '門川町', '東臼杵郡'],
    name: '延岡簡易裁判所',
    address: '宮崎県延岡市旭町2丁目1-1',
    stampAmount: 4000,
  },
  {
    prefecture: '宮崎県',
    areas: ['日向市', '児湯郡', '西都市'],
    name: '日向簡易裁判所',
    address: '宮崎県日向市本町10-1',
    stampAmount: 3000,
  },
  {
    prefecture: '宮崎県',
    areas: ['高千穂町', '西臼杵郡'],
    name: '高千穂簡易裁判所',
    address: '宮崎県西臼杵郡高千穂町大字三田井1-1',
    stampAmount: 3000,
  },

  // ========== 鹿児島県 ==========
  {
    prefecture: '鹿児島県',
    areas: ['鹿児島市', '日置市', 'いちき串木野市', '薩摩川内市一部', '姶良市', '霧島市一部'],
    name: '鹿児島簡易裁判所',
    address: '鹿児島県鹿児島市山下町15-9',
    stampAmount: 6000,
  },
  {
    prefecture: '鹿児島県',
    areas: ['薩摩川内市', '薩摩郡'],
    name: '川内簡易裁判所',
    address: '鹿児島県薩摩川内市中郷1-13',
    stampAmount: 4000,
  },
  {
    prefecture: '鹿児島県',
    areas: ['南さつま市', '枕崎市', '指宿市', '南九州市'],
    name: '加世田簡易裁判所',
    address: '鹿児島県南さつま市加世田川畑4231',
    stampAmount: 3000,
  },
  {
    prefecture: '鹿児島県',
    areas: ['奄美市', '大島郡'],
    name: '名瀬簡易裁判所',
    address: '鹿児島県奄美市名瀬長浜町3-26',
    stampAmount: 3000,
  },
  {
    prefecture: '鹿児島県',
    areas: ['鹿屋市', '垂水市', '肝属郡', '曽於郡', '曽於市', '志布志市'],
    name: '鹿屋簡易裁判所',
    address: '鹿児島県鹿屋市公園町20-1',
    stampAmount: 4000,
  },
  {
    prefecture: '鹿児島県',
    areas: ['西之表市', '熊毛郡'],
    name: '西之表簡易裁判所',
    address: '鹿児島県西之表市西之表16229',
    stampAmount: 3000,
  },
  {
    prefecture: '鹿児島県',
    areas: ['霧島市', '姶良郡'],
    name: '国分簡易裁判所',
    address: '鹿児島県霧島市国分中央3-20-1',
    stampAmount: 4000,
  },
  {
    prefecture: '鹿児島県',
    areas: ['伊佐市', '出水市', '阿久根市', '出水郡'],
    name: '出水簡易裁判所',
    address: '鹿児島県出水市緑町12-45',
    stampAmount: 3000,
  },

  // ========== 沖縄県 ==========
  {
    prefecture: '沖縄県',
    areas: ['那覇市', '豊見城市', '糸満市', '島尻郡一部', '南城市'],
    name: '那覇簡易裁判所',
    address: '沖縄県那覇市樋川1丁目14-1',
    stampAmount: 6000,
  },
  {
    prefecture: '沖縄県',
    areas: ['沖縄市', 'うるま市', '宜野湾市', '浦添市', '中頭郡'],
    name: '沖縄簡易裁判所',
    address: '沖縄県沖縄市知花6丁目5-38',
    stampAmount: 4000,
  },
  {
    prefecture: '沖縄県',
    areas: ['名護市', '国頭郡'],
    name: '名護簡易裁判所',
    address: '沖縄県名護市宮里1丁目10-1',
    stampAmount: 3000,
  },
  {
    prefecture: '沖縄県',
    areas: ['宮古島市', '宮古郡'],
    name: '平良簡易裁判所',
    address: '沖縄県宮古島市平良字西里730',
    stampAmount: 3000,
  },
  {
    prefecture: '沖縄県',
    areas: ['石垣市', '八重山郡'],
    name: '石垣簡易裁判所',
    address: '沖縄県石垣市美崎町11-1',
    stampAmount: 3000,
  },
]

// 型変換用ヘルパー
function toResult(entry: CourtEntry): Court {
  return {
    name: entry.name,
    address: entry.address,
    stampAmount: entry.stampAmount,
  }
}

/**
 * 都道府県と市区町村から管轄簡易裁判所を検索する
 * ZipCloud API の返り値（address1, address2）をそのまま渡せる
 *
 * マッチング優先順位:
 * 1. 完全一致 (例: "横浜市" === "横浜市")
 * 2. 前方一致（入力がエリアで始まる）例: "横浜市西区".startsWith("横浜市")
 * 3. 前方一致（エリアが入力で始まる・2文字以上）例: "豊岡市".startsWith("豊岡")
 * 4. 都道府県フォールバック（最初のエントリ = 道府県庁所在地の裁判所）
 */
export function findCourt(prefecture: string, city: string): Court | null {
  if (!prefecture || !city) return null
  const input = city.trim()
  if (!input) return null

  const prefCourts = courtData.filter((c) => c.prefecture === prefecture)
  if (prefCourts.length === 0) return null

  // 1. 完全一致
  for (const entry of prefCourts) {
    for (const area of entry.areas) {
      if (input === area) return toResult(entry)
    }
  }

  // 2. 前方一致（入力 が エリア名 で始まる）: "横浜市西区" → "横浜市"
  for (const entry of prefCourts) {
    for (const area of entry.areas) {
      if (input.startsWith(area)) return toResult(entry)
    }
  }

  // 3. 前方一致（エリア名 が 入力 で始まる・2文字以上）: "豊岡" → "豊岡市"
  if (input.length >= 2) {
    for (const entry of prefCourts) {
      for (const area of entry.areas) {
        if (area.startsWith(input)) return toResult(entry)
      }
    }
  }

  // 4. 都道府県フォールバック（最初のエントリ = 都道府県庁所在地の裁判所）
  return toResult(prefCourts[0])
}

export const prefectures = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

export { courtData }
