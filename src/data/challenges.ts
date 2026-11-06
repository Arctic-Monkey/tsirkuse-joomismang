import type { Challenge, ChallengeCategory, Ladder } from '../types/game';

interface CategoryMeta {
  category: ChallengeCategory;
  categoryTitle: string;
  categoryRule: string;
}

const CATEGORIES: Record<ChallengeCategory, CategoryMeta> = {
  never_have_i_ever: {
    category: 'never_have_i_ever',
    categoryTitle: 'Never Have I Ever',
    categoryRule: 'Kes on teinud, joob!',
  },
  who_in_group: {
    category: 'who_in_group',
    categoryTitle: 'Kes siit seltskonnast…?',
    categoryRule: 'Loe 3-ni, kõik näitavad — enim näpuga näidatu joob!',
  },
  duel: {
    category: 'duel',
    categoryTitle: 'Duell!',
    categoryRule: 'Vastase valid ise, kaotaja joob!',
  },
  everyone_who: {
    category: 'everyone_who',
    categoryTitle: 'Kõik kes…',
    categoryRule: 'Kõik, kelle kohta käib, joovad!',
  },
  do_or_drink: {
    category: 'do_or_drink',
    categoryTitle: 'Tee või joo!',
    categoryRule: 'Kui ei julge, jood 3 lonksu!',
  },
  special_rule: {
    category: 'special_rule',
    categoryTitle: 'Erireegel!',
    categoryRule: 'Kehtib vastavalt reeglile!',
  },
};

function createChallenges(meta: CategoryMeta, startId: number, texts: string[]): Challenge[] {
  return texts.map((text, index) => ({
    id: startId + index,
    category: meta.category,
    categoryTitle: meta.categoryTitle,
    categoryRule: meta.categoryRule,
    text,
  }));
}

export const CHALLENGES: Challenge[] = [
  ...createChallenges(CATEGORIES.never_have_i_ever, 1, [
    'Suudelnud kahte inimest samal õhtul',
    'Suudelnud kedagi siit seltskonnast',
    'Tahtnud suudelda kedagi siit seltskonnast',
    'Teinud ühe öö suhet',
    'Saatnud kellelegi pikantse pildi',
    'Saanud pikantse pildi, mida ma ei tahtnud',
    'Suudelnud kedagi samast soost',
    'Hiilinud kellegi juurest hommikul välja nii, et teine magas',
    'Olnud kellegagi, kelle nime ma hiljem ei mäletanud',
    'Flirtinud kellegagi ainult selleks, et tasuta jooki saada',
    'Olnud armunud sõbra kaaslasesse',
    'Suudelnud kedagi ainult selleks, et kedagi teist armukadedaks teha',
    'Kasutanud tutvumisäppi purjus peaga',
    'Teinud midagi kohas, kus oleks võinud vahele jääda',
    "Olnud situationship'is kauem kui 3 kuud",
    'Teesklenud, et mul on huvi, et keegi mulle kokteili ostaks',
    'Saatnud ex\'ile "ärkvel?" sõnumi',
    "Läinud tagasi ex'i juurde",
    'Olnud kellegagi, kes oli sel ajal suhtes',
    'Suudelnud kedagi tantsupõrandal võõrana',
    'Valetanud, mitme inimesega ma olnud olen',
    'Unistanud kellestki siin seltskonnas',
    'Kustutanud vestluse, et keegi seda ei näeks',
    'Saanud vahele, kui stalkisin kedagi',
    'Kirjutanud kellelegi esimesena kell 3 öösel',
    'Teinud tutvumisäpis kellegagi kohtingu ja jätnud ta istuma',
    'Olnud kellegagi, kes oli minust üle 5 aasta vanem',
    'Mänginud "pudeli keerutamist" ja nautinud seda liiga palju',
    'Suudelnud kedagi ja siis kahetsenud',
    'Mõelnud selle mängu ajal kellegi peale siin',
  ]),
  ...createChallenges(CATEGORIES.who_in_group, 31, [
    '…on kõige parem suudleja?',
    '…on kõige rohkem inimestega olnud?',
    '…oleks OnlyFansis kõige edukam?',
    "…helistab täna öösel ex'ile?",
    '…läheb täna kellegagi koju?',
    '…on kõige suurem red flag voodis?',
    '…on salaja kõige metsikum?',
    '…on kõige suurem flirt?',
    '…petaks oma kaaslast kõige tõenäolisemalt?',
    "…satuks kõige tõenäolisemalt situationship'i siin seltskonnas?",
    '…on kõige parem keha?',
    '…oleks ideaalne one night stand?',
    '…armub esimesena valesse inimesse?',
    '…on kõige rohkem tutvumisäppides?',
    "…teeb kõige veidramaid häälsõnumeid ex'ile?",
    '…teeb seda kohas, kus ei tohiks?',
    '…on kõige kõvem sõnadega, aga kõige kehvem tegudes?',
    '…kirjutab esimesena oma crushile täna?',
    '…läheks Temptation Islandile?',
    '…oleks parim abikaasa?',
    '…oleks kõige hullem abikaasa?',
    '…on kõige kõrgemate standarditega ja kõige madalama tulemusega?',
    '…ei ole kunagi kedagi suudelnud? (enim näpuga näidatu võib jooma valida)',
    '…on kõige suurem "suudleb ja kaob" tüüp?',
    '…on täna kõige seksikam? (enim näpuga näidatu teeb võiduringi ja joob)',
  ]),
  ...createChallenges(CATEGORIES.duel, 56, [
    "Flirtimisduell: kumbki ütleb kõige parema pickup-line'i kolmandale mängijale, tema valib võitja",
    'Jõllitamine 30 cm kauguselt, kes esimesena naerab, joob',
    'Seksikama kõnnaku duell, seltskond hääletab',
    'Kumb kirjeldab oma unistuste kohtingut paremini',
    'Body-roll duell, 10 sekundit',
    'Kumb räägib piinlikuma kohtingu loo',
    'Kumb sosistab kellelegi kõrva midagi, mis paneb ta punastama',
    'Kumb joob oma joogi kiiremini',
    'Kumb leiab oma telefonist kõige piinlikuma pildi',
    'Lap-dance-duell (riided seljas, 10 sek), seltskond hääletab',
    'Kumb teeb kõige seksikama "mmm"-heli',
    'Kumb ütleb rohkem asju, mida tal hommikul pärast pidu kahju oli (ausalt)',
    'Tõtt vahtimine, samal ajal kui keegi teine teile kõrva puhub',
    'Kumb arvab ära rohkem asju teise mängija kohta (kolm küsimust)',
    'Kumb on viimati kellegagi suudelnud. Kauem aega tagasi suudelnu joob',
    'Kumb kirjeldab oma ideaalset partnerit 10 sekundiga paremini',
    "Kumb mäletab rohkem oma ex'ide nimesid. Kes jääb kinni, joob",
    'Seksikama tantsuliigutuse duell, ilma muusikata',
    'Kumb paneb kolmanda mängija esimesena naerma, ilma teda puudutamata',
    'Pöidlamaadlus, aga kaotaja peab võitjale komplimendi tegema ja jooma',
  ]),
  ...createChallenges(CATEGORIES.everyone_who, 76, [
    '…on viimase kuu jooksul kedagi suudelnud',
    '…kellel on telefonis tutvumisäpp',
    "…on praegu situationship'is",
    '…on vallalised ja otsivad',
    '…on kunagi kellegi magama jätnud ja hommikul lahkunud',
    '…on kunagi saanud "seen" ja ei saanud vastust',
    '…on kunagi kirjutanud kellelegi siit seltskonnast hilja öösel',
    '…on kellelegi siin kunagi vähegi crushinud',
    '…ei mäleta oma viimast kohtingut (või pole seda olnud)',
    '…on kunagi peol kellegagi kõrvalruumi kadunud',
    '…arvavad, et nad on siin kõige parem suudleja',
    "…on ex'iga ikka sõbrad",
    '…kellel on pesu, mis ei sobi kokku',
    '…on kellegi Instagrami storyt vaadanud viimase tunni jooksul',
    "…on kunagi saanud teise võimaluse ex'ilt",
    '…kellel on salajane tätoveering',
    '…on kunagi teinud esimese sammu',
    '…on olnud kunagi kellegagi esimesel kohtingul',
    '…kellel on telefonis kõrval "salajane" vestlus',
    '…said selle mängu ajal juba punaseks',
  ]),
  ...createChallenges(CATEGORIES.do_or_drink, 96, [
    'Suudle mängijat vasakul põsele',
    'Istu mängu lõpuni või kuni järgmise ringini kellegi süles',
    'Sosista kellelegi siin kõrva midagi pikantset',
    'Kirjuta oma crushile "mõtlen sinu peale" ja näita tõestust',
    'Loe valjult ette oma viimane vestlus tutvumisäpis',
    'Ütle, kes siin on sinu arvates kõige seksikam',
    'Ütle, keda siit seltskonnast sa suudleksid, kui peaksid valima',
    'Tee kellelegi 20-sekundiline lap dance (riided seljas)',
    'Võta üks riideese ära (sokid ei loe)',
    'Näita viimast pilti oma galeriis',
    'Räägi oma kõige piinlikum seksi- või kohtingulugu',
    'Kirjelda oma ideaalset ühe öö suhet 3 sõnaga',
    "Lase seltskonnal kirjutada sinu nimel sõnum ex'ile, sina valid, kas saadad",
    'Masseeri vasakul istuja õlgu 30 sekundit',
    'Tee kellelegi siin parim pickup-line',
    'Lase kellelgi oma kaelale suudlus anda (või anna ise)',
    'Vaheta kellegagi üks riideese kuni mängu lõpuni',
    'Tee 20 sekundit striptiisitantsu (riided seljas)',
    'Ütle, kellega siin oleksid kõige tõenäolisemalt üheks ööks',
    'Ütle oma crushi nimi',
    'Kirjelda oma "body count" ühe emojiga',
    'Näita oma Snapchati viimast vestlust',
    'Lase kellelgi jooki sinu kaelalt või randmelt juua (body shot)',
    'Tee kellelegi siin abieluettepanek, põlvili',
    'Laula kellelegi armastuslaulu, vaadates talle silma',
    'Hoia kellegi kätt kuni järgmise käiguni',
    'Ütle iga mängija kohta, mis sulle temas füüsiliselt kõige rohkem meeldib',
    'Kirjelda oma kõige veidramat fantaasiat (puhastatud versioonis)',
    'Tee seltskonnale 10-sekundiline seksikas poseerimine, keegi teeb pildi',
    'Saada oma viimasele vestlusele emoji 😏 ilma selgituseta',
    'Ütle mängijale paremal kolm asja, mis teevad ta atraktiivseks',
    'Istu kellegi süles ja ütle "kallis, too mulle jooki"',
    'Kirjelda oma viimast suudlust 5 sõnaga',
    'Lase vasakul istujal valida sinu järgmise Instagram story',
    'Tantsi aeglaselt kellegagi 20 sekundit',
  ]),
  ...createChallenges(CATEGORIES.special_rule, 131, [
    'Pöidlameister: kui paned pöidla lauale, teevad kõik sama, viimane joob',
    'Küsimuste kuningas: kes vastab sinu küsimusele, joob',
    'Reegel: mõtle välja reegel, mis kehtib mängu lõpuni',
    'Paarike: vali paariline, kes joob alati koos sinuga ja istub sinu kõrval',
    'Peegel: kuni järgmise ringini teed kõike, mida valitud mängija teeb',
    'Vee all: kõik joovad korraga, lõpetada võib alles siis, kui paremal istuja lõpetab',
    'Kohtunik: seltskond hääletab, kes on täna kõige rohkem flirtinud. Tema joob 3 lonksu',
    'Kuum või külm: vali kaks mängijat, nad peavad otsustama, kumb neist joob 3 lonksu või suudlevad põsele',
    'Keelatud sõna: keegi ei tohi öelda "ei". Kes ütleb, joob',
    'Kompliment: iga kord, kui keegi joob, peab ta sulle komplimendi tegema, kuni järgmise ringini',
    'Seitse minutit taevas: vali keegi ja minge 1 minutiks teise ruumi. Mida teete, on teie asi',
    'Silmad kinni: järgmise ringi jooksul arvad silmad kinni, kes sind puudutab (õlga)',
    'Tõde kõigilt: kõik vastavad ausalt, kes siin on kõige atraktiivsem. Enim hääli saanu joob',
    'Pudeli keerutamine: keeruta pudelit, kelle peale näitab, sellega teed ühe ülesannetest 96–130',
    'Sosinaring: kõik sosistavad paremale mängijale ühe saladuse',
    'Vali crush: vali keegi, kes peab sinuga flirtima kuni järgmise ringini',
    'Suudluse küsimus: vali keegi, kes ütleb ausalt, kas suudleks sind',
    'Riidetehing: kõik vahetavad ühe riideeseme vasakul istujaga',
    'Ex-hääletus: seltskond hääletab, kes peab oma ex\'ile "tere" kirjutama. Kui keeldub, joob 5 lonksu',
    'Tsirkuse kuningas: sa võid määrata ühe ülesande ükskõik kellele siin',
  ]),
];

export const LADDERS: Ladder[] = [
  // Up ladders (clean, well-spaced across the board, no overlaps)
  { from: 3, to: 17, type: 'up' },
  { from: 13, to: 32, type: 'up' },
  { from: 21, to: 42, type: 'up' },
  { from: 36, to: 55, type: 'up' },
  // Down ladders (clean, well-spaced across the board, no overlaps)
  { from: 16, to: 6, type: 'down' },
  { from: 29, to: 11, type: 'down' },
  { from: 47, to: 26, type: 'down' },
  { from: 58, to: 37, type: 'down' },
];

export function generateBoardChallenges(): Record<number, Challenge> {
  const shuffled = [...CHALLENGES].sort(() => Math.random() - 0.5);
  const boardChallenges: Record<number, Challenge> = {};

  for (let square = 2; square <= 59; square++) {
    boardChallenges[square] = shuffled[square - 2];
  }

  // Celebratory challenge on square 60 (FINIŠ / TSIRKUSE KUNINGAS)
  boardChallenges[60] = CHALLENGES[149]; // ID 150: Tsirkuse kuningas

  return boardChallenges;
}

export function getRandomChallenge(excludeIds?: number | number[]): Challenge {
  const excludedSet = new Set(
    Array.isArray(excludeIds)
      ? excludeIds
      : excludeIds !== undefined
      ? [excludeIds]
      : []
  );
  const pool = CHALLENGES.filter((c) => !excludedSet.has(c.id));
  const activePool = pool.length > 0 ? pool : CHALLENGES;
  const randomIndex = Math.floor(Math.random() * activePool.length);
  return activePool[randomIndex];
}
