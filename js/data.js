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
              taunt: 'I am Grump! Read if you dare!' } },
    { name: 'Whispering Woods', e: '🌲', wins: 3, colors: ['#d1fae5', '#86efac'],
      boss: { name: 'Shadow Wolf', e: '🐺', hp: 45,  reward: 90,
              taunt: 'Awooo! No one reads in MY woods!' } },
    { name: 'Crystal Caves',    e: '💎', wins: 3, colors: ['#e0e7ff', '#a5b4fc'],
      boss: { name: 'Rocky the Troll', e: '🧌', hp: 60,  reward: 120,
              taunt: 'Me Rocky! Me eat books!' } },
    { name: 'Lava Mountain',    e: '🌋', wins: 4, colors: ['#ffedd5', '#fca5a5'],
      boss: { name: 'Magma Dragon', e: '🐉', hp: 85,  reward: 160,
              taunt: 'My fire melts words! Sssss!' } },
    { name: 'Storm Castle',     e: '🏰', wins: 4, colors: ['#e2e8f0', '#a5f3fc'],
      boss: { name: 'Thunder King', e: '🤴', hp: 110, reward: 200,
              taunt: 'BOOM! I am the king of loud!' } },
    { name: 'Robo City',        e: '🏙️', wins: 5, colors: ['#cffafe', '#67e8f9'],
      boss: { name: 'Mega Bot', e: '🤖', hp: 130, reward: 240,
              taunt: 'BEEP BOOP. READING NOT COMPUTED.' } },
    { name: 'Moon Base',        e: '🌙', wins: 5, colors: ['#e2e8f0', '#cbd5e1'],
      boss: { name: 'Moon Beast', e: '👾', hp: 150, reward: 280,
              taunt: 'Zorp! Your words cannot reach space!' } },
    { name: 'Star Galaxy',      e: '🌌', wins: 6, colors: ['#ede9fe', '#c4b5fd'],
      boss: { name: 'Star Titan', e: '👹', hp: 175, reward: 350,
              taunt: 'I have never lost to a reader. Ever.' } },
    { name: 'Rainbow Rift',     e: '🌈', wins: 6, colors: ['#fce7f3', '#fbcfe8'],
      boss: { name: 'Prism Phantom', e: '👻', hp: 210, reward: 420,
              taunt: 'Boo! Your words fade in my fog!' } },
    { name: 'Cosmic Core',      e: '🌠', wins: 7, colors: ['#e0e7ff', '#818cf8'],
      boss: { name: 'The Final Word', e: '🛸', hp: 260, reward: 550,
              taunt: 'I am the last boss. No reader passes me!' } }
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
      ]},
      { id: 'k-big-sun', title: 'The Big Sun', cover: '☀️', pages: [
        { t: 'The sun is up.', a: '☀️' },
        { t: 'I see a bug.', a: '🐛' },
        { t: 'I see a hen.', a: '🐔' },
        { t: 'The pig is in the mud.', a: '🐷' },
        { t: 'The dog runs to me.', a: '🐶💨' },
        { t: 'We sit in the sun.', a: '☀️😊' }
      ]},
      { id: 'k-red-cap', title: 'My Red Cap', cover: '🧢', pages: [
        { t: 'Look at my red cap.', a: '🧢' },
        { t: 'The cap is big.', a: '🧢' },
        { t: 'A bug sat on the cap.', a: '🐛🧢' },
        { t: 'The cap is up, up, up!', a: '💨🧢' },
        { t: 'The cap is in the web!', a: '🕸️🧢' },
        { t: 'The bug got the cap.', a: '🐛🧢' },
        { t: 'I like my cap. And the bug.', a: '😊🐛' }
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
      ]}
    ]
  }
};
