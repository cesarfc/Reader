/* Reading Rocket — content data.
   Words are authored with:
     w = the word, e = emoji picture, t = grapheme tiles, s = speakable sound for each tile.
   Sounds are written as TTS-friendly strings ("buh", "ah", "shh") so the
   Web Speech API pronounces something close to the phoneme.
   Grade 3 uses syllable tiles instead of single phonemes. */

window.RR = window.RR || {};

RR.DATA = {

  WORDS: {
    K: [
      { w: 'cat', e: '🐱', t: ['c','a','t'], s: ['kuh','ah','tuh'] },
      { w: 'dog', e: '🐶', t: ['d','o','g'], s: ['duh','aw','guh'] },
      { w: 'sun', e: '☀️', t: ['s','u','n'], s: ['suh','uh','nuh'] },
      { w: 'hat', e: '🎩', t: ['h','a','t'], s: ['huh','ah','tuh'] },
      { w: 'pig', e: '🐷', t: ['p','i','g'], s: ['puh','ih','guh'] },
      { w: 'bus', e: '🚌', t: ['b','u','s'], s: ['buh','uh','suh'] },
      { w: 'cup', e: '☕', t: ['c','u','p'], s: ['kuh','uh','puh'] },
      { w: 'bed', e: '🛏️', t: ['b','e','d'], s: ['buh','eh','duh'] },
      { w: 'fox', e: '🦊', t: ['f','o','x'], s: ['fuh','aw','ksuh'] },
      { w: 'bug', e: '🐛', t: ['b','u','g'], s: ['buh','uh','guh'] },
      { w: 'hen', e: '🐔', t: ['h','e','n'], s: ['huh','eh','nuh'] },
      { w: 'map', e: '🗺️', t: ['m','a','p'], s: ['muh','ah','puh'] },
      { w: 'pen', e: '🖊️', t: ['p','e','n'], s: ['puh','eh','nuh'] },
      { w: 'rat', e: '🐀', t: ['r','a','t'], s: ['ruh','ah','tuh'] },
      { w: 'six', e: '6️⃣', t: ['s','i','x'], s: ['suh','ih','ksuh'] },
      { w: 'ten', e: '🔟', t: ['t','e','n'], s: ['tuh','eh','nuh'] },
      { w: 'van', e: '🚐', t: ['v','a','n'], s: ['vuh','ah','nuh'] },
      { w: 'web', e: '🕸️', t: ['w','e','b'], s: ['wuh','eh','buh'] },
      { w: 'bat', e: '🦇', t: ['b','a','t'], s: ['buh','ah','tuh'] },
      { w: 'box', e: '📦', t: ['b','o','x'], s: ['buh','aw','ksuh'] },
      { w: 'jet', e: '✈️', t: ['j','e','t'], s: ['juh','eh','tuh'] },
      { w: 'leg', e: '🦵', t: ['l','e','g'], s: ['luh','eh','guh'] },
      { w: 'net', e: '🥅', t: ['n','e','t'], s: ['nuh','eh','tuh'] },
      { w: 'nut', e: '🥜', t: ['n','u','t'], s: ['nuh','uh','tuh'] },
      { w: 'ant', e: '🐜', t: ['a','n','t'], s: ['ah','nuh','tuh'] },
      { w: 'lip', e: '👄', t: ['l','i','p'], s: ['luh','ih','puh'] },
      { w: 'cab', e: '🚕', t: ['c','a','b'], s: ['kuh','ah','buh'] },
      { w: 'run', e: '🏃', t: ['r','u','n'], s: ['ruh','uh','nuh'] },
      { w: 'egg', e: '🥚', t: ['e','gg'], s: ['eh','guh'] },
      { w: 'hug', e: '🤗', t: ['h','u','g'], s: ['huh','uh','guh'] },
      { w: 'cap', e: '🧢', t: ['c','a','p'], s: ['kuh','ah','puh'] },
      { w: 'bag', e: '👜', t: ['b','a','g'], s: ['buh','ah','guh'] },
      { w: 'log', e: '🪵', t: ['l','o','g'], s: ['luh','aw','guh'] },
      { w: 'tub', e: '🛁', t: ['t','u','b'], s: ['tuh','uh','buh'] }
    ],

    1: [
      { w: 'ship',  e: '🚢', t: ['sh','i','p'],   s: ['shh','ih','puh'] },
      { w: 'fish',  e: '🐟', t: ['f','i','sh'],   s: ['fuh','ih','shh'] },
      { w: 'chick', e: '🐤', t: ['ch','i','ck'],  s: ['chuh','ih','kuh'] },
      { w: 'bath',  e: '🛁', t: ['b','a','th'],   s: ['buh','ah','thuh'] },
      { w: 'frog',  e: '🐸', t: ['f','r','o','g'], s: ['fuh','ruh','aw','guh'] },
      { w: 'crab',  e: '🦀', t: ['c','r','a','b'], s: ['kuh','ruh','ah','buh'] },
      { w: 'drum',  e: '🥁', t: ['d','r','u','m'], s: ['duh','ruh','uh','muh'] },
      { w: 'flag',  e: '🚩', t: ['f','l','a','g'], s: ['fuh','luh','ah','guh'] },
      { w: 'sled',  e: '🛷', t: ['s','l','e','d'], s: ['suh','luh','eh','duh'] },
      { w: 'stop',  e: '🛑', t: ['s','t','o','p'], s: ['suh','tuh','aw','puh'] },
      { w: 'swim',  e: '🏊', t: ['s','w','i','m'], s: ['suh','wuh','ih','muh'] },
      { w: 'nest',  e: '🪺', t: ['n','e','s','t'], s: ['nuh','eh','suh','tuh'] },
      { w: 'hand',  e: '✋', t: ['h','a','n','d'], s: ['huh','ah','nuh','duh'] },
      { w: 'milk',  e: '🥛', t: ['m','i','l','k'], s: ['muh','ih','luh','kuh'] },
      { w: 'ring',  e: '💍', t: ['r','i','ng'],   s: ['ruh','ih','ing'] },
      { w: 'duck',  e: '🦆', t: ['d','u','ck'],   s: ['duh','uh','kuh'] },
      { w: 'sock',  e: '🧦', t: ['s','o','ck'],   s: ['suh','aw','kuh'] },
      { w: 'bell',  e: '🔔', t: ['b','e','ll'],   s: ['buh','eh','luh'] },
      { w: 'king',  e: '👑', t: ['k','i','ng'],   s: ['kuh','ih','ing'] },
      { w: 'gift',  e: '🎁', t: ['g','i','f','t'], s: ['guh','ih','fuh','tuh'] },
      { w: 'tent',  e: '⛺', t: ['t','e','n','t'], s: ['tuh','eh','nuh','tuh'] },
      { w: 'plug',  e: '🔌', t: ['p','l','u','g'], s: ['puh','luh','uh','guh'] },
      { w: 'truck', e: '🚚', t: ['t','r','u','ck'], s: ['tuh','ruh','uh','kuh'] },
      { w: 'clock', e: '⏰', t: ['c','l','o','ck'], s: ['kuh','luh','aw','kuh'] },
      { w: 'brush', e: '🪥', t: ['b','r','u','sh'], s: ['buh','ruh','uh','shh'] },
      { w: 'shell', e: '🐚', t: ['sh','e','ll'],  s: ['shh','eh','luh'] },
      { w: 'drop',  e: '💧', t: ['d','r','o','p'], s: ['duh','ruh','aw','puh'] }
    ],

    2: [
      { w: 'cake',  e: '🎂', t: ['c','a','ke'],  s: ['kuh','ay','kuh'] },
      { w: 'bike',  e: '🚲', t: ['b','i','ke'],  s: ['buh','eye','kuh'] },
      { w: 'rope',  e: '🪢', t: ['r','o','pe'],  s: ['ruh','oh','puh'] },
      { w: 'kite',  e: '🪁', t: ['k','i','te'],  s: ['kuh','eye','tuh'] },
      { w: 'snake', e: '🐍', t: ['s','n','a','ke'], s: ['suh','nuh','ay','kuh'] },
      { w: 'grape', e: '🍇', t: ['g','r','a','pe'], s: ['guh','ruh','ay','puh'] },
      { w: 'whale', e: '🐋', t: ['wh','a','le'], s: ['wuh','ay','luh'] },
      { w: 'rain',  e: '🌧️', t: ['r','ai','n'],  s: ['ruh','ay','nuh'] },
      { w: 'train', e: '🚂', t: ['t','r','ai','n'], s: ['tuh','ruh','ay','nuh'] },
      { w: 'snail', e: '🐌', t: ['s','n','ai','l'], s: ['suh','nuh','ay','luh'] },
      { w: 'boat',  e: '⛵', t: ['b','oa','t'],  s: ['buh','oh','tuh'] },
      { w: 'goat',  e: '🐐', t: ['g','oa','t'],  s: ['guh','oh','tuh'] },
      { w: 'soap',  e: '🧼', t: ['s','oa','p'],  s: ['suh','oh','puh'] },
      { w: 'seed',  e: '🌱', t: ['s','ee','d'],  s: ['suh','ee','duh'] },
      { w: 'sheep', e: '🐑', t: ['sh','ee','p'], s: ['shh','ee','puh'] },
      { w: 'tree',  e: '🌳', t: ['t','r','ee'],  s: ['tuh','ruh','ee'] },
      { w: 'bee',   e: '🐝', t: ['b','ee'],      s: ['buh','ee'] },
      { w: 'moon',  e: '🌙', t: ['m','oo','n'],  s: ['muh','oo','nuh'] },
      { w: 'spoon', e: '🥄', t: ['s','p','oo','n'], s: ['suh','puh','oo','nuh'] },
      { w: 'book',  e: '📖', t: ['b','oo','k'],  s: ['buh','oo','kuh'] },
      { w: 'light', e: '💡', t: ['l','igh','t'], s: ['luh','eye','tuh'] },
      { w: 'night', e: '🌃', t: ['n','igh','t'], s: ['nuh','eye','tuh'] },
      { w: 'house', e: '🏠', t: ['h','ou','se'], s: ['huh','ow','suh'] },
      { w: 'mouse', e: '🐭', t: ['m','ou','se'], s: ['muh','ow','suh'] },
      { w: 'cloud', e: '☁️', t: ['c','l','ou','d'], s: ['kuh','luh','ow','duh'] },
      { w: 'cow',   e: '🐮', t: ['c','ow'],      s: ['kuh','ow'] },
      { w: 'owl',   e: '🦉', t: ['ow','l'],      s: ['ow','luh'] },
      { w: 'coin',  e: '🪙', t: ['c','oi','n'],  s: ['kuh','oy','nuh'] },
      { w: 'star',  e: '⭐', t: ['s','t','ar'],  s: ['suh','tuh','ar'] },
      { w: 'corn',  e: '🌽', t: ['c','or','n'],  s: ['kuh','or','nuh'] },
      { w: 'fork',  e: '🍴', t: ['f','or','k'],  s: ['fuh','or','kuh'] },
      { w: 'shark', e: '🦈', t: ['sh','ar','k'], s: ['shh','ar','kuh'] },
      { w: 'horse', e: '🐴', t: ['h','or','se'], s: ['huh','or','suh'] }
    ],

    3: [
      { w: 'rabbit',     e: '🐰', t: ['rab','bit'],          s: ['rab','bit'] },
      { w: 'basket',     e: '🧺', t: ['bas','ket'],          s: ['bas','ket'] },
      { w: 'pumpkin',    e: '🎃', t: ['pump','kin'],         s: ['pump','kin'] },
      { w: 'dragon',     e: '🐉', t: ['drag','on'],          s: ['drag','un'] },
      { w: 'rocket',     e: '🚀', t: ['rock','et'],          s: ['rock','et'] },
      { w: 'spider',     e: '🕷️', t: ['spi','der'],          s: ['spy','der'] },
      { w: 'turtle',     e: '🐢', t: ['tur','tle'],          s: ['ter','tul'] },
      { w: 'monkey',     e: '🐵', t: ['mon','key'],          s: ['mun','kee'] },
      { w: 'tiger',      e: '🐯', t: ['ti','ger'],           s: ['tie','gur'] },
      { w: 'candle',     e: '🕯️', t: ['can','dle'],          s: ['kan','dul'] },
      { w: 'penguin',    e: '🐧', t: ['pen','guin'],         s: ['pen','gwin'] },
      { w: 'dolphin',    e: '🐬', t: ['dol','phin'],         s: ['doll','fin'] },
      { w: 'panda',      e: '🐼', t: ['pan','da'],           s: ['pan','duh'] },
      { w: 'pizza',      e: '🍕', t: ['piz','za'],           s: ['peet','suh'] },
      { w: 'robot',      e: '🤖', t: ['ro','bot'],           s: ['row','bot'] },
      { w: 'hammer',     e: '🔨', t: ['ham','mer'],          s: ['ham','mur'] },
      { w: 'ladder',     e: '🪜', t: ['lad','der'],          s: ['lad','dur'] },
      { w: 'mitten',     e: '🧤', t: ['mit','ten'],          s: ['mit','ten'] },
      { w: 'kitten',     e: '🐈', t: ['kit','ten'],          s: ['kit','ten'] },
      { w: 'elephant',   e: '🐘', t: ['el','e','phant'],     s: ['el','uh','fant'] },
      { w: 'butterfly',  e: '🦋', t: ['but','ter','fly'],    s: ['but','ter','fly'] },
      { w: 'dinosaur',   e: '🦕', t: ['di','no','saur'],     s: ['die','no','sor'] },
      { w: 'kangaroo',   e: '🦘', t: ['kan','ga','roo'],     s: ['kang','guh','roo'] },
      { w: 'octopus',    e: '🐙', t: ['oc','to','pus'],      s: ['ock','tuh','puss'] },
      { w: 'tomato',     e: '🍅', t: ['to','ma','to'],       s: ['tuh','may','toe'] },
      { w: 'banana',     e: '🍌', t: ['ba','na','na'],       s: ['buh','nan','uh'] },
      { w: 'umbrella',   e: '☂️', t: ['um','brel','la'],     s: ['um','brell','uh'] },
      { w: 'volcano',    e: '🌋', t: ['vol','ca','no'],      s: ['vol','kay','no'] },
      { w: 'tornado',    e: '🌪️', t: ['tor','na','do'],      s: ['tor','nay','doe'] },
      { w: 'computer',   e: '💻', t: ['com','pu','ter'],     s: ['kum','pyoo','tur'] },
      { w: 'hamburger',  e: '🍔', t: ['ham','bur','ger'],    s: ['ham','bur','gur'] },
      { w: 'helicopter', e: '🚁', t: ['hel','i','cop','ter'], s: ['hel','ih','kop','tur'] },
      { w: 'unicorn',    e: '🦄', t: ['u','ni','corn'],      s: ['yoo','nih','korn'] },
      { w: 'watermelon', e: '🍉', t: ['wa','ter','mel','on'], s: ['wah','tur','mel','un'] }
    ],

    4: [
      { w: 'crocodile',    e: '🐊', t: ['croc','o','dile'],        s: ['krok','uh','dile'] },
      { w: 'avocado',      e: '🥑', t: ['av','o','ca','do'],       s: ['av','uh','kah','doe'] },
      { w: 'broccoli',     e: '🥦', t: ['broc','co','li'],         s: ['brock','uh','lee'] },
      { w: 'calendar',     e: '📅', t: ['cal','en','dar'],         s: ['kal','un','der'] },
      { w: 'caterpillar',  e: '🐛', t: ['cat','er','pil','lar'],   s: ['kat','er','pill','er'] },
      { w: 'flamingo',     e: '🦩', t: ['fla','min','go'],         s: ['fluh','ming','go'] },
      { w: 'gorilla',      e: '🦍', t: ['go','ril','la'],          s: ['guh','rill','uh'] },
      { w: 'hippopotamus', e: '🦛', t: ['hip','po','pot','a','mus'], s: ['hip','uh','pot','uh','muss'] },
      { w: 'spaghetti',    e: '🍝', t: ['spa','ghet','ti'],        s: ['spuh','get','ee'] },
      { w: 'microphone',   e: '🎤', t: ['mi','cro','phone'],       s: ['my','kruh','fone'] },
      { w: 'microscope',   e: '🔬', t: ['mi','cro','scope'],       s: ['my','kruh','skope'] },
      { w: 'motorcycle',   e: '🏍️', t: ['mo','tor','cy','cle'],    s: ['mo','ter','sigh','kul'] },
      { w: 'parachute',    e: '🪂', t: ['par','a','chute'],        s: ['pair','uh','shoot'] },
      { w: 'pineapple',    e: '🍍', t: ['pine','ap','ple'],        s: ['pine','ap','ul'] },
      { w: 'rhinoceros',   e: '🦏', t: ['rhi','noc','er','os'],    s: ['rye','noss','er','us'] },
      { w: 'saxophone',    e: '🎷', t: ['sax','o','phone'],        s: ['saks','uh','fone'] },
      { w: 'skeleton',     e: '💀', t: ['skel','e','ton'],         s: ['skel','ih','tun'] },
      { w: 'strawberry',   e: '🍓', t: ['straw','ber','ry'],       s: ['straw','bear','ee'] },
      { w: 'telescope',    e: '🔭', t: ['tel','e','scope'],        s: ['tel','ih','skope'] },
      { w: 'thermometer',  e: '🌡️', t: ['ther','mom','e','ter'],   s: ['ther','mom','ih','ter'] },
      { w: 'triangle',     e: '🔺', t: ['tri','an','gle'],         s: ['try','ang','gul'] },
      { w: 'accordion',    e: '🪗', t: ['ac','cor','di','on'],     s: ['uh','kor','dee','un'] },
      { w: 'astronaut',    e: '🧑‍🚀', t: ['as','tro','naut'],        s: ['as','truh','nawt'] },
      { w: 'basketball',   e: '🏀', t: ['bas','ket','ball'],       s: ['bas','ket','ball'] },
      { w: 'jellyfish',    e: '🪼', t: ['jel','ly','fish'],        s: ['jell','ee','fish'] },
      { w: 'sunflower',    e: '🌻', t: ['sun','flow','er'],        s: ['sun','flow','er'] },
      { w: 'camera',       e: '📷', t: ['cam','er','a'],           s: ['kam','er','uh'] },
      { w: 'piano',        e: '🎹', t: ['pi','an','o'],            s: ['pee','an','oh'] },
      { w: 'potato',       e: '🥔', t: ['po','ta','to'],           s: ['puh','tay','toe'] },
      { w: 'peacock',      e: '🦚', t: ['pea','cock'],             s: ['pee','kok'] },
      { w: 'lobster',      e: '🦞', t: ['lob','ster'],             s: ['lob','ster'] },
      { w: 'cactus',       e: '🌵', t: ['cac','tus'],              s: ['kak','tus'] },
      { w: 'trophy',       e: '🏆', t: ['tro','phy'],              s: ['tro','fee'] },
      { w: 'compass',      e: '🧭', t: ['com','pass'],             s: ['kum','pass'] },
      { w: 'anchor',       e: '⚓', t: ['an','chor'],              s: ['ang','ker'] }
    ],

    5: [
      { w: 'alligator',    e: '🐊', t: ['al','li','ga','tor'],     s: ['al','ih','gay','ter'] },
      { w: 'ambulance',    e: '🚑', t: ['am','bu','lance'],        s: ['am','byuh','lunce'] },
      { w: 'bacteria',     e: '🦠', t: ['bac','te','ri','a'],      s: ['back','teer','ee','uh'] },
      { w: 'ballerina',    e: '🩰', t: ['bal','le','ri','na'],     s: ['bal','uh','ree','nuh'] },
      { w: 'burrito',      e: '🌯', t: ['bur','ri','to'],          s: ['buh','ree','toe'] },
      { w: 'celebration',  e: '🎉', t: ['cel','e','bra','tion'],   s: ['sell','uh','bray','shun'] },
      { w: 'champion',     e: '🏆', t: ['cham','pi','on'],         s: ['cham','pee','un'] },
      { w: 'chimpanzee',   e: '🐒', t: ['chim','pan','zee'],       s: ['chim','pan','zee'] },
      { w: 'detective',    e: '🕵️', t: ['de','tec','tive'],        s: ['dih','tek','tiv'] },
      { w: 'electricity',  e: '⚡', t: ['e','lec','tric','i','ty'], s: ['ee','lek','trih','sih','tee'] },
      { w: 'experiment',   e: '🧪', t: ['ex','per','i','ment'],    s: ['ek','spare','ih','ment'] },
      { w: 'graduation',   e: '🎓', t: ['grad','u','a','tion'],    s: ['grad','joo','ay','shun'] },
      { w: 'hospital',     e: '🏥', t: ['hos','pi','tal'],         s: ['hoss','pih','tul'] },
      { w: 'hurricane',    e: '🌀', t: ['hur','ri','cane'],        s: ['her','ih','kane'] },
      { w: 'invitation',   e: '💌', t: ['in','vi','ta','tion'],    s: ['in','vih','tay','shun'] },
      { w: 'mosquito',     e: '🦟', t: ['mos','qui','to'],         s: ['muh','skee','toe'] },
      { w: 'photography',  e: '📸', t: ['pho','tog','ra','phy'],   s: ['fuh','tog','ruh','fee'] },
      { w: 'restaurant',   e: '🍽️', t: ['res','tau','rant'],       s: ['rest','uh','ront'] },
      { w: 'rollercoaster', e: '🎢', t: ['roll','er','coast','er'], s: ['roll','er','kost','er'] },
      { w: 'satellite',    e: '🛰️', t: ['sat','el','lite'],        s: ['sat','uh','lite'] },
      { w: 'scorpion',     e: '🦂', t: ['scor','pi','on'],         s: ['skor','pee','un'] },
      { w: 'stethoscope',  e: '🩺', t: ['steth','o','scope'],      s: ['steth','uh','skope'] },
      { w: 'tarantula',    e: '🕷️', t: ['ta','ran','tu','la'],     s: ['tuh','ran','chuh','luh'] },
      { w: 'temperature',  e: '🌡️', t: ['tem','per','a','ture'],   s: ['tem','per','uh','cher'] },
      { w: 'violin',       e: '🎻', t: ['vi','o','lin'],           s: ['vy','uh','lin'] },
      { w: 'adventure',    e: '🗺️', t: ['ad','ven','ture'],        s: ['ad','ven','cher'] },
      { w: 'magnet',       e: '🧲', t: ['mag','net'],              s: ['mag','net'] },
      { w: 'lantern',      e: '🏮', t: ['lan','tern'],             s: ['lan','tern'] },
      { w: 'blossom',      e: '🌸', t: ['blos','som'],             s: ['bloss','um'] },
      { w: 'fountain',     e: '⛲', t: ['foun','tain'],            s: ['fown','tin'] },
      { w: 'trumpet',      e: '🎺', t: ['trum','pet'],             s: ['trum','pet'] },
      { w: 'mountain',     e: '⛰️', t: ['moun','tain'],            s: ['mown','tin'] }
    ]
  },

  /* Alphabet + digraphs for the Letter Sounds game.
     l = letter shown, s = speakable sound, w/e = example word + picture. */
  LETTERS: [
    { l: 'a', s: 'ah',   w: 'apple',      e: '🍎' },
    { l: 'b', s: 'buh',  w: 'ball',       e: '⚽' },
    { l: 'c', s: 'kuh',  w: 'cat',        e: '🐱' },
    { l: 'd', s: 'duh',  w: 'dog',        e: '🐶' },
    { l: 'e', s: 'eh',   w: 'egg',        e: '🥚' },
    { l: 'f', s: 'fuh',  w: 'fish',       e: '🐟' },
    { l: 'g', s: 'guh',  w: 'goat',       e: '🐐' },
    { l: 'h', s: 'huh',  w: 'hat',        e: '🎩' },
    { l: 'i', s: 'ih',   w: 'iguana',     e: '🦎' },
    { l: 'j', s: 'juh',  w: 'juice',      e: '🧃' },
    { l: 'k', s: 'kuh',  w: 'kite',       e: '🪁' },
    { l: 'l', s: 'luh',  w: 'lion',       e: '🦁' },
    { l: 'm', s: 'muh',  w: 'moon',       e: '🌙' },
    { l: 'n', s: 'nuh',  w: 'nest',       e: '🪺' },
    { l: 'o', s: 'aw',   w: 'octopus',    e: '🐙' },
    { l: 'p', s: 'puh',  w: 'pig',        e: '🐷' },
    { l: 'q', s: 'kwuh', w: 'queen',      e: '👸' },
    { l: 'r', s: 'ruh',  w: 'rocket',     e: '🚀' },
    { l: 's', s: 'suh',  w: 'sun',        e: '☀️' },
    { l: 't', s: 'tuh',  w: 'turtle',     e: '🐢' },
    { l: 'u', s: 'uh',   w: 'umbrella',   e: '☂️' },
    { l: 'v', s: 'vuh',  w: 'van',        e: '🚐' },
    { l: 'w', s: 'wuh',  w: 'watermelon', e: '🍉' },
    { l: 'x', s: 'ksuh', w: 'fox',        e: '🦊' },
    { l: 'y', s: 'yuh',  w: 'yo-yo',      e: '🪀' },
    { l: 'z', s: 'zuh',  w: 'zebra',      e: '🦓' }
  ],

  DIGRAPHS: [
    { l: 'sh', s: 'shh',  w: 'ship',   e: '🚢' },
    { l: 'ch', s: 'chuh', w: 'cheese', e: '🧀' },
    { l: 'th', s: 'thuh', w: 'thumb',  e: '👍' },
    { l: 'wh', s: 'wuh',  w: 'whale',  e: '🐋' },
    { l: 'ng', s: 'ing',  w: 'ring',   e: '💍' }
  ],

  SIGHT: {
    K: ['the','a','I','see','my','like','to','and','go','is','in','it','you','we','can','at','me','up','look','play','said','here','this','for','on'],
    1: ['of','was','are','they','have','from','had','but','what','all','when','your','there','out','then','them','some','her','would','make','him','time','could','were','who'],
    2: ['because','always','around','been','before','both','buy','call','cold','does','fast','first','found','gave','goes','green','made','many','off','pull','read','right','sing','sleep','tell','their','these','those','upon','which'],
    3: ['about','better','bring','carry','clean','done','draw','drink','eight','fall','full','grow','hold','hurt','keep','kind','laugh','light','long','much','myself','never','only','own','pick','seven','shall','show','small','start','today','together','try','warm'],
    4: ['although','answer','beautiful','believe','breakfast','brought','building','business','caught','certain','complete','decide','during','early','enough','example','favorite','finally','important','island','language','machine','measure','minute','mountain','notice','ocean','perhaps','picture','probably','question','remember','science','special','straight','strong','suddenly','thought','through','toward','usually','weather'],
    5: ['achievement','ancient','anxious','athlete','attention','average','character','community','curious','definitely','describe','development','different','difficult','disappear','environment','especially','excellent','experience','familiar','foreign','fragile','frequently','government','height','immediately','independent','interrupt','knowledge','lightning','medicine','necessary','neighbor','opposite','patience','receive','recognize','rhythm','separate','strength','succeed','surprise','tomorrow','vehicle','weird']
  },

  SENTENCES: {
    K: [
      'I see a cat.', 'The dog is big.', 'We can run.', 'I like my hat.',
      'The sun is up.', 'It is a red bus.', 'Look at the pig.', 'The hen is here.',
      'I can see you.', 'Go to the bed.'
    ],
    1: [
      'The frog can swim fast.', 'I see a fish in the net.', 'The duck sat on the nest.',
      'My sock is red and blue.', 'The king has a gold ring.', 'Stop the truck at the flag.',
      'The crab dug in the sand.', 'I hit the drum with my hand.', 'The chick is in the shell.',
      'We sled down the big hill.'
    ],
    2: [
      'The goat ate green grass by the gate.', 'A mouse ran into the little house.',
      'The sheep like to sleep under the tree.', 'I see the moon and stars at night.',
      'The train will be here in the rain.', 'My kite flew up over the clouds.',
      'The owl sat in the tree all night.', 'We took the boat out on the lake.',
      'The shark swam fast in the sea.', 'A bee landed on the seed in my hand.'
    ],
    3: [
      'The hungry dragon flew over the tall mountain.', 'My little sister found a turtle near the pond.',
      'The rocket blasted off into the dark night sky.', 'A clever monkey grabbed the banana from the basket.',
      'The spider spun a giant web behind the door.', 'We watched the dolphins jump out of the waves.',
      'The penguin slid across the ice on its belly.', 'Thunder boomed as the storm rolled over the hills.',
      'The kangaroo hopped across the dusty red road.', 'An octopus hid between the rocks in the deep sea.'
    ],
    4: [
      'The brave astronaut floated silently above the glowing blue planet.',
      'My little brother practiced the piano until the whole song was perfect.',
      'A curious gorilla watched the photographers from behind the bamboo.',
      'We planted sunflowers along the fence, and they grew taller than Dad.',
      'The microscope revealed a tiny world swimming inside one drop of water.',
      'Lightning flickered over the mountains while we counted the seconds to the thunder.',
      'The motorcycle roared across the bridge and disappeared into the tunnel.',
      'Grandma whispered her secret spaghetti recipe to me on my birthday.',
      'The flamingo stood on one leg for an hour without wobbling once.',
      'Our class built a parachute for an egg, and it landed without a crack.'
    ],
    5: [
      'The detective examined the muddy footprints before the rain could wash them away.',
      'Electricity hummed through the wires as the city lights blinked on at dusk.',
      'The ballerina rehearsed the difficult routine until her ankles ached.',
      'A hurricane gathered strength over the warm ocean, turning slowly like a giant wheel.',
      'The scientists cheered when the satellite finally sent its first signal home.',
      'My neighbor collects ancient coins from countries that no longer exist.',
      'The chimpanzee solved the puzzle faster than most of the students watching.',
      'Volunteers decorated the gymnasium for the graduation celebration.',
      'The orchestra fell silent as the young violinist raised her bow.',
      'Tomorrow we will measure the temperature of the pond for our science experiment.'
    ]
  },

  /* ===================================================================
     Comprehension & word-study games (added block).
     SILLY   — Silly or Sensible?  (reading for meaning)
     RIDDLES — Riddle Time         (inference)
     MORPH   — Word Factory        (morphology, grades 2-5)
     PAIRS   — Opposites & Twins   (antonyms / synonyms)
     CHAINS  — Word Chains         (phoneme manipulation, grades K-2)
     NONSENSE— Real or Nonsense?   (decoding discrimination)
     Reading levels are matched to each grade's WORDS/SENTENCES above.
     =================================================================== */

  /* ---------- Silly or Sensible? ----------
     16 per grade: 8 silly (funny-absurd) + 8 sensible (true-to-life),
     shuffled. silly:true means the sentence does not make sense. */
  SILLY: {
    K: [
      { t: 'The cat drove the bus.', silly: true },
      { t: 'The dog ran to me.', silly: false },
      { t: 'A pig can fly.', silly: true },
      { t: 'I see a red hat.', silly: false },
      { t: 'My hat had lunch.', silly: true },
      { t: 'The cat naps in the sun.', silly: false },
      { t: 'We go to bed at night.', silly: false },
      { t: 'The dog sang a song.', silly: true },
      { t: 'The fish ran to bed.', silly: true },
      { t: 'The hen sat on an egg.', silly: false },
      { t: 'A cow sat on my lap.', silly: true },
      { t: 'Mom can hug me.', silly: false },
      { t: 'I like to play with you.', silly: false },
      { t: 'The bug drives a red van.', silly: true },
      { t: 'The bus is big.', silly: false },
      { t: 'My cup ran up the hill.', silly: true }
    ],
    1: [
      { t: 'The frog drives a big red truck.', silly: true },
      { t: 'The frog can swim fast.', silly: false },
      { t: 'I see a fish in the pond.', silly: false },
      { t: 'My shoes ran to school without me.', silly: true },
      { t: 'The duck sat on the nest.', silly: false },
      { t: 'The fish sat on a bike.', silly: true },
      { t: 'A duck can read the news.', silly: true },
      { t: 'My sock is red and blue.', silly: false },
      { t: 'We ride the bus to school.', silly: false },
      { t: 'The clock ate my lunch.', silly: true },
      { t: 'The rain fell on the grass.', silly: false },
      { t: 'My milk sang a song.', silly: true },
      { t: 'The crab flew up to the moon.', silly: true },
      { t: 'Dad cooks eggs for lunch.', silly: false },
      { t: 'The dog ran to get the ball.', silly: false },
      { t: 'The bug can lift a truck.', silly: true }
    ],
    2: [
      { t: 'The goat drove a train to the moon.', silly: true },
      { t: 'The goat ate green grass by the gate.', silly: false },
      { t: 'A mouse ran into the little house.', silly: false },
      { t: 'My pet snail can run as fast as a car.', silly: true },
      { t: 'The sheep like to sleep under the tree.', silly: false },
      { t: 'The sheep read a bedtime story to the owl.', silly: true },
      { t: 'A green bean jumped out of my bowl and danced.', silly: true },
      { t: 'We took the boat out on the lake.', silly: false },
      { t: 'The rain made the road wet and shiny.', silly: false },
      { t: 'The moon came down to eat my ice cream.', silly: true },
      { t: 'My kite flew high up in the sky.', silly: false },
      { t: 'My bike grew wings and flew over the trees.', silly: true },
      { t: 'The shark baked a cake for the whale’s party.', silly: true },
      { t: 'The bee landed on a bright red flower.', silly: false },
      { t: 'I read a book before I went to sleep.', silly: false },
      { t: 'A cloud sat down at our table for lunch.', silly: true }
    ],
    3: [
      { t: 'The clever monkey drove a taxi around the busy city.', silly: true },
      { t: 'The rocket blasted off into the dark night sky.', silly: false },
      { t: 'My little sister found a turtle near the pond.', silly: false },
      { t: 'My little sister taught our goldfish how to ride a skateboard.', silly: true },
      { t: 'We watched the dolphins jump out of the waves.', silly: false },
      { t: 'The spider knitted a cozy sweater for the hungry dragon.', silly: true },
      { t: 'A giant tomato rolled down the street asking for directions.', silly: true },
      { t: 'The spider spun a giant web behind the door.', silly: false },
      { t: 'Thunder boomed as the storm rolled over the hills.', silly: false },
      { t: 'The elephant squeezed inside a teacup to take a nap.', silly: true },
      { t: 'The kangaroo hopped across the dusty red road.', silly: false },
      { t: 'Our teacher floated up to the ceiling and taught the lesson upside down.', silly: true },
      { t: 'The rocket stopped at a gas station to buy some snacks.', silly: true },
      { t: 'A cold wind blew the leaves off the tall trees.', silly: false },
      { t: 'The team cheered when they scored the winning goal.', silly: false },
      { t: 'My shoes complained that they were tired of walking.', silly: true }
    ],
    4: [
      { t: 'The brave astronaut parked her rocket in the school parking lot.', silly: true },
      { t: 'The brave astronaut floated above the glowing blue planet.', silly: false },
      { t: 'My little brother practiced the piano until the song was perfect.', silly: false },
      { t: 'A curious gorilla borrowed my phone to call his grandmother.', silly: true },
      { t: 'A curious gorilla watched the visitors from behind the bamboo.', silly: false },
      { t: 'The sunflowers in our garden started singing opera at sunrise.', silly: true },
      { t: 'My little brother trained a swarm of bees to do his chores.', silly: true },
      { t: 'We planted sunflowers along the fence in early spring.', silly: false },
      { t: 'Lightning flickered over the mountains long before the thunder.', silly: false },
      { t: 'The motorcycle grew four legs and galloped across the bridge.', silly: true },
      { t: 'The motorcycle roared across the bridge and into the tunnel.', silly: false },
      { t: 'Grandma’s spaghetti crawled off the plate and slithered under the couch.', silly: true },
      { t: 'The flamingo checked into a hotel and ordered room service.', silly: true },
      { t: 'The flamingo stood on one leg at the edge of the pond.', silly: false },
      { t: 'Our class built a parachute for an egg out of paper and tape.', silly: false },
      { t: 'A thundercloud knocked politely on our front door and asked to come in.', silly: true }
    ],
    5: [
      { t: 'The detective interviewed a suspicious pigeon about the missing sandwich.', silly: true },
      { t: 'The detective examined the muddy footprints before the rain washed them away.', silly: false },
      { t: 'Electricity hummed through the wires as the city lights blinked on.', silly: false },
      { t: 'Electricity got bored of the wires and decided to take the bus instead.', silly: true },
      { t: 'The ballerina rehearsed the difficult routine until her ankles ached.', silly: false },
      { t: 'The ballerina spun so fast that she drilled a hole straight through the stage.', silly: true },
      { t: 'A hurricane politely apologized and promised to clean up all the mess.', silly: true },
      { t: 'A hurricane gathered strength slowly over the warm ocean.', silly: false },
      { t: 'The scientists cheered when the satellite sent its first signal home.', silly: false },
      { t: 'The satellite sent home a selfie and asked for more snacks.', silly: true },
      { t: 'My neighbor collects ancient coins from faraway countries.', silly: false },
      { t: 'My neighbor’s ancient coins hopped out of the jar to go shopping.', silly: true },
      { t: 'The chimpanzee solved the puzzle, then filed his taxes before lunch.', silly: true },
      { t: 'The chimpanzee solved the puzzle faster than the students expected.', silly: false },
      { t: 'The young violinist raised her bow as the room fell silent.', silly: false },
      { t: 'The young violinist played a note so high that the moon asked her to stop.', silly: true }
    ]
  },

  /* ---------- Riddle Time ----------
     10 per grade. Three choices with fitting emoji; a = correct index.
     Every riddle is solvable from its own clues. */
  RIDDLES: {
    K: [
      { q: 'I have four legs. I say moo. What am I?', choices: [ { t: 'a cow', e: '🐮' }, { t: 'a cat', e: '🐱' }, { t: 'a bus', e: '🚌' } ], a: 0 },
      { q: 'I am up in the day. I am hot. What am I?', choices: [ { t: 'the moon', e: '🌙' }, { t: 'the sun', e: '☀️' }, { t: 'a cup', e: '☕' } ], a: 1 },
      { q: 'I hop a lot. I am green. What am I?', choices: [ { t: 'a dog', e: '🐶' }, { t: 'a bird', e: '🐦' }, { t: 'a frog', e: '🐸' } ], a: 2 },
      { q: 'I say woof. I like to run and play. What am I?', choices: [ { t: 'a dog', e: '🐶' }, { t: 'a fish', e: '🐟' }, { t: 'a hen', e: '🐔' } ], a: 0 },
      { q: 'I have wings. I fly and go tweet. What am I?', choices: [ { t: 'a pig', e: '🐷' }, { t: 'a bird', e: '🐦' }, { t: 'a cat', e: '🐱' } ], a: 1 },
      { q: 'I am yellow. Monkeys love to eat me. What am I?', choices: [ { t: 'a cup', e: '☕' }, { t: 'a hat', e: '🎩' }, { t: 'a banana', e: '🍌' } ], a: 2 },
      { q: 'I am red and round. You can eat me. What am I?', choices: [ { t: 'an apple', e: '🍎' }, { t: 'the sun', e: '☀️' }, { t: 'a ball', e: '⚽' } ], a: 0 },
      { q: 'I swim in the water. I have fins. What am I?', choices: [ { t: 'a cat', e: '🐱' }, { t: 'a fish', e: '🐟' }, { t: 'a bug', e: '🐛' } ], a: 1 },
      { q: 'I am big. I say roar. I have a mane. What am I?', choices: [ { t: 'a mouse', e: '🐭' }, { t: 'a pig', e: '🐷' }, { t: 'a lion', e: '🦁' } ], a: 2 },
      { q: 'You put me on your head. I keep you warm. What am I?', choices: [ { t: 'a hat', e: '🎩' }, { t: 'a sock', e: '🧦' }, { t: 'a cup', e: '☕' } ], a: 0 }
    ],
    1: [
      { q: 'I have a shell on my back. I move very slowly. What am I?', choices: [ { t: 'a turtle', e: '🐢' }, { t: 'a rabbit', e: '🐰' }, { t: 'a duck', e: '🦆' } ], a: 0 },
      { q: 'I am white and soft. I say baa and give wool. What am I?', choices: [ { t: 'a cow', e: '🐮' }, { t: 'a sheep', e: '🐑' }, { t: 'a frog', e: '🐸' } ], a: 1 },
      { q: 'I have a long trunk. I am big and gray. What am I?', choices: [ { t: 'a mouse', e: '🐭' }, { t: 'a snake', e: '🐍' }, { t: 'an elephant', e: '🐘' } ], a: 2 },
      { q: 'I buzz when I fly. I make sweet honey. What am I?', choices: [ { t: 'a bee', e: '🐝' }, { t: 'an ant', e: '🐜' }, { t: 'a bird', e: '🐦' } ], a: 0 },
      { q: 'I twinkle up high at night. You can wish on me. What am I?', choices: [ { t: 'the sun', e: '☀️' }, { t: 'a star', e: '⭐' }, { t: 'a cloud', e: '☁️' } ], a: 1 },
      { q: 'You wear me on your feet. I keep your toes warm. What am I?', choices: [ { t: 'a hat', e: '🎩' }, { t: 'a glove', e: '🧤' }, { t: 'a sock', e: '🧦' } ], a: 2 },
      { q: 'I have eight legs. I spin a web to catch bugs. What am I?', choices: [ { t: 'a spider', e: '🕷️' }, { t: 'a crab', e: '🦀' }, { t: 'an octopus', e: '🐙' } ], a: 0 },
      { q: 'I am round and orange. I grow on a vine for Halloween. What am I?', choices: [ { t: 'an apple', e: '🍎' }, { t: 'a pumpkin', e: '🎃' }, { t: 'a ball', e: '⚽' } ], a: 1 },
      { q: 'I have black and white stripes. I look like a horse. What am I?', choices: [ { t: 'a tiger', e: '🐯' }, { t: 'a cat', e: '🐱' }, { t: 'a zebra', e: '🦓' } ], a: 2 },
      { q: 'I fall from gray clouds. Flowers drink me to grow. What am I?', choices: [ { t: 'rain', e: '🌧️' }, { t: 'snow', e: '❄️' }, { t: 'the sun', e: '☀️' } ], a: 0 }
    ],
    2: [
      { q: 'I am long and yellow and curve like a smile. You peel me before you eat me. What am I?', choices: [ { t: 'a banana', e: '🍌' }, { t: 'corn', e: '🌽' }, { t: 'a lemon', e: '🍋' } ], a: 0 },
      { q: 'I live near the sea and walk sideways. I have two sharp claws. What am I?', choices: [ { t: 'a fish', e: '🐟' }, { t: 'a crab', e: '🦀' }, { t: 'a snail', e: '🐌' } ], a: 1 },
      { q: 'I appear after the rain. I am an arch of many colors in the sky. What am I?', choices: [ { t: 'a cloud', e: '☁️' }, { t: 'the moon', e: '🌙' }, { t: 'a rainbow', e: '🌈' } ], a: 2 },
      { q: 'I am called the king of the jungle. I have a big fluffy mane and a loud roar. What am I?', choices: [ { t: 'a lion', e: '🦁' }, { t: 'a tiger', e: '🐯' }, { t: 'a bear', e: '🐻' } ], a: 0 },
      { q: 'I am tall and made of wood. Birds build their nests in my branches. What am I?', choices: [ { t: 'a bush', e: '🌿' }, { t: 'a tree', e: '🌳' }, { t: 'a flower', e: '🌸' } ], a: 1 },
      { q: 'I glow in the night sky and change my shape each week. I am not the sun. What am I?', choices: [ { t: 'a star', e: '⭐' }, { t: 'a lamp', e: '💡' }, { t: 'the moon', e: '🌙' } ], a: 2 },
      { q: 'I have one or two humps. I can walk for days across the hot desert. What am I?', choices: [ { t: 'a camel', e: '🐫' }, { t: 'a horse', e: '🐴' }, { t: 'a cow', e: '🐮' } ], a: 0 },
      { q: 'I am cold and white and fall in winter. You can build me into a snowman. What am I?', choices: [ { t: 'rain', e: '🌧️' }, { t: 'snow', e: '❄️' }, { t: 'sand', e: '🏖️' } ], a: 1 },
      { q: 'I carry my house on my back. I leave a shiny, slimy trail. What am I?', choices: [ { t: 'a turtle', e: '🐢' }, { t: 'a crab', e: '🦀' }, { t: 'a snail', e: '🐌' } ], a: 2 },
      { q: 'I am a giant ball of fire. I give light and heat to the whole day. What am I?', choices: [ { t: 'the sun', e: '☀️' }, { t: 'the moon', e: '🌙' }, { t: 'a star', e: '⭐' } ], a: 0 }
    ],
    3: [
      { q: 'I have a trunk but I am not a tree. I never forget, and I am the biggest animal that walks on land. What am I?', choices: [ { t: 'an elephant', e: '🐘' }, { t: 'a hippo', e: '🦛' }, { t: 'a rhino', e: '🦏' } ], a: 0 },
      { q: 'I open up over your head to keep off the rain. On a sunny day, I can make some shade. What am I?', choices: [ { t: 'a hat', e: '🎩' }, { t: 'an umbrella', e: '☂️' }, { t: 'a coat', e: '🧥' } ], a: 1 },
      { q: 'I am a quiet place full of books. You can come to read or borrow one for free. What am I?', choices: [ { t: 'a kitchen', e: '🍳' }, { t: 'a garage', e: '🚗' }, { t: 'a library', e: '📚' } ], a: 2 },
      { q: 'I have a face and two hands, but no arms at all. I tell you the time all day and night. What am I?', choices: [ { t: 'a robot', e: '🤖' }, { t: 'a clock', e: '🕐' }, { t: 'a mirror', e: '🪞' } ], a: 1 },
      { q: 'I am frozen water. I am cold and slippery, and I melt away in the warm sun. What am I?', choices: [ { t: 'ice', e: '🧊' }, { t: 'a glass', e: '🥛' }, { t: 'a rock', e: '🪨' } ], a: 0 },
      { q: 'I fly at night and sleep hanging upside down. I use sound, not my eyes, to find my way. What am I?', choices: [ { t: 'an owl', e: '🦉' }, { t: 'a bat', e: '🦇' }, { t: 'a moth', e: '🦋' } ], a: 1 },
      { q: 'I have many keys but I cannot open a single door. Press my keys and I make music. What am I?', choices: [ { t: 'a door', e: '🚪' }, { t: 'a map', e: '🗺️' }, { t: 'a piano', e: '🎹' } ], a: 2 },
      { q: 'I start out very small in the ground. With sun and water, I grow into a tall plant. What am I?', choices: [ { t: 'a seed', e: '🌱' }, { t: 'a rock', e: '🪨' }, { t: 'a coin', e: '🪙' } ], a: 0 },
      { q: 'I am a big cat with orange fur and black stripes. I hunt in the jungle. What am I?', choices: [ { t: 'a lion', e: '🦁' }, { t: 'a cheetah', e: '🐆' }, { t: 'a tiger', e: '🐯' } ], a: 2 },
      { q: 'I float in the sky and carry water. When I grow heavy and gray, I let the rain fall. What am I?', choices: [ { t: 'a cloud', e: '☁️' }, { t: 'a kite', e: '🪁' }, { t: 'a plane', e: '✈️' } ], a: 0 }
    ],
    4: [
      { q: 'I float on the ocean and carry many people. I am much bigger than a little boat. What am I?', choices: [ { t: 'a ship', e: '🚢' }, { t: 'a car', e: '🚗' }, { t: 'a plane', e: '✈️' } ], a: 0 },
      { q: 'I have a neck but no head, and a body but no legs. Strum my six strings and music pours out. What am I?', choices: [ { t: 'a drum', e: '🥁' }, { t: 'a guitar', e: '🎸' }, { t: 'a flute', e: '🪈' } ], a: 1 },
      { q: 'I am a planet famous for the beautiful rings that circle all the way around me. What am I?', choices: [ { t: 'Mars', e: '🔴' }, { t: 'Earth', e: '🌍' }, { t: 'Saturn', e: '🪐' } ], a: 2 },
      { q: 'The moon pulls me up and down. Twice a day I rise to cover the sandy beach, then slip back out. What am I?', choices: [ { t: 'the tide', e: '🌊' }, { t: 'the wind', e: '💨' }, { t: 'the rain', e: '🌧️' } ], a: 0 },
      { q: 'I went to school to become a doctor for animals. When your pet is sick, you bring it to me. What am I?', choices: [ { t: 'a teacher', e: '👩‍🏫' }, { t: 'a vet', e: '🧑‍⚕️' }, { t: 'a chef', e: '👨‍🍳' } ], a: 1 },
      { q: 'I have roots that no one sees, and a trunk that wears no clothes. My branches have no arms. What am I?', choices: [ { t: 'a river', e: '🏞️' }, { t: 'a tree', e: '🌳' }, { t: 'a mountain', e: '⛰️' } ], a: 1 },
      { q: 'I am a bird, but I cannot fly. I swim well and waddle on the ice in my black-and-white coat. What am I?', choices: [ { t: 'a penguin', e: '🐧' }, { t: 'an eagle', e: '🦅' }, { t: 'a parrot', e: '🦜' } ], a: 0 },
      { q: 'The more you take away from me, the bigger I grow. You dig me with a shovel. What am I?', choices: [ { t: 'a pile', e: '⛰️' }, { t: 'a hole', e: '🕳️' }, { t: 'a box', e: '📦' } ], a: 1 },
      { q: 'I am a flat shape with exactly three straight sides and three pointy corners. What am I?', choices: [ { t: 'a circle', e: '⭕' }, { t: 'a square', e: '🟥' }, { t: 'a triangle', e: '🔺' } ], a: 2 },
      { q: 'I show you roads, rivers, and whole countries, yet I am flat and fold up small in your pocket. What am I?', choices: [ { t: 'a map', e: '🗺️' }, { t: 'a book', e: '📖' }, { t: 'a clock', e: '🕐' } ], a: 0 }
    ],
    5: [
      { q: 'I grow shorter every time I do my job. I leave a trail of words behind me, and a little rubber cap wipes away my mistakes. What am I?', choices: [ { t: 'a pencil', e: '✏️' }, { t: 'a brush', e: '🖌️' }, { t: 'a candle', e: '🕯️' } ], a: 0 },
      { q: 'I have cities but no houses, forests but no trees, and rivers but no water you can drink. What am I?', choices: [ { t: 'a dream', e: '💭' }, { t: 'a painting', e: '🖼️' }, { t: 'a map', e: '🗺️' } ], a: 2 },
      { q: 'I am not alive, but I can grow. I have no lungs, but I need air. I have no mouth, but water can kill me. What am I?', choices: [ { t: 'ice', e: '🧊' }, { t: 'a plant', e: '🌱' }, { t: 'fire', e: '🔥' } ], a: 2 },
      { q: 'I have many keys but no locks. I have space but no room. You can press enter, but you cannot go inside. What am I?', choices: [ { t: 'a door', e: '🚪' }, { t: 'a keyboard', e: '⌨️' }, { t: 'a piano', e: '🎹' } ], a: 1 },
      { q: 'I am full of holes, yet I can still hold plenty of water. What am I?', choices: [ { t: 'a net', e: '🥅' }, { t: 'a sponge', e: '🧽' }, { t: 'a basket', e: '🧺' } ], a: 1 },
      { q: 'I run all day but never take a step. I have a bank but keep no money, and a bed where I never sleep. What am I?', choices: [ { t: 'a clock', e: '🕐' }, { t: 'a river', e: '🏞️' }, { t: 'a road', e: '🛣️' } ], a: 1 },
      { q: 'A cook cracks me open for breakfast, and a baby bird must break me to be born. What am I?', choices: [ { t: 'an egg', e: '🥚' }, { t: 'a nut', e: '🥜' }, { t: 'ice', e: '🧊' } ], a: 0 },
      { q: 'I am tall when I am young and short when I am old. Wind is my enemy, and while I live I give off light. What am I?', choices: [ { t: 'a tree', e: '🌳' }, { t: 'a mountain', e: '⛰️' }, { t: 'a candle', e: '🕯️' } ], a: 2 },
      { q: 'I fly without any wings and cry without any eyes. Wherever I drift, the shade follows below me. What am I?', choices: [ { t: 'a bird', e: '🐦' }, { t: 'a cloud', e: '☁️' }, { t: 'a kite', e: '🪁' } ], a: 1 },
      { q: 'I have a golden head and a golden tail, but no body in between. I am small and round, and I jingle in your pocket. What am I?', choices: [ { t: 'a coin', e: '🪙' }, { t: 'a ring', e: '💍' }, { t: 'a button', e: '🔘' } ], a: 0 }
    ]
  },

  /* ---------- Word Factory ----------
     Morphology, grades 2-5. Each entry adds ONE affix (pre OR suf) to a
     base with no spelling change, so word === pre+base or base+suf.
     meaning = the built word in kid words; foils = 2 wrong meanings
     that misread the affix. */
  MORPH: {
    2: [
      { pre: 'un', base: 'lock', word: 'unlock', e: '🔓', meaning: 'to open something that is locked', foils: ['to lock it two times', 'a very small lock'] },
      { pre: 're', base: 'do', word: 'redo', e: '🔁', meaning: 'to do it again', foils: ['to stop doing it', 'to do it wrong'] },
      { pre: 'un', base: 'happy', word: 'unhappy', e: '☹️', meaning: 'not happy; feeling sad', foils: ['very, very happy', 'happy once more'] },
      { suf: 'er', base: 'help', word: 'helper', e: '🙋', meaning: 'a person who helps', foils: ['a person who needs help', 'a tiny bit of help'] },
      { suf: 'ful', base: 'hope', word: 'hopeful', e: '🌈', meaning: 'full of hope', foils: ['with no hope at all', 'to give your hope away'] },
      { suf: 'ness', base: 'sad', word: 'sadness', e: '😢', meaning: 'the feeling of being sad', foils: ['only a little bit sad', 'not sad at all'] },
      { suf: 'ly', base: 'slow', word: 'slowly', e: '🐌', meaning: 'in a slow way', foils: ['not slow at all', 'very, very fast'] },
      { pre: 're', base: 'fill', word: 'refill', e: '🥤', meaning: 'to fill it up again', foils: ['to spill it out', 'to leave it empty'] },
      { pre: 'un', base: 'zip', word: 'unzip', e: '🧥', meaning: 'to open a zipper', foils: ['to zip it up twice', 'a broken little zipper'] },
      { suf: 'er', base: 'teach', word: 'teacher', e: '👩‍🏫', meaning: 'a person who teaches', foils: ['a person who learns', 'a short little lesson'] },
      { suf: 'ful', base: 'care', word: 'careful', e: '⚠️', meaning: 'full of care; watching so you stay safe', foils: ['not caring at all', 'to give care away'] },
      { suf: 'er', base: 'paint', word: 'painter', e: '🧑‍🎨', meaning: 'a person who paints', foils: ['a person who cleans', 'a tiny little painting'] }
    ],
    3: [
      { pre: 're', base: 'read', word: 'reread', e: '📖', meaning: 'to read it again', foils: ['to read it the wrong way', 'to stop reading'] },
      { pre: 'un', base: 'kind', word: 'unkind', e: '😠', meaning: 'not kind; mean', foils: ['very kind indeed', 'kind one more time'] },
      { pre: 'mis', base: 'place', word: 'misplace', e: '🔍', meaning: 'to put something in the wrong spot and lose it', foils: ['to place it neatly', 'to place it two times'] },
      { pre: 'pre', base: 'heat', word: 'preheat', e: '🔥', meaning: 'to heat something before you use it', foils: ['to heat it far too much', 'to cool it right down'] },
      { pre: 'dis', base: 'like', word: 'dislike', e: '👎', meaning: 'to not like something', foils: ['to like it a whole lot', 'to like it once more'] },
      { suf: 'less', base: 'fear', word: 'fearless', e: '🦁', meaning: 'having no fear; very brave', foils: ['full of fear', 'a small little fear'] },
      { suf: 'ness', base: 'kind', word: 'kindness', e: '💛', meaning: 'the act of being kind', foils: ['being a little unkind', 'not being kind'] },
      { suf: 'ly', base: 'quick', word: 'quickly', e: '⚡', meaning: 'in a quick, fast way', foils: ['in a very slow way', 'not quick at all'] },
      { suf: 'er', base: 'farm', word: 'farmer', e: '🧑‍🌾', meaning: 'a person who works on a farm', foils: ['a tiny little farm', 'a person who goes shopping'] },
      { pre: 're', base: 'build', word: 'rebuild', e: '🏗️', meaning: 'to build it again', foils: ['to knock it all down', 'to build it wrong'] },
      { suf: 'ish', base: 'child', word: 'childish', e: '🍼', meaning: 'acting like a young child', foils: ['acting all grown up', 'having lots of children'] },
      { pre: 'un', base: 'pack', word: 'unpack', e: '🧳', meaning: 'to take things back out of a bag or box', foils: ['to pack it up twice', 'a full, heavy backpack'] }
    ],
    4: [
      { pre: 'dis', base: 'agree', word: 'disagree', e: '🙅', meaning: 'to not agree; to think differently', foils: ['to agree very strongly', 'to agree all over again'] },
      { pre: 're', base: 'arrange', word: 'rearrange', e: '🔀', meaning: 'to put things into a new order', foils: ['to leave things exactly alone', 'to arrange them badly'] },
      { pre: 'over', base: 'cook', word: 'overcook', e: '🍳', meaning: 'to cook something too long', foils: ['to cook it just right', 'to not cook it at all'] },
      { pre: 'under', base: 'pay', word: 'underpay', e: '💵', meaning: 'to pay someone too little', foils: ['to pay someone too much', 'to pay right on time'] },
      { suf: 'ful', base: 'thank', word: 'thankful', e: '🙏', meaning: 'full of thanks; grateful', foils: ['with no thanks at all', 'to give your thanks away'] },
      { suf: 'less', base: 'price', word: 'priceless', e: '💎', meaning: 'so special that no price is high enough', foils: ['worth no money at all', 'having a tiny price'] },
      { suf: 'ness', base: 'dark', word: 'darkness', e: '🌑', meaning: 'the state of being dark', foils: ['a small bit of light', 'a tiny dark spot'] },
      { suf: 'ly', base: 'bright', word: 'brightly', e: '☀️', meaning: 'in a bright way', foils: ['in a dim, dark way', 'not bright at all'] },
      { suf: 'able', base: 'read', word: 'readable', e: '📗', meaning: 'easy to read', foils: ['too hard to read', 'ready to be read to you'] },
      { pre: 'mis', base: 'count', word: 'miscount', e: '🔢', meaning: 'to count something wrong', foils: ['to count it perfectly', 'to count it once more'] },
      { pre: 're', base: 'paint', word: 'repaint', e: '🎨', meaning: 'to paint it again', foils: ['to scrape the paint off', 'to paint it badly'] },
      { pre: 'non', base: 'stop', word: 'nonstop', e: '🚄', meaning: 'going without stopping', foils: ['with lots of stops', 'stopping just once'] }
    ],
    5: [
      { pre: 'dis', base: 'appear', word: 'disappear', e: '💨', meaning: 'to go out of sight; to vanish', foils: ['to show up once again', 'to appear very slowly'] },
      { pre: 'over', base: 'sleep', word: 'oversleep', e: '😴', meaning: 'to sleep longer than you meant to', foils: ['to sleep far too little', 'to sleep just the right amount'] },
      { pre: 'under', base: 'water', word: 'underwater', e: '🤿', meaning: 'below the surface of the water', foils: ['on top of the water', 'right beside the water'] },
      { pre: 're', base: 'discover', word: 'rediscover', e: '🔭', meaning: 'to discover something again', foils: ['to hide it far away', 'to lose it forever'] },
      { pre: 'mis', base: 'understand', word: 'misunderstand', e: '🤔', meaning: 'to understand something the wrong way', foils: ['to understand it perfectly', 'to explain it again'] },
      { suf: 'less', base: 'thought', word: 'thoughtless', e: '😳', meaning: 'not thinking about others; careless', foils: ['full of deep thought', 'thinking very hard'] },
      { suf: 'ful', base: 'wonder', word: 'wonderful', e: '🤩', meaning: 'full of wonder; really great', foils: ['full of worry', 'making wonder stop'] },
      { suf: 'ment', base: 'agree', word: 'agreement', e: '🤝', meaning: 'the act of agreeing; a deal', foils: ['a big loud argument', 'the act of walking away'] },
      { suf: 'ish', base: 'fool', word: 'foolish', e: '🤡', meaning: 'acting like a fool; silly and unwise', foils: ['very wise and clever', 'having no fool around'] },
      { pre: 'pre', base: 'view', word: 'preview', e: '🎬', meaning: 'a peek at something before it comes out', foils: ['a look back at the past', 'the very last part'] },
      { pre: 'non', base: 'sense', word: 'nonsense', e: '🤪', meaning: 'words or ideas that make no sense', foils: ['very wise words', 'a good, calm feeling'] },
      { suf: 'ment', base: 'move', word: 'movement', e: '🏃', meaning: 'the act of moving', foils: ['the act of resting still', 'a comfy place to sit'] }
    ]
  },

  /* ---------- Opposites & Twins ----------
     8 antonym pairs + 8 synonym pairs per grade. No word repeats within
     a grade, so pairs never become each other's answer. */
  PAIRS: {
    K: {
      ant: [ ['big','small'], ['hot','cold'], ['up','down'], ['in','out'], ['day','night'], ['wet','dry'], ['fast','slow'], ['good','bad'] ],
      syn: [ ['little','tiny'], ['glad','happy'], ['mad','angry'], ['jump','hop'], ['rock','stone'], ['kid','child'], ['yell','shout'], ['sick','ill'] ]
    },
    1: {
      ant: [ ['love','hate'], ['push','pull'], ['tall','short'], ['full','empty'], ['loud','quiet'], ['clean','dirty'], ['hard','soft'], ['new','old'] ],
      syn: [ ['big','large'], ['small','little'], ['fast','quick'], ['jump','leap'], ['shout','yell'], ['happy','cheerful'], ['cold','chilly'], ['nice','kind'] ]
    },
    2: {
      ant: [ ['begin','end'], ['brave','afraid'], ['rich','poor'], ['win','lose'], ['above','below'], ['early','late'], ['light','heavy'], ['wild','tame'] ],
      syn: [ ['small','little'], ['big','huge'], ['happy','joyful'], ['angry','mad'], ['quick','fast'], ['smart','clever'], ['quiet','silent'], ['pretty','lovely'] ]
    },
    3: {
      ant: [ ['always','never'], ['buy','sell'], ['float','sink'], ['gather','scatter'], ['shout','whisper'], ['wide','narrow'], ['smooth','rough'], ['strong','weak'] ],
      syn: [ ['happy','glad'], ['big','giant'], ['small','tiny'], ['fast','speedy'], ['angry','furious'], ['smart','clever'], ['cold','freezing'], ['quiet','peaceful'] ]
    },
    4: {
      ant: [ ['brave','cowardly'], ['ancient','modern'], ['expand','shrink'], ['arrive','depart'], ['cruel','kind'], ['shallow','deep'], ['victory','defeat'], ['praise','blame'] ],
      syn: [ ['huge','gigantic'], ['tiny','miniature'], ['happy','delighted'], ['angry','furious'], ['fast','rapid'], ['smart','intelligent'], ['scared','frightened'], ['pretty','gorgeous'] ]
    },
    5: {
      ant: [ ['ancient','modern'], ['fragile','sturdy'], ['generous','selfish'], ['temporary','permanent'], ['increase','decrease'], ['praise','criticize'], ['artificial','natural'], ['humble','arrogant'] ],
      syn: [ ['delicate','dainty'], ['enormous','immense'], ['curious','inquisitive'], ['difficult','challenging'], ['quick','rapid'], ['happy','delighted'], ['calm','peaceful'], ['brave','courageous'] ]
    }
  },

  /* ---------- Word Chains ----------
     Grades K-2. Each chain has 4 steps; each step changes exactly ONE
     letter from the step before (same length throughout). */
  CHAINS: {
    K: [
      { steps: ['cat','hat','hot','hop'] },
      { steps: ['pig','pit','pat','pan'] },
      { steps: ['bug','bag','bat','bad'] },
      { steps: ['dog','dig','dip','dim'] },
      { steps: ['man','mat','map','mop'] },
      { steps: ['net','nut','cut','cup'] },
      { steps: ['pen','pin','win','wig'] },
      { steps: ['top','tap','tan','ten'] },
      { steps: ['rat','ran','run','rug'] },
      { steps: ['box','fox','fix','six'] }
    ],
    1: [
      { steps: ['ship','shop','chop','chip'] },
      { steps: ['stop','step','stem','stew'] },
      { steps: ['flag','flap','flip','clip'] },
      { steps: ['spin','spit','slit','slot'] },
      { steps: ['hand','band','bend','bond'] },
      { steps: ['desk','disk','dish','fish'] },
      { steps: ['slip','slap','snap','swap'] },
      { steps: ['trip','trap','tray','gray'] },
      { steps: ['plum','plus','plug','slug'] },
      { steps: ['club','clue','blue','glue'] }
    ],
    2: [
      { steps: ['cake','cane','care','core'] },
      { steps: ['bike','bake','lake','like'] },
      { steps: ['rain','main','mail','mall'] },
      { steps: ['boat','coat','cost','cast'] },
      { steps: ['seed','feed','feet','felt'] },
      { steps: ['moon','mood','good','gold'] },
      { steps: ['rope','rose','nose','note'] },
      { steps: ['tree','free','flee','flea'] },
      { steps: ['rail','tail','tall','ball'] },
      { steps: ['gate','late','lane','line'] }
    ]
  },

  /* ---------- Real or Nonsense? ----------
     20 pronounceable pseudo-words per grade that follow the grade's
     phonics patterns. None is a real English word or in WORDS/SIGHT. */
  NONSENSE: {
    K: ['wug','zat','fim','vux','daf','niv','rup','vun','kib','lom','gax','zof','bof','mup','jub','hig','muv','nax','pev','zib'],
    1: ['thrap','clest','drell','frell','snelt','plisk','brump','clont','shomp','thisk','chulf','whesk','grulp','twisk','spomp','blesk','crilt','dresp','thurn','spriv'],
    2: ['floam','brike','sneet','braip','cheam','smide','throle','sproom','plite','greab','crade','skeeb','plome','chaim','smode','fleen','gloob','snigh','plaif','stoab'],
    3: ['bantle','morfit','plindle','plimmer','crandle','tazzle','flumber','gribbon','snorbit','blantic','clurpin','jabbet','montil','snadgel','wobbin','yommit','plodkin','frannet','vantle','shrompet'],
    4: ['tarnible','compestic','delantic','fentrable','gorbetil','hendrile','quandric','plemist','sundrel','varnolic','brackine','craniter','dobrint','flantom','grispatic','morlect','plostin','rambolic','septular','trelidon'],
    5: ['quandrelic','voltimend','blantiform','crestingal','dermolic','fendricate','gonderis','holprandic','juvantic','lumendric','mandolic','nervactic','octravel','plendorate','quibberton','rendalic','sprocklem','trantible','vandriset','yarnolic']
  },

  /* ===================================================================
     Challenge Zone — games for older readers (grades 2-5).
     ANALOGIES  — Analogy Alley           (verbal reasoning)
     CLOZE      — Context Clue Detective  (vocabulary in context)
     FIXIT      — Fix It!                 (grammar / usage editing)
     MAINIDEA   — Main Idea Mission       (comprehension)
     FACTOP     — Fact or Opinion?        (critical reading)
     HOMOPHONES — Homophone Heroes        (spelling / usage)
     DEEPDIVE   — Deep Dive               (reading stamina, grades 3-5)
     =================================================================== */

  /* ---------- Analogy Alley ----------
     12 per grade. a:b :: c:d. foils = 2 wrong words of the same class as
     d that break the relationship. kind = kid-readable relationship name.
     Grade 2 concrete, grade 5 abstract. Exactly ONE defensible answer. */
  ANALOGIES: {
    2: [
      { a: 'puppy', b: 'dog', c: 'kitten', d: 'cat', foils: ['fish', 'horse'], kind: 'baby & grown-up' },
      { a: 'wheel', b: 'car', c: 'page', d: 'book', foils: ['pencil', 'library'], kind: 'part of a whole' },
      { a: 'painter', b: 'brush', c: 'writer', d: 'pen', foils: ['spoon', 'hammer'], kind: 'worker & tool' },
      { a: 'bird', b: 'nest', c: 'bee', d: 'hive', foils: ['barn', 'cave'], kind: 'animal & home' },
      { a: 'hot', b: 'cold', c: 'up', d: 'down', foils: ['left', 'open'], kind: 'opposites' },
      { a: 'red', b: 'color', c: 'dog', d: 'animal', foils: ['plant', 'food'], kind: 'example & its group' },
      { a: 'pencil', b: 'write', c: 'scissors', d: 'cut', foils: ['draw', 'fold'], kind: 'thing & what it does' },
      { a: 'rain', b: 'wet', c: 'fire', d: 'hot', foils: ['dark', 'loud'], kind: 'cause & what happens' },
      { a: 'calf', b: 'cow', c: 'chick', d: 'chicken', foils: ['duck', 'goat'], kind: 'baby & grown-up' },
      { a: 'day', b: 'night', c: 'big', d: 'small', foils: ['tall', 'round'], kind: 'opposites' },
      { a: 'soap', b: 'wash', c: 'towel', d: 'dry', foils: ['clean', 'wet'], kind: 'thing & what it does' },
      { a: 'cow', b: 'barn', c: 'horse', d: 'stable', foils: ['nest', 'cave'], kind: 'animal & home' }
    ],
    3: [
      { a: 'cub', b: 'bear', c: 'joey', d: 'kangaroo', foils: ['camel', 'zebra'], kind: 'baby & grown-up' },
      { a: 'petal', b: 'flower', c: 'branch', d: 'tree', foils: ['forest', 'garden'], kind: 'part of a whole' },
      { a: 'brush', b: 'painter', c: 'hose', d: 'firefighter', foils: ['doctor', 'teacher'], kind: 'tool & who uses it' },
      { a: 'bee', b: 'hive', c: 'spider', d: 'web', foils: ['nest', 'den'], kind: 'animal & home' },
      { a: 'full', b: 'empty', c: 'loud', d: 'quiet', foils: ['happy', 'fast'], kind: 'opposites' },
      { a: 'rose', b: 'flower', c: 'robin', d: 'bird', foils: ['nest', 'insect'], kind: 'example & its group' },
      { a: 'knife', b: 'cut', c: 'broom', d: 'sweep', foils: ['dig', 'paint'], kind: 'thing & what it does' },
      { a: 'rain', b: 'puddle', c: 'fire', d: 'ash', foils: ['snow', 'rock'], kind: 'cause & what it leaves behind' },
      { a: 'chalk', b: 'teacher', c: 'whistle', d: 'referee', foils: ['dancer', 'pilot'], kind: 'tool & who uses it' },
      { a: 'net', b: 'catch', c: 'key', d: 'unlock', foils: ['dig', 'tie'], kind: 'thing & what it does' },
      { a: 'oak', b: 'tree', c: 'shark', d: 'fish', foils: ['ocean', 'whale'], kind: 'example & its group' },
      { a: 'begin', b: 'end', c: 'open', d: 'close', foils: ['push', 'enter'], kind: 'opposites' }
    ],
    4: [
      { a: 'fawn', b: 'deer', c: 'gosling', d: 'goose', foils: ['duck', 'swan'], kind: 'baby & grown-up' },
      { a: 'engine', b: 'car', c: 'sail', d: 'boat', foils: ['ocean', 'harbor'], kind: 'part of a whole' },
      { a: 'telescope', b: 'astronomer', c: 'paintbrush', d: 'artist', foils: ['writer', 'musician'], kind: 'tool & who uses it' },
      { a: 'bear', b: 'cave', c: 'rabbit', d: 'burrow', foils: ['nest', 'pond'], kind: 'animal & home' },
      { a: 'ancient', b: 'modern', c: 'victory', d: 'defeat', foils: ['army', 'war'], kind: 'opposites' },
      { a: 'violin', b: 'instrument', c: 'maple', d: 'tree', foils: ['leaf', 'forest'], kind: 'example & its group' },
      { a: 'microscope', b: 'magnify', c: 'freezer', d: 'freeze', foils: ['cook', 'melt'], kind: 'thing & what it does' },
      { a: 'fire', b: 'smoke', c: 'rain', d: 'flood', foils: ['drought', 'desert'], kind: 'cause & effect' },
      { a: 'root', b: 'tree', c: 'fin', d: 'fish', foils: ['ocean', 'net'], kind: 'part of a whole' },
      { a: 'copper', b: 'metal', c: 'oxygen', d: 'gas', foils: ['liquid', 'solid'], kind: 'example & its group' },
      { a: 'whistle', b: 'coach', c: 'gavel', d: 'judge', foils: ['lawyer', 'police'], kind: 'tool & who uses it' },
      { a: 'generous', b: 'selfish', c: 'brave', d: 'cowardly', foils: ['clever', 'loyal'], kind: 'opposites' }
    ],
    5: [
      { a: 'author', b: 'book', c: 'composer', d: 'song', foils: ['poem', 'painting'], kind: 'maker & what they make' },
      { a: 'sonnet', b: 'poem', c: 'novel', d: 'book', foils: ['chapter', 'author'], kind: 'example & its group' },
      { a: 'expand', b: 'contract', c: 'ascend', d: 'descend', foils: ['travel', 'remain'], kind: 'opposites' },
      { a: 'stanza', b: 'poem', c: 'scene', d: 'play', foils: ['theater', 'costume'], kind: 'part of a whole' },
      { a: 'friction', b: 'heat', c: 'sunlight', d: 'warmth', foils: ['shadow', 'winter'], kind: 'cause & effect' },
      { a: 'choreographer', b: 'dance', c: 'playwright', d: 'play', foils: ['novel', 'song'], kind: 'maker & what they make' },
      { a: 'whale', b: 'mammal', c: 'eagle', d: 'bird', foils: ['fish', 'reptile'], kind: 'example & its group' },
      { a: 'abundant', b: 'scarce', c: 'temporary', d: 'permanent', foils: ['fragile', 'distant'], kind: 'opposites' },
      { a: 'thermometer', b: 'temperature', c: 'scale', d: 'weight', foils: ['height', 'distance'], kind: 'tool & what it measures' },
      { a: 'study', b: 'knowledge', c: 'exercise', d: 'strength', foils: ['weakness', 'rest'], kind: 'cause & effect' },
      { a: 'chapter', b: 'novel', c: 'movement', d: 'symphony', foils: ['orchestra', 'concert'], kind: 'part of a whole' },
      { a: 'compass', b: 'direction', c: 'clock', d: 'time', foils: ['weather', 'distance'], kind: 'tool & what it shows' }
    ]
  },

  /* ---------- Context Clue Detective ----------
     12 per grade. Exactly one ___ per sentence. Context makes answer best;
     each foil is grammatically valid in the slot but contextually wrong. */
  CLOZE: {
    2: [
      { t: 'The ___ dog buried the bone before anyone saw.', answer: 'sneaky', foils: ['purple', 'sleepy'] },
      { t: 'It was so ___ that we wore our warm coats and hats.', answer: 'cold', foils: ['sunny', 'loud'] },
      { t: 'The turtle moved so ___ that it took all day to cross.', answer: 'slowly', foils: ['quickly', 'softly'] },
      { t: 'I was ___ when I dropped my ice cream in the sand.', answer: 'sad', foils: ['happy', 'hungry'] },
      { t: 'We had to be ___ so the baby would not wake up.', answer: 'quiet', foils: ['silly', 'messy'] },
      { t: 'The soup was too ___ to eat, so I let it cool down.', answer: 'hot', foils: ['cold', 'sweet'] },
      { t: 'My backpack felt very ___ with all my books inside.', answer: 'heavy', foils: ['empty', 'tiny'] },
      { t: 'The clown made us ___ until our cheeks hurt.', answer: 'laugh', foils: ['cry', 'sleep'] },
      { t: 'After running the whole race, I felt so ___.', answer: 'tired', foils: ['scared', 'early'] },
      { t: 'The bird built its ___ high up in the tree.', answer: 'nest', foils: ['boat', 'shoe'] },
      { t: 'Please ___ your hands before you eat lunch.', answer: 'wash', foils: ['throw', 'count'] },
      { t: 'The night was so ___ that we could see every star.', answer: 'clear', foils: ['cloudy', 'rainy'] }
    ],
    3: [
      { t: 'The old floor would ___ loudly whenever we tiptoed across it.', answer: 'creak', foils: ['sparkle', 'freeze'] },
      { t: 'She spoke in a ___ voice so no one else could hear the secret.', answer: 'quiet', foils: ['booming', 'cheerful'] },
      { t: 'The desert was so ___ that the ground cracked into pieces.', answer: 'dry', foils: ['wet', 'crowded'] },
      { t: 'The puppy was ___ around every new person it met.', answer: 'shy', foils: ['proud', 'asleep'] },
      { t: 'We had to ___ our voices in the library so we would not disturb others.', answer: 'lower', foils: ['raise', 'paint'] },
      { t: 'The knight was ___ enough to face the dragon all alone.', answer: 'brave', foils: ['afraid', 'sleepy'] },
      { t: 'The magician made the coin ___ right before our eyes.', answer: 'vanish', foils: ['stumble', 'whisper'] },
      { t: 'After the long hike, the cold water tasted ___.', answer: 'refreshing', foils: ['boring', 'angry'] },
      { t: 'The stray cat was ___ and would not let anyone come close.', answer: 'nervous', foils: ['friendly', 'purple'] },
      { t: 'The chef ___ the soup carefully so it would not spill.', answer: 'stirred', foils: ['shouted', 'painted'] },
      { t: 'The story was so ___ that I could not put the book down.', answer: 'exciting', foils: ['dull', 'frozen'] },
      { t: 'The path was ___ and full of sharp turns up the mountain.', answer: 'winding', foils: ['straight', 'flat'] }
    ],
    4: [
      { t: 'A ___ silence filled the room right before the surprise was revealed.', answer: 'tense', foils: ['cheerful', 'sleepy'] },
      { t: 'The ancient bridge looked too ___ to hold our weight.', answer: 'fragile', foils: ['sturdy', 'shiny'] },
      { t: 'He gave a ___ answer, so we still were not sure what he meant.', answer: 'vague', foils: ['clear', 'loud'] },
      { t: 'The crowd grew ___ as the game went into its final seconds.', answer: 'anxious', foils: ['sleepy', 'calm'] },
      { t: 'The instructions were so ___ that anyone could follow them.', answer: 'simple', foils: ['confusing', 'expensive'] },
      { t: 'She was ___ about winning, but she practiced hard just in case.', answer: 'confident', foils: ['worried', 'curious'] },
      { t: 'The volcano had been ___ for hundreds of years before it woke up.', answer: 'quiet', foils: ['active', 'tiny'] },
      { t: 'My grandmother told the same story so ___ that I knew it by heart.', answer: 'frequently', foils: ['rarely', 'quietly'] },
      { t: 'The detective examined every ___ clue before naming the thief.', answer: 'tiny', foils: ['giant', 'loud'] },
      { t: 'The lake was perfectly ___, like a giant mirror in the morning.', answer: 'still', foils: ['rough', 'crowded'] },
      { t: 'He spoke so ___ that everyone in the back could hear each word.', answer: 'clearly', foils: ['softly', 'sadly'] },
      { t: 'The puzzle was ___, so we needed the whole afternoon to solve it.', answer: 'difficult', foils: ['easy', 'round'] }
    ],
    5: [
      { t: 'The scientist remained ___ about the strange results and ran the test again.', answer: 'curious', foils: ['bored', 'furious'] },
      { t: 'The glass ornament was so ___ that we wrapped it in three layers of cloth.', answer: 'fragile', foils: ['sturdy', 'ordinary'] },
      { t: 'When the alarm rang, everyone left the building ___ without stopping to talk.', answer: 'immediately', foils: ['eventually', 'cheerfully'] },
      { t: 'The traveler felt ___ in the crowded, unfamiliar city where no one spoke her language.', answer: 'anxious', foils: ['relaxed', 'delighted'] },
      { t: 'The melody sounded oddly ___, as if I had heard it somewhere long ago.', answer: 'familiar', foils: ['strange', 'silent'] },
      { t: 'The ruins were ___, built by a people who vanished thousands of years ago.', answer: 'ancient', foils: ['modern', 'tiny'] },
      { t: 'She checks the mailbox so ___ that she notices the moment a letter arrives.', answer: 'frequently', foils: ['seldom', 'loudly'] },
      { t: 'The coach was ___ pleased with how the youngest players had improved.', answer: 'especially', foils: ['barely', 'rudely'] },
      { t: 'The witness gave such a ___ description that the artist drew the suspect perfectly.', answer: 'detailed', foils: ['vague', 'cheerful'] },
      { t: 'The negotiations were ___, and both sides argued late into the night.', answer: 'tense', foils: ['relaxed', 'brief'] },
      { t: 'His handwriting was nearly ___, and no one could make out the words.', answer: 'illegible', foils: ['neat', 'colorful'] },
      { t: 'The rumor spread ___ through the school before lunchtime was even over.', answer: 'rapidly', foils: ['slowly', 'quietly'] }
    ]
  },

  /* ---------- Fix It! ----------
     12 per grade. Exactly ONE word (wrong) is broken; the rest of the
     sentence is impeccable. wrong appears once as a whole word in t.
     foils = 2 wrong corrections. Error types rotate: verb tense,
     subject-verb agreement, pronoun, plural, article, misused word. */
  FIXIT: {
    2: [
      { t: 'The dog eated the bone.', wrong: 'eated', right: 'ate', foils: ['eating', 'eats'] },
      { t: 'Yesterday we goed to the park.', wrong: 'goed', right: 'went', foils: ['gone', 'going'] },
      { t: 'She run to school every morning.', wrong: 'run', right: 'runs', foils: ['running', 'runned'] },
      { t: 'I have two foots.', wrong: 'foots', right: 'feet', foils: ['foot', 'feets'] },
      { t: 'She ate a orange for lunch.', wrong: 'a', right: 'an', foils: ['and', 'of'] },
      { t: 'Me and Sam played tag.', wrong: 'Me', right: 'I', foils: ['My', 'Mine'] },
      { t: 'He runned all the way home.', wrong: 'runned', right: 'ran', foils: ['runs', 'running'] },
      { t: 'The two dogs is barking.', wrong: 'is', right: 'are', foils: ['be', 'was'] },
      { t: 'I saw three mouses in the barn.', wrong: 'mouses', right: 'mice', foils: ['mouse', 'mices'] },
      { t: 'We went to the store to by milk.', wrong: 'by', right: 'buy', foils: ['bye', 'been'] },
      { t: 'Him is my best friend.', wrong: 'Him', right: 'He', foils: ['His', 'Them'] },
      { t: 'She bringed her lunch to school.', wrong: 'bringed', right: 'brought', foils: ['bringing', 'brings'] }
    ],
    3: [
      { t: 'The children swimmed in the lake all afternoon.', wrong: 'swimmed', right: 'swam', foils: ['swimming', 'swum'] },
      { t: 'My sister and I was late for the bus.', wrong: 'was', right: 'were', foils: ['is', 'be'] },
      { t: 'Please give the ball to she.', wrong: 'she', right: 'her', foils: ['hers', 'they'] },
      { t: 'The dentist checked all my tooths.', wrong: 'tooths', right: 'teeth', foils: ['tooth', 'teeths'] },
      { t: 'We could of won the game.', wrong: 'of', right: 'have', foils: ['off', 'had'] },
      { t: 'I have never saw a real whale.', wrong: 'saw', right: 'seen', foils: ['see', 'sawed'] },
      { t: 'Last week she teached us a new song.', wrong: 'teached', right: 'taught', foils: ['teaching', 'teaches'] },
      { t: 'There is many stars in the sky tonight.', wrong: 'is', right: 'are', foils: ['be', 'was'] },
      { t: 'The farmer fed the sheeps at dawn.', wrong: 'sheeps', right: 'sheep', foils: ['sheepes', 'sheepen'] },
      { t: 'Us kids love summer vacation.', wrong: 'Us', right: 'We', foils: ['Our', 'Them'] },
      { t: 'This box is heavier then that one.', wrong: 'then', right: 'than', foils: ['thin', 'that'] },
      { t: 'He catched the ball with one hand.', wrong: 'catched', right: 'caught', foils: ['catching', 'catches'] }
    ],
    4: [
      { t: 'The scientists had wrote their report before the deadline.', wrong: 'wrote', right: 'written', foils: ['writed', 'writing'] },
      { t: 'Neither of the boys were ready on time.', wrong: 'were', right: 'was', foils: ['are', 'be'] },
      { t: 'The teacher praised Sam and I for the project.', wrong: 'I', right: 'me', foils: ['mine', 'myself'] },
      { t: 'The chef sliced the tomatos for the salad.', wrong: 'tomatos', right: 'tomatoes', foils: ['tomatoe', 'tomato'] },
      { t: 'The loud music had a bad affect on my focus.', wrong: 'affect', right: 'effect', foils: ['affects', 'effects'] },
      { t: 'By noon the snow had began to melt.', wrong: 'began', right: 'begun', foils: ['beginned', 'beginning'] },
      { t: 'Each of the players have a locker.', wrong: 'have', right: 'has', foils: ['having', 'haves'] },
      { t: 'They saved a seat for she and her brother.', wrong: 'she', right: 'her', foils: ['hers', 'herself'] },
      { t: 'The museum showed bones from three ancient womans.', wrong: 'womans', right: 'women', foils: ['woman', 'womens'] },
      { t: 'The pipe had froze during the cold night.', wrong: 'froze', right: 'frozen', foils: ['freezed', 'freezing'] },
      { t: 'There were less cars on the road today.', wrong: 'less', right: 'fewer', foils: ['lesser', 'least'] },
      { t: 'The runners had ran three miles before sunrise.', wrong: 'ran', right: 'run', foils: ['runned', 'running'] }
    ],
    5: [
      { t: 'The explorers had swam across the icy river.', wrong: 'swam', right: 'swum', foils: ['swimmed', 'swimming'] },
      { t: 'The collection of rare stamps were worth a fortune.', wrong: 'were', right: 'was', foils: ['are', 'be'] },
      { t: 'Between you and I, the surprise is a puppy.', wrong: 'I', right: 'me', foils: ['myself', 'mine'] },
      { t: 'The report described several new phenomenons.', wrong: 'phenomenons', right: 'phenomena', foils: ['phenomenon', 'phenomenas'] },
      { t: 'The choir sang really good at the concert.', wrong: 'good', right: 'well', foils: ['gooder', 'best'] },
      { t: 'She had drank all the water before the hike ended.', wrong: 'drank', right: 'drunk', foils: ['drinked', 'drinking'] },
      { t: 'Each of the students have finished the exam.', wrong: 'have', right: 'has', foils: ['having', 'haved'] },
      { t: 'The award was shared between she and her partner.', wrong: 'she', right: 'her', foils: ['hers', 'herself'] },
      { t: 'The witness could of identified the suspect easily.', wrong: 'of', right: 'have', foils: ['off', 'had'] },
      { t: 'By dawn the campers had rose and packed their tents.', wrong: 'rose', right: 'risen', foils: ['rised', 'rising'] },
      { t: 'The team solved two difficult crisises last week.', wrong: 'crisises', right: 'crises', foils: ['crisis', 'crisees'] },
      { t: 'To who should I address the letter?', wrong: 'who', right: 'whom', foils: ['whose', 'whoms'] }
    ]
  },

  /* ---------- Main Idea Mission ----------
     8 per grade. choices = 3 titles: the best title, a too-narrow detail
     title, and an off-topic title. a = index of the best title (varied). */
  MAINIDEA: {
    2: [
      { p: 'Penguins are birds, but they cannot fly. They use their wings to swim in the cold sea. Their thick feathers keep them warm.', choices: ['How Penguins Live', 'Penguins Have Feathers', 'Why Cats Purr'], a: 0 },
      { p: 'Bees help make our food. They fly from flower to flower to drink sweet nectar. As they go, they move pollen that helps fruit grow.', choices: ['Bees Like Nectar', 'How Bees Help Our Food', 'A Trip to the Zoo'], a: 1 },
      { p: 'Rainbows appear after it rains. Sunlight shines through tiny drops of water in the air. The light bends and splits into many colors.', choices: ['Water Drops in the Air', 'My Favorite Color', 'How Rainbows Are Made'], a: 2 },
      { p: 'The Sun is a giant star. It is so big that many Earths could fit inside it. The Sun gives us light and heat every day.', choices: ['The Sun, Our Star', 'The Sun Is Hot', 'Playing in the Snow'], a: 0 },
      { p: 'Soccer is a game played with a round ball. Players run and kick the ball to score goals. They cannot use their hands, only their feet.', choices: ['Kicking a Ball', 'How to Play Soccer', 'Baking Cookies'], a: 1 },
      { p: 'A spider makes a web from sticky silk. It spins the web to catch bugs to eat. When a bug lands, the spider feels it shake.', choices: ['Sticky Spider Silk', 'A Walk in the Park', 'How Spiders Catch Food'], a: 2 },
      { p: 'Long ago, people had no lights at night. Then the light bulb was made. Now we can flip a switch and light up a whole room.', choices: ['The Light Bulb Changed Nights', 'Flipping a Switch', 'A Big Green Frog'], a: 0 },
      { p: 'Apples grow on trees. In fall, they turn red or green and are ready to pick. People eat them fresh or bake them into pie.', choices: ['Red and Green', 'Apples Grow on Trees', 'A Rainy Night'], a: 1 }
    ],
    3: [
      { p: 'Octopuses are amazing sea animals with eight arms. They can change color to hide from danger. If an enemy comes close, they squirt dark ink and zoom away. Each arm can even taste what it touches.', choices: ['Squirting Ink', 'The Clever Octopus', 'My Beach Vacation'], a: 1 },
      { p: 'The Moon does not make its own light. It shines because sunlight bounces off it. As the Moon moves around Earth, we see different amounts of it lit up. That is why it seems to change shape each night.', choices: ['A Trip to the Beach', 'Sunlight on the Moon', 'Why the Moon Changes Shape'], a: 2 },
      { p: 'Thunderstorms can be loud and bright. First, we see a flash of lightning. A few seconds later, we hear the boom of thunder. The light reaches us faster than the sound.', choices: ['How Thunderstorms Work', 'The Sound of Thunder', 'Growing Tomatoes'], a: 0 },
      { p: 'The bicycle is a machine that helps people travel. You push the pedals with your feet to turn the wheels. Bikes do not need gas, so they are good for the Earth. Riding one is also great exercise.', choices: ['Pushing Pedals', 'Why Bikes Are Great', 'Feeding a Puppy'], a: 1 },
      { p: 'Honey starts as nectar inside flowers. Bees drink the nectar and carry it back to the hive. Inside the hive, they turn it into thick, sweet honey. Then they store it in little wax rooms.', choices: ['Wax Rooms', 'A Snowy Morning', 'How Bees Make Honey'], a: 2 },
      { p: 'Swimming is a sport and a useful skill. Swimmers move their arms and kick their legs to glide through water. It works almost every muscle in the body. Best of all, it helps keep people safe near water.', choices: ['Why Swimming Is Good', 'Kicking Your Legs', 'A Ride on the Bus'], a: 0 },
      { p: 'Camels are built for life in the hot desert. Their humps store fat, which gives them energy when food is hard to find. They can go for many days without drinking water. Long lashes keep sand out of their eyes.', choices: ['Long Eyelashes', 'A Cold Winter Day', 'How Camels Survive the Desert'], a: 2 },
      { p: 'Astronauts float when they are in space. There is very little gravity to hold them down. To eat, they use special bags so their food does not drift away. Even sleeping means strapping into a bag on the wall.', choices: ['Floating Food Bags', 'Life in Space', 'A Day at the Farm'], a: 1 }
    ],
    4: [
      { p: 'The printing press changed the world in a huge way. Before it was invented, every book had to be copied slowly by hand. The press could stamp ink onto page after page quickly. Suddenly books became cheaper, and far more people learned to read.', choices: ['How the Printing Press Changed the World', 'Copying Books by Hand', 'A Walk Through the Forest'], a: 0 },
      { p: 'Dolphins are highly intelligent ocean mammals. They talk to one another using clicks and whistles. To find food in dark water, they send out sounds and listen for the echoes. This clever trick is called echolocation.', choices: ['Clicks and Whistles', 'A Rainy Soccer Game', 'The Intelligent Dolphin'], a: 2 },
      { p: 'Tornadoes are among the most powerful storms on Earth. They form when warm, moist air meets cold, dry air. This clash can create a spinning funnel of wind that reaches all the way to the ground. The fastest tornado winds can lift cars into the air.', choices: ['Spinning Funnels of Wind', 'How Tornadoes Form', 'Baking Fresh Bread'], a: 1 },
      { p: 'Mars is often called the Red Planet. Its soil is full of iron, which rusts and turns a reddish color. Scientists study Mars because it may once have had rivers and lakes. Robots called rovers drive across it, taking photos and testing the ground.', choices: ['Exploring the Red Planet', 'Rusty Red Soil', 'A Trip to the Water Park'], a: 0 },
      { p: 'Chocolate comes from the seeds of the cacao tree. Farmers pick the pods, then dry and roast the seeds inside. The roasted seeds are ground into a rich paste. Finally, sugar and milk are added to make the candy we love.', choices: ['Roasting Cacao Seeds', 'A Snowy Mountain Hike', 'How Chocolate Is Made'], a: 2 },
      { p: 'Marathons are races that test both body and mind. A full marathon is over twenty-six miles long. Runners train for months to build the strength to finish. During the race, they must drink water often so they do not get too tired.', choices: ['Drinking Water While Running', 'What It Takes to Run a Marathon', 'Painting a Fence'], a: 1 },
      { p: 'The Arctic fox is a master of surviving the cold. In winter, its fur turns white to blend into the snow. Thick fur even covers the bottoms of its paws to keep them warm. When food is scarce, it will follow polar bears to eat their leftovers.', choices: ['How the Arctic Fox Survives', 'White Winter Fur', 'A Busy City Street'], a: 0 },
      { p: 'The telephone changed the way people talk to each other. Before it existed, a letter could take days or weeks to arrive. Alexander Graham Bell found a way to send voices through wires. For the first time, people far apart could speak in an instant.', choices: ['Sending Letters by Mail', 'A Quiet Camping Trip', 'How the Telephone Changed Talking'], a: 2 }
    ],
    5: [
      { p: 'Black holes are among the strangest objects in the universe. They form when a giant star collapses into an incredibly small, dense point. Their gravity is so strong that not even light can escape once it gets too close. Because no light comes out, we can only find them by watching how nearby stars behave.', choices: ['The Mystery of Black Holes', 'A Collapsing Star', 'Planning a Birthday Party'], a: 0 },
      { p: 'Honeybees live in colonies that work like one large team. Each bee has a specific job, from cleaning cells to guarding the entrance. Worker bees share the location of flowers by performing a special “waggle dance.” Through this teamwork, the whole hive stays fed and protected.', choices: ['The Waggle Dance', 'How a Bee Colony Works Together', 'A Trip to the Dentist'], a: 1 },
      { p: 'The Internet began as a small government project in the 1960s. Scientists wanted a way for computers to share information even if one machine failed. Over time, more and more networks connected together. Today, billions of people use this web of connections every single day.', choices: ['Computers That Fail', 'A Walk on the Beach', 'The Story of the Internet'], a: 2 },
      { p: 'Hurricanes are enormous storms that form over warm ocean water. As the warm, moist air rises, it creates an area of low pressure that pulls in even more air. The whole system begins to spin, growing stronger as it feeds on the ocean heat. When a hurricane finally reaches land, it can bring flooding rain and powerful winds.', choices: ['How Hurricanes Form and Grow', 'Warm Ocean Water', 'A Game of Chess'], a: 0 },
      { p: 'Refrigeration is one of the most important inventions in the history of food. Before iceboxes and fridges, people had to salt or dry their food to keep it from spoiling. A refrigerator slows the growth of the tiny germs that cause food to rot. Thanks to this cooling, we can store fresh food safely for many days.', choices: ['Salting and Drying Food', 'Why Refrigeration Matters', 'A Loud Thunderstorm'], a: 1 },
      { p: 'The ancient Olympic Games began in Greece almost three thousand years ago. Athletes competed in events like running, jumping, and wrestling to honor their gods. Winners received no money, only a simple crown made of olive leaves. Even so, an Olympic victory brought lasting fame to an athlete’s whole city.', choices: ['A Crown of Olive Leaves', 'My Favorite Board Game', 'The Ancient Olympic Games'], a: 2 },
      { p: 'The migration of the monarch butterfly is one of nature’s great wonders. Each fall, millions of these delicate insects fly thousands of miles to warmer forests. Amazingly, no single butterfly makes the whole round trip. It takes several generations to complete the long journey each year.', choices: ['The Amazing Monarch Migration', 'Butterflies Are Delicate', 'Fixing a Flat Tire'], a: 0 },
      { p: 'Astronauts on the space station experience sixteen sunrises every day. Because the station circles the entire Earth in about ninety minutes, the Sun appears to rise and set again and again. This constant change makes a normal sleep schedule difficult. To rest, astronauts cover the windows and follow clocks set to a single time zone.', choices: ['Sixteen Sunrises a Day', 'Life and Sleep on the Space Station', 'Cooking a Big Dinner'], a: 1 }
    ]
  },

  /* ---------- Fact or Opinion? ----------
     16 per grade: 8 facts + 8 opinions, shuffled with no run longer than 3.
     fact:true means it can be checked and proven; fact:false is an opinion
     (a judgment or taste claim). No borderline cases. */
  FACTOP: {
    2: [
      { t: 'Cows give us milk.', fact: true },
      { t: 'Puppies are the cutest animals.', fact: false },
      { t: 'A week has seven days.', fact: true },
      { t: 'Chocolate ice cream is the best.', fact: false },
      { t: 'Ice is frozen water.', fact: true },
      { t: 'Rainy days are boring.', fact: false },
      { t: 'The sun rises in the morning.', fact: true },
      { t: 'Fish live in water.', fact: true },
      { t: 'Everyone should like pizza.', fact: false },
      { t: 'Summer is better than winter.', fact: false },
      { t: 'Bees can sting.', fact: true },
      { t: 'Spiders are scary.', fact: false },
      { t: 'A triangle has three sides.', fact: true },
      { t: 'The color blue is the prettiest.', fact: false },
      { t: 'Snow is cold.', fact: true },
      { t: 'Recess is the most fun part of school.', fact: false }
    ],
    3: [
      { t: 'Water freezes at zero degrees Celsius.', fact: true },
      { t: 'Dogs are better pets than cats.', fact: false },
      { t: 'Winter is the worst season.', fact: false },
      { t: 'Spiders have eight legs.', fact: true },
      { t: 'The heart pumps blood through the body.', fact: true },
      { t: 'Pizza is the most delicious food.', fact: false },
      { t: 'Bats are the only mammals that can truly fly.', fact: true },
      { t: 'Math is the hardest subject.', fact: false },
      { t: 'Every kid should learn to swim.', fact: false },
      { t: 'A leap year has 366 days.', fact: true },
      { t: 'Plants make their own food using sunlight.', fact: true },
      { t: 'Roller coasters are too scary.', fact: false },
      { t: 'The Pacific is the largest ocean.', fact: true },
      { t: 'The beach is the best place to visit.', fact: false },
      { t: 'Country music is boring.', fact: false },
      { t: 'Honey is made by bees.', fact: true }
    ],
    4: [
      { t: 'Sound travels slower than light.', fact: true },
      { t: 'Science is the most interesting subject in school.', fact: false },
      { t: 'The Amazon is the largest rainforest on Earth.', fact: true },
      { t: 'Cats are lazy animals.', fact: false },
      { t: 'Autumn is the most beautiful season.', fact: false },
      { t: 'An adult human has 206 bones.', fact: true },
      { t: 'Sharks are fish, not mammals.', fact: true },
      { t: 'Homework should be banned.', fact: false },
      { t: 'Lightning is hotter than the surface of the Sun.', fact: true },
      { t: 'Vanilla is a boring flavor.', fact: false },
      { t: 'Everyone ought to visit the ocean at least once.', fact: false },
      { t: 'Water covers most of Earth’s surface.', fact: true },
      { t: 'The Great Wall of China is thousands of miles long.', fact: true },
      { t: 'Snakes make the best pets.', fact: false },
      { t: 'Long car trips are miserable.', fact: false },
      { t: 'Owls can turn their heads very far around.', fact: true }
    ],
    5: [
      { t: 'The human body is made mostly of water.', fact: true },
      { t: 'History is more important than any other subject.', fact: false },
      { t: 'Reading is more enjoyable than watching television.', fact: false },
      { t: 'Mount Everest is the highest mountain above sea level.', fact: true },
      { t: 'Skyscrapers are ugly.', fact: false },
      { t: 'Venus is the hottest planet in our solar system.', fact: true },
      { t: 'A group of lions is called a pride.', fact: true },
      { t: 'Sound cannot travel through empty space.', fact: true },
      { t: 'The government should make museums free for everyone.', fact: false },
      { t: 'Autumn leaves are the most beautiful sight in nature.', fact: false },
      { t: 'The Nile is one of the longest rivers in the world.', fact: true },
      { t: 'Broccoli tastes terrible.', fact: false },
      { t: 'Gold is a metal that does not rust.', fact: true },
      { t: 'Cities are far too crowded and noisy.', fact: false },
      { t: 'Classical music is the greatest kind of music.', fact: false },
      { t: 'Octopuses have three hearts.', fact: true }
    ]
  },

  /* ---------- Homophone Heroes ----------
     12 per grade. Exactly one ___ per sentence. options = the homophone
     set (2 or 3 words); a = index of the one word that fits the context.
     Easier sets in lower grades, richer sets by grade 5. */
  HOMOPHONES: {
    2: [
      { t: 'We went ___ the park.', options: ['to', 'too', 'two'], a: 0 },
      { t: 'I have ___ red apples.', options: ['to', 'too', 'two'], a: 2 },
      { t: 'Can I come ___?', options: ['to', 'too', 'two'], a: 1 },
      { t: 'Do you ___ my name?', options: ['no', 'know'], a: 1 },
      { t: 'There are ___ cookies left.', options: ['no', 'know'], a: 0 },
      { t: 'I want to ___ a new toy.', options: ['by', 'buy'], a: 1 },
      { t: 'The cat sat ___ the door.', options: ['by', 'buy'], a: 0 },
      { t: 'We swam in the ___.', options: ['see', 'sea'], a: 1 },
      { t: 'I can ___ the moon.', options: ['see', 'sea'], a: 0 },
      { t: 'Our team ___ the game!', options: ['one', 'won'], a: 1 },
      { t: 'I ate ___ apple.', options: ['one', 'won'], a: 0 },
      { t: 'Come ___ and sit down.', options: ['hear', 'here'], a: 1 }
    ],
    3: [
      { t: 'Turn ___ at the next corner.', options: ['right', 'write'], a: 0 },
      { t: 'I will ___ a letter to Grandma.', options: ['right', 'write'], a: 1 },
      { t: 'The chair is made of ___.', options: ['would', 'wood'], a: 1 },
      { t: 'I ___ love to go with you.', options: ['would', 'wood'], a: 0 },
      { t: '___ shoes are by the door.', options: ['Their', 'There', 'They’re'], a: 0 },
      { t: 'Please put the box over ___.', options: ['their', 'there', 'they’re'], a: 1 },
      { t: 'I think ___ going to win.', options: ['their', 'there', 'they’re'], a: 2 },
      { t: 'Is this ___ pencil?', options: ['your', 'you’re'], a: 0 },
      { t: 'I think ___ very kind.', options: ['your', 'you’re'], a: 1 },
      { t: 'A dog wagged ___ tail.', options: ['its', 'it’s'], a: 0 },
      { t: 'I think ___ going to rain.', options: ['its', 'it’s'], a: 1 },
      { t: 'A spider has ___ legs.', options: ['ate', 'eight'], a: 1 }
    ],
    4: [
      { t: 'We need one cup of ___ for the bread.', options: ['flour', 'flower'], a: 0 },
      { t: 'She picked a yellow ___ from the garden.', options: ['flour', 'flower'], a: 1 },
      { t: 'The dog chased its own ___.', options: ['tail', 'tale'], a: 0 },
      { t: 'Grandpa told us a spooky ___.', options: ['tail', 'tale'], a: 1 },
      { t: 'The ___ landed safely at the airport.', options: ['plain', 'plane'], a: 1 },
      { t: 'She wore a ___ white shirt.', options: ['plain', 'plane'], a: 0 },
      { t: 'I was so ___ during the long movie.', options: ['bored', 'board'], a: 0 },
      { t: 'He nailed the ___ to the fence.', options: ['bored', 'board'], a: 1 },
      { t: 'A brave ___ rode up to the castle.', options: ['knight', 'night'], a: 0 },
      { t: 'The stars come out at ___.', options: ['knight', 'night'], a: 1 },
      { t: 'Did you ___ that strange noise?', options: ['hear', 'here'], a: 0 },
      { t: 'There is a ___ in my sock.', options: ['whole', 'hole'], a: 1 }
    ],
    5: [
      { t: 'She ___ the ball across the yard.', options: ['threw', 'through'], a: 0 },
      { t: 'We walked ___ the dark tunnel.', options: ['threw', 'through'], a: 1 },
      { t: 'The ___ was stormy all weekend.', options: ['weather', 'whether'], a: 0 },
      { t: 'I cannot decide ___ to go or stay.', options: ['weather', 'whether'], a: 1 },
      { t: 'The ___ of our school gave a speech.', options: ['principal', 'principle'], a: 0 },
      { t: 'Honesty is an important ___ to live by.', options: ['principal', 'principle'], a: 1 },
      { t: 'She read the poem ___ to the class.', options: ['aloud', 'allowed'], a: 0 },
      { t: 'We are not ___ to run in the halls.', options: ['aloud', 'allowed'], a: 1 },
      { t: 'The runner ___ three other racers.', options: ['past', 'passed'], a: 1 },
      { t: 'We walked ___ the old library.', options: ['past', 'passed'], a: 0 },
      { t: 'May I have a ___ of cake?', options: ['piece', 'peace'], a: 0 },
      { t: 'The two sides finally made ___.', options: ['piece', 'peace'], a: 1 }
    ]
  },

  /* ---------- Deep Dive ----------
     Reading stamina, grades 3-5 only. 4 passages per grade, each ~90-130
     words at true grade level. Every passage has a 4-question quiz (3 emoji
     choices each, a varied): 2 recall, 1 why/sequence, 1 main-idea/inference.
     Every question is answerable from the passage alone. */
  DEEPDIVE: {
    3: [
      { title: 'The Ant Highway', e: '🐜',
        p: 'Ants are tiny, but together they build something amazing: a highway made of scent. When a worker ant finds food, it hurries back to the nest. As it walks, it dabs the ground with a special smell called a pheromone. Soon other ants follow the smell straight to the food, adding their own scent as they go. The busiest trail gets the strongest smell, so more and more ants join it. When the food is gone, the ants stop adding scent, and the trail slowly fades away. In this clever way, a whole colony can share a meal without ever speaking a word.',
        quiz: [
          { q: 'What does an ant leave on the ground to mark a trail?', choices: [ { t: 'a special smell', e: '👃' }, { t: 'a pile of leaves', e: '🍃' }, { t: 'tiny footprints', e: '👣' } ], a: 0 },
          { q: 'What is that special smell called?', choices: [ { t: 'nectar', e: '🍯' }, { t: 'a pheromone', e: '🐜' }, { t: 'honey', e: '🍯' } ], a: 1 },
          { q: 'Why does the busiest trail get the strongest smell?', choices: [ { t: 'because the sun heats it', e: '☀️' }, { t: 'because it rains there', e: '🌧️' }, { t: 'because more ants keep adding scent to it', e: '🐜' } ], a: 2 },
          { q: 'What is the main idea of this passage?', choices: [ { t: 'Ants work together using smell to find food', e: '🐜' }, { t: 'Ants are very tiny insects', e: '🔬' }, { t: 'Food disappears quickly outside', e: '🍽️' } ], a: 0 }
        ] },
      { title: 'Sleepless Sharks', e: '🦈',
        p: 'Most animals stop to sleep, but many sharks can never fully rest. Some kinds of sharks must keep swimming their whole lives. This is because they breathe by pushing water over their gills, and the water only moves when they swim forward. If such a shark stopped, it would not get enough oxygen. To survive, these sharks let one half of their brain rest while the other half keeps them gliding along. In this way, part of the shark sleeps while the rest keeps working. It is a strange and clever trick that keeps these ocean hunters alive both day and night.',
        quiz: [
          { q: 'How do these sharks get oxygen?', choices: [ { t: 'by pushing water over their gills', e: '🌊' }, { t: 'by breathing air at the surface', e: '💨' }, { t: 'by resting on the sea floor', e: '🪨' } ], a: 0 },
          { q: 'What would happen if this kind of shark stopped swimming?', choices: [ { t: 'it would fall asleep safely', e: '😴' }, { t: 'it would not get enough oxygen', e: '🫧' }, { t: 'it would swim even faster', e: '💨' } ], a: 1 },
          { q: 'How can these sharks rest and still keep swimming?', choices: [ { t: 'they float without moving', e: '🌊' }, { t: 'other fish push them along', e: '🐟' }, { t: 'only half of the brain rests at a time', e: '🧠' } ], a: 2 },
          { q: 'What is this passage mostly about?', choices: [ { t: 'why some sharks must keep swimming to live', e: '🦈' }, { t: 'what sharks like to eat', e: '🍽️' }, { t: 'how big sharks can grow', e: '📏' } ], a: 0 }
        ] },
      { title: 'The Lost Mitten', e: '🧤',
        p: 'On the coldest morning of winter, Maya lost one of her red mittens on the way to school. She looked in her backpack, under her desk, and even inside her boots, but it was gone. All day her right hand felt cold and lonely. After the last bell, Maya trudged home along the snowy path, staring at the ground. Near a fence post, she saw a splash of red. There sat her missing mitten, propped up on the wood where someone had found it. Best of all, a tiny snowbird had decided the warm mitten made the perfect little house.',
        quiz: [
          { q: 'What did Maya lose?', choices: [ { t: 'her red mitten', e: '🧤' }, { t: 'her backpack', e: '🎒' }, { t: 'her boots', e: '🥾' } ], a: 0 },
          { q: 'Where did she finally find it?', choices: [ { t: 'under her desk', e: '🪑' }, { t: 'on a fence post', e: '🪵' }, { t: 'inside her boot', e: '🥾' } ], a: 1 },
          { q: 'What did Maya do right after the last bell?', choices: [ { t: 'she walked home along the snowy path', e: '🚶' }, { t: 'she looked in her backpack', e: '🎒' }, { t: 'she played in the snow', e: '⛄' } ], a: 0 },
          { q: 'Why was the snowbird sitting in the mitten?', choices: [ { t: 'it was hungry', e: '🍞' }, { t: 'it was lost too', e: '🗺️' }, { t: 'the warm mitten made a cozy little house', e: '🐦' } ], a: 2 }
        ] },
      { title: 'Popcorn Pops', e: '🍿',
        p: 'Have you ever wondered why popcorn pops? Every popcorn kernel holds a tiny drop of water locked inside its hard shell. When the kernel gets very hot, that water turns into steam and tries to escape. The tough shell traps the steam, so pressure builds and builds. Finally the shell cannot hold on any longer, and the kernel bursts open with a loud pop. The soft, fluffy white part you eat is really the inside of the kernel turned inside out. Not every kernel has enough water to pop, which is why a few hard ones are always left at the bottom of the bowl.',
        quiz: [
          { q: 'What is trapped inside each popcorn kernel?', choices: [ { t: 'a drop of water', e: '💧' }, { t: 'a bit of butter', e: '🧈' }, { t: 'a grain of salt', e: '🧂' } ], a: 0 },
          { q: 'Why does the kernel finally burst open?', choices: [ { t: 'someone shakes the bowl', e: '🥣' }, { t: 'the steam builds up too much pressure', e: '💨' }, { t: 'the butter heats up', e: '🧈' } ], a: 1 },
          { q: 'What is the fluffy white part you eat?', choices: [ { t: 'the shell of the kernel', e: '🌰' }, { t: 'melted butter', e: '🧈' }, { t: 'the inside of the kernel', e: '🍿' } ], a: 2 },
          { q: 'Why are some hard kernels left at the bottom?', choices: [ { t: 'they did not have enough water to pop', e: '💧' }, { t: 'they were too salty', e: '🧂' }, { t: 'they were eaten first', e: '😋' } ], a: 0 }
        ] }
    ],
    4: [
      { title: 'The Glow of the Deep', e: '🐟',
        p: 'Far below the ocean surface, where sunlight never reaches, the water is pitch black and freezing cold. Yet even here, life finds a way to shine. Many deep-sea creatures make their own light through a chemical reaction inside their bodies, a trick scientists call bioluminescence. The anglerfish uses a glowing lure that dangles above its mouth like a tiny lantern. Curious smaller fish swim toward the light, hoping for a meal, only to become one themselves. Other animals flash light to confuse enemies or to signal a mate. In a world of endless darkness, the ability to glow can mean the difference between eating and being eaten.',
        quiz: [
          { q: 'What is the ability of animals to make their own light called?', choices: [ { t: 'bioluminescence', e: '🔦' }, { t: 'photosynthesis', e: '🌱' }, { t: 'hibernation', e: '😴' } ], a: 0 },
          { q: 'How does the anglerfish catch smaller fish?', choices: [ { t: 'it chases them at high speed', e: '💨' }, { t: 'it lures them with a glowing light', e: '💡' }, { t: 'it hides in the sand', e: '🏖️' } ], a: 1 },
          { q: 'Why do the smaller fish swim toward the anglerfish’s light?', choices: [ { t: 'they want to stay warm', e: '🔥' }, { t: 'they are following a friend', e: '🐟' }, { t: 'they are hoping to find a meal', e: '🍽️' } ], a: 2 },
          { q: 'What is the main idea of this passage?', choices: [ { t: 'the deep ocean is very cold', e: '🧊' }, { t: 'many deep-sea animals use light to survive', e: '🐟' }, { t: 'fish enjoy swimming in groups', e: '🐠' } ], a: 1 }
        ] },
      { title: 'The Pigeon Post', e: '🕊️',
        p: 'Long before phones or email, people needed a fast way to send urgent messages. One surprising solution had feathers: the homing pigeon. These birds have a remarkable sense of direction and can find their way back to their home loft from hundreds of miles away. A sender would tie a small, rolled-up note to a pigeon’s leg and release it into the sky. The bird would fly straight home, carrying the message far faster than a person on horseback. During wars, armies used pigeons to deliver secret plans across enemy lines. Some brave pigeons even kept flying after being injured, saving many lives with the notes they carried.',
        quiz: [
          { q: 'What special ability makes homing pigeons useful?', choices: [ { t: 'they can find their way home from far away', e: '🧭' }, { t: 'they can talk to people', e: '🗣️' }, { t: 'they can swim underwater', e: '🌊' } ], a: 0 },
          { q: 'How was a message sent with a pigeon?', choices: [ { t: 'it was painted on the bird’s wings', e: '🎨' }, { t: 'it was tied to the bird’s leg', e: '📜' }, { t: 'it was sung out loud', e: '🎵' } ], a: 1 },
          { q: 'Why did armies use pigeons during wars?', choices: [ { t: 'to carry secret messages across enemy lines', e: '✉️' }, { t: 'to scare away the enemy', e: '😱' }, { t: 'to search for food', e: '🌾' } ], a: 0 },
          { q: 'Why were some pigeons called brave?', choices: [ { t: 'they flew in bad weather', e: '🌧️' }, { t: 'they were very large', e: '📏' }, { t: 'they kept flying even after being hurt', e: '🕊️' } ], a: 2 }
        ] },
      { title: 'The Water Elevator', e: '🚤',
        p: 'How can a boat travel up a hill full of water? The answer is a clever invention called a lock, which works like an elevator for boats. A lock is a chamber with heavy gates at each end. When a boat enters, the gates close behind it, sealing the water inside. Then valves let water flow in or out, slowly raising or lowering the boat to a new level. Once the water matches the level ahead, the far gates open and the boat sails onward. Some rivers have a whole staircase of locks, lifting boats higher and higher, one calm step of water at a time.',
        quiz: [
          { q: 'What does a lock work like?', choices: [ { t: 'an elevator for boats', e: '🛗' }, { t: 'a giant bridge', e: '🌉' }, { t: 'a fishing net', e: '🥅' } ], a: 0 },
          { q: 'What happens right after a boat enters the lock?', choices: [ { t: 'the far gates open', e: '🚪' }, { t: 'the gates close behind it', e: '🔒' }, { t: 'the boat sinks', e: '⬇️' } ], a: 1 },
          { q: 'What raises or lowers the boat inside the lock?', choices: [ { t: 'strong ropes', e: '🪢' }, { t: 'the wind', e: '💨' }, { t: 'water flowing in or out', e: '💧' } ], a: 2 },
          { q: 'What is this passage mainly explaining?', choices: [ { t: 'how a lock moves boats between water levels', e: '🚤' }, { t: 'why boats are painted bright colors', e: '🎨' }, { t: 'where rivers begin', e: '⛰️' } ], a: 0 }
        ] },
      { title: 'The Clever Crow', e: '🐦',
        p: 'Crows may be the brainiest birds in the world. Scientists have watched them solve puzzles that would stump many other animals. In one famous test, a crow was given a narrow tube with a treat floating on water too low to reach. The clever bird dropped stones into the tube one by one. As the stones sank, the water rose, lifting the treat within reach. Crows also remember human faces for years, and they can even use tools, bending twigs into hooks to pull insects from holes. Some city crows have learned to drop hard nuts onto roads so that passing cars will crack them open.',
        quiz: [
          { q: 'What did the crow drop into the tube?', choices: [ { t: 'seeds', e: '🌰' }, { t: 'stones', e: '🪨' }, { t: 'feathers', e: '🪶' } ], a: 1 },
          { q: 'Why did dropping stones help the crow?', choices: [ { t: 'it scared other birds away', e: '🐦' }, { t: 'it made the water rise so the treat came closer', e: '💧' }, { t: 'it broke the tube', e: '💥' } ], a: 1 },
          { q: 'How do some city crows crack hard nuts?', choices: [ { t: 'they bang them on trees', e: '🌳' }, { t: 'they soak them in water', e: '💧' }, { t: 'they drop them onto roads for cars to crush', e: '🚗' } ], a: 2 },
          { q: 'What is the main idea of this passage?', choices: [ { t: 'crows are surprisingly intelligent', e: '🧠' }, { t: 'crows are black birds', e: '🐦' }, { t: 'crows build big nests', e: '🪺' } ], a: 0 }
        ] }
    ],
    5: [
      { title: 'The Language of Whales', e: '🐋',
        p: 'In the vast darkness of the deep ocean, sound travels much farther than sight, and whales have turned this fact into a language all their own. The humpback whale is famous for its haunting songs, long patterns of moans, cries, and whistles that can last for hours. Remarkably, all the males in a single region sing nearly the same song, and that shared song slowly changes over the seasons as new phrases spread from whale to whale. Even more astonishing is the blue whale, whose deep calls are so powerful that they can travel across an entire ocean. Scientists still do not understand every message, but they agree the sea is far from silent. Beneath the waves stretches a hidden network of voices, carrying meaning through miles of water.',
        quiz: [
          { q: 'Why does sound travel farther than sight in the deep ocean?', choices: [ { t: 'the water is dark, but sound moves well through it', e: '🔊' }, { t: 'the ocean is very warm', e: '🌡️' }, { t: 'there are no other animals', e: '🐟' } ], a: 0 },
          { q: 'What is the humpback whale famous for?', choices: [ { t: 'its enormous teeth', e: '🦷' }, { t: 'its long, haunting songs', e: '🎵' }, { t: 'its bright colors', e: '🌈' } ], a: 1 },
          { q: 'How does a region’s whale song change over time?', choices: [ { t: 'it stays exactly the same forever', e: '🔁' }, { t: 'each whale sings a totally different tune', e: '🎶' }, { t: 'new phrases spread from whale to whale', e: '🐋' } ], a: 2 },
          { q: 'What is the main idea of this passage?', choices: [ { t: 'whales use sound to communicate across great distances', e: '🐋' }, { t: 'the ocean is completely silent', e: '🤫' }, { t: 'blue whales are the largest animals', e: '📏' } ], a: 0 }
        ] },
      { title: 'How Mountains Are Born', e: '⛰️',
        p: 'The tallest mountains on Earth were not always there, and they did not appear overnight. The planet’s hard outer shell is broken into enormous slabs of rock called tectonic plates, which drift slowly on the hot, soft layer beneath them. Although they move no faster than your fingernails grow, over millions of years these plates collide with tremendous force. When two plates push against each other, the rock at the boundary has nowhere to go but up, buckling and folding into towering peaks. The mighty Himalayas, home to Mount Everest, formed this way when one plate crashed into another and never stopped pushing. Even today those mountains creep a little higher each year, proof that the ground beneath our feet is always, quietly, on the move.',
        quiz: [
          { q: 'What are the giant slabs of rock called?', choices: [ { t: 'tectonic plates', e: '🪨' }, { t: 'ocean waves', e: '🌊' }, { t: 'sand dunes', e: '🏜️' } ], a: 0 },
          { q: 'How fast do the plates move?', choices: [ { t: 'faster than a race car', e: '🏎️' }, { t: 'about as fast as fingernails grow', e: '💅' }, { t: 'at the speed of sound', e: '💨' } ], a: 1 },
          { q: 'Why do mountains rise where two plates meet?', choices: [ { t: 'the wind piles up the rock', e: '💨' }, { t: 'rain washes soil into a heap', e: '🌧️' }, { t: 'the rock is pushed up with nowhere else to go', e: '⛰️' } ], a: 2 },
          { q: 'What is this passage mostly about?', choices: [ { t: 'how moving plates build mountains over time', e: '⛰️' }, { t: 'how tall Mount Everest is', e: '📏' }, { t: 'why it rains in the mountains', e: '🌧️' } ], a: 0 }
        ] },
      { title: 'The Lighthouse Keeper’s Last Night', e: '💡',
        p: 'For forty-two years, Elias had climbed the spiral stairs of the lighthouse every evening to light the great lamp. Tonight would be his last, for in the morning a machine would take over his work forever. The sea did not know this, of course. It heaved and crashed against the rocks the way it always had, uncaring about the old man’s feelings. As Elias reached the top, a distant ship’s horn moaned through the fog, and he lit the lamp one final time. The beam swept across the black water, steady and sure, guiding sailors he would never meet toward a harbor they had never seen. He realized then that he had spent his life speaking to strangers in a language made only of light. Smiling, he began the long walk down.',
        quiz: [
          { q: 'How long had Elias worked at the lighthouse?', choices: [ { t: 'forty-two years', e: '📅' }, { t: 'a single summer', e: '☀️' }, { t: 'one hundred years', e: '💯' } ], a: 0 },
          { q: 'What would replace Elias in the morning?', choices: [ { t: 'a younger keeper', e: '🧑' }, { t: 'a machine', e: '⚙️' }, { t: 'a brand-new lamp only', e: '💡' } ], a: 1 },
          { q: 'What did Elias do just after he reached the top?', choices: [ { t: 'he walked back down', e: '🪜' }, { t: 'he fell asleep', e: '😴' }, { t: 'he lit the lamp one final time', e: '💡' } ], a: 2 },
          { q: 'What did Elias mean by “a language made only of light”?', choices: [ { t: 'the lighthouse beam guided sailors he never met', e: '🌟' }, { t: 'he could read books in the dark', e: '📖' }, { t: 'he sang songs to the sea', e: '🎵' } ], a: 0 }
        ] },
      { title: 'The Vault of Frozen Seeds', e: '🌱',
        p: 'On a remote, frozen island near the North Pole stands one of the most important buildings you have never heard of. Deep inside a mountain of ice and rock lies a vault built to protect the future of food. This seed bank stores millions of seeds from nearly every crop on Earth. The idea is simple but powerful: if a disaster, war, or disease ever wiped out a certain plant, scientists could return here and bring it back from the saved seeds. The freezing Arctic cold keeps the seeds alive for hundreds of years, and thick walls guard them even if the machines fail. In a way, the vault is a promise from today’s world to the people of tomorrow, saying that no matter what happens, the harvest will not be lost.',
        quiz: [
          { q: 'What does the vault store?', choices: [ { t: 'gold and jewels', e: '💎' }, { t: 'seeds from crops around the world', e: '🌱' }, { t: 'ancient books', e: '📚' } ], a: 1 },
          { q: 'What keeps the seeds alive for so long?', choices: [ { t: 'the freezing Arctic cold', e: '❄️' }, { t: 'bright sunlight', e: '☀️' }, { t: 'warm ocean air', e: '🌊' } ], a: 0 },
          { q: 'Why might scientists need the seeds in the vault?', choices: [ { t: 'to sell them for money', e: '💵' }, { t: 'to plant a garden just for fun', e: '🌷' }, { t: 'to bring back a plant wiped out by disaster', e: '🌱' } ], a: 2 },
          { q: 'What is the main idea of this passage?', choices: [ { t: 'a frozen vault protects the world’s food for the future', e: '🌍' }, { t: 'the North Pole is very cold', e: '🧊' }, { t: 'seeds are small and round', e: '🌰' } ], a: 0 }
        ] }
    ]
  },

  PRAISE: ['Great job', 'You did it', 'Awesome reading', 'Super star', 'Way to go', 'Out of this world', 'Fantastic'],

  TIPS: [
    'Ask your reader to say each sound out loud — then squish the sounds together!',
    'Wrong answers are okay! Trying again is how brains grow.',
    'Five minutes a day beats one big session a week.',
    'After a round, ask: which word was the trickiest?',
    'In Speed Reader, listen along and celebrate the finish — high fives count double.',
    'Let your reader be the teacher: have them quiz YOU on letter sounds.'
  ],

  GRADE_LABEL: { K: 'Kindergarten', 1: '1st Grade', 2: '2nd Grade', 3: '3rd Grade', 4: '4th Grade', 5: '5th Grade' },

  /* ---------- Adventure: shop catalog ----------
     slot: skin (looks), weapon (+attack), armor (+hearts), pet (+% coins). */
  SHOP: [
    { id: 'skin-hero',   slot: 'skin', e: '🦸', name: 'Super Reader',  power: 0, price: 100,  blurb: 'Faster than a flying word!' },
    { id: 'skin-ninja',  slot: 'skin', e: '🥷', name: 'Word Ninja',    power: 0, price: 150,  blurb: 'Silent. Sneaky. Super reader.' },
    { id: 'skin-wizard', slot: 'skin', e: '🧙', name: 'Spell Wizard',  power: 0, price: 200,  blurb: 'Spells words AND spells!' },
    { id: 'skin-dino',   slot: 'skin', e: '🦖', name: 'Dino Reader',   power: 0, price: 250,  blurb: 'RAWR means READ!' },
    { id: 'skin-alien',  slot: 'skin', e: '👽', name: 'Space Reader',  power: 0, price: 300,  blurb: 'Reads in zero gravity.' },
    { id: 'skin-royal',  slot: 'skin', e: '👑', name: 'Royal Reader',  power: 0, price: 400,  blurb: 'Rules the Reading Realm.' },

    { id: 'wpn-stick',   slot: 'weapon', e: '🪵', name: 'Training Stick', power: 2,  price: 40,  blurb: 'Bonks tricky words.' },
    { id: 'wpn-sword',   slot: 'weapon', e: '🗡️', name: 'Word Sword',     power: 4,  price: 80,  blurb: 'Slices syllables in two.' },
    { id: 'wpn-bow',     slot: 'weapon', e: '🏹', name: 'Letter Bow',     power: 6,  price: 150, blurb: 'Shoots silent letters.' },
    { id: 'wpn-wand',    slot: 'weapon', e: '🪄', name: 'Magic Wand',     power: 8,  price: 250, blurb: 'Turns sounds into stars.' },
    { id: 'wpn-blades',  slot: 'weapon', e: '⚔️', name: 'Hero Blades',    power: 10, price: 400, blurb: 'Double trouble for bosses.' },
    { id: 'wpn-trident', slot: 'weapon', e: '🔱', name: 'Storm Trident',  power: 12, price: 600, blurb: 'Makes waves of words.' },
    { id: 'wpn-staff',   slot: 'weapon', e: '⚡', name: 'Thunder Staff',  power: 15, price: 900, blurb: 'The loudest read-aloud ever.' },

    { id: 'arm-shield',  slot: 'armor', e: '🛡️', name: 'Wood Shield',   power: 1, price: 75,  blurb: 'Blocks one boss bop.' },
    { id: 'arm-vest',    slot: 'armor', e: '🦺', name: 'Power Vest',    power: 2, price: 250, blurb: 'Extra tough, extra bright.' },
    { id: 'arm-helm',    slot: 'armor', e: '🪖', name: 'Knight Helm',   power: 3, price: 500, blurb: 'Keeps your thinker safe.' },
    { id: 'arm-scales',  slot: 'armor', e: '🐲', name: 'Dragon Scales', power: 4, price: 800, blurb: 'Shiny, scaly, unstoppable.' },

    { id: 'pet-pup',     slot: 'pet', e: '🐶', name: 'Coin Pup',      power: 10, price: 120,  blurb: 'Digs up bonus coins!' },
    { id: 'pet-owl',     slot: 'pet', e: '🦉', name: 'Wise Owl',      power: 20, price: 300,  blurb: 'Hoots when coins appear.' },
    { id: 'pet-dragon',  slot: 'pet', e: '🐉', name: 'Lucky Dragon',  power: 30, price: 700,  blurb: 'Breathes coin-fire.' },
    { id: 'pet-unicorn', slot: 'pet', e: '🦄', name: 'Star Unicorn',  power: 50, price: 1200, blurb: 'Pure magic. Pure coins.' },

    /* Legendary items — bought with gems 💎 (earned from 3-star rounds & first boss wins). */
    { id: 'skin-genie',   slot: 'skin',   e: '🧞', name: 'Genie Reader',   power: 0,  gems: 8,  blurb: 'Three wishes? All books.' },
    { id: 'skin-phoenix', slot: 'skin',   e: '🐦‍🔥', name: 'Phoenix Reader', power: 0,  gems: 12, blurb: 'Rises from every tricky word.' },
    { id: 'wpn-comet',    slot: 'weapon', e: '☄️', name: 'Comet Hammer',   power: 18, gems: 10, blurb: 'Smashes words from space.' },
    { id: 'wpn-rainbow',  slot: 'weapon', e: '🌈', name: 'Rainbow Blade',  power: 20, gems: 15, blurb: 'Every color of awesome.' },
    { id: 'arm-star',     slot: 'armor',  e: '🌟', name: 'Star Armor',     power: 5,  gems: 12, blurb: 'Forged from real starlight.' },
    { id: 'pet-wings',    slot: 'pet',    e: '🪽', name: 'Coin Wings',     power: 75, gems: 18, blurb: 'Coins fly right to you.' }
  ],

  /* ---------- Adventure: stages & bosses ----------
     wins = training rounds to wake the boss. colors tint the stage. */
  STAGES: [
    { name: 'Sunny Meadow',     e: '🌻', wins: 2, colors: ['#fef3c7', '#bbf7d0'],
      boss: { name: 'Grump the Goblin', e: '👺', hp: 30,  reward: 60,
              taunt: 'I am Grump! Read if you dare!',
              move: { name: 'Coin Grab!', e: '🪙', type: 'steal', line: 'Gimme your shiny coins, hee hee!' } } },
    { name: 'Whispering Woods', e: '🌲', wins: 3, colors: ['#d1fae5', '#86efac'],
      boss: { name: 'Shadow Wolf', e: '🐺', hp: 45,  reward: 90,
              taunt: 'Awooo! No one reads in MY woods!',
              move: { name: 'Shadow Howl!', e: '🌑', type: 'block', line: 'Awoooo! My howl bounces your next hit!' } } },
    { name: 'Crystal Caves',    e: '💎', wins: 3, colors: ['#e0e7ff', '#a5b4fc'],
      boss: { name: 'Rocky the Troll', e: '🧌', hp: 60,  reward: 120,
              taunt: 'Me Rocky! Me eat books!',
              move: { name: 'Book Munch!', e: '📖', type: 'heal', line: 'Chomp chomp! Books make Rocky strong!' } } },
    { name: 'Lava Mountain',    e: '🌋', wins: 4, colors: ['#ffedd5', '#fca5a5'],
      boss: { name: 'Magma Dragon', e: '🐉', hp: 85,  reward: 160,
              taunt: 'My fire melts words! Sssss!',
              move: { name: 'Lava Lick!', e: '🌋', type: 'heal', line: 'Slurp! Warm lava heals my shiny scales!' } } },
    { name: 'Storm Castle',     e: '🏰', wins: 4, colors: ['#e2e8f0', '#a5f3fc'],
      boss: { name: 'Thunder King', e: '🤴', hp: 110, reward: 200,
              taunt: 'BOOM! I am the king of loud!',
              move: { name: 'Thunder Guard!', e: '⚡', type: 'block', line: 'ZAP! My thunder wall blocks your next swing!' } } },
    { name: 'Robo City',        e: '🏙️', wins: 5, colors: ['#cffafe', '#67e8f9'],
      boss: { name: 'Mega Bot', e: '🤖', hp: 130, reward: 240,
              taunt: 'BEEP BOOP. READING NOT COMPUTED.',
              move: { name: 'Magnet Beam!', e: '🧲', type: 'steal', line: 'BEEP BOOP! Your coins stick right to me!' } } },
    { name: 'Moon Base',        e: '🌙', wins: 5, colors: ['#e2e8f0', '#cbd5e1'],
      boss: { name: 'Moon Beast', e: '👾', hp: 150, reward: 280,
              taunt: 'Zorp! Your words cannot reach space!',
              move: { name: 'Moon Munch!', e: '🌙', type: 'heal', line: 'Nom nom! Moon rocks patch me right up!' } } },
    { name: 'Star Galaxy',      e: '🌌', wins: 6, colors: ['#ede9fe', '#c4b5fd'],
      boss: { name: 'Star Titan', e: '👹', hp: 175, reward: 350,
              taunt: 'I have never lost to a reader. Ever.',
              move: { name: 'Star Feast!', e: '⭐', type: 'heal', line: 'I gulp down starlight to grow mighty!' } } },
    { name: 'Rainbow Rift',     e: '🌈', wins: 6, colors: ['#fce7f3', '#fbcfe8'],
      boss: { name: 'Prism Phantom', e: '👻', hp: 210, reward: 420,
              taunt: 'Boo! Your words fade in my fog!',
              move: { name: 'Fog Swipe!', e: '🌫️', type: 'steal', line: 'Boo! My spooky fog swipes your coins away!' } } },
    { name: 'Cosmic Core',      e: '🌠', wins: 7, colors: ['#e0e7ff', '#818cf8'],
      boss: { name: 'The Final Word', e: '🛸', hp: 260, reward: 550,
              taunt: 'I am the last boss. No reader passes me!',
              move: { name: 'Force Field!', e: '🔵', type: 'block', line: 'My force field bounces your best attack!' } } }
  ],

  HERO_BASE_ATTACK: 10,
  HERO_BASE_HEARTS: 3,

  /* ---------- Difficulty tiers ----------
     Auto-adapts from a kid's rolling accuracy, or a grown-up locks one.
     hp/hearts/timer/choices reshape boss battles; hard = near-miss
     distractors; reward multiplies coins/gems/XP (nobody is penalized —
     harder just pays more). */
  DIFF: {
    chill:     { label: 'Chill',     e: '🐢', hp: 0.8, hearts: 1,  timer: 0,  hard: false, choices: 3, reward: 1.0, order: 0 },
    normal:    { label: 'Normal',    e: '😎', hp: 1.0, hearts: 0,  timer: 0,  hard: false, choices: 3, reward: 1.0, order: 1 },
    challenge: { label: 'Challenge', e: '⚡', hp: 1.5, hearts: 0,  timer: 10, hard: true,  choices: 4, reward: 1.3, order: 2 },
    expert:    { label: 'Expert',    e: '🔥', hp: 2.0, hearts: -1, timer: 7,  hard: true,  choices: 4, reward: 1.6, order: 3 }
  },
  DIFF_ORDER: ['chill', 'normal', 'challenge', 'expert'],

  /* Letters/sounds kids commonly confuse — used to build mean distractors
     at Challenge/Expert so recognition stops being automatic. */
  CONFUSE: [
    ['b', 'd', 'p', 'q'], ['m', 'n'], ['f', 'v'], ['i', 'j', 'l'],
    ['u', 'v', 'w'], ['c', 'k'], ['g', 'j'], ['s', 'z'], ['a', 'e', 'o'],
    ['sh', 'ch'], ['th', 'wh'], ['ck', 'k'], ['ll', 'l']
  ],

  /* ---------- Weekly events ----------
     One event per week, picked deterministically from the week key —
     no server needed, both kids see the same event. Multipliers are
     small and capped where they're applied. */
  EVENTS: [
    { id: 'coinrain',    e: '🪙', name: 'Coin Rain',    blurb: 'All training rounds pay +25% coins!', coinMul: 1.25 },
    { id: 'doublegems',  e: '💎', name: 'Gem Storm',    blurb: 'Boss victories pay DOUBLE gems!',     bossGemMul: 2 },
    { id: 'stickerfest', e: '📔', name: 'Sticker Fest', blurb: 'Every single round wins a sticker!',  stickerAll: true },
    { id: 'bossrush',    e: '⚔️', name: 'Boss Rush',    blurb: 'Boss victories pay +50% coins!',      bossCoinMul: 1.5 }
  ],

  /* ---------- Story campaign ----------
     "Milo and the Lost Star" — one continuing story, unlocked episode by
     episode. unlock.rounds = total training rounds played (any game);
     every episode also needs the one before it to be read.
     Written at ~2nd-grade level so a K graduate grows into it and a
     3rd-grader still enjoys it. cliff = the cliffhanger teaser. */
  CAMPAIGN: [
    { id: 'ep1', title: 'The Falling Star', cover: '🌠', unlock: { rounds: 0 },
      cliff: 'Why is the little star blinking? Find out in Episode 2!',
      pages: [
        { t: 'One night, Milo could not sleep. He looked out his window at the dark sky.', a: '🌃🪟' },
        { t: 'A tiny light fell from the sky. It landed in his yard with a soft POP.', a: '🌠' },
        { t: 'Milo ran outside in his pajamas. The grass glowed gold.', a: '🏃✨' },
        { t: 'In the middle of the glow sat a little star. It was shaking.', a: '⭐' },
        { t: '“Do not be scared,” said Milo. “I am Milo. What is your name?”', a: '🧒⭐' },
        { t: 'The star made a sound like a tiny bell. “Twink,” it said. Then it began to blink, fast.', a: '⭐💫' }
      ], quiz: [
        { q: 'What fell into Milo’s yard?', choices: [ { t: 'a little star', e: '⭐' }, { t: 'a big rock', e: '🪨' }, { t: 'a bird', e: '🐦' } ], a: 0 },
        { q: 'What is the star’s name?', choices: [ { t: 'Milo', e: '🧒' }, { t: 'Twink', e: '⭐' }, { t: 'Bolt', e: '🤖' } ], a: 1 }
      ]},
    { id: 'ep2', title: 'The Star Map', cover: '🗺️', unlock: { rounds: 3 },
      cliff: 'What is inside the old shed? Episode 3 will tell!',
      pages: [
        { t: 'Twink blinked and blinked. Then a picture of light grew in the air!', a: '⭐🗺️' },
        { t: 'It was a map. It showed the moon, and behind it, a river of stars.', a: '🌙🌌' },
        { t: '“Is that your home?” asked Milo. Twink glowed bright. That meant yes.', a: '⭐😊' },
        { t: '“But how will you get there? Stars fall down. They do not fall up!”', a: '🧒❓' },
        { t: 'Twink flew to the old shed at the end of the yard. It tapped the door three times.', a: '🏚️⭐' },
        { t: 'The rusty old door creaked… and opened all by itself.', a: '🚪✨' }
      ], quiz: [
        { q: 'What did the picture of light show?', choices: [ { t: 'a song', e: '🎵' }, { t: 'a face', e: '🙂' }, { t: 'a map', e: '🗺️' } ], a: 2 },
        { q: 'Where did Twink fly?', choices: [ { t: 'to the pond', e: '🏞️' }, { t: 'to the old shed', e: '🏚️' }, { t: 'to the moon', e: '🌙' } ], a: 1 }
      ]},
    { id: 'ep3', title: 'The Shed Secret', cover: '🚀', unlock: { rounds: 8 },
      cliff: 'Where will they find rocket fuel? See Episode 4!',
      pages: [
        { t: 'Inside the shed, under a dusty sheet, was a small silver rocket.', a: '🚀' },
        { t: '“Grandpa built this!” said Milo. “He said it flew to the moon, long ago.”', a: '👴🌙' },
        { t: 'Something beeped in the corner. A little robot rolled out of a box.', a: '🤖' },
        { t: '“I am Bolt,” said the robot. “Co-pilot of this ship. I have been asleep for forty years.”', a: '🤖💤' },
        { t: 'Bolt saw Twink and bowed. “A star! We must take it home at once!”', a: '🤖⭐' },
        { t: 'Then Bolt’s eyes turned red. “WARNING,” he said. “Fuel: empty.”', a: '🤖🔴' }
      ], quiz: [
        { q: 'What was hidden in the shed?', choices: [ { t: 'a boat', e: '⛵' }, { t: 'a silver rocket', e: '🚀' }, { t: 'a red car', e: '🚗' } ], a: 1 },
        { q: 'What is the robot’s name?', choices: [ { t: 'Milo', e: '🧒' }, { t: 'Twink', e: '⭐' }, { t: 'Bolt', e: '🤖' } ], a: 2 }
      ]},
    { id: 'ep4', title: 'Moon-Flower Fuel', cover: '🌻', unlock: { rounds: 14 },
      cliff: 'What is that shadow on the moon? Episode 5 knows…',
      pages: [
        { t: '“This rocket burns starlight,” said Bolt. “And starlight grows in moon-flowers.”', a: '🤖🌼' },
        { t: 'Moon-flowers only open at midnight, by the pond, when the moon is round.', a: '🌕🌼' },
        { t: 'Milo, Bolt, and Twink waited by the pond. At midnight, the flowers opened like tiny lamps.', a: '🌼✨' },
        { t: 'They filled a jar with glowing petals. The rocket tank drank them up. RUMBLE!', a: '🫙✨' },
        { t: '“All aboard!” said Bolt. Milo buckled in. Twink sat on his shoulder.', a: '🚀🧒' },
        { t: 'The rocket lifted off! But far above, a long dark shadow slid across the moon…', a: '🚀🌑' }
      ], quiz: [
        { q: 'What does the rocket burn for fuel?', choices: [ { t: 'starlight', e: '🌟' }, { t: 'wood', e: '🪵' }, { t: 'coal', e: '⚫' } ], a: 0 },
        { q: 'Where did they find the moon-flowers?', choices: [ { t: 'in the shed', e: '🏚️' }, { t: 'on a hill', e: '⛰️' }, { t: 'by the pond', e: '🌼' } ], a: 2 }
      ]},
    { id: 'ep5', title: 'The Shadow Ship', cover: '🛸', unlock: { rounds: 21 },
      cliff: 'Caught by the beam! Can they escape in Episode 6?',
      pages: [
        { t: 'Space was quiet and full of stars. Twink pointed the way with a beam of light.', a: '🌌⭐' },
        { t: 'Then the stars behind them went dark, one by one. Something big was following.', a: '🌑' },
        { t: '“That is the Star Catcher,” said Bolt. “He bottles stars and keeps them for himself.”', a: '🛸😠' },
        { t: 'The gray ship had a hundred windows. In every window sat a jar with a sad star inside.', a: '🫙⭐' },
        { t: '“Faster, Bolt!” cried Milo. The little rocket zoomed and dipped and spun.', a: '🚀💨' },
        { t: 'But a beam of green light locked on. The rocket froze in the sky like a fly in honey.', a: '🟢🚀' }
      ], quiz: [
        { q: 'Who was following the rocket?', choices: [ { t: 'the Star Catcher', e: '🛸' }, { t: 'Twink’s mom', e: '🌟' }, { t: 'a comet', e: '☄️' } ], a: 0 },
        { q: 'What color beam caught the rocket?', choices: [ { t: 'red', e: '🔴' }, { t: 'green', e: '🟢' }, { t: 'blue', e: '🔵' } ], a: 1 }
      ]},
    { id: 'ep6', title: 'Inside the Catcher', cover: '🫙', unlock: { rounds: 29 },
      cliff: 'The alarm is ringing! Run for it in Episode 7!',
      pages: [
        { t: 'The beam pulled them into a huge dark room full of shelves. Jars and jars of stars.', a: '🫙🫙' },
        { t: 'A guard robot blocked the door. “PASSWORD?” it buzzed.', a: '🤖🚫' },
        { t: 'Bolt whispered, “The password book fell out of its pocket! But I cannot read cursive!”', a: '📖' },
        { t: 'Milo picked up the book. He sounded it out, slow and brave: “MOON… BEAM… PIE.”', a: '🧒📖' },
        { t: '“CORRECT,” said the guard, and it fell asleep, just like that.', a: '🤖💤' },
        { t: 'Milo turned the great silver wheel that opened every jar. Then the alarm began to ring!', a: '🚨' }
      ], quiz: [
        { q: 'What did the guard robot want?', choices: [ { t: 'a ticket', e: '🎫' }, { t: 'a password', e: '🔑' }, { t: 'a coin', e: '🪙' } ], a: 1 },
        { q: 'Who read the password out loud?', choices: [ { t: 'Milo', e: '🧒' }, { t: 'Bolt', e: '🤖' }, { t: 'Twink', e: '⭐' } ], a: 0 }
      ]},
    { id: 'ep7', title: 'The Great Escape', cover: '💫', unlock: { rounds: 38 },
      cliff: 'Twink is almost home… the last episode awaits!',
      pages: [
        { t: 'A thousand stars burst from their jars like fireflies from a barn.', a: '✨✨' },
        { t: 'They spun around Milo, warm and bright, and lifted the little rocket up.', a: '🚀✨' },
        { t: 'The Star Catcher howled. But without stolen starlight, his ship went dark.', a: '🛸⬛' },
        { t: 'It drifted away into the black, cold and quiet, like an old empty bottle.', a: '🌑' },
        { t: 'The free stars raced home across the sky, painting it with light.', a: '🌌💫' },
        { t: 'Milo cheered. But Twink tugged his sleeve. Twink was not home. Not yet.', a: '⭐🧒' }
      ], quiz: [
        { q: 'What happened to the stars in the jars?', choices: [ { t: 'they burst free', e: '✨' }, { t: 'they broke', e: '💥' }, { t: 'they hid', e: '🙈' } ], a: 0 },
        { q: 'What happened to the Star Catcher’s ship?', choices: [ { t: 'it flew home', e: '🏠' }, { t: 'it went dark and drifted away', e: '🛸' }, { t: 'it blew up', e: '💥' } ], a: 1 }
      ]},
    { id: 'ep8', title: 'Home at Last', cover: '🌟', unlock: { rounds: 48 },
      cliff: 'The End… or is it? Keep reading, Star Reader! ⭐',
      pages: [
        { t: 'Behind the moon flowed the river of stars, just like the map had shown.', a: '🌙🌌' },
        { t: 'Two big stars rushed to meet them. Twink’s mother and father!', a: '🌟🌟' },
        { t: 'The whole sky rang like a thousand tiny bells. That is how stars laugh.', a: '🔔✨' },
        { t: 'Twink gave Milo a gift: a tiny bell made of starlight. “So you can find me.”', a: '🔔🧒' },
        { t: '“Any time you read under the night sky,” said Twink, “I will be listening.”', a: '⭐📖' },
        { t: 'Milo flew home and slept till noon. On his desk, the little bell glowed. The end!', a: '🛏️🔔' }
      ], quiz: [
        { q: 'Who came to meet Twink?', choices: [ { t: 'Twink’s mother and father', e: '🌟' }, { t: 'the Star Catcher', e: '🛸' }, { t: 'a spaceship', e: '🚀' } ], a: 0 },
        { q: 'What did Twink give Milo?', choices: [ { t: 'a gold coin', e: '🪙' }, { t: 'a tiny bell', e: '🔔' }, { t: 'a map', e: '🗺️' } ], a: 1 }
      ]},

    /* ===== Season 2 — "Milo and the Star Bell" ===== */
    { id: 'ep9', title: 'The Bell Rings', season: 2, cover: '🔔', unlock: { rounds: 60 },
      cliff: 'Why was the bright star river turning gray? The next chapter knows…',
      pages: [
        { t: 'Autumn came, and the nights grew long and cool. Milo kept the little star bell safe on his desk.', a: '🍂🔔' },
        { t: 'One windy night, the bell rang all by itself. Its ring was faint and sad, not merry like before.', a: '🔔💨' },
        { t: 'Milo knew that sound meant one thing. Somewhere far away, Twink needed a friend.', a: '🧒🔔' },
        { t: 'He raced to the old shed and woke Bolt. “The star river is calling,” Milo said. “We have to fly.”', a: '🤖🚀' },
        { t: 'They poured the last jar of moon-flower petals into the tank. The rocket rumbled to life.', a: '🫙✨' },
        { t: 'Up they soared, past the clouds and the moon. But the river of stars ahead looked dim and gray.', a: '🚀🌫️' }
      ], quiz: [
        { q: 'What woke Milo on the windy night?', choices: [ { t: 'the star bell rang', e: '🔔' }, { t: 'a loud storm', e: '⛈️' }, { t: 'Bolt beeped', e: '🤖' } ], a: 0 },
        { q: 'What did they use to fuel the rocket?', choices: [ { t: 'coal', e: '⚫' }, { t: 'moon-flower petals', e: '🌼' }, { t: 'water', e: '💧' } ], a: 1 }
      ]},
    { id: 'ep10', title: 'The Quiet River', season: 2, cover: '🌌', unlock: { rounds: 75 },
      cliff: 'What was the shadow, and where did it take the songs?',
      pages: [
        { t: 'The rocket slowed beside the great star river. Twink flew out to meet them, glowing dim.', a: '⭐🌌' },
        { t: '“I am so glad you came,” Twink chimed. “Something is wrong. The stars have lost their song.”', a: '⭐😟' },
        { t: 'Long ago the whole river rang like bells. Now it was hushed and still, quiet as deep snow.', a: '🤫🌌' },
        { t: '“A star with no song grows cold,” Twink said. “And a cold star cannot shine for long.”', a: '⭐❄️' },
        { t: 'Milo touched a gray star. It felt like ice. It still glowed, but it made no sound at all.', a: '🧊⭐' },
        { t: '“A shadow drifts through the river at night,” said Twink. “When it leaves, the songs are gone.”', a: '🌑🌌' }
      ], quiz: [
        { q: 'What did the stars lose?', choices: [ { t: 'their light', e: '💡' }, { t: 'their song', e: '🎵' }, { t: 'their names', e: '🏷️' } ], a: 1 },
        { q: 'What happens to a star with no song?', choices: [ { t: 'it grows cold', e: '❄️' }, { t: 'it gets bigger', e: '🔵' }, { t: 'it turns red', e: '🔴' } ], a: 0 }
      ]},
    { id: 'ep11', title: 'Tracks in the Dark', season: 2, cover: '🔦', unlock: { rounds: 90 },
      cliff: 'Who was hiding in the ice cave, humming the missing songs?',
      pages: [
        { t: 'Milo, Bolt, and Twink followed the river to find the shadow. Every star they passed was silent.', a: '🚀🌌' },
        { t: 'Bolt turned on his scanner. A green line blinked. “I hear humming,” he said, “far ahead.”', a: '🤖📡' },
        { t: 'They followed the humming through the dark. It was soft and sweet — a stolen star-song.', a: '🎶🌑' },
        { t: 'The trail led to a cave of blue ice at the cold edge of the river.', a: '🧊🕳️' },
        { t: 'Inside, jars of glowing light sat in neat rows. Each jar held a captured song.', a: '🫙🎵' },
        { t: 'In the middle of the cave, something small was curled up tight, humming to itself.', a: '❓🎶' }
      ], quiz: [
        { q: 'What did Bolt’s scanner hear?', choices: [ { t: 'a bell', e: '🔔' }, { t: 'humming', e: '🎶' }, { t: 'thunder', e: '⛈️' } ], a: 1 },
        { q: 'What was inside the ice cave?', choices: [ { t: 'jars of songs', e: '🫙' }, { t: 'piles of gold', e: '🪙' }, { t: 'sleeping bats', e: '🦇' } ], a: 0 }
      ]},
    { id: 'ep12', title: 'The Song Thief', season: 2, cover: '☄️', unlock: { rounds: 105 },
      cliff: 'Why would a lonely comet want to steal the stars’ songs?',
      pages: [
        { t: 'Milo stepped closer. The small shape uncurled. It was a young comet, no bigger than a dog.', a: '☄️' },
        { t: 'Her tail was pale and short. Her eyes were wide and afraid. She had been taking the songs.', a: '☄️😨' },
        { t: 'When she saw them, she hissed and darted behind a jar. “Go away! These are mine!”', a: '☄️💨' },
        { t: 'Bolt raised his claws. But Milo held up a hand. “Wait. Look at her. She is shaking.”', a: '🤖✋' },
        { t: 'The little comet was all alone in the cold cave, far from any friend.', a: '☄️❄️' },
        { t: '“I am Milo,” he said softly. “I will not hurt you. What is your name?” The comet whispered, “…Rue.”', a: '🧒☄️' }
      ], quiz: [
        { q: 'Who was taking the songs?', choices: [ { t: 'a young comet', e: '☄️' }, { t: 'the Star Catcher', e: '🛸' }, { t: 'a robot', e: '🤖' } ], a: 0 },
        { q: 'What is the comet’s name?', choices: [ { t: 'Twink', e: '⭐' }, { t: 'Rue', e: '☄️' }, { t: 'Bolt', e: '🤖' } ], a: 1 }
      ]},
    { id: 'ep13', title: 'Rue’s Reason', season: 2, cover: '❄️', unlock: { rounds: 120 },
      cliff: 'How can you share a song without taking it away?',
      pages: [
        { t: 'Milo sat down on the cold floor, close but not too close. “Rue,” he said, “please tell me why.”', a: '🧒☄️' },
        { t: 'Rue sniffed. “Comets fly alone,” she said. “We travel for years through the empty dark.”', a: '☄️🌑' },
        { t: '“One night I drifted near the river. I heard the stars sing. It was the best sound in the world.”', a: '🎶✨' },
        { t: '“I did not want to be lonely anymore. So I kept the songs in jars, to hear them again and again.”', a: '🫙🎵' },
        { t: '“But it did not help,” Rue said. Her voice cracked. “The stars went sad, and I felt worse than before.”', a: '☄️😢' },
        { t: 'Milo nodded. He knew you cannot keep a song in a jar. A song has to be shared to stay alive.', a: '🧒💭' }
      ], quiz: [
        { q: 'Why do comets feel lonely?', choices: [ { t: 'they fly alone for years', e: '☄️' }, { t: 'they are too small', e: '🔬' }, { t: 'they cannot see', e: '🙈' } ], a: 0 },
        { q: 'Why did Rue keep the songs?', choices: [ { t: 'to sell them', e: '🪙' }, { t: 'so she would not be lonely', e: '🥺' }, { t: 'to make gifts', e: '🎁' } ], a: 1 }
      ]},
    { id: 'ep14', title: 'Milo’s Idea', season: 2, cover: '📖', unlock: { rounds: 140 },
      cliff: 'Would the stars forgive Rue and take her back?',
      pages: [
        { t: 'Then Milo remembered something Twink once told him under the night sky.', a: '🧒💡' },
        { t: '“When you read a story out loud, you do not lose it,” Milo said. “You share it. It grows.”', a: '📖✨' },
        { t: '“Songs are the same. If you sing one, it does not go away. It goes to everyone who hears it.”', a: '🎶💞' },
        { t: 'Twink brought a glowing song-book. Milo showed Rue how to follow the notes and sing along.', a: '📖🎵' },
        { t: 'One by one, they opened the jars. The songs floated free and drifted back toward the river.', a: '🫙🎶' },
        { t: 'But this time Rue did not grab them. She sang with them, soft and shaky, and let them go.', a: '☄️🎶' }
      ], quiz: [
        { q: 'What did Milo teach Rue to do?', choices: [ { t: 'sing along, not keep the songs', e: '🎶' }, { t: 'hide better', e: '🙈' }, { t: 'build more jars', e: '🫙' } ], a: 0 },
        { q: 'What did Twink bring?', choices: [ { t: 'a map', e: '🗺️' }, { t: 'a glowing song-book', e: '📖' }, { t: 'a jar', e: '🫙' } ], a: 1 }
      ]},
    { id: 'ep15', title: 'The River Sings Again', season: 2, cover: '🎶', unlock: { rounds: 160 },
      cliff: 'But a comet can never stay still for long…',
      pages: [
        { t: 'The songs flew home to the stars. Slowly, the gray river began to glow gold again.', a: '🌌✨' },
        { t: 'One by one, the stars woke up and chimed. The whole sky started to ring like bells.', a: '⭐🔔' },
        { t: 'At first the stars were shy of Rue. They remembered the cold, quiet nights.', a: '⭐☄️' },
        { t: '“Please teach her your song,” Milo asked. “Rue does not want to take it now. She wants to share it.”', a: '🧒🎵' },
        { t: 'So the stars taught Rue their tune. She sang it back, wobbly at first, then bright and clear.', a: '☄️🎶' },
        { t: 'The river rang louder than ever, with a comet’s voice woven through. Rue was not alone anymore.', a: '🌌💫' }
      ], quiz: [
        { q: 'What happened when the songs came back?', choices: [ { t: 'the river glowed and rang', e: '🔔' }, { t: 'the river froze', e: '🧊' }, { t: 'the river went dark', e: '🌑' } ], a: 0 },
        { q: 'What did the stars do for Rue?', choices: [ { t: 'chased her away', e: '🏃' }, { t: 'taught her their song', e: '🎶' }, { t: 'gave her jars', e: '🫙' } ], a: 1 }
      ]},
    { id: 'ep16', title: 'The Long Way Home', season: 2, cover: '🔔', unlock: { rounds: 180 },
      cliff: 'So if you hear a faraway bell on a quiet night, it might be Rue, singing you a star-song. Sweet dreams, Star Reader! 🔔⭐',
      pages: [
        { t: 'Comets cannot stay in one place. Soon Rue had to fly on, far around the sun and back.', a: '☄️☀️' },
        { t: '“Do not be sad,” Rue told Milo. “I carry the star-song now. I will sing it everywhere I go.”', a: '☄️🎶' },
        { t: '“So no star will ever feel too far away,” she said, “and neither will I.”', a: '☄️⭐' },
        { t: 'The stars gave Rue a little bell of her own, made of comet ice, so they could always find her.', a: '🔔☄️' },
        { t: 'Twink chimed to Milo, “Whenever a friend needs you, your bell will ring. And you always come.”', a: '⭐🔔' },
        { t: 'Milo flew home and slept till noon. On his desk, the little bell glowed warm. The end!', a: '🛏️🔔' }
      ], quiz: [
        { q: 'Why did Rue have to leave?', choices: [ { t: 'comets cannot stay still', e: '☄️' }, { t: 'she was angry', e: '😠' }, { t: 'she was scared', e: '😨' } ], a: 0 },
        { q: 'What gift did the stars give Rue?', choices: [ { t: 'a map', e: '🗺️' }, { t: 'a jar of songs', e: '🫙' }, { t: 'a little bell', e: '🔔' } ], a: 2 }
      ]}
  ],

  /* ---------- Rocket Base ----------
     A per-profile rocket interior. Each slot holds one decoration;
     items are a pure coin sink (no gems, no stats — just pride). */
  BASE: {
    slots: [
      { id: 'window', name: 'Window',        e: '🪟', x: 50, y: 16 },
      { id: 'poster', name: 'Poster wall',   e: '🖼️', x: 17, y: 32 },
      { id: 'gadget', name: 'Gadget shelf',  e: '🔭', x: 83, y: 32 },
      { id: 'plant',  name: 'Space garden',  e: '🪴', x: 18, y: 68 },
      { id: 'seat',   name: 'Captain seat',  e: '🪑', x: 50, y: 62 },
      { id: 'rug',    name: 'Floor rug',     e: '🧶', x: 50, y: 88 }
    ],
    items: [
      { id: 'win-stars',    slot: 'window', e: '🌌', name: 'Starfield',     price: 40 },
      { id: 'win-earth',    slot: 'window', e: '🌍', name: 'Earth View',    price: 80 },
      { id: 'win-rainbow',  slot: 'window', e: '🌈', name: 'Rainbow Sky',   price: 140 },
      { id: 'post-rocket',  slot: 'poster', e: '🚀', name: 'Rocket Poster', price: 35 },
      { id: 'post-dragon',  slot: 'poster', e: '🐉', name: 'Dragon Poster', price: 75 },
      { id: 'post-star',    slot: 'poster', e: '🌟', name: 'Gold Star',     price: 130 },
      { id: 'gad-scope',    slot: 'gadget', e: '🔭', name: 'Telescope',     price: 45 },
      { id: 'gad-robot',    slot: 'gadget', e: '🤖', name: 'Robo-Pal',      price: 100 },
      { id: 'gad-radio',    slot: 'gadget', e: '📡', name: 'Star Radio',    price: 160 },
      { id: 'plant-sprout', slot: 'plant',  e: '🌱', name: 'Sprout',        price: 30 },
      { id: 'plant-flower', slot: 'plant',  e: '🌻', name: 'Sunflower',     price: 70 },
      { id: 'plant-cactus', slot: 'plant',  e: '🌵', name: 'Space Cactus',  price: 120 },
      { id: 'seat-pilot',   slot: 'seat',   e: '💺', name: 'Pilot Seat',    price: 30 },
      { id: 'seat-couch',   slot: 'seat',   e: '🛋️', name: 'Comfy Couch',   price: 90 },
      { id: 'seat-dino',    slot: 'seat',   e: '🦖', name: 'Dino Chair',    price: 150 },
      { id: 'rug-red',      slot: 'rug',    e: '🟥', name: 'Red Rug',       price: 25 },
      { id: 'rug-purple',   slot: 'rug',    e: '🟪', name: 'Purple Rug',    price: 60 },
      { id: 'rug-galaxy',   slot: 'rug',    e: '🌀', name: 'Galaxy Rug',    price: 110 }
    ]
  },

  /* ---------- Sticker album ----------
     Rounds with 2+ stars award one random sticker. 5% are ✨shiny.
     Duplicates auto-convert to coins (5 normal / 15 shiny). */
  STICKERS: {
    animals: { name: 'Animals', e: '🦁', list: ['🦁','🐯','🦊','🐼','🐨','🦒','🦓','🦔','🐢','🦜','🐬','🦋'] },
    space:   { name: 'Space',   e: '🪐', list: ['🪐','🌟','☄️','🛸','👽','🌈','🌙','⭐','🚀','🌎','🌞','🛰️'] },
    yummy:   { name: 'Yummy',   e: '🍩', list: ['🍩','🍕','🧁','🍦','🍪','🍓','🥨','🍉','🌮','🍿','🥞','🍭'] },
    silly:   { name: 'Silly',   e: '🤪', list: ['🤪','🥳','🤖','👾','🦄','🐲','🧸','🎈','🪄','🎩','🥸','👻'] }
  },

  /* ---------- Story Books ----------
     Original decodable readers per grade, built mostly from each grade's
     word lists + sight words. t = page text, a = emoji art for the page. */
  BOOKS: {
    K: [
      { id: 'k-cat-rat', title: 'The Cat and the Rat', cover: '🐱', pages: [
        { t: 'The cat sat.', a: '🐱' },
        { t: 'The rat ran.', a: '🐀💨' },
        { t: 'The cat ran.', a: '🐱💨' },
        { t: 'The rat hid in a box.', a: '📦' },
        { t: 'The cat sat on the box.', a: '🐱📦' },
        { t: 'The cat and the rat nap.', a: '🐱🐀💤' }
      ], quiz: [
        { q: 'Who hid in the box?', choices: [ { t: 'the cat', e: '🐱' }, { t: 'the rat', e: '🐀' }, { t: 'a hen', e: '🐔' } ], a: 1 },
        { q: 'What did they do at the end?', choices: [ { t: 'ran', e: '🏃' }, { t: 'hopped', e: '🐸' }, { t: 'napped', e: '😴' } ], a: 2 }
      ]},
      { id: 'k-big-sun', title: 'The Big Sun', cover: '☀️', pages: [
        { t: 'The sun is up.', a: '☀️' },
        { t: 'I see a bug.', a: '🐛' },
        { t: 'I see a hen.', a: '🐔' },
        { t: 'The pig is in the mud.', a: '🐷' },
        { t: 'The dog runs to me.', a: '🐶💨' },
        { t: 'We sit in the sun.', a: '☀️😊' }
      ], quiz: [
        { q: 'What is up?', choices: [ { t: 'a bug', e: '🐛' }, { t: 'a hen', e: '🐔' }, { t: 'the sun', e: '☀️' } ], a: 2 },
        { q: 'What is in the mud?', choices: [ { t: 'the pig', e: '🐷' }, { t: 'the dog', e: '🐶' }, { t: 'the hen', e: '🐔' } ], a: 0 }
      ]},
      { id: 'k-red-cap', title: 'My Red Cap', cover: '🧢', pages: [
        { t: 'Look at my red cap.', a: '🧢' },
        { t: 'The cap is big.', a: '🧢' },
        { t: 'A bug sat on the cap.', a: '🐛🧢' },
        { t: 'The cap is up, up, up!', a: '💨🧢' },
        { t: 'The cap is in the web!', a: '🕸️🧢' },
        { t: 'The bug got the cap.', a: '🐛🧢' },
        { t: 'I like my cap. And the bug.', a: '😊🐛' }
      ], quiz: [
        { q: 'What color is the cap?', choices: [ { t: 'blue', e: '🔵' }, { t: 'red', e: '🔴' }, { t: 'green', e: '🟢' } ], a: 1 },
        { q: 'Where did the cap go?', choices: [ { t: 'in the web', e: '🕸️' }, { t: 'in a box', e: '📦' }, { t: 'in the mud', e: '🟤' } ], a: 0 }
      ]}
    ],
    1: [
      { id: 'g1-frog-log', title: 'The Frog on the Log', cover: '🐸', pages: [
        { t: 'A frog sat on a log in the pond.', a: '🐸🪵' },
        { t: 'A fish swam up. “Can you swim?” said the fish.', a: '🐟' },
        { t: '“Yes! I can swim and hop!” said the frog.', a: '🐸💦' },
        { t: 'The frog did a big hop. Splash!', a: '💦' },
        { t: 'The fish and the frog swam fast.', a: '🐟🐸' },
        { t: 'A duck quacks. “Can I swim too?”', a: '🦆' },
        { t: '“Yes! Jump in, duck!”', a: '🦆💦' },
        { t: 'Best pals in the pond.', a: '🐸🐟🦆' }
      ], quiz: [
        { q: 'Where did the frog sit?', choices: [ { t: 'on a log', e: '🪵' }, { t: 'on a rock', e: '🪨' }, { t: 'on a boat', e: '⛵' } ], a: 0 },
        { q: 'Who was the last to swim?', choices: [ { t: 'a fish', e: '🐟' }, { t: 'a duck', e: '🦆' }, { t: 'a cat', e: '🐱' } ], a: 1 }
      ]},
      { id: 'g1-lost-sock', title: 'The Lost Sock', cover: '🧦', pages: [
        { t: 'Max the dog has a red sock.', a: '🐶🧦' },
        { t: 'The sock is lost! Max must hunt.', a: '🐶❓' },
        { t: 'Is it in the tub? No.', a: '🛁' },
        { t: 'Is it on the bed? No.', a: '🛏️' },
        { t: 'Is it in the truck? No.', a: '🚚' },
        { t: 'Max sniffs. Sniff, sniff, sniff!', a: '🐶👃' },
        { t: 'The sock is on the duck!', a: '🦆🧦' },
        { t: 'Silly duck! Max grins.', a: '🐶🦆😄' }
      ], quiz: [
        { q: 'Who lost the sock?', choices: [ { t: 'Max the dog', e: '🐶' }, { t: 'a cat', e: '🐱' }, { t: 'a duck', e: '🦆' } ], a: 0 },
        { q: 'Where was the sock?', choices: [ { t: 'in the tub', e: '🛁' }, { t: 'on the bed', e: '🛏️' }, { t: 'on the duck', e: '🦆' } ], a: 2 }
      ]},
      { id: 'g1-ship-trip', title: 'The Ship Trip', cover: '🚢', pages: [
        { t: 'Chip and Dad get on a ship.', a: '🚢' },
        { t: 'The ship is big and fast.', a: '🚢💨' },
        { t: 'Chip spots a crab on the deck.', a: '🦀' },
        { t: 'The crab naps in a shell.', a: '🦀🐚' },
        { t: 'A whale! It jumps and splashes.', a: '🐋💦' },
        { t: 'Splash! Chip is all wet.', a: '💦😆' },
        { t: 'The sun sets. The trip ends.', a: '🌅' },
        { t: 'Chip naps on the ship. What a trip!', a: '😴🚢' }
      ], quiz: [
        { q: 'Who went on the ship?', choices: [ { t: 'Chip and Mom', e: '👩' }, { t: 'Chip and Dad', e: '👨' }, { t: 'Chip and a cat', e: '🐱' } ], a: 1 },
        { q: 'What did Chip see on the deck?', choices: [ { t: 'a crab', e: '🦀' }, { t: 'a frog', e: '🐸' }, { t: 'a shark', e: '🦈' } ], a: 0 }
      ]}
    ],
    2: [
      { id: 'g2-goat-boat', title: 'The Goat’s Boat', cover: '🐐', pages: [
        { t: 'A goat made a boat. He used wood and rope.', a: '🐐⛵' },
        { t: '“Will it float?” said the mouse. “I hope so!” said the goat.', a: '🐭' },
        { t: 'The goat and the mouse set sail on the lake.', a: '⛵' },
        { t: 'The wind blew. The boat went fast.', a: '💨⛵' },
        { t: 'Rain came down. Drip, drop, drip!', a: '🌧️' },
        { t: 'A wave rocked the boat. “Hold the rope!”', a: '🌊' },
        { t: 'Then the sun came out. A rainbow glowed.', a: '🌈' },
        { t: 'The goat and the mouse sailed home with a tale to tell.', a: '🐐🐭🏠' }
      ], quiz: [
        { q: 'What did the goat make?', choices: [ { t: 'a boat', e: '⛵' }, { t: 'a house', e: '🏠' }, { t: 'a cart', e: '🛒' } ], a: 0 },
        { q: 'Who sailed with the goat?', choices: [ { t: 'a duck', e: '🦆' }, { t: 'a mouse', e: '🐭' }, { t: 'a fish', e: '🐟' } ], a: 1 }
      ]},
      { id: 'g2-night-light', title: 'The Night Light', cover: '💡', pages: [
        { t: 'Jane can not sleep at night. It is too dark.', a: '🌃😟' },
        { t: 'Mom gives her a night light. It glows like a star.', a: '💡⭐' },
        { t: 'Jane sees a shape! Is it a beast? No — it is her coat.', a: '🧥😅' },
        { t: 'She hears a sound. Is it a ghost? No — it is the cat.', a: '🐱' },
        { t: 'The moon shines in. The room is not so dark.', a: '🌙' },
        { t: 'Jane holds her bear tight and counts sheep.', a: '🧸🐑' },
        { t: 'One sheep, five sheep, nine sheep…', a: '🐑🐑🐑' },
        { t: 'Jane sleeps tight all night. Sweet dreams!', a: '😴🌙' }
      ], quiz: [
        { q: 'Who gave Jane a night light?', choices: [ { t: 'her dad', e: '👨' }, { t: 'her mom', e: '👩' }, { t: 'her cat', e: '🐱' } ], a: 1 },
        { q: 'The scary shape was really her…?', choices: [ { t: 'coat', e: '🧥' }, { t: 'bear', e: '🧸' }, { t: 'cat', e: '🐱' } ], a: 0 }
      ]},
      { id: 'g2-snail-mail', title: 'The Snail Mail', cover: '🐌', pages: [
        { t: 'The snail brings the mail. He is slow, but he will not fail.', a: '🐌✉️' },
        { t: 'Rain or shine, the snail stays on the trail.', a: '🌧️☀️' },
        { t: 'He brings a note to the goat.', a: '🐐📩' },
        { t: 'He brings a box to the fox.', a: '🦊📦' },
        { t: 'He hauls a big sack up the hill. Keep going, snail!', a: '⛰️' },
        { t: 'At the top, he needs a rest. He dreams of the sea.', a: '💤🌊' },
        { t: 'The last stop: a cake for the mole’s birthday!', a: '🎂' },
        { t: 'The mole shouts, “You saved the day, Snail Mail!”', a: '🥳🐌' }
      ], quiz: [
        { q: 'What does the snail bring?', choices: [ { t: 'the mail', e: '✉️' }, { t: 'the milk', e: '🥛' }, { t: 'the news', e: '📰' } ], a: 0 },
        { q: 'Who gets a birthday cake?', choices: [ { t: 'the fox', e: '🦊' }, { t: 'the goat', e: '🐐' }, { t: 'the mole', e: '🦫' } ], a: 2 }
      ]}
    ],
    3: [
      { id: 'g3-dragon-roar', title: 'The Dragon Who Could Not Roar', cover: '🐉', pages: [
        { t: 'Once there was a little dragon named Ember. She had shiny scales and tiny wings.', a: '🐉✨' },
        { t: 'But Ember had a problem. When she tried to roar, only a squeak came out.', a: '🐉💨' },
        { t: 'The other dragons rumbled like thunder. Ember hid behind a volcano.', a: '🌋' },
        { t: 'A clever rabbit found her. “Squeaky? So what! What else can you do?”', a: '🐰' },
        { t: 'Ember thought hard. She could fly loops. She could melt rocks. She could glow!', a: '✨🐉' },
        { t: 'That winter, a storm buried the dragon caves in deep snow.', a: '❄️🌨️' },
        { t: 'The big dragons’ fire was too wild to help. But Ember glowed gently and melted a path.', a: '🐉✨❄️' },
        { t: 'The dragons cheered. Ember squeaked with joy — and nobody laughed.', a: '🎉' },
        { t: 'The littlest dragon with the littlest roar was the bravest of them all.', a: '🐉🏆' }
      ], quiz: [
        { q: 'What came out when Ember tried to roar?', choices: [ { t: 'a big roar', e: '🔊' }, { t: 'a tiny squeak', e: '🐭' }, { t: 'a puff of fire', e: '🔥' } ], a: 1 },
        { q: 'How did Ember help in the snow?', choices: [ { t: 'she melted a path', e: '✨' }, { t: 'she dug a hole', e: '🕳️' }, { t: 'she flew for help', e: '🕊️' } ], a: 0 }
      ]},
      { id: 'g3-robot-garden', title: 'The Robot’s Garden', cover: '🤖', pages: [
        { t: 'Unit Seven was a robot who worked in a rocket factory. Every day: tighten, weld, repeat.', a: '🤖🏭' },
        { t: 'One morning, a seed blew in through a window and landed in his toolbox.', a: '🌱🧰' },
        { t: 'Unit Seven did not compute. Seeds were not in his program. But he planted it anyway.', a: '🤖🌱' },
        { t: 'He gave it water. He moved it into the sunlight. He even hummed to it.', a: '💧☀️🎵' },
        { t: 'A green stem appeared. Then a bud. Then — a sunflower!', a: '🌻' },
        { t: 'The other robots gathered around. “Error?” they beeped. “No,” said Unit Seven. “Flower.”', a: '🤖🌻' },
        { t: 'Soon every robot had a pot. The factory roof became a garden.', a: '🏭🌻🌷' },
        { t: 'Sometimes the best programs are the ones you write yourself.', a: '🤖💚' }
      ], quiz: [
        { q: 'Where did Unit Seven work?', choices: [ { t: 'a rocket factory', e: '🏭' }, { t: 'a flower shop', e: '🌷' }, { t: 'a school', e: '🏫' } ], a: 0 },
        { q: 'What grew from the seed?', choices: [ { t: 'a rose', e: '🌹' }, { t: 'a sunflower', e: '🌻' }, { t: 'a tall tree', e: '🌳' } ], a: 1 }
      ]},
      { id: 'g3-red-planet', title: 'Mission to the Red Planet', cover: '🚀', pages: [
        { t: 'Commander Maya checked her helmet twice. Today was launch day.', a: '👩‍🚀🚀' },
        { t: 'The rocket rumbled, then thundered into the sky. Earth shrank to a blue marble.', a: '🌍' },
        { t: 'For ninety days they traveled through the dark. Maya missed pancakes and rain.', a: '🌌' },
        { t: 'The red planet grew bigger in the window. Dusty. Empty. Waiting.', a: '🪐' },
        { t: 'The lander touched down with a gentle thump. Maya stepped onto red sand.', a: '👣' },
        { t: 'She planted sensors and collected rocks. One rock sparkled strangely.', a: '🪨✨' },
        { t: 'Inside the sparkle: tiny frozen crystals of ice. Water! Maybe life was possible here.', a: '💎💧' },
        { t: 'Maya smiled inside her helmet. The first discovery is the sweetest.', a: '👩‍🚀😊' },
        { t: 'That night she sent a message home: “It’s beautiful out here. Science rocks.”', a: '📡🌌' }
      ], quiz: [
        { q: 'Who flew the rocket?', choices: [ { t: 'Commander Maya', e: '👩‍🚀' }, { t: 'Captain Rio', e: '🧑‍🚀' }, { t: 'Doctor Lee', e: '👨‍⚕️' } ], a: 0 },
        { q: 'What did Maya find inside the rock?', choices: [ { t: 'gold', e: '🪙' }, { t: 'frozen ice', e: '💧' }, { t: 'a bug', e: '🐛' } ], a: 1 }
      ]}
    ],
    4: [
      { id: 'g4-room-12', title: 'The Mystery of Room 12', cover: '🕵️', pages: [
        { t: 'Every morning, the chalk in Room 12 went missing. Not one piece was ever left behind.', a: '🏫' },
        { t: 'Mia decided to investigate. She hid behind the bookshelf before the bell rang.', a: '🕵️📚' },
        { t: 'At noon, she heard a tiny squeak. A small gray shape darted across the floor.', a: '🐭' },
        { t: 'It was a mouse — carrying a piece of chalk like a tiny torch!', a: '🐭🖍️' },
        { t: 'Mia followed it to a crack in the wall and peeked inside with her flashlight.', a: '🔦' },
        { t: 'The mouse had drawn a maze of chalk lines, like a tiny city map.', a: '🗺️' },
        { t: '“You’re an artist!” Mia whispered. The mouse twitched its whiskers proudly.', a: '🐭🎨' },
        { t: 'Mia kept the secret. But every Friday, she left one piece of chalk by the crack.', a: '🤫' }
      ], quiz: [
        { q: 'What kept going missing from Room 12?', choices: [ { t: 'the chalk', e: '🖍️' }, { t: 'the books', e: '📚' }, { t: 'the clock', e: '🕐' } ], a: 0 },
        { q: 'Who was taking it?', choices: [ { t: 'a bird', e: '🐦' }, { t: 'a mouse', e: '🐭' }, { t: 'another kid', e: '🧒' } ], a: 1 }
      ]},
      { id: 'g4-raindrop', title: 'Journey of a Raindrop', cover: '💧', pages: [
        { t: 'High above the mountains, a raindrop named Rio formed inside a heavy gray cloud.', a: '☁️' },
        { t: 'Rio tumbled out of the sky and splashed onto a maple leaf.', a: '🍁💧' },
        { t: 'He slid into a stream that giggled over smooth stones.', a: '🪨💦' },
        { t: 'The stream joined a river. The river pushed past cities and under bridges.', a: '🌉' },
        { t: 'A thirsty deer drank nearby, and Rio waved as he rushed past.', a: '🦌' },
        { t: 'At last, Rio reached the sea and floated under the wide blue sky.', a: '🌊' },
        { t: 'The warm sun lifted him up, up, up — lighter than a whisper.', a: '☀️' },
        { t: 'Soon Rio was back inside a cloud, ready for the next adventure. The journey never ends.', a: '☁️✨' }
      ], quiz: [
        { q: 'What is the raindrop’s name?', choices: [ { t: 'Rio', e: '💧' }, { t: 'Milo', e: '🧒' }, { t: 'Sky', e: '☁️' } ], a: 0 },
        { q: 'Where did Rio end up at the end?', choices: [ { t: 'in a cave', e: '🕳️' }, { t: 'back inside a cloud', e: '☁️' }, { t: 'in a well', e: '🪣' } ], a: 1 }
      ]}
    ],
    5: [
      { id: 'g5-inventor', title: 'The Inventor’s Notebook', cover: '💡', pages: [
        { t: 'Zoe found the dusty notebook in her grandfather’s attic, under a box of broken clocks.', a: '📓' },
        { t: 'Inside were sketches of impossible machines: a bicycle with wings, a hat that translated bird songs.', a: '✏️🚲' },
        { t: 'On the last page, in shaky handwriting: “Finish the dream machine. Page 47 holds the secret.”', a: '📖' },
        { t: 'But page 47 was torn out. Zoe searched the attic until midnight.', a: '🌙🔦' },
        { t: 'She found the missing page folded inside a clock that had no hands.', a: '🕰️' },
        { t: 'The “dream machine” was not a machine at all. It was a list: Be curious. Ask questions. Build things. Fail. Try again.', a: '📜' },
        { t: 'Zoe smiled. She grabbed a screwdriver and the broken clocks and got to work.', a: '🔧' },
        { t: 'By morning, something in the attic was ticking again — and so was a brand-new idea.', a: '⏰💡' }
      ], quiz: [
        { q: 'Where did Zoe find the notebook?', choices: [ { t: 'her grandfather’s attic', e: '🏚️' }, { t: 'the library', e: '📚' }, { t: 'her school desk', e: '🏫' } ], a: 0 },
        { q: 'What was the “dream machine” really?', choices: [ { t: 'a flying bike', e: '🚲' }, { t: 'a list of ideas', e: '📜' }, { t: 'a robot', e: '🤖' } ], a: 1 }
      ]},
      { id: 'g5-pluto', title: 'The Last Message from Pluto Station', cover: '🛰️', pages: [
        { t: 'The research station at the edge of the solar system had been silent for nine years.', a: '🛰️' },
        { t: 'Then, one Tuesday, a message arrived: “Still here. Still watching the stars. — Unit K.”', a: '📡' },
        { t: 'Commander Reyes read it three times. Unit K was a robot the crew had left behind.', a: '🤖' },
        { t: 'For nine years, the little robot had repaired solar panels, recorded comets, and waited.', a: '☄️' },
        { t: '“We can’t leave it there,” Reyes said. The rescue voyage took two whole years.', a: '🚀' },
        { t: 'When the airlock opened, Unit K stood at attention, dented but proud.', a: '🤖✨' },
        { t: 'Its memory held nine years of discoveries — and one short poem about loneliness.', a: '💾' },
        { t: 'Back on Earth, scientists studied the data for decades. But the poem is what everyone remembers.', a: '🌍📜' }
      ], quiz: [
        { q: 'Who sent the message?', choices: [ { t: 'Commander Reyes', e: '👩‍🚀' }, { t: 'a robot named Unit K', e: '🤖' }, { t: 'an alien', e: '👽' } ], a: 1 },
        { q: 'How long had the station been silent?', choices: [ { t: 'nine years', e: '📅' }, { t: 'one week', e: '🗓️' }, { t: 'a hundred years', e: '⏳' } ], a: 0 }
      ]}
    ]
  }
};
