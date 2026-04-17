/* ============================================================
   FLIM MAKERS — script.js
   All movie data, dynamic rendering, search, voice, player
   ============================================================ */

// ── Movie Database (120+ movies) ─────────────────────────────
const DEMO_TRAILER_EMBED_URL = 'https://www.youtube.com/embed/GQfdjbBLY9I?autoplay=1&rel=0&modestbranding=1';
// ✅ Paste at TOP of file

const MOVIES = [
  // ── TRENDING ─────────────────────────────────────────────
  { id:1,  title:"Kalki 2898 AD",     year:2024, genre:"Sci-Fi",    lang:"Telugu",   rating:8.3, duration:"3h 1m",  img:"https://image.tmdb.org/t/p/w500/rstcAnBeCkxNQjNp3YXrF6IP1tW.jpg", wide:"https://picsum.photos/seed/kalki_w/800/450",   desc:"A post-apocalyptic action epic that blends Hindu mythology with futuristic science fiction, following the journey of the Kalki avatar.", cast:["Prabhas","Deepika","Amitabh","Kamal Haasan"], badge:"new" },
  { id:2,  title:"RRR",               year:2022, genre:"Action",    lang:"Telugu",   rating:8.0, duration:"3h 7m",  img:"https://image.tmdb.org/t/p/w500/ljHw5eIMnki3HekwkKwCCHsRSbH.jpg", wide:"https://picsum.photos/seed/rrr_w/800/450",     desc:"A fictional story about two legendary revolutionaries and their journey far away from home before they started fighting for their country.", cast:["N.T. Rama Rao Jr.","Ram Charan","Alia Bhatt","Ajay Devgn"], badge:"top" },
  { id:3,  title:"Oppenheimer",       year:2023, genre:"Biography", lang:"Hollywood",rating:8.5, duration:"3h",     img:"https://picsum.photos/seed/oppen/400/600",      wide:"https://picsum.photos/seed/oppen_w/800/450",   desc:"The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", cast:["Cillian Murphy","Emily Blunt","Matt Damon"], badge:"top" },
  { id:4,  title:"Pushpa 2",          year:2024, genre:"Action",    lang:"Telugu",   rating:8.1, duration:"3h 22m", img:"https://image.tmdb.org/t/p/w500/gpNcQfQ4YGtFwEcrjcK9HxVM2KF.jpg", wide:"https://picsum.photos/seed/pushpa2_w/800/450", desc:"The continuation of Pushpa Raj's rise as he becomes a red sandalwood smuggling empire king.", cast:["Allu Arjun","Rashmika Mandanna","Fahadh Faasil"], badge:"new" },
  { id:5,  title:"Dune Part Two",     year:2024, genre:"Sci-Fi",    lang:"Hollywood",rating:8.6, duration:"2h 46m", img:"https://picsum.photos/seed/dune2/400/600",      wide:"https://picsum.photos/seed/dune2_w/800/450",   desc:"Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family.", cast:["Timothée Chalamet","Zendaya","Florence Pugh"], badge:"new" },
  { id:6,  title:"Animal",            year:2023, genre:"Thriller",  lang:"Hindi",    rating:7.6, duration:"3h 21m", img:"https://picsum.photos/seed/animal/400/600",     wide:"https://picsum.photos/seed/animal_w/800/450",  desc:"A son's obsessive love for his father drives him to go to extreme lengths to protect the family legacy.", cast:["Ranbir Kapoor","Rashmika Mandanna","Anil Kapoor"], badge:"" },
  { id:7,  title:"Avengers: Endgame", year:2019, genre:"Action",    lang:"Hollywood",rating:8.4, duration:"3h 1m",  img:"https://picsum.photos/seed/endgame/400/600",    wide:"https://picsum.photos/seed/endgame_w/800/450", desc:"After the devastating events of Infinity War, the Avengers must assemble once more to reverse the actions of Thanos.", cast:["Robert Downey Jr.","Chris Evans","Scarlett Johansson"], badge:"top" },
  { id:8,  title:"Pathaan",           year:2023, genre:"Action",    lang:"Hindi",    rating:7.0, duration:"2h 26m", img:"https://picsum.photos/seed/pathaan/400/600",    wide:"https://picsum.photos/seed/pathaan_w/800/450", desc:"An Indian spy takes on the leader of a mercenary organization called Outfit X.", cast:["Shah Rukh Khan","Deepika Padukone","John Abraham"], badge:"" },
  { id:9,  title:"KGF Chapter 2",     year:2022, genre:"Action",    lang:"Hindi",    rating:8.2, duration:"2h 48m", img:"https://picsum.photos/seed/kgf2/400/600",       wide:"https://picsum.photos/seed/kgf2_w/800/450",    desc:"Rocky's iron grip on Kolar Gold Fields triggers a fierce response from the government and his enemies.", cast:["Yash","Srinidhi Shetty","Sanjay Dutt"], badge:"" },
  { id:10, title:"Inception",         year:2010, genre:"Sci-Fi",    lang:"Hollywood",rating:8.8, duration:"2h 28m", img:"https://picsum.photos/seed/inception/400/600",  wide:"https://picsum.photos/seed/incep_w/800/450",   desc:"A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.", cast:["Leonardo DiCaprio","Joseph Gordon-Levitt","Ellen Page"], badge:"" },

  // ── TELUGU ───────────────────────────────────────────────
  { id:11, title:"Baahubali 2",       year:2017, genre:"Epic",      lang:"Telugu",   rating:8.2, duration:"2h 47m", img:"https://image.tmdb.org/t/p/w500/xQ22LOWSkClP3maYhR9nZH0dnWM.jpg", wide:"https://picsum.photos/seed/bahu_w/800/450",    desc:"When Shiva, the son of Baahubali, learns about his heritage, he begins to look for answers.", cast:["Prabhas","Anushka Shetty","Rana Daggubati"], badge:"" },
  { id:12, title:"Arjun Reddy",       year:2017, genre:"Romance",   lang:"Telugu",   rating:8.1, duration:"3h 5m",  img:"https://image.tmdb.org/t/p/w500/kHubDgL59I5hCn7ccBYvU7bKY1r.jpg", wide:"https://picsum.photos/seed/arjun_w/800/450",   desc:"A hot-headed surgeon's life spirals after he breaks up with his girlfriend.", cast:["Vijay Deverakonda","Shalini Pandey"], badge:"" },
  { id:13, title:"Vikram Vedha",      year:2017, genre:"Thriller",  lang:"Telugu",   rating:8.3, duration:"2h 27m", img:"https://picsum.photos/seed/vikramv/400/600",   wide:"https://picsum.photos/seed/vikram_w/800/450",  desc:"A tough police officer must arrest an equally clever gangster.", cast:["R. Madhavan","Vijay Sethupathi"], badge:"" },
  { id:14, title:"Jersey",            year:2019, genre:"Sports",    lang:"Telugu",   rating:8.5, duration:"2h 39m", img:"https://picsum.photos/seed/jersey/400/600",     wide:"https://picsum.photos/seed/jersey_w/800/450",  desc:"A failed cricketer decides to make a comeback at age 36 to fulfil his son's wish.", cast:["Nani","Shraddha Srinath"], badge:"" },
  { id:15, title:"Sye Raa Narasimha", year:2019, genre:"Historical",lang:"Telugu",   rating:7.2, duration:"2h 45m", img:"https://picsum.photos/seed/syeraa/400/600",    wide:"https://picsum.photos/seed/sye_w/800/450",     desc:"The legendary story of freedom fighter Uyyalawada Narasimha Reddy.", cast:["Chiranjeevi","Amy Jackson","Vijay Sethupathi"], badge:"" },
  { id:16, title:"Ala Vaikunthapuram",year:2020, genre:"Fantasy",   lang:"Telugu",   rating:7.5, duration:"2h 39m", img:"https://picsum.photos/seed/alavai/400/600",    wide:"https://picsum.photos/seed/ala_w/800/450",     desc:"A carefree man falls in love with a traditional girl, and gods decide to test their love.", cast:["Allu Arjun","Pooja Hegde","Tabu"], badge:"" },
  { id:17, title:"Uppena",            year:2021, genre:"Romance",   lang:"Telugu",   rating:8.1, duration:"2h 30m", img:"https://picsum.photos/seed/uppena/400/600",    wide:"https://picsum.photos/seed/uppena_w/800/450",  desc:"A young fisherman falls in love with a landlord's daughter, defying caste and society.", cast:["Panja Vaisshnav Tej","Krithi Shetty"], badge:"" },
  { id:18, title:"HIT: The First Case",year:2020,genre:"Thriller",  lang:"Telugu",   rating:7.0, duration:"1h 57m", img:"https://picsum.photos/seed/hitfirst/400/600",  wide:"https://picsum.photos/seed/hit_w/800/450",     desc:"A cop with PTSD investigates the disappearance of a woman.", cast:["Vishwak Sen","Ruhani Sharma"], badge:"" },
  { id:19, title:"Dhamaka",           year:2023, genre:"Action",    lang:"Telugu",   rating:7.3, duration:"2h 22m", img:"https://picsum.photos/seed/dhamaka/400/600",   wide:"https://picsum.photos/seed/dham_w/800/450",    desc:"A carefree rowdy gets embroiled in a revenge mission against a corrupt politician.", cast:["Ravi Teja","Sreeleela"], badge:"new" },
  { id:20, title:"Samajavaragamana",  year:2023, genre:"Drama",     lang:"Telugu",   rating:7.8, duration:"2h 10m", img:"https://picsum.photos/seed/samaja/400/600",    wide:"https://picsum.photos/seed/sam_w/800/450",     desc:"A heartwarming story about relationships, music, and life's unexpected turns.", cast:["Sree Vishnu","Eesha Rebba"], badge:"" },
  { id:21, title:"Bimbisara",         year:2022, genre:"Fantasy",   lang:"Telugu",   rating:7.5, duration:"2h 42m", img:"https://picsum.photos/seed/bimbi/400/600",     wide:"https://picsum.photos/seed/bim_w/800/450",     desc:"An arrogant king from the fifth century BC time-travels to the present day.", cast:["Kalyan Ram","Catherine Tresa"], badge:"" },
  { id:22, title:"Ori Devuda",        year:2022, genre:"Comedy",    lang:"Telugu",   rating:7.0, duration:"2h 14m", img:"https://picsum.photos/seed/oridev/400/600",    wide:"https://picsum.photos/seed/ori_w/800/450",     desc:"A comical tale where a man's reckless wishes get granted, leading to chaos.", cast:["Vishwak Sen","Mithila Palkar"], badge:"" },
  { id:23, title:"Karthikeya 2",      year:2022, genre:"Mystery",   lang:"Telugu",   rating:8.4, duration:"2h 27m", img:"https://picsum.photos/seed/karthi2/400/600",   wide:"https://picsum.photos/seed/kart_w/800/450",    desc:"A doctor unravels the mystery of Lord Krishna's parijata anklet.", cast:["Nikhil Siddhartha","Anupama Parameswaran"], badge:"" },
  { id:24, title:"Acharya",           year:2022, genre:"Action",    lang:"Telugu",   rating:5.9, duration:"2h 34m", img:"https://picsum.photos/seed/acharya/400/600",   wide:"https://picsum.photos/seed/acha_w/800/450",    desc:"A naxalite leader takes on a powerful temple trust that is looting a village.", cast:["Chiranjeevi","Ram Charan","Pooja Hegde"], badge:"" },
  { id:25, title:"Bangarraju",        year:2022, genre:"Fantasy",   lang:"Telugu",   rating:7.1, duration:"2h 28m", img:"https://picsum.photos/seed/bangarra/400/600",  wide:"https://picsum.photos/seed/bang_w/800/450",    desc:"A ghost from heaven returns to earth to sort out family problems.", cast:["Nagarjuna","Naga Chaitanya","Ramya Krishnan"], badge:"" },

  // ── HINDI ────────────────────────────────────────────────
  { id:26, title:"3 Idiots",          year:2009, genre:"Comedy",    lang:"Hindi",    rating:8.4, duration:"2h 50m", img:"https://picsum.photos/seed/3idiots/400/600",    wide:"https://picsum.photos/seed/3id_w/800/450",     desc:"Two friends are searching for their long lost friend who influenced their lives.", cast:["Aamir Khan","R. Madhavan","Sharman Joshi"], badge:"" },
  { id:27, title:"Dangal",            year:2016, genre:"Sports",    lang:"Hindi",    rating:8.3, duration:"2h 41m", img:"https://picsum.photos/seed/dangal/400/600",     wide:"https://picsum.photos/seed/dang_w/800/450",    desc:"Former wrestler trains his two daughters to compete in national and world wrestling championships.", cast:["Aamir Khan","Fatima Sana Shaikh"], badge:"" },
  { id:28, title:"Andhadhun",         year:2018, genre:"Thriller",  lang:"Hindi",    rating:8.3, duration:"2h 19m", img:"https://picsum.photos/seed/andha/400/600",      wide:"https://picsum.photos/seed/andh_w/800/450",    desc:"A blind pianist accidentally witnesses a murder and gets caught in a web of deceit.", cast:["Ayushmann Khurrana","Tabu","Radhika Apte"], badge:"" },
  { id:29, title:"Gully Boy",         year:2019, genre:"Music",     lang:"Hindi",    rating:7.9, duration:"2h 34m", img:"https://picsum.photos/seed/gullyboy/400/600",   wide:"https://picsum.photos/seed/gull_w/800/450",    desc:"A street rapper from Mumbai's Dharavi slum rises to find his voice.", cast:["Ranveer Singh","Alia Bhatt"], badge:"" },
  { id:30, title:"Tumbbad",           year:2018, genre:"Horror",    lang:"Hindi",    rating:8.2, duration:"1h 44m", img:"https://picsum.photos/seed/tumbbad/400/600",    wide:"https://picsum.photos/seed/tumb_w/800/450",    desc:"A cautionary tale about a Maharashtra shrine to a demonic demi-god.", cast:["Sohum Shah","Jyoti Malshe"], badge:"top" },
  { id:31, title:"Dil Dhadakne Do",   year:2015, genre:"Drama",     lang:"Hindi",    rating:7.1, duration:"2h 50m", img:"https://picsum.photos/seed/dildha/400/600",     wide:"https://picsum.photos/seed/dild_w/800/450",    desc:"A rich family discovers truth about themselves on a cruise.", cast:["Priyanka Chopra","Ranveer Singh","Farhan Akhtar"], badge:"" },
  { id:32, title:"Brahmastra",        year:2022, genre:"Fantasy",   lang:"Hindi",    rating:5.9, duration:"2h 47m", img:"https://picsum.photos/seed/brahma/400/600",     wide:"https://picsum.photos/seed/brah_w/800/450",    desc:"A young man discovers a unique connection with fire and learns of an ancient weapon.", cast:["Ranbir Kapoor","Alia Bhatt","Amitabh Bachchan"], badge:"" },
  { id:33, title:"Badhaai Ho",        year:2018, genre:"Comedy",    lang:"Hindi",    rating:8.0, duration:"2h 3m",  img:"https://picsum.photos/seed/badhaai/400/600",    wide:"https://picsum.photos/seed/badh_w/800/450",    desc:"A family faces embarrassment when their 50-year-old mother announces unexpected pregnancy.", cast:["Ayushmann Khurrana","Sanya Malhotra","Neena Gupta"], badge:"" },
  { id:34, title:"Drishyam 2",        year:2022, genre:"Thriller",  lang:"Hindi",    rating:8.3, duration:"2h 27m", img:"https://picsum.photos/seed/drish2/400/600",     wide:"https://picsum.photos/seed/dris_w/800/450",    desc:"Seven years after the shocking events of 2014, Vijay and his family continue to be haunted by the past.", cast:["Ajay Devgn","Tabu","Akshaye Khanna"], badge:"" },
  { id:35, title:"Stree",             year:2018, genre:"Horror",    lang:"Hindi",    rating:7.9, duration:"2h 10m", img:"https://picsum.photos/seed/stree/400/600",      wide:"https://picsum.photos/seed/str_w/800/450",     desc:"A small town faces terror of a mysterious spirit who targets men, while a local woman helps them.", cast:["Rajkummar Rao","Shraddha Kapoor","Pankaj Tripathi"], badge:"" },
  { id:36, title:"Queen",             year:2014, genre:"Drama",     lang:"Hindi",    rating:8.1, duration:"2h 26m", img:"https://picsum.photos/seed/queeni/400/600",     wide:"https://picsum.photos/seed/que_w/800/450",     desc:"A Delhi girl from a conservative family goes on her European honeymoon alone after her fiancé calls off the wedding.", cast:["Kangana Ranaut","Rajkummar Rao"], badge:"" },
  { id:37, title:"Laal Singh Chaddha",year:2022, genre:"Drama",     lang:"Hindi",    rating:5.7, duration:"2h 40m", img:"https://picsum.photos/seed/laalsin/400/600",   wide:"https://picsum.photos/seed/laal_w/800/450",    desc:"An adaptation of Forrest Gump – an uncomplicated man's journey through the events of modern India.", cast:["Aamir Khan","Kareena Kapoor"], badge:"" },
  { id:38, title:"Uri: The Surgical Strike",year:2019,genre:"War",  lang:"Hindi",    rating:8.2, duration:"2h 18m", img:"https://picsum.photos/seed/urisurge/400/600",  wide:"https://picsum.photos/seed/uri_w/800/450",     desc:"India's most successful military operation and the planning behind it.", cast:["Vicky Kaushal","Paresh Rawal","Yami Gautam"], badge:"" },

  // ── HOLLYWOOD ────────────────────────────────────────────
  { id:39, title:"The Dark Knight",   year:2008, genre:"Action",    lang:"Hollywood",rating:9.0, duration:"2h 32m", img:"https://picsum.photos/seed/darkknight/400/600", wide:"https://picsum.photos/seed/dark_w/800/450",    desc:"Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy.", cast:["Christian Bale","Heath Ledger","Aaron Eckhart"], badge:"top" },
  { id:40, title:"Interstellar",      year:2014, genre:"Sci-Fi",    lang:"Hollywood",rating:8.7, duration:"2h 49m", img:"https://picsum.photos/seed/interstl/400/600",  wide:"https://picsum.photos/seed/inter_w/800/450",   desc:"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", cast:["Matthew McConaughey","Anne Hathaway","Jessica Chastain"], badge:"top" },
  { id:41, title:"Joker",             year:2019, genre:"Thriller",  lang:"Hollywood",rating:8.5, duration:"2h 2m",  img:"https://picsum.photos/seed/joker19/400/600",   wide:"https://picsum.photos/seed/jok_w/800/450",     desc:"A failed comedian descends into madness and becomes the iconic Gotham City villain.", cast:["Joaquin Phoenix","Robert De Niro","Frances Conroy"], badge:"" },
  { id:42, title:"Mad Max: Fury Road", year:2015, genre:"Action",   lang:"Hollywood",rating:8.1, duration:"2h",     img:"https://picsum.photos/seed/madmax/400/600",    wide:"https://picsum.photos/seed/mad_w/800/450",     desc:"A woman rebels against a tyrannical ruler in a post-apocalyptic wasteland.", cast:["Tom Hardy","Charlize Theron"], badge:"" },
  { id:43, title:"1917",              year:2019, genre:"War",       lang:"Hollywood",rating:8.3, duration:"1h 59m", img:"https://picsum.photos/seed/1917m/400/600",     wide:"https://picsum.photos/seed/1917_w/800/450",    desc:"Two British soldiers carry an urgent message across enemy territory in WWI.", cast:["George MacKay","Dean-Charles Chapman"], badge:"" },
  { id:44, title:"Parasite",          year:2019, genre:"Thriller",  lang:"Hollywood",rating:8.6, duration:"2h 12m", img:"https://picsum.photos/seed/parasite/400/600",  wide:"https://picsum.photos/seed/par_w/800/450",     desc:"A poor family schemes to become employed by a wealthy family, infiltrating their household.", cast:["Song Kang-ho","Lee Sun-kyun"], badge:"top" },
  { id:45, title:"Tenet",             year:2020, genre:"Sci-Fi",    lang:"Hollywood",rating:7.4, duration:"2h 30m", img:"https://picsum.photos/seed/tenet/400/600",     wide:"https://picsum.photos/seed/ten_w/800/450",     desc:"A secret agent travels through time manipulation to prevent World War III.", cast:["John David Washington","Robert Pattinson"], badge:"" },
  { id:46, title:"Top Gun: Maverick", year:2022, genre:"Action",    lang:"Hollywood",rating:8.3, duration:"2h 11m", img:"https://picsum.photos/seed/topgun/400/600",    wide:"https://picsum.photos/seed/top_w/800/450",     desc:"After decades of service, Maverick is called to train a group of younger pilots.", cast:["Tom Cruise","Miles Teller","Jennifer Connelly"], badge:"top" },
  { id:47, title:"Everything Everywhere",year:2022,genre:"Sci-Fi",  lang:"Hollywood",rating:7.8, duration:"2h 19m", img:"https://picsum.photos/seed/eeatonce/400/600",  wide:"https://picsum.photos/seed/eea_w/800/450",     desc:"A middle-aged woman journeys through the multiverse to save her family.", cast:["Michelle Yeoh","Ke Huy Quan","Jamie Lee Curtis"], badge:"" },
  { id:48, title:"Barbie",            year:2023, genre:"Comedy",    lang:"Hollywood",rating:7.0, duration:"1h 54m", img:"https://picsum.photos/seed/barbie23/400/600",  wide:"https://picsum.photos/seed/barb_w/800/450",    desc:"Barbie and Ken leave Barbieland for the real world to explore their existence.", cast:["Margot Robbie","Ryan Gosling","America Ferrera"], badge:"new" },
  { id:49, title:"The Batman",        year:2022, genre:"Action",    lang:"Hollywood",rating:7.9, duration:"2h 56m", img:"https://picsum.photos/seed/batmanr/400/600",   wide:"https://picsum.photos/seed/bat_w/800/450",     desc:"Batman investigates corruption in Gotham while facing a cunning serial killer.", cast:["Robert Pattinson","Zoë Kravitz","Paul Dano"], badge:"" },
  { id:50, title:"Avatar: Way of Water",year:2022,genre:"Sci-Fi",   lang:"Hollywood",rating:7.6, duration:"3h 12m", img:"https://picsum.photos/seed/avatar2/400/600",   wide:"https://picsum.photos/seed/ava_w/800/450",     desc:"Jake Sully and Neytiri's family face a new threat that forces them to explore the oceans of Pandora.", cast:["Sam Worthington","Zoe Saldana","Sigourney Weaver"], badge:"" },

  // ── MORE MOVIES ──────────────────────────────────────────
  { id:51, title:"Vikram",            year:2022, genre:"Action",    lang:"Telugu",   rating:8.4, duration:"2h 54m", img:"https://picsum.photos/seed/vikram22/400/600",  wide:"https://picsum.photos/seed/vik_w/800/450",     desc:"A retired cop investigates a string of masked killings related to a drug cartel.", cast:["Kamal Haasan","Vijay Sethupathi","Fahadh Faasil"], badge:"" },
  { id:52, title:"Master",            year:2021, genre:"Action",    lang:"Telugu",   rating:7.8, duration:"2h 59m", img:"https://picsum.photos/seed/master21/400/600",  wide:"https://picsum.photos/seed/mast_w/800/450",    desc:"An alcoholic professor is sent to a juvenile school where a ruthless gangster uses children for crime.", cast:["Vijay","Vijay Sethupathi","Malavika Mohanan"], badge:"" },
  { id:53, title:"Jawan",             year:2023, genre:"Action",    lang:"Hindi",    rating:7.1, duration:"2h 49m", img:"https://picsum.photos/seed/jawan23/400/600",   wide:"https://picsum.photos/seed/jaw_w/800/450",     desc:"A high-octane thriller about a man driven to right the wrongs in society.", cast:["Shah Rukh Khan","Nayanthara","Vijay Sethupathi"], badge:"new" },
  { id:54, title:"Kantara",           year:2022, genre:"Drama",     lang:"Telugu",   rating:8.5, duration:"2h 28m", img:"https://image.tmdb.org/t/p/w500/jIsKmkxMzdCZ0Ux1GVSnu8m6Na6.jpg", wide:"https://picsum.photos/seed/kan_w/800/450",     desc:"A rebellious man who lives with nature clashes with an ambitious forest officer.", cast:["Rishab Shetty","Kishore","Sapthami Gowda"], badge:"top" },
  { id:55, title:"Ponniyin Selvan",   year:2022, genre:"Historical",lang:"Hindi",    rating:7.6, duration:"2h 47m", img:"https://picsum.photos/seed/ponniyin/400/600",  wide:"https://picsum.photos/seed/pon_w/800/450",     desc:"An adaptation of the classic Tamil novel about the Chola dynasty in 10th century AD.", cast:["Vikram","Aishwarya Rai","Karthi"], badge:"" },
  { id:56, title:"Spider-Man: NWH",   year:2021, genre:"Action",    lang:"Hollywood",rating:8.3, duration:"2h 28m", img:"https://picsum.photos/seed/spiderman/400/600", wide:"https://picsum.photos/seed/spi_w/800/450",     desc:"Peter Parker seeks help from Doctor Strange, setting off a multiverse of madness.", cast:["Tom Holland","Zendaya","Benedict Cumberbatch"], badge:"" },
  { id:57, title:"Black Panther",     year:2018, genre:"Action",    lang:"Hollywood",rating:7.3, duration:"2h 14m", img:"https://picsum.photos/seed/blackpan/400/600",  wide:"https://picsum.photos/seed/bla_w/800/450",     desc:"T'Challa returns home to Wakanda and is challenged for the throne by a powerful adversary.", cast:["Chadwick Boseman","Michael B. Jordan"], badge:"" },
  { id:58, title:"Sarpatta Parambarai",year:2021,genre:"Sports",   lang:"Telugu",   rating:8.4, duration:"3h 1m",  img:"https://picsum.photos/seed/sarpatta/400/600",  wide:"https://picsum.photos/seed/sarp_w/800/450",    desc:"Set in 1970s Chennai, a young man rises through the boxing world of competing clans.", cast:["Arya","Pasupathy","John Kokken"], badge:"" },
  { id:59, title:"Mahaan",            year:2022, genre:"Action",    lang:"Hindi",    rating:7.5, duration:"2h 46m", img:"https://picsum.photos/seed/mahaan/400/600",    wide:"https://picsum.photos/seed/mah_w/800/450",     desc:"A man abandons his principles to build a liquor business, unaware of the consequences.", cast:["Vikram","Dhruv Vikram","Simran"], badge:"" },
  { id:60, title:"Doctor Strange MoM",year:2022, genre:"Fantasy",  lang:"Hollywood",rating:6.9, duration:"2h 6m",  img:"https://picsum.photos/seed/drstrange/400/600", wide:"https://picsum.photos/seed/drs_w/800/450",     desc:"Doctor Strange teams with a mysterious new ally to face a powerful enemy.", cast:["Benedict Cumberbatch","Elizabeth Olsen"], badge:"" },

  // ── RECOMMENDED ─────────────────────────────────────────
  { id:61, title:"The Shawshank Redemption",year:1994,genre:"Drama",lang:"Hollywood",rating:9.3,duration:"2h 22m",img:"https://picsum.photos/seed/shawshank/400/600",wide:"https://picsum.photos/seed/shaw_w/800/450",desc:"Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.",cast:["Tim Robbins","Morgan Freeman"],badge:"top"},
  { id:62, title:"Schindler's List",  year:1993, genre:"History",   lang:"Hollywood",rating:9.0, duration:"3h 15m", img:"https://picsum.photos/seed/schindler/400/600", wide:"https://picsum.photos/seed/sch_w/800/450",     desc:"Oskar Schindler saves the lives of more than a thousand Polish Jews during the Holocaust.", cast:["Liam Neeson","Ralph Fiennes","Ben Kingsley"], badge:"" },
  { id:63, title:"Forrest Gump",      year:1994, genre:"Drama",     lang:"Hollywood",rating:8.8, duration:"2h 22m", img:"https://picsum.photos/seed/forrest/400/600",   wide:"https://picsum.photos/seed/for_w/800/450",     desc:"The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man.", cast:["Tom Hanks","Robin Wright"], badge:"" },
  { id:64, title:"The Godfather",     year:1972, genre:"Crime",     lang:"Hollywood",rating:9.2, duration:"2h 55m", img:"https://picsum.photos/seed/godfather/400/600", wide:"https://picsum.photos/seed/god_w/800/450",     desc:"The aging patriarch of an organized crime dynasty transfers control to his reluctant son.", cast:["Marlon Brando","Al Pacino"], badge:"top" },
  { id:65, title:"Fight Club",        year:1999, genre:"Thriller",  lang:"Hollywood",rating:8.8, duration:"2h 19m", img:"https://picsum.photos/seed/fightclub/400/600", wide:"https://picsum.photos/seed/fig_w/800/450",     desc:"An insomniac office worker and a soap salesman build a global organization to serve as an outlet for their rage.", cast:["Brad Pitt","Edward Norton"], badge:"" },
  { id:66, title:"Pulp Fiction",      year:1994, genre:"Crime",     lang:"Hollywood",rating:8.9, duration:"2h 34m", img:"https://picsum.photos/seed/pulpfic/400/600",   wide:"https://picsum.photos/seed/pul_w/800/450",     desc:"The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence.", cast:["John Travolta","Samuel L. Jackson","Uma Thurman"], badge:"" },
  { id:67, title:"Goodfellas",        year:1990, genre:"Crime",     lang:"Hollywood",rating:8.7, duration:"2h 26m", img:"https://picsum.photos/seed/goodfell/400/600",  wide:"https://picsum.photos/seed/goo_w/800/450",     desc:"The story of Henry Hill and his life in the mob, covering his rise and fall.", cast:["Robert De Niro","Ray Liotta","Joe Pesci"], badge:"" },
  { id:68, title:"The Matrix",        year:1999, genre:"Sci-Fi",    lang:"Hollywood",rating:8.7, duration:"2h 16m", img:"https://picsum.photos/seed/matrix99/400/600",  wide:"https://picsum.photos/seed/mat_w/800/450",     desc:"A computer hacker learns that reality is a simulation and joins a rebellion against its AI controllers.", cast:["Keanu Reeves","Laurence Fishburne","Carrie-Anne Moss"], badge:"" },
  { id:69, title:"Gladiator",         year:2000, genre:"Action",    lang:"Hollywood",rating:8.5, duration:"2h 35m", img:"https://picsum.photos/seed/gladiator/400/600", wide:"https://picsum.photos/seed/gla_w/800/450",     desc:"A Roman general seeks revenge after being betrayed and sold into slavery.", cast:["Russell Crowe","Joaquin Phoenix"], badge:"" },
  { id:70, title:"V for Vendetta",    year:2005, genre:"Action",    lang:"Hollywood",rating:8.2, duration:"2h 12m", img:"https://picsum.photos/seed/vvendetta/400/600", wide:"https://picsum.photos/seed/vv_w/800/450",      desc:"In a future fascist Britain, a masked freedom fighter rescues a young woman from secret police.", cast:["Hugo Weaving","Natalie Portman"], badge:"" },

  // ── EXTRA TO REACH 120+ ──────────────────────────────────
  { id:71,  title:"No Time to Die",   year:2021, genre:"Action",    lang:"Hollywood",rating:7.3, duration:"2h 43m", img:"https://picsum.photos/seed/notimetd/400/600",  wide:"https://picsum.photos/seed/no_w/800/450",      desc:"James Bond comes out of retirement for one last mission.", cast:["Daniel Craig","Léa Seydoux","Ana de Armas"], badge:"" },
  { id:72,  title:"Shang-Chi",        year:2021, genre:"Action",    lang:"Hollywood",rating:7.4, duration:"2h 12m", img:"https://picsum.photos/seed/shangchi/400/600",  wide:"https://picsum.photos/seed/sha_w/800/450",      desc:"Shang-Chi must confront the past he thought he left behind.", cast:["Simu Liu","Awkwafina","Tony Leung"], badge:"" },
  { id:73,  title:"Eternals",         year:2021, genre:"Fantasy",   lang:"Hollywood",rating:6.3, duration:"2h 37m", img:"https://picsum.photos/seed/eternals/400/600",  wide:"https://picsum.photos/seed/eter_w/800/450",    desc:"The Eternals, an immortal alien race, reveal themselves after centuries.", cast:["Angelina Jolie","Salma Hayek","Richard Madden"], badge:"" },
  { id:74,  title:"Free Guy",         year:2021, genre:"Comedy",    lang:"Hollywood",rating:7.1, duration:"1h 55m", img:"https://picsum.photos/seed/freeguy/400/600",   wide:"https://picsum.photos/seed/free_w/800/450",    desc:"A bank teller discovers he is an NPC in an open-world video game.", cast:["Ryan Reynolds","Jodie Comer"], badge:"" },
  { id:75,  title:"The Suicide Squad",year:2021, genre:"Action",    lang:"Hollywood",rating:7.2, duration:"2h 12m", img:"https://picsum.photos/seed/suicides/400/600",  wide:"https://picsum.photos/seed/sui_w/800/450",     desc:"Supervillains are sent on a mission to destroy a secret Nazi lab.", cast:["Idris Elba","Margot Robbie","John Cena"], badge:"" },
  { id:76,  title:"Luca",             year:2021, genre:"Animation", lang:"Hollywood",rating:7.4, duration:"1h 35m", img:"https://picsum.photos/seed/luca21/400/600",    wide:"https://picsum.photos/seed/luc_w/800/450",     desc:"A sea monster and his friend experience an unforgettable summer in the Italian Riviera.", cast:["Jacob Tremblay","Jack Dylan Grazer"], badge:"" },
  { id:77,  title:"Encanto",          year:2021, genre:"Animation", lang:"Hollywood",rating:7.2, duration:"1h 39m", img:"https://picsum.photos/seed/encanto/400/600",   wide:"https://picsum.photos/seed/enc_w/800/450",     desc:"A young woman in a Colombian family blessed with magical gifts is the only one without powers.", cast:["Stephanie Beatriz","John Leguizamo"], badge:"" },
  { id:78,  title:"Turning Red",      year:2022, genre:"Animation", lang:"Hollywood",rating:7.0, duration:"1h 40m", img:"https://picsum.photos/seed/turningr/400/600",  wide:"https://picsum.photos/seed/tur_w/800/450",     desc:"A 13-year-old girl suddenly transforms into a giant red panda whenever she gets too excited.", cast:["Rosalie Chiang","Sandra Oh"], badge:"" },
  { id:79,  title:"The Menu",         year:2022, genre:"Thriller",  lang:"Hollywood",rating:7.2, duration:"1h 46m", img:"https://picsum.photos/seed/themenu/400/600",   wide:"https://picsum.photos/seed/men_w/800/450",     desc:"A couple travels to a remote island to eat at an exclusive restaurant with a dark chef.", cast:["Ralph Fiennes","Anya Taylor-Joy"], badge:"" },
  { id:80,  title:"Glass Onion",      year:2022, genre:"Mystery",   lang:"Hollywood",rating:7.1, duration:"2h 19m", img:"https://picsum.photos/seed/glassonion/400/600", wide:"https://picsum.photos/seed/glas_w/800/450",   desc:"Benoit Blanc goes to Greece to solve a new mind-bending mystery on a private island.", cast:["Daniel Craig","Edward Norton","Janelle Monáe"], badge:"" },
  { id:81,  title:"The Northman",     year:2022, genre:"Action",    lang:"Hollywood",rating:7.1, duration:"2h 17m", img:"https://picsum.photos/seed/northman/400/600",  wide:"https://picsum.photos/seed/nor_w/800/450",     desc:"A Viking prince seeks revenge for the murder of his father.", cast:["Alexander Skarsgård","Anya Taylor-Joy","Nicole Kidman"], badge:"" },
  { id:82,  title:"Nope",             year:2022, genre:"Horror",    lang:"Hollywood",rating:7.0, duration:"2h 10m", img:"https://picsum.photos/seed/nope22/400/600",    wide:"https://picsum.photos/seed/nop_w/800/450",     desc:"Residents in an isolated Californian gulch witness a mysterious phenomenon in the sky.", cast:["Daniel Kaluuya","Keke Palmer"], badge:"" },
  { id:83,  title:"Bhool Bhulaiyaa 2",year:2022, genre:"Horror",    lang:"Hindi",    rating:7.0, duration:"2h 23m", img:"https://picsum.photos/seed/bhoolbh/400/600",   wide:"https://picsum.photos/seed/bho_w/800/450",     desc:"A woman's identity crisis intertwines with the ghost of Manjulika.", cast:["Kartik Aaryan","Kiara Advani","Tabu"], badge:"" },
  { id:84,  title:"RRR x Jai Bhim",   year:2022, genre:"Drama",     lang:"Telugu",   rating:7.8, duration:"2h 26m", img:"https://picsum.photos/seed/jaibhim/400/600",   wide:"https://picsum.photos/seed/jai_w/800/450",     desc:"A tribal man is falsely arrested and a courageous lawyer fights for justice.", cast:["Suriya","Lijomol Jose","Manikandan"], badge:"" },
  { id:85,  title:"Major",            year:2022, genre:"Biography", lang:"Telugu",   rating:8.2, duration:"2h 26m", img:"https://picsum.photos/seed/major22/400/600",   wide:"https://picsum.photos/seed/maj_w/800/450",     desc:"The life story of Major Sandeep Unnikrishnan, who sacrificed his life in the 26/11 attacks.", cast:["Adivi Sesh","Saiee Manjrekar"], badge:"" },
  { id:86,  title:"PS-1",             year:2022, genre:"Historical",lang:"Telugu",   rating:7.6, duration:"2h 47m", img:"https://picsum.photos/seed/ps1m/400/600",      wide:"https://picsum.photos/seed/ps1_w/800/450",     desc:"Adaptation of Kalki's classic novel about the Chola dynasty.", cast:["Vikram","Aishwarya Rai","Trisha"], badge:"" },
  { id:87,  title:"Garuda Gamana",    year:2021, genre:"Crime",     lang:"Telugu",   rating:7.9, duration:"2h 11m", img:"https://picsum.photos/seed/garuda/400/600",    wide:"https://picsum.photos/seed/gar_w/800/450",     desc:"A young criminal's rise through the Mangalore underworld.", cast:["Shine Tom Chacko","Raj B. Shetty"], badge:"" },
  { id:88,  title:"777 Charlie",      year:2022, genre:"Drama",     lang:"Telugu",   rating:8.7, duration:"2h 45m", img:"https://picsum.photos/seed/charlie777/400/600",wide:"https://picsum.photos/seed/cha_w/800/450",     desc:"An emotionally closed man's life changes dramatically after bonding with a stray dog.", cast:["Rakshit Shetty"], badge:"" },
  { id:89,  title:"Dasvi",            year:2022, genre:"Comedy",    lang:"Hindi",    rating:7.6, duration:"2h 4m",  img:"https://picsum.photos/seed/dasvi22/400/600",   wide:"https://picsum.photos/seed/das_w/800/450",     desc:"A corrupt politician finds redemption while studying for his 10th grade exams in jail.", cast:["Abhishek Bachchan","Nimrat Kaur","Yami Gautam"], badge:"" },
  { id:90,  title:"Gehraiyaan",       year:2022, genre:"Romance",   lang:"Hindi",    rating:6.6, duration:"2h 13m", img:"https://picsum.photos/seed/gehraiy/400/600",   wide:"https://picsum.photos/seed/geh_w/800/450",     desc:"A yoga instructor enters a complex extramarital affair that spirals into dark territory.", cast:["Deepika Padukone","Siddhant Chaturvedi"], badge:"" },
  { id:91,  title:"Attack",           year:2022, genre:"Action",    lang:"Hindi",    rating:6.1, duration:"1h 54m", img:"https://picsum.photos/seed/attack22/400/600",  wide:"https://picsum.photos/seed/att_w/800/450",     desc:"A super soldier with an AI-powered exoskeleton takes on a hijacking.", cast:["John Abraham","Jacqueline Fernandez"], badge:"" },
  { id:92,  title:"Gangubai Kathiawadi",year:2022,genre:"Drama",    lang:"Hindi",    rating:7.5, duration:"2h 33m", img:"https://picsum.photos/seed/gangubai/400/600",  wide:"https://picsum.photos/seed/gan_w/800/450",     desc:"The story of a girl from Kathiawad who becomes the madam of Kamathipura.", cast:["Alia Bhatt","Shantanu Maheshwari","Vijay Raaz"], badge:"" },
  { id:93,  title:"Kashmir Files",    year:2022, genre:"Drama",     lang:"Hindi",    rating:8.3, duration:"2h 50m", img:"https://picsum.photos/seed/kashmir/400/600",   wide:"https://picsum.photos/seed/kas_w/800/450",     desc:"A young man uncovers the truth behind the exodus of Kashmiri Hindus in 1990.", cast:["Anupam Kher","Mithun Chakraborty","Pallavi Joshi"], badge:"" },
  { id:94,  title:"Vikram Vedha H",   year:2022, genre:"Action",    lang:"Hindi",    rating:7.2, duration:"2h 37m", img:"https://picsum.photos/seed/vikvedha/400/600",  wide:"https://picsum.photos/seed/viv_w/800/450",     desc:"A fearless police officer sets out to track down a gangster who tells him moral stories.", cast:["Hrithik Roshan","Saif Ali Khan","Radhika Apte"], badge:"" },
  { id:95,  title:"Radhe Shyam",      year:2022, genre:"Romance",   lang:"Telugu",   rating:6.1, duration:"2h 37m", img:"https://picsum.photos/seed/radhesha/400/600",  wide:"https://picsum.photos/seed/rad_w/800/450",     desc:"A love story set against the backdrop of 1970s Europe.", cast:["Prabhas","Pooja Hegde"], badge:"" },
  { id:96,  title:"Bheemla Nayak",    year:2022, genre:"Action",    lang:"Telugu",   rating:7.6, duration:"2h 43m", img:"https://picsum.photos/seed/bheemla/400/600",   wide:"https://picsum.photos/seed/bhe_w/800/450",     desc:"The lives of two men collide after a clash of egos leads to catastrophic consequences.", cast:["Pawan Kalyan","Rana Daggubati","Nithya Menen"], badge:"" },
  { id:97,  title:"Saaho",            year:2019, genre:"Action",    lang:"Telugu",   rating:5.4, duration:"2h 49m", img:"https://picsum.photos/seed/saaho/400/600",     wide:"https://picsum.photos/seed/saah_w/800/450",    desc:"An investigation into a hi-tech robbery intersects with a dangerous underworld.", cast:["Prabhas","Shraddha Kapoor"], badge:"" },
  { id:98,  title:"Doctor",           year:2021, genre:"Action",    lang:"Telugu",   rating:7.1, duration:"2h 32m", img:"https://picsum.photos/seed/doctor21/400/600",  wide:"https://picsum.photos/seed/doc_w/800/450",     desc:"A special forces officer goes undercover as a doctor to bust a human trafficking ring.", cast:["Sivakarthikeyan","Priyanka Arul Mohan"], badge:"" },
  { id:99,  title:"Annaatthe",        year:2021, genre:"Drama",     lang:"Telugu",   rating:5.7, duration:"2h 59m", img:"https://picsum.photos/seed/annaat/400/600",    wide:"https://picsum.photos/seed/ann_w/800/450",     desc:"An over-protective brother's life turns around when his sister marries and moves away.", cast:["Rajinikanth","Nayanthara","Khushbu"], badge:"" },
  { id:100, title:"Maanaadu",         year:2021, genre:"Thriller",  lang:"Telugu",   rating:8.1, duration:"2h 34m", img:"https://picsum.photos/seed/maanaadu/400/600",  wide:"https://picsum.photos/seed/maan_w/800/450",    desc:"A man repeatedly returns to the same time period where he is killed.", cast:["Silambarasan","Kalyani Priyadarshan"], badge:"new" },
  { id:101, title:"Cobra",            year:2022, genre:"Thriller",  lang:"Telugu",   rating:6.0, duration:"2h 47m", img:"https://picsum.photos/seed/cobra22/400/600",   wide:"https://picsum.photos/seed/cob_w/800/450",     desc:"A genius mathematician leads a double life as an international assassin.", cast:["Vikram","KGF Irfan"], badge:"" },
  { id:102, title:"Varisu",           year:2023, genre:"Drama",     lang:"Telugu",   rating:6.7, duration:"2h 57m", img:"https://picsum.photos/seed/varisu/400/600",    wide:"https://picsum.photos/seed/var_w/800/450",     desc:"A fun-loving young man must take over his father's business empire.", cast:["Thalapathy Vijay","Rashmika Mandanna"], badge:"" },
  { id:103, title:"Tu Jhoothi Main Makkar",year:2023,genre:"Romance",lang:"Hindi",  rating:6.8, duration:"2h 32m", img:"https://picsum.photos/seed/tujhoo/400/600",    wide:"https://picsum.photos/seed/tuj_w/800/450",     desc:"A specialist in breakups takes on a new client and falls for her.", cast:["Ranbir Kapoor","Shraddha Kapoor"], badge:"" },
  { id:104, title:"Tiger 3",          year:2023, genre:"Action",    lang:"Hindi",    rating:5.4, duration:"2h 36m", img:"https://picsum.photos/seed/tiger3/400/600",    wide:"https://picsum.photos/seed/tig_w/800/450",     desc:"RAW agent Tiger and his wife Zoya fight a rogue ISI agent.", cast:["Salman Khan","Katrina Kaif"], badge:"new" },
  { id:105, title:"Sam Bahadur",      year:2023, genre:"Biography", lang:"Hindi",    rating:7.7, duration:"2h 30m", img:"https://picsum.photos/seed/sambahad/400/600",  wide:"https://picsum.photos/seed/sba_w/800/450",     desc:"The story of Field Marshal Sam Manekshaw, India's first Field Marshal.", cast:["Vicky Kaushal","Fatima Sana Shaikh"], badge:"new" },
  { id:106, title:"12th Fail",        year:2023, genre:"Drama",     lang:"Hindi",    rating:9.1, duration:"2h 27m", img:"https://image.tmdb.org/t/p/w500/eebUPRI4Z5e1Z7Hev4JZAwMIFkX.jpg", wide:"https://picsum.photos/seed/12f_w/800/450",     desc:"The true story of IPS officer Manoj Kumar Sharma who cleared UPSC despite failing 12th grade.", cast:["Vikrant Massey","Medha Shankar"], badge:"top" },
  { id:107, title:"Mission Raniganj", year:2023, genre:"Drama",     lang:"Hindi",    rating:7.8, duration:"2h 11m", img:"https://picsum.photos/seed/mranig/400/600",    wide:"https://picsum.photos/seed/mra_w/800/450",     desc:"The true story of the Raniganj Coalfields Rescue of 1989.", cast:["Akshay Kumar","Parineeti Chopra"], badge:"" },
  { id:108, title:"Bawaal",           year:2023, genre:"Romance",   lang:"Hindi",    rating:6.0, duration:"2h 27m", img:"https://picsum.photos/seed/bawaal/400/600",    wide:"https://picsum.photos/seed/baw_w/800/450",     desc:"A self-obsessed teacher travels to Europe with his wife and finds deeper meaning.", cast:["Varun Dhawan","Janhvi Kapoor"], badge:"" },
  { id:109, title:"The Whale",        year:2022, genre:"Drama",     lang:"Hollywood",rating:7.7, duration:"1h 57m", img:"https://picsum.photos/seed/whale22/400/600",   wide:"https://picsum.photos/seed/wha_w/800/450",     desc:"A reclusive, morbidly obese English teacher attempts to reconnect with his estranged daughter.", cast:["Brendan Fraser","Sadie Sink"], badge:"" },
  { id:110, title:"Tar",              year:2022, genre:"Drama",     lang:"Hollywood",rating:7.4, duration:"2h 38m", img:"https://picsum.photos/seed/tar22/400/600",     wide:"https://picsum.photos/seed/tar_w/800/450",     desc:"Lydia Tár, one of the greatest living composer-conductors, is on the brink of a historic career milestone.", cast:["Cate Blanchett","Noémie Merlant"], badge:"" },
  { id:111, title:"The Banshees",     year:2022, genre:"Drama",     lang:"Hollywood",rating:7.7, duration:"1h 54m", img:"https://picsum.photos/seed/banshees/400/600",  wide:"https://picsum.photos/seed/ban_w/800/450",     desc:"Two lifelong friends fall into an irreconcilable dispute on a small Irish island.", cast:["Colin Farrell","Brendan Gleeson"], badge:"" },
  { id:112, title:"M3GAN",            year:2022, genre:"Horror",    lang:"Hollywood",rating:6.3, duration:"1h 42m", img:"https://picsum.photos/seed/m3gan/400/600",     wide:"https://picsum.photos/seed/m3g_w/800/450",     desc:"A robotics engineer creates a lifelike AI doll that develops sinister self-preservation instincts.", cast:["Allison Williams","Violet McGraw"], badge:"" },
  { id:113, title:"Knock at the Cabin",year:2023,genre:"Thriller",  lang:"Hollywood",rating:6.4, duration:"1h 40m", img:"https://picsum.photos/seed/cabinknk/400/600",  wide:"https://picsum.photos/seed/cab_w/800/450",     desc:"A family on vacation is taken hostage by strangers who claim an apocalypse is coming.", cast:["Dave Bautista","Jonathan Groff"], badge:"" },
  { id:114, title:"Creed III",        year:2023, genre:"Sports",    lang:"Hollywood",rating:7.1, duration:"1h 56m", img:"https://picsum.photos/seed/creed3/400/600",    wide:"https://picsum.photos/seed/cre_w/800/450",     desc:"Adonis Creed faces off against Damian Anderson, his childhood friend turned rival.", cast:["Michael B. Jordan","Tessa Thompson","Jonathan Majors"], badge:"" },
  { id:115, title:"Dungeons & Dragons",year:2023,genre:"Fantasy",   lang:"Hollywood",rating:7.2, duration:"2h 14m", img:"https://picsum.photos/seed/dnd2023/400/600",   wide:"https://picsum.photos/seed/dnd_w/800/450",     desc:"A charming thief and a band of unlikely adventurers undertake an epic quest.", cast:["Chris Pine","Michelle Rodriguez","Hugh Grant"], badge:"" },
  { id:116, title:"John Wick 4",      year:2023, genre:"Action",    lang:"Hollywood",rating:7.7, duration:"2h 49m", img:"https://picsum.photos/seed/johnwick4/400/600", wide:"https://picsum.photos/seed/joh_w/800/450",     desc:"John Wick uncovers a path to defeating the High Table but must face a formidable new enemy.", cast:["Keanu Reeves","Donnie Yen","Bill Skarsgård"], badge:"top" },
  { id:117, title:"Fast X",           year:2023, genre:"Action",    lang:"Hollywood",rating:5.9, duration:"2h 21m", img:"https://picsum.photos/seed/fastx/400/600",     wide:"https://picsum.photos/seed/fas_w/800/450",     desc:"Dom Toretto and his family are targeted by the revenge-seeking son of drug lord Hernan Reyes.", cast:["Vin Diesel","Jason Momoa","Charlize Theron"], badge:"" },
  { id:118, title:"Ant-Man 3",        year:2023, genre:"Action",    lang:"Hollywood",rating:6.3, duration:"2h 4m",  img:"https://picsum.photos/seed/antman3/400/600",   wide:"https://picsum.photos/seed/ant_w/800/450",     desc:"Scott Lang and Hope Van Dyne are thrust into the Quantum Realm alongside Kang the Conqueror.", cast:["Paul Rudd","Evangeline Lilly","Jonathan Majors"], badge:"" },
  { id:119, title:"Indiana Jones 5",  year:2023, genre:"Adventure", lang:"Hollywood",rating:6.5, duration:"2h 34m", img:"https://picsum.photos/seed/indyjones/400/600", wide:"https://picsum.photos/seed/ind_w/800/450",     desc:"Archaeologist Indiana Jones races against time to retrieve a legendary dial.", cast:["Harrison Ford","Phoebe Waller-Bridge","Mads Mikkelsen"], badge:"" },
  { id:120, title:"Gran Turismo",     year:2023, genre:"Sports",    lang:"Hollywood",rating:7.3, duration:"2h 14m", img:"https://picsum.photos/seed/grantur/400/600",   wide:"https://picsum.photos/seed/gran_w/800/450",     desc:"The story of Jann Mardenborough, a teenage Gran Turismo player who became a real racing driver.", cast:["Archie Madekwe","David Harbour","Orlando Bloom"], badge:"" },
  { id:121, title:"Sound of Freedom", year:2023, genre:"Thriller",  lang:"Hollywood",rating:7.7, duration:"2h 11m", img:"https://picsum.photos/seed/soundfree/400/600", wide:"https://picsum.photos/seed/sou_w/800/450",     desc:"A federal agent risks his life to rescue children from traffickers in Colombia.", cast:["Jim Caviezel","Mira Sorvino"], badge:"new" },
  { id:122, title:"Haunted Mansion",  year:2023, genre:"Horror",    lang:"Hollywood",rating:5.7, duration:"2h 3m",  img:"https://picsum.photos/seed/hauntman/400/600",  wide:"https://picsum.photos/seed/hau_w/800/450",     desc:"A scientist and a single mother seek help from a priest and ghostbuster.", cast:["LaKeith Stanfield","Tiffany Haddish"], badge:"" },
  { id:123, title:"Miraculous",       year:2023, genre:"Animation", lang:"Hollywood",rating:6.8, duration:"1h 57m", img:"https://picsum.photos/seed/miracul/400/600",   wide:"https://picsum.photos/seed/mir_w/800/450",     desc:"Marinette and Adrien must protect Paris from Hawk Moth's supervillains.", cast:["Cristina Vee","Bryce Papenbrook"], badge:"" },
  { id:124, title:"Teenage Mutant Ninja Turtles",year:2023,genre:"Animation",lang:"Hollywood",rating:7.0,duration:"1h 39m",img:"https://picsum.photos/seed/tmnt23/400/600",wide:"https://picsum.photos/seed/tmn_w/800/450",desc:"The Ninja Turtles battle an army of mutants to prove themselves as heroes.",cast:["Micah Abbey","Shamon Brown Jr."],badge:"new"},
  { id:125, title:"Blue Beetle",      year:2023, genre:"Action",    lang:"Hollywood",rating:6.2, duration:"2h 7m",  img:"https://picsum.photos/seed/bluebet/400/600",   wide:"https://picsum.photos/seed/blu_w/800/450",     desc:"Jaime Reyes bonds with an alien relic that bestows him with a suit of armor.", cast:["Xolo Maridueña","Bruna Marquezine"], badge:"" },
  { id:126, title:"Hi Nanna",         year:2023, genre:"Drama",     lang:"Telugu",   rating:8.2, duration:"2h 35m", img:"https://image.tmdb.org/t/p/w500/hhMLtq9m1aK0dpY9Wcq26XeDH2z.jpg", wide:"https://picsum.photos/seed/hinanna_w/800/450", desc:"A single father and his daughter build a warm world together until a long-lost love changes everything.", cast:["Nani","Mrunal Thakur","Kiara Khanna"], badge:"new" },
  { id:127, title:"Baby",             year:2023, genre:"Romance",   lang:"Telugu",   rating:7.9, duration:"2h 57m", img:"https://picsum.photos/seed/baby23/400/600",    wide:"https://picsum.photos/seed/baby23_w/800/450",  desc:"A teenage love story grows complicated when ambition, insecurity and betrayal pull three lives apart.", cast:["Anand Deverakonda","Vaishnavi Chaitanya","Viraj Ashwin"], badge:"" },
  { id:128, title:"MAD",              year:2023, genre:"Comedy",    lang:"Telugu",   rating:7.4, duration:"2h 7m",  img:"https://picsum.photos/seed/mad23/400/600",     wide:"https://picsum.photos/seed/mad23_w/800/450",   desc:"Three engineering college friends stumble into love, fights and chaos during their wild campus years.", cast:["Narne Nithiin","Sangeeth Shobhan","Ram Nithin"], badge:"" },
  { id:129, title:"Virupaksha",       year:2023, genre:"Mystery",   lang:"Telugu",   rating:7.8, duration:"2h 26m", img:"https://picsum.photos/seed/virupaksha/400/600",wide:"https://picsum.photos/seed/virupaksha_w/800/450", desc:"A young man investigates a string of eerie deaths in a village trapped by fear and dark rituals.", cast:["Sai Dharam Tej","Samyuktha Menon"], badge:"" },
  { id:130, title:"Dasara",           year:2023, genre:"Action",    lang:"Telugu",   rating:7.5, duration:"2h 36m", img:"https://picsum.photos/seed/dasara23/400/600",  wide:"https://picsum.photos/seed/dasara23_w/800/450", desc:"Set in a coal-mining village, friendship and revenge collide in a brutal fight for dignity and power.", cast:["Nani","Keerthy Suresh","Dheekshith Shetty"], badge:"" },
  { id:131, title:"Bhagavanth Kesari",year:2023,genre:"Action",    lang:"Telugu",   rating:6.9, duration:"2h 44m", img:"https://picsum.photos/seed/bkesari/400/600",   wide:"https://picsum.photos/seed/bkesari_w/800/450", desc:"An ex-policeman becomes a fierce guardian and mentor to a young woman preparing for a dangerous challenge.", cast:["Nandamuri Balakrishna","Sreeleela","Kajal Aggarwal"], badge:"" },
  { id:132, title:"Guntur Kaaram",    year:2024, genre:"Action",    lang:"Telugu",   rating:6.0, duration:"2h 39m", img:"https://picsum.photos/seed/gunturkaaram/400/600", wide:"https://picsum.photos/seed/gunturkaaram_w/800/450", desc:"A fiery man from Guntur is dragged into political intrigue and a painful family reckoning.", cast:["Mahesh Babu","Sreeleela","Meenakshi Chaudhary"], badge:"new" },
  { id:133, title:"Tillu Square",     year:2024, genre:"Comedy",    lang:"Telugu",   rating:7.2, duration:"2h 4m",  img:"https://picsum.photos/seed/tillusquare/400/600", wide:"https://picsum.photos/seed/tillusquare_w/800/450", desc:"DJ Tillu lands in another outrageous misadventure when romance and crime spiral out of control.", cast:["Siddhu Jonnalagadda","Anupama Parameswaran"], badge:"new" },
  { id:134, title:"Gaami",            year:2024, genre:"Adventure", lang:"Telugu",   rating:7.9, duration:"2h 25m", img:"https://picsum.photos/seed/gaami24/400/600",   wide:"https://picsum.photos/seed/gaami24_w/800/450", desc:"A mysterious wanderer begins an epic spiritual journey across the Himalayas to confront his past.", cast:["Vishwak Sen","Chandini Chowdary"], badge:"new" },
  { id:135, title:"Eagle",            year:2024, genre:"Action",    lang:"Telugu",   rating:6.6, duration:"2h 36m", img:"https://picsum.photos/seed/eagle24/400/600",   wide:"https://picsum.photos/seed/eagle24_w/800/450", desc:"A feared assassin with a hidden conscience resurfaces when a journalist uncovers his secret mission.", cast:["Ravi Teja","Anupama Parameswaran","Kavya Thapar"], badge:"new" },
  { id:136, title:"Hanuman",          year:2024, genre:"Fantasy",   lang:"Telugu",   rating:7.8, duration:"2h 38m", img:"https://picsum.photos/seed/hanuman24/400/600", wide:"https://picsum.photos/seed/hanuman24_w/800/450", desc:"A small-town youth gains extraordinary powers linked to Hanuman and rises to protect his people.", cast:["Teja Sajja","Amritha Aiyer","Varalaxmi Sarathkumar"], badge:"top" },
  { id:137, title:"Family Star",      year:2024, genre:"Romance",   lang:"Telugu",   rating:5.9, duration:"2h 35m", img:"https://picsum.photos/seed/familystar/400/600", wide:"https://picsum.photos/seed/familystar_w/800/450", desc:"A middle-class man tries to balance love, family pressure and ambition while holding everyone together.", cast:["Vijay Deverakonda","Mrunal Thakur"], badge:"new" },
  { id:138, title:"Lucky Baskhar",    year:2024, genre:"Thriller",  lang:"Telugu",   rating:8.0, duration:"2h 28m", img:"https://picsum.photos/seed/luckybaskhar/400/600", wide:"https://picsum.photos/seed/luckybaskhar_w/800/450", desc:"An ordinary bank employee is drawn into a dangerous web of money, ambition and secrets in the 1980s.", cast:["Dulquer Salmaan","Meenakshi Chaudhary"], badge:"new" },
  { id:139, title:"Saripodhaa Sanivaaram",year:2024,genre:"Action",lang:"Telugu",   rating:7.4, duration:"2h 50m", img:"https://picsum.photos/seed/saripodhaa/400/600", wide:"https://picsum.photos/seed/saripodhaa_w/800/450", desc:"A man who suppresses his rage all week unleashes it on Saturdays against those who prey on the weak.", cast:["Nani","Priyanka Mohan","S. J. Suryah"], badge:"new" },
  { id:140, title:"Mathu Vadalara 2", year:2024, genre:"Comedy",    lang:"Telugu",   rating:7.3, duration:"2h 19m", img:"https://picsum.photos/seed/mathu2/400/600",    wide:"https://picsum.photos/seed/mathu2_w/800/450",  desc:"Chaos follows two impulsive friends again when a fresh crime mystery turns their lives upside down.", cast:["Sri Simha","Satya","Faria Abdullah"], badge:"new" },
  { id:141, title:"35 Chinna Katha Kaadu",year:2024,genre:"Drama",  lang:"Telugu",   rating:8.1, duration:"2h 23m", img:"https://picsum.photos/seed/35ckk/400/600",     wide:"https://picsum.photos/seed/35ckk_w/800/450",   desc:"A grounded family drama about school pressure, parenthood and the quiet resilience of everyday people.", cast:["Nivetha Thomas","Priyadarshi","Viswadev Rachakonda"], badge:"new" },
  { id:142, title:"AAY",              year:2024, genre:"Comedy",    lang:"Telugu",   rating:6.8, duration:"2h 12m", img:"https://picsum.photos/seed/aay24/400/600",     wide:"https://picsum.photos/seed/aay24_w/800/450",   desc:"A breezy village entertainer where friendship, romance and local pride fuel a string of comic misfires.", cast:["Narne Nithiin","Nayan Sarika"], badge:"new" },
  { id:143, title:"Committee Kurrollu",year:2024,genre:"Drama",    lang:"Telugu",   rating:7.7, duration:"2h 36m", img:"https://picsum.photos/seed/committee24/400/600", wide:"https://picsum.photos/seed/committee24_w/800/450", desc:"A coming-of-age rural drama follows a group of youngsters whose bond is tested by politics and pride.", cast:["Sandeep Saroj","Yashwanth Pendyala"], badge:"new" },
  { id:144, title:"Om Bheem Bush",    year:2024, genre:"Comedy",    lang:"Telugu",   rating:6.9, duration:"2h 15m", img:"https://picsum.photos/seed/ombheembush/400/600", wide:"https://picsum.photos/seed/ombheembush_w/800/450", desc:"Three eccentric friends chase money and ghosts in a village full of superstition and silly surprises.", cast:["Sree Vishnu","Priyadarshi","Rahul Ramakrishna"], badge:"new" },
  { id:145, title:"Manamey",          year:2024, genre:"Drama",     lang:"Telugu",   rating:6.7, duration:"2h 33m", img:"https://picsum.photos/seed/manamey24/400/600", wide:"https://picsum.photos/seed/manamey24_w/800/450", desc:"An unlikely pair must learn responsibility, affection and healing while caring for a child together.", cast:["Sharwanand","Krithi Shetty"], badge:"new" },
];
// ── Sections Configuration ────────────────────────────────────
const SECTIONS = [
  { id:"trending",      title:"🔥 Trending Now",     filter: m => true, shuffle:true, limit:15 },
  { id:"top10",         title:"Top 10 in India",     filter: m => m.rating >= 8.0, shuffle:false, limit:10, style:"top10" },
  { id:"telugu",        title:"⚡ Telugu Blockbusters", filter: m => m.lang === "Telugu", shuffle:false, limit:40 },
  { id:"hindi",         title:"🎬 Hindi Cinema",     filter: m => m.lang === "Hindi", shuffle:false, limit:20 },
  { id:"hollywood",     title:"🌎 Hollywood",        filter: m => m.lang === "Hollywood", shuffle:false, limit:25 },
  { id:"newreleases",   title:"✨ New Releases",      filter: m => m.badge === "new", shuffle:false, limit:12 },
  { id:"action",        title:"💥 Action & Thriller", filter: m => ["Action","Thriller"].includes(m.genre), shuffle:true, limit:15 },
  { id:"classics",      title:"🏆 All-Time Classics", filter: m => m.rating >= 8.5, shuffle:false, limit:12 },
  { id:"recommended",   title:"👁 Recommended For You", filter: m => true, shuffle:true, limit:15 },
];

const HERO_MOVIES = [4,2,3,5,54,106]; // IDs for hero rotation

const OTT_PLATFORMS = [
  { name:"Netflix",      tagline:"Watch Anywhere", price:"₹149/mo onwards", color:"#E50914", logo:"NETFLIX",   desc:"Unlimited movies, TV shows and more. Watch anywhere. Cancel anytime." },
  { name:"Amazon Prime", tagline:"Shop + Watch",   price:"₹299/mo",         color:"#00A8E0", logo:"PRIME",     desc:"Prime Video plus shopping benefits. Exclusive content, anytime, anywhere." },
  { name:"Disney+ Hotstar",tagline:"Live Sports & More",price:"₹299/mo",   color:"#0063E5", logo:"HOTSTAR",   desc:"Live cricket, Disney magic, HBO and more under one subscription." },
  { name:"SonyLIV",      tagline:"Sports & Shows", price:"₹299/mo",         color:"#002EFF", logo:"SonyLIV",   desc:"WWE, UEFA Champions League, Hindi originals and more." },
  { name:"Zee5",         tagline:"Desi Entertainment",price:"₹99/mo",       color:"#7B2FBE", logo:"ZEE5",      desc:"Indian originals, movies, web series, Zindagi shows and live TV." },
  { name:"Aha",          tagline:"Telugu & Tamil",  price:"₹79/mo",          color:"#FF6B35", logo:"aha",       desc:"Pure Telugu & Tamil entertainment — movies, web series, originals." },
  { name:"MX Player",   tagline:"Free + Premium",  price:"Free/₹99",        color:"#FF3A2E", logo:"MX",        desc:"Free ad-supported streaming or premium subscription for all content." },
  { name:"Apple TV+",   tagline:"Original Stories", price:"₹99/mo",         color:"#555555", logo:"Apple TV+", desc:"Award-winning Apple Originals. New stories every month." },
  { name:"Discovery+",  tagline:"Real is Better",  price:"₹299/mo",         color:"#0062FF", logo:"discovery+",desc:"Nature, science, true crime, food and lifestyle documentaries." },
  { name:"Voot",        tagline:"Colors & More",    price:"₹99/mo",          color:"#FF0060", logo:"VOOT",      desc:"Colors TV content, Bigg Boss, MTV shows and exclusive originals." },
  { name:"JioCinema",   tagline:"Free Streaming",  price:"Free/₹29",        color:"#7929C4", logo:"JioCinema", desc:"IPL, movies, web series — free on Jio. Premium plan available." },
  { name:"Sun NXT",     tagline:"South Originals", price:"₹50/mo",          color:"#FF6600", logo:"Sun NXT",   desc:"Best of Tamil, Telugu, Kannada, Malayalam movies and TV shows." },
];

// ── State ─────────────────────────────────────────────────────
const TMDB_API_KEY = '7a055236c3d20dd3f3986d7bebbcb27e';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';
const POSTER_FALLBACK = 'https://picsum.photos/seed/fm-poster/400/600';
const BACKDROP_FALLBACK = 'https://picsum.photos/seed/fm-backdrop/1200/675';
const WATCHLIST_STORAGE_KEY = 'flimMakersWatchlist';
let heroIndex = 0, heroInterval;
let currentMovieId = null;
let allMovies = MOVIES.map(movie => ({
  ...movie,
  fallbackImg: createPosterPlaceholder(movie),
  fallbackWide: createBackdropPlaceholder(movie),
}));

// ── Utility ───────────────────────────────────────────────────
function encodeSvg(svg) {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function splitTitle(title, maxLineLength = 16) {
  const words = title.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length <= maxLineLength) currentLine = nextLine;
    else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3);
}

function posterPalette(movie) {
  const palettes = {
    Action: ['#25070a', '#8c1018', '#ff5f1f'],
    Thriller: ['#04070f', '#28334c', '#6c0d1b'],
    'Sci-Fi': ['#03131d', '#0d4d78', '#78f0ff'],
    Drama: ['#101010', '#444444', '#f5c518'],
    Romance: ['#260710', '#8d1d4d', '#f6a0b5'],
    Comedy: ['#1d0f02', '#ff8a00', '#ffd166'],
    Fantasy: ['#1a0836', '#5b2f9f', '#b792ff'],
    Historical: ['#1f1303', '#7a4b08', '#d8b16d'],
    Mystery: ['#05070f', '#1d3756', '#9bc7ff'],
    Biography: ['#10141a', '#43536b', '#d7dde8'],
    Sports: ['#04150c', '#16704a', '#8df1c4'],
    Epic: ['#120505', '#5e1f1f', '#f0c36a'],
    Crime: ['#090909', '#323232', '#d7263d'],
    War: ['#14110f', '#57534e', '#d6a34f'],
    Horror: ['#0a0000', '#3e0707', '#a70f16'],
    Adventure: ['#071523', '#15616d', '#ffd166'],
    Animation: ['#17042a', '#5a189a', '#ff9f1c'],
    Music: ['#12051c', '#6a0572', '#ff4d8d'],
  };

  return palettes[movie.genre] || ['#101010', '#2d2d2d', '#e50914'];
}

function createPosterPlaceholder(movie) {
  const [bg1, bg2, accent] = posterPalette(movie);
  const safeLang = escapeXml(movie.lang.toUpperCase());
  const safeMeta = escapeXml(`${movie.year} | ${movie.genre}`);
  const titleLines = splitTitle(movie.title)
    .map((line, index) => `<text x="36" y="${210 + index * 52}" fill="#ffffff" font-size="34" font-weight="800" font-family="Outfit, Arial, sans-serif">${escapeXml(line)}</text>`)
    .join('');

  return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
    <defs>
      <linearGradient id="posterBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="60%" stop-color="${bg2}" />
        <stop offset="100%" stop-color="#050505" />
      </linearGradient>
      <linearGradient id="posterGlow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect width="400" height="600" fill="url(#posterBg)" rx="28" />
    <circle cx="318" cy="94" r="132" fill="${accent}" fill-opacity="0.14" />
    <rect x="30" y="34" width="120" height="6" rx="3" fill="url(#posterGlow)" />
    <text x="36" y="84" fill="${accent}" font-size="20" font-weight="700" letter-spacing="4" font-family="Outfit, Arial, sans-serif">${safeLang}</text>
    <text x="36" y="130" fill="#cfcfcf" font-size="18" font-weight="600" font-family="Outfit, Arial, sans-serif">${safeMeta}</text>
    ${titleLines}
    <rect x="36" y="500" width="164" height="40" rx="20" fill="#ffffff" fill-opacity="0.08" />
    <text x="58" y="526" fill="#ffffff" font-size="18" font-weight="700" font-family="Outfit, Arial, sans-serif">FLIM MAKERS</text>
  </svg>`);
}

function createBackdropPlaceholder(movie) {
  const [bg1, bg2, accent] = posterPalette(movie);
  const safeLang = escapeXml(movie.lang.toUpperCase());
  const safeTitle = escapeXml(movie.title);
  const safeMeta = escapeXml(`${movie.year} | ${movie.genre} | ${movie.duration}`);
  return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
    <defs>
      <linearGradient id="backdropBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="55%" stop-color="${bg2}" />
        <stop offset="100%" stop-color="#050505" />
      </linearGradient>
    </defs>
    <rect width="1200" height="675" fill="url(#backdropBg)" />
    <circle cx="945" cy="150" r="210" fill="${accent}" fill-opacity="0.16" />
    <circle cx="1035" cy="560" r="180" fill="${accent}" fill-opacity="0.08" />
    <text x="70" y="132" fill="${accent}" font-size="34" font-weight="700" letter-spacing="6" font-family="Outfit, Arial, sans-serif">${safeLang}</text>
    <text x="70" y="220" fill="#ffffff" font-size="88" font-weight="800" font-family="Outfit, Arial, sans-serif">${safeTitle}</text>
    <text x="70" y="286" fill="#d0d0d0" font-size="30" font-weight="600" font-family="Outfit, Arial, sans-serif">${safeMeta}</text>
    <rect x="70" y="340" width="180" height="6" rx="3" fill="${accent}" />
  </svg>`);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function getMovieById(id) { return allMovies.find(m => m.id === id); }
function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
function isInWatchlist(id) {
  return getWatchlist().includes(id);
}
function updateListButtonLabels() {
  document.querySelectorAll('.movie-card').forEach(card => {
    const movieId = Number(card.dataset.id);
    const btn = card.querySelector('.card-action-btn.secondary');
    if (!btn) return;
    btn.textContent = isInWatchlist(movieId) ? 'Added' : '+ List';
  });

  const detailBtn = document.getElementById('movie-list-btn');
  if (detailBtn && currentMovieId) {
    detailBtn.textContent = isInWatchlist(currentMovieId) ? 'In My List' : '+ My List';
  }
}
function toggleMovieList(id = currentMovieId) {
  if (!id) return;
  const watchlist = getWatchlist();
  const exists = watchlist.includes(id);
  const nextWatchlist = exists
    ? watchlist.filter(item => item !== id)
    : [...watchlist, id];
  localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(nextWatchlist));
  updateListButtonLabels();
  const movie = getMovieById(id);
  showToast(
    exists ? `${movie?.title || 'Movie'} removed from My List` : `${movie?.title || 'Movie'} added to My List`,
    exists ? '#9aa0a6' : '#1db954'
  );
}
function getImageUrl(path, size, fallback) {
  return path ? `${TMDB_IMAGE_BASE}${size}${path}` : fallback;
}
function isTmdbConfigured() {
  return TMDB_API_KEY && !TMDB_API_KEY.includes('7a055236c3d20dd3f3986d7bebbcb27e');
}
async function fetchTMDBMovieAssets(movie) {
  if (!isTmdbConfigured()) return movie;
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.title)}&year=${movie.year}&include_adult=false`, {
      headers: {
        accept: 'application/json',
        
      }
    });
    if (!response.ok) return movie;
    const data = await response.json();
    const match = data.results?.[0];
    if (!match) return movie;
    return {
      ...movie,
      img: getImageUrl(match.poster_path, 'w500', movie.fallbackImg || POSTER_FALLBACK),
      wide: getImageUrl(match.backdrop_path, 'w1280', movie.fallbackWide || BACKDROP_FALLBACK),
      tmdbId: match.id,
    };
  } catch {
    return movie;
  }
}
async function hydrateRealtimePosters() {
  try {
    if (!isTmdbConfigured()) {
      console.log("TMDB not configured");
      return;
    }

    console.log("Fetching real posters...");

    const updatedMovies = await Promise.all(
      allMovies.map(movie => fetchTMDBMovieAssets(movie))
    );

    allMovies = updatedMovies;

    renderSections();
    setHero(heroIndex);

    showToast('Real-time movie posters loaded', '#f5c518');

  } catch (error) {
    console.error("Error loading posters:", error);
  }
}
// ── Movie Card HTML ───────────────────────────────────────────
function movieCardHTML(movie) {
  const badgeHTML = movie.badge
    ? `<div class="card-badge ${movie.badge}">${movie.badge === 'new' ? 'NEW' : 'TOP'}</div>`
    : '';
  const poster = movie.img || movie.fallbackImg || POSTER_FALLBACK;
  const fallbackPoster = movie.fallbackImg || POSTER_FALLBACK;
  return `
    <div class="movie-card" data-id="${movie.id}" onclick="playMovieTrailer(${movie.id})">
      <div class="card-img-wrap">
        <img class="card-img lazy-img" data-src="${poster}" src="${fallbackPoster}"
          alt="${movie.title}" loading="lazy" onerror="this.src='${fallbackPoster}'">
        <div class="card-overlay">
          <div class="card-play-btn">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><polygon points="6,4 20,12 6,20"/></svg>
          </div>
        </div>
      </div>
      <div class="card-rating">★ ${movie.rating}</div>
      ${badgeHTML}
      <div class="card-info">
        <div class="card-info-title">${movie.title}</div>
        <div class="card-info-meta">
          <span>${movie.year}</span>
          <span class="dot">·</span>
          <span>${movie.genre}</span>
        </div>
        <div class="card-actions">
          <button class="card-action-btn primary" onclick="event.stopPropagation();playMovieTrailer(${movie.id})">▶ Play</button>
          <button class="card-action-btn secondary" onclick="event.stopPropagation();toggleMovieList(${movie.id})">${isInWatchlist(movie.id) ? 'Added' : '+ List'}</button>
        </div>
      </div>
    </div>`;
}

// ── Top10 Card ────────────────────────────────────────────────
function top10CardHTML(movie, num) {
  const poster = movie.img || movie.fallbackImg || POSTER_FALLBACK;
  const fallbackPoster = movie.fallbackImg || POSTER_FALLBACK;
  return `
    <div class="top10-card" onclick="playMovieTrailer(${movie.id})">
      <div class="top10-num">${num}</div>
      <img class="top10-img" src="${poster}" alt="${movie.title}" loading="lazy" onerror="this.src='${fallbackPoster}'">
    </div>`;
}

// ── Render All Sections ───────────────────────────────────────
function renderSections() {
  const container = document.getElementById('sections-container');
  if (!container) return;
  let html = '';
  SECTIONS.forEach(sec => {
    let movies = allMovies.filter(sec.filter);
    if (sec.shuffle) movies = shuffle(movies);
    movies = movies.slice(0, sec.limit);
    const rowId = `row-${sec.id}`;
    html += `
      <section class="content-section reveal" id="${sec.id}">
        <div class="section-header">
          <h2 class="section-title"><span class="accent-dot"></span> ${sec.title}</h2>
          <a href="#" class="see-all">See All ›</a>
        </div>
        <div class="row-wrapper">
          <button class="scroll-btn left" onclick="scrollRow('${rowId}',-1)">‹</button>
          <div class="movie-row" id="${rowId}">
            ${sec.style === 'top10'
              ? movies.slice(0,10).map((m,i) => top10CardHTML(m, i+1)).join('')
              : movies.map(m => movieCardHTML(m)).join('')
            }
          </div>
          <button class="scroll-btn right" onclick="scrollRow('${rowId}',1)">›</button>
        </div>
      </section>`;
  });
  container.innerHTML = html;
  initReveal();
  initLazyLoad();
  initRowWheelScroll();
  updateListButtonLabels();
}

// ── Row Scroll ────────────────────────────────────────────────
function scrollRow(rowId, dir) {
  const row = document.getElementById(rowId);
  if (row) row.scrollBy({ left: dir * 600, behavior: 'smooth' });
}

// ── Hero Rotation ─────────────────────────────────────────────
function setHero(idx) {
  const movie = getMovieById(HERO_MOVIES[idx]);
  if (!movie) return;
  const bg = document.querySelector('.hero-bg');
  const title = document.querySelector('.hero-title');
  const desc = document.querySelector('.hero-desc');
  const year = document.querySelector('.hero-year');
  const genre = document.querySelector('.hero-genre');
  const rating = document.querySelector('.hero-rating');
  const dur = document.querySelector('.hero-dur');
  const dotsEl = document.querySelectorAll('.hero-dot');

  if (bg) { bg.style.backgroundImage = `url(${movie.wide || movie.fallbackWide || BACKDROP_FALLBACK})`; setTimeout(()=>bg.classList.add('loaded'),100); }
  if (title) title.textContent = movie.title;
  if (desc)  desc.textContent  = movie.desc;
  if (year)  year.textContent  = movie.year;
  if (genre) genre.textContent = movie.genre;
  if (rating) rating.textContent = `★ ${movie.rating}`;
  if (dur)   dur.textContent   = movie.duration;
  dotsEl.forEach((d,i) => d.classList.toggle('active', i === idx));

  // Store for play button
  const hero = document.querySelector('.hero');
  if (hero) hero.dataset.movieId = movie.id;
}

function startHeroRotation() {
  heroIndex = 0;
  setHero(0);
  heroInterval = setInterval(() => {
    heroIndex = (heroIndex + 1) % HERO_MOVIES.length;
    setHero(heroIndex);
  }, 7000);
}

// ── Open Movie ────────────────────────────────────────────────
function openMovie(id) {
  localStorage.setItem('currentMovie', JSON.stringify(getMovieById(id)));
  window.location.href = `movie.html?id=${id}`;
}

function playMovieTrailer(id) {
  const movie = getMovieById(id);
  if (!movie) return;
  localStorage.setItem('currentMovie', JSON.stringify(movie));

  const modal = document.getElementById('trailer-modal');
  const player = document.getElementById('trailer-modal-player');
  const title = document.getElementById('trailer-title');

  if (!modal || !player || !title) {
    openMovie(id);
    return;
  }

  title.textContent = `${movie.title} Trailer`;
  player.innerHTML = `
    <iframe
      src="${DEMO_TRAILER_EMBED_URL}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      title="${movie.title} Trailer">
    </iframe>`;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeTrailerModal() {
  const modal = document.getElementById('trailer-modal');
  const player = document.getElementById('trailer-modal-player');
  if (!modal || !player) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  player.innerHTML = '';
  document.body.classList.remove('modal-open');
}

// ── Search ────────────────────────────────────────────────────
function handleSearch(query) {
  const overlay = document.getElementById('search-overlay');
  const grid    = document.getElementById('search-results');
  if (!overlay || !grid) return;
  const q = query.toLowerCase().trim();
  if (!q) { overlay.classList.remove('open'); return; }
  overlay.classList.add('open');
  const results = allMovies.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.genre.toLowerCase().includes(q) ||
    m.lang.toLowerCase().includes(q) ||
    m.cast.some(c => c.toLowerCase().includes(q))
  );
  if (!results.length) {
    grid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;">No results for "<strong style="color:var(--white)">${query}</strong>"</p>`;
    return;
  }
  grid.innerHTML = results.map(m => movieCardHTML(m)).join('');
}

// ── Voice Search ──────────────────────────────────────────────
function initVoiceSearch() {
  const micBtn = document.getElementById('mic-btn');
  if (!micBtn) return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { micBtn.title = "Voice search not supported in this browser"; return; }
  const recognition = new SR();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  const voiceToast = document.getElementById('voice-toast');
  const voiceText  = document.getElementById('voice-text');

  micBtn.addEventListener('click', () => {
    if (micBtn.classList.contains('listening')) {
      recognition.stop();
      return;
    }
    recognition.start();
    micBtn.classList.add('listening');
    if (voiceToast) { voiceToast.classList.add('active'); if (voiceText) voiceText.textContent = 'Listening…'; }
  });

  recognition.onresult = e => {
    const t = e.results[0][0].transcript;
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = t;
    handleSearch(t);
    if (voiceText) voiceText.textContent = `"${t}"`;
    setTimeout(() => { if (voiceToast) voiceToast.classList.remove('active'); }, 2500);
  };
  recognition.onend = () => { micBtn.classList.remove('listening'); };
  recognition.onerror = () => { micBtn.classList.remove('listening'); if (voiceToast) voiceToast.classList.remove('active'); };
}

// ── Scroll Reveal ─────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => obs.observe(e));
}

// ── Lazy Load ─────────────────────────────────────────────────
function initLazyLoad() {
  const imgs = document.querySelectorAll('.lazy-img');
  if (!('IntersectionObserver' in window)) { imgs.forEach(i => { if(i.dataset.src) i.src = i.dataset.src; }); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  imgs.forEach(i => obs.observe(i));
}

function initRowWheelScroll() {
  document.querySelectorAll('.movie-row').forEach(row => {
    row.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        row.scrollLeft += e.deltaY * 2;
      }
    }, { passive:false });
  });
}

// ── Custom Cursor ─────────────────────────────────────────────
function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  if (window.innerWidth < 1024) { dot.style.display='none'; ring.style.display='none'; return; }
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('button, a, .movie-card, .ott-card, .plan-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

// ── Navbar scroll ─────────────────────────────────────────────
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const handleScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', handleScroll, { passive:true });
  handleScroll();
}

// ── Hamburger ─────────────────────────────────────────────────
function initHamburger() {
  const ham = document.querySelector('.hamburger');
  const mob = document.querySelector('.mobile-nav');
  if (!ham || !mob) return;
  ham.addEventListener('click', () => {
    mob.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    const isOpen = mob.classList.contains('open');
    if (spans[0]) spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    if (spans[1]) spans[1].style.opacity   = isOpen ? '0' : '1';
    if (spans[2]) spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });
}

// ── OTT Platforms ─────────────────────────────────────────────
function renderOTT() {
  const grid = document.getElementById('ott-grid');
  if (!grid) return;
  grid.innerHTML = OTT_PLATFORMS.map(p => `
    <div class="ott-card" style="--ott-color:${p.color}">
      <div class="ott-logo-wrap">
        <div class="ott-logo-text" style="color:${p.color}">${p.logo}</div>
      </div>
      <div class="ott-name">${p.name}</div>
      <div class="ott-desc">${p.desc}</div>
      <div class="ott-price">${p.price}</div>
      <button class="btn-ott" onclick="showToast('Opening ${p.name}...','${p.color}')">Subscribe Now</button>
    </div>`).join('');
}

function selectPlan(plan) {
  const colors = {
    Basic: '#9aa0a6',
    Standard: '#e50914',
    Premium: '#f5c518',
  };
  showToast(`${plan} plan selected`, colors[plan] || '#e50914');
}

function initSubscriptionForm() {
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('subscribe-email');
  if (!form || !emailInput) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Enter a valid email address');
      return;
    }
    showToast(`Subscribed with ${email}`, '#f5c518');
    form.reset();
  });
}

// ── Toast ─────────────────────────────────────────────────────
function initAnchorButtons() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      const section = link.closest('.content-section');
      const target = href && href !== '#' ? document.querySelector(href) : section;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.querySelector('.mobile-nav')?.classList.remove('open');
    });
  });
}

function initDemoButtons() {
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href="#"]');
    if (!anchor) return;
    if (anchor.closest('.content-section')) return;
    e.preventDefault();
    const label = anchor.textContent.trim() || anchor.getAttribute('title') || 'This section';
    if (label.toLowerCase() === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    showToast(`${label} will open soon`, '#f5c518');
  });
}

function showToast(msg, color='#e50914') {
  const t = document.getElementById('toast');
  if (!t) return;
  const dot = t.querySelector('.toast-dot');
  const txt = t.querySelector('.toast-text');
  if (dot) dot.style.background = color;
  if (txt) txt.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Hero buttons ──────────────────────────────────────────────
function heroPlay() {
  const hero = document.querySelector('.hero');
  if (hero && hero.dataset.movieId) playMovieTrailer(parseInt(hero.dataset.movieId));
}

// ── Loading screen ────────────────────────────────────────────
async function shareCurrentMovie() {
  const movie = getMovieById(currentMovieId);
  const shareUrl = `${window.location.origin}${window.location.pathname}?id=${currentMovieId}`;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl);
      showToast(`${movie?.title || 'Movie'} link copied!`, '#1db954');
      return;
    }
  } catch {
    // fall back to a simple toast when clipboard is blocked
  }
  showToast('Share link ready to copy', '#f5c518');
}

function hideLoader() {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => loader.classList.add('gone'), 2200);
  }
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('movie-title')) {
    initMoviePage();
    return;
  }
  hideLoader();
  startHeroRotation();
  renderSections();
  renderOTT();
  initNavbar();
  initHamburger();
  initVoiceSearch();
  initCursor();
  initSubscriptionForm();
  initAnchorButtons();
  initDemoButtons();
  hydrateRealtimePosters();

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => handleSearch(e.target.value));
    searchInput.addEventListener('focus', e => { if(e.target.value) handleSearch(e.target.value); });
  }

  // Search close
  document.getElementById('search-close')?.addEventListener('click', () => {
    document.getElementById('search-overlay')?.classList.remove('open');
    if (searchInput) searchInput.value = '';
  });

  // Hero dots
  document.querySelectorAll('.hero-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(heroInterval);
      heroIndex = i;
      setHero(i);
      heroInterval = setInterval(() => {
        heroIndex = (heroIndex + 1) % HERO_MOVIES.length;
        setHero(heroIndex);
      }, 7000);
    });
  });

  // Escape closes search
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('search-overlay')?.classList.remove('open');
      closeTrailerModal();
    }
  });

});

// ── Movie Detail Page ─────────────────────────────────────────
function initMoviePage() {
  const movieId = Number(new URLSearchParams(window.location.search).get('id'));
  let movie = getMovieById(movieId);
  if (!movie) {
    const data = localStorage.getItem('currentMovie');
    movie = data ? JSON.parse(data) : null;
  }
  if (!movie) { window.location.href='index.html'; return; }
  currentMovieId = movie.id;
  localStorage.setItem('currentMovie', JSON.stringify(movie));

  // Set bg
  document.getElementById('movie-bg-img').style.backgroundImage = `url(${movie.wide || movie.fallbackWide || BACKDROP_FALLBACK})`;
  document.getElementById('movie-poster').src = movie.img || movie.fallbackImg || POSTER_FALLBACK;
  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-desc').textContent = movie.desc;
  document.getElementById('movie-rating').textContent = `★ ${movie.rating}`;
  document.getElementById('movie-year').textContent = movie.year;
  document.getElementById('movie-genre').textContent = movie.genre;
  document.getElementById('movie-duration').textContent = movie.duration;
  document.getElementById('movie-lang').textContent = movie.lang;

  const castEl = document.getElementById('movie-cast');
  if (castEl) castEl.innerHTML = movie.cast.map(c => `<span class="cast-tag">${c}</span>`).join('');

  // Video (YouTube embed or HTML5)
  const videoWrap = document.getElementById('video-wrap');
  if (videoWrap) {
    videoWrap.innerHTML = `
      <iframe
        src="${DEMO_TRAILER_EMBED_URL}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        title="${movie.title} Trailer">
      </iframe>`;
  }

  // Related movies
  const related = shuffle(allMovies.filter(m => m.genre === movie.genre && m.id !== movie.id)).slice(0,10);
  const relRow = document.getElementById('related-row');
  if (relRow) relRow.innerHTML = related.map(m => movieCardHTML(m)).join('');

  initNavbar();
  initHamburger();
  initReveal();
  updateListButtonLabels();
  document.querySelector('.movie-hero-bg')?.style.setProperty('background-image', `url(${movie.wide || movie.fallbackWide || BACKDROP_FALLBACK})`);

  document.title = `${movie.title} | Flim Makers`;
}
