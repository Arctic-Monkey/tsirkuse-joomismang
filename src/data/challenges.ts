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
    categoryTitle: 'Kes siit seltskonnast...?',
    categoryRule: 'Loe 3-ni, kõik näitavad, enim näpuga näidatu joob!',
  },
  duel: {
    category: 'duel',
    categoryTitle: 'Duellid',
    categoryRule: 'Vastase valid ise, kaotaja joob 2 lonksu!',
  },
  everyone_who: {
    category: 'everyone_who',
    categoryTitle: 'Kõik kes...',
    categoryRule: 'Kõik, kelle kohta käib, joovad!',
  },
  do_or_drink: {
    category: 'do_or_drink',
    categoryTitle: "Challenge'id: Tee või joo",
    categoryRule: 'Kui ei julge, jood 3 lonksu!',
  },
  special_rule: {
    category: 'special_rule',
    categoryTitle: 'Erireeglid',
    categoryRule: 'Kehtib vastavalt reeglile!',
  },
};

function buildChallenges(
  startId: number,
  categoryKey: ChallengeCategory,
  items: string[]
): Challenge[] {
  const meta = CATEGORIES[categoryKey];
  return items.map((text, index) => ({
    id: startId + index,
    category: meta.category,
    categoryTitle: meta.categoryTitle,
    categoryRule: meta.categoryRule,
    text,
  }));
}

export const CHALLENGES: Challenge[] = [
  // NEVER HAVE I EVER (kes on teinud, joob) 1–20
  ...buildChallenges(1, 'never_have_i_ever', [
    'Seksinud, kui vanemad olid kodus',
    'Seksinud autos',
    'Seksinud õues',
    'Seksinud peol kellegi teise voodis',
    'Teesklenud orgasmi',
    'Hüüdnud seksi ajal vale nime',
    'Kukkunud seksi ajal voodist välja',
    'Kuulnud oma vanemaid seksimas',
    "Saatnud nude'i",
    'Ärganud kellegi kõrval ja mitte mäletanud, kuidas sinna sattusin',
    'Hiilinud hommikul kellegi juurest välja, kui ta veel magas',
    'Läinud kellegi juurest koju ilma aluspesuta',
    'Teinud kellelegi kaelamärgi',
    'Suudelnud kahte inimest samal õhtul',
    'Suudelnud kedagi samast soost',
    'Suudelnud kedagi, kellel oli kaaslane',
    'Pissinud kohta, kuhu ei tohiks',
    'Saanud peolt välja visatud',
    'Tantsinud laual või baarileti peal',
    'Suudelnud kedagi siit seltskonnast',
  ]),

  // KES SIIT SELTSKONNAST...? (loe 3-ni, kõik näitavad, enim näpuga näidatu joob) 21–30
  ...buildChallenges(21, 'who_in_group', [
    '...kelle brauseri ajalugu peaks kohe ära kustutama?',
    "...läheks ex'iga kohe tagasi kokku, kui too kirjutaks?",
    '...on kellegagi siit juba salaja midagi olnud?',
    '...flirdiks ükskõik kellega, kui on piisavalt joonud?',
    '...abielluks raha pärast?',
    '...on suhtes kõige armukadedam?',
    '...on salaja kõige parem voodis?',
    '...oleks kõige parem sugar daddy või sugar mommy?',
    '...kaob peolt kõige tihedamini kellegagi?',
    '...on kõige seksikam? (enim näpuga näidatu teeb võiduringi toas ja joob)',
  ]),

  // DUELLID (vastase valid ise, kaotaja joob 2 lonksu) 31–50
  ...buildChallenges(31, 'duel', [
    'Flip cup: joo oma topsi tühjaks ja flipi see laua servalt tagurpidi. Kiirem võidab',
    'Galerii rulett: mõlemad näitavad oma galerii 7. pilti. Seltskond hääletab, kumb on piinlikum, ja selle omanik kaotab',
    'Ekraaniaeg: näidake oma ekraaniaega. Kellel on rohkem, see kaotab',
    'Kiirvastus: saatke mõlemad samal ajal suvalisele kontaktile "mis sa minust päriselt arvad?". Kes saab vastuse hiljem, see kaotab. Vastus loetakse ette',
    'Kõne rulett: helistage samal ajal suvalisele kontaktile. Kellele vastatakse esimesena, see peab rääkima 30 sekundit ilma põhjust ütlemata. Teine joob',
    'Telefonivahetus: vahetage 1 minutiks telefonid ja saatke teineteise telefonist kellelegi üks sõnum, mille te teineteisele ette ei näita. Kes keeldub, kaotab',
    'Paljastus: kumbki ütleb teise kohta ühe asja, mida too kindlasti ei taha, et seltskond teaks. Kes rohkem punastab, kaotab',
    'Never have I ever duell: mõlemal on 3 sõrme üleval. Kordamööda ütlete asju, mida teine on kindlasti teinud. Kes esimesena kõik sõrmed alla paneb, kaotab',
    'Tõe duell: kumbki esitab teisele ühe küsimuse, millele peab ausalt vastama. Kes keeldub, joob 3 lonksu',
    'Silmside: istuge põlvili teineteise vastas, 20 cm kaugusel, ja vaadake teineteisele silma. Teised võivad segada. Kes esimesena pilgu ära pöörab või naerma hakkab, kaotab',
    'Pudelikork: visake kordamööda pudelikorki klaasi. Kes esimesena sisse saab, võidab',
    'Ilma käteta: istuge põrandale ja tõuske ilma käsi kasutamata püsti. Aeglasem kaotab',
    'Ümisemine: ümise ühte laulu, vastane peab 10 sekundiga ära arvama. Seejärel vahetate. Kes ei arva, kaotab',
    'Kiss, marry, kill: kumbki teeb teise jaoks raske KMK kolme inimesega siit seltskonnast. Kes ei julge vastata, kaotab',
    'Kõrvasosin: sosistage kordamööda teineteisele kõrva midagi nii pikantset, kui julgete. Kes esimesena naerma hakkab või punastab, kaotab',
    'Banaan: koorige banaan ainult huulte ja hammastega ja sööge ära. Aeglasem kaotab',
    'Käed selja taga: jooge oma klaas ilma käteta tühjaks (või 3 lonksu). Aeglasem kaotab',
    'Plank: kumb hoiab kauem planki. Teised võivad kõditada',
    'Kukil: kandke kordamööda teineteist kukil ümber laua. Aeglasem kaotab',
    'Silmad kinni: seltskond hääletab silmad kinni, kumb teist on seksikam. Kaotaja joob, võitja teeb võiduringi',
  ]),

  // KÕIK KES... (kõik, kelle kohta käib, joovad) 51–55
  ...buildChallenges(51, 'everyone_who', [
    '...on viimase kuu jooksul kedagi suudelnud',
    '...kellel on praegu telefonis tutvumisäpp (näita ekraani!)',
    '...on kunagi saatnud pikantse pildi',
    '...kellel on seljas pesu, mida nad ei tahaks kellelegi näidata',
    '...on kunagi kellelegi siin seltskonnas mõelnud rohkem, kui tohiks',
  ]),

  // CHALLENGE'ID: TEE VÕI JOO (kui ei julge, jood 3 lonksu) 56–135
  ...buildChallenges(56, 'do_or_drink', [
    'Seltskond valib, kelle süles sa istud kuni oma järgmise käiguni',
    'Vali ise, kelle süles istud kuni järgmise ringini. Joo oma lonksud ainult tema käest',
    'Laula kellelegi tema süles istudes serenaadi, kus on sees tema nimi',
    "Istu kellegi süles ja loe talle kõrva ette oma 3 viimast Google'i otsingut",
    'Tantsi kellegagi 30 sekundit aeglast tantsu, väga lähedal',
    'Tantsi kellegagi 20 sekundit nii, et teie otsaesised on koos',
    'Tantsi kellegagi tangot üle toa',
    'Lase seltskonnal valida keegi, kelle süles istud ja keda kallistad seni, kuni ta oma joogi lõpetab',
    'Andke pudelikork või kaart huultega ringiga edasi. Kes maha kukutab, joob',
    'Body shot: lase kellelgi juua lonks sinu kaelalt või kõhu pealt',
    'Tequila stiilis: lakku kellegi randmelt soola, joo lonks ja hammusta tema käest sidrunit',
    'Sosista kellelegi kõrva, mida sa temaga teeksid, kui keegi ei näeks',
    'Anna seltskonna valitud inimesele 30-sekundiline õlamassaaž',
    'Lase end silmad kinni 20 sekundit masseerida ja arva ära, kes see oli',
    'Suudle seltskonna valitud inimest põsele',
    'Lase kellelgi suudelda oma kaela või suudle ise kellegi kaela',
    "Tee kellegagi selfie, kus suudled tema põske, ja pane see story'sse",
    'Hoia kellegi kätt, sõrmed põimitud, kuni järgmise ringini',
    'Tõsta keegi süles üles ja kanna ta printsessi kombel üle toa',
    'Sosista kõigile kordamööda kõrva üks kompliment nende välimuse kohta',
    'Lase kellelgi oma kõrva 10 sekundit puhuda, ilma et naerad',
    'Kirjuta sõrmega kellegi seljale üks sõna. Kui ta ära ei arva, joob tema',
    "Lase seltskonnal valida sulle 3 inimest. Pead kiss, marry, kill'i neist valjult välja ütlema, kui nad sulle silma vaatavad",
    'Seltskond valib su telefonist suvalise kontakti. Saada talle "ma nägin sinust öösel unenägu 😳" ja ära selgita 24 tundi',
    'Saada viimasele inimesele, kellega flirtisid, ainult emoji 🍆 või 🍑',
    'Saada oma crushile emoji, mille seltskond valib',
    "Lase seltskonnal kirjutada sinu nimel sõnum ex'ile. Sina otsustad, kas saadad. Kui ei, jood 5 lonksu",
    'Kirjuta emale "mul on sulle midagi tähtsat öelda" ja oota 5 minutit enne selgitamist',
    'Kirjuta vanale koolikaaslasele, kellega pole aastaid rääkinud: "ma mõtlen ikka veel sinu peale"',
    'Helista pitsakohta ja küsi, kas neil on menüüs "midagi kuuma just minu jaoks"',
    'Helista sõbrale ja laula talle 15 sekundit armastuslaulu. Kui ta ei vasta, saada häälsõnum',
    'Ava oma Instagram Explore ja näita kõigile esimest ekraani',
    'Näita oma viimast vestlust Snapchatis või Instagramis',
    'Näita, mis su telefoni peidetud albumis on, või joo 5 lonksu',
    'Lase seltskonnal vaadata su Spotify viimast 5 laulu ja need maha teha',
    'Postita Instagram story, mille seltskond valib, ja hoia seda üleval vähemalt 1 tund',
    'Seltskond nimetab sinu telefonis kellegi kontakti 24 tunniks millekski piinlikuks',
    "Lase kellelgi 1 minut swipe'ida sinu Tinderis või muus tutvumisäpis",
    'Ütle iga mängija kohta, mis talle voodis kõige tõenäolisemalt meeldib',
    'Kirjelda oma kõige hullemat voodikogemust 10 sekundiga',
    'Vaata kellelegi 30 sekundit silma ja ütle siis "ma tahan sinult midagi"',
    'Tee 5 sekundit oma parimat orgasmiheli',
    'Twerki 15 sekundit seina vastu',
    'Tee 20 sekundit kõige seksikamat tantsu tooliga',
    "Kõnni ühe ringi toas nagu Victoria's Secreti modell",
    'Poseeri toa keskel 10 sekundit kõige kuumemalt, keegi teeb pildi',
    'Võta üks riideese ära (sokid ja ehted ei loe)',
    'Vaheta kellegagi särk mängu lõpuni',
    'Vaheta kellegagi kingad mängu lõpuni',
    'Pane kellegi teise rinnahoidja või aluspüksid riiete peale selga ja kanna järgmise ringi lõpuni',
    'Pane jääkuubik pluusi sisse ja hoia seda seal, kuni see sulab',
    'Lase kellelgi enda peale huulepulgaga midagi kirjutada (kuhu, otsustab tema)',
    'Lase kellelgi sulle 10 sekundiga anda uus soeng, mis jääb mängu lõpuni',
    'Lase kellelgi sulle patsid teha',
    'Söö midagi kellegi käest ilma käteta',
    'Vali endale toitja: kuni mängu lõpuni tohib sind toita ainult tema',
    'Joo lonks pudelist, mida keegi teine sulle hoiab, käed selja taga',
    'Lase silmad kinni kellelgi sulle suhu midagi panna ja arva ära, mis see on (söödav!)',
    'Söö lusikatäis midagi külmkapist, mille seltskond valib',
    'Tee 10 kätekõverdust, kui keegi istub sul seljas',
    'Tee 15 kükki, kui keegi on sul kukil',
    'Seisa 20 sekundit kätel vastu seina',
    'Lase kõigil sind korra kõditada, ilma et naerad',
    'Ole kuni järgmise ringini toa koer: haugu iga kord, kui keegi joob',
    'Liigu kuni järgmise ringini ainult neljakäpukil',
    'Räägi kuni järgmise käiguni ainult lauldes',
    'Lõpeta lause, mille seltskond alustab, kõige räigemal võimalikul moel',
    'Lakku kellegi küünarnukki',
    'Roasti 5 sekundiga iga mängijat',
    'Kirjelda iga mängijat ühe sõnaga, mida ta kõige vähem kuulda tahaks',
    'Tee abieluettepanek kellelegi põlvili, sõrmuseks pudelikork',
    'Kallista kahte inimest korraga 20 sekundit, keset sind',
    'Lase kahel mängijal sind korraga põsele suudelda, keegi teeb pildi',
    'Vali keegi, kellega joote käsi ristatud (nagu pulmas)',
    'Istu kellegi süles ja söödake teineteist kordamööda 3 suutäit',
    'Lase kellelgi sind silmad kinni ümber toa juhtida ainult häälega. Kui midagi maha lükkad, jood',
    'Tee kellegagi kõige romantilisem pilt, mida suudate, ja saatke see grupivestlusse',
    'Lase seltskonnal valida 2 mängijat, kes peavad sind 10 sekundit samaaegselt kallistama',
    'Joo oma järgmine lonks kellegi teise käest, kes seisab sinu taga',
    'Seltskond valib sulle mängu lõpuni "kaaslase": istute kõrvuti, joote koos ja ta tohib sinu eest ühe ülesande ära keelata',
  ]),

  // ERIREEGLID 136–150
  ...buildChallenges(136, 'special_rule', [
    'Pöidlameister: kui paned pöidla lauale, teevad kõik sama, viimane joob',
    'Küsimuste kuningas: kes vastab sinu küsimusele, joob',
    'Reegel: mõtle välja reegel, mis kehtib mängu lõpuni',
    'Seitse minutit taevas: vali keegi ja minge 1 minutiks teise ruumi. Mida teete, on teie asi',
    'Pudeli keerutamine: keeruta pudelit. Kelle peale näitab, sellega teed ühe ülesande ruutudest 56–78',
    'Peegel: kuni järgmise ringini teed kõike, mida valitud mängija teeb',
    'Vee all: kõik joovad korraga, lõpetada võib alles siis, kui paremal istuja lõpetab',
    'Keelatud sõna: keegi ei tohi öelda "ei". Kes ütleb, joob',
    'Ori: vali keegi, kes on kuni järgmise ringini sinu ori (valab, toob, masseerib õlgu)',
    'Riidetehing: kõik vahetavad ühe riideeseme vasakul istujaga',
    'Ex-hääletus: seltskond hääletab, kes peab ex\'ile "igatsen sind" kirjutama. Kui keeldub, joob 5 lonksu',
    'Aus ring: kõik ütlevad, kellega siin nad kõige tõenäolisemalt üheks ööks oleksid. Kes keeldub, joob',
    'Silmad kinni: sul seotakse silmad ja keegi suudleb sind põsele. Arva ära, kes see oli. Kui eksid, jood',
    'Sülering: kõik istuvad kuni järgmise ringini vasakul istuja süles (või nii palju, kui toolid kannatavad)',
    'Tsirkuse kuningas: määra ükskõik kellele ükskõik milline ülesanne siit nimekirjast',
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
