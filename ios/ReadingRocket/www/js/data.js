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
