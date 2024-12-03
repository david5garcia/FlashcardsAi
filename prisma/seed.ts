const { PrismaClient, Level } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     email: "testuser@example.com",
  //     password: "securepassword",
  //     verified: true,
  //     role: "USER"
  //   }
  // });

  const user = await prisma.user.findFirst({
    where: { email: "testuser@example.com" }
  });

  const flashcards = [
    {
      word: "Apple",
      hint: "A fruit often associated with Newton",
      definition: "A round fruit with red, green, or yellow skin",
      pronunciation: "ˈæp.əl",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Dog",
      hint: "A common pet known for barking",
      definition: "A domesticated animal often kept as a pet or for work",
      pronunciation: "dɒɡ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Car",
      hint: "A vehicle with four wheels",
      definition:
        "A road vehicle, typically with four wheels, powered by an engine",
      pronunciation: "kɑːr",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Book",
      hint: "Something you read, usually made of paper",
      definition: "A set of written or printed pages, bound together",
      pronunciation: "bʊk",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Chair",
      hint: "Something you sit on",
      definition:
        "A piece of furniture with a raised surface, commonly used to sit on",
      pronunciation: "tʃeər",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Cat",
      hint: "A pet that purrs",
      definition: "A small domesticated carnivorous mammal with soft fur",
      pronunciation: "kæt",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Tree",
      hint: "Grows in forests and has leaves",
      definition:
        "A perennial plant with an elongated stem, or trunk, supporting branches",
      pronunciation: "triː",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "House",
      hint: "A building people live in",
      definition: "A building for human habitation",
      pronunciation: "haʊs",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Pen",
      hint: "Used for writing or drawing",
      definition: "An instrument for writing or drawing with ink",
      pronunciation: "pɛn",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Shoe",
      hint: "Worn on your feet",
      definition:
        "A covering for the foot, typically made of leather or rubber",
      pronunciation: "ʃuː",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Water",
      hint: "Liquid you drink",
      definition:
        "A colorless, transparent, odorless liquid essential for life",
      pronunciation: "ˈwɔː.tər",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Table",
      hint: "A piece of furniture with a flat surface",
      definition: "A piece of furniture with a flat top and one or more legs",
      pronunciation: "ˈteɪ.bəl",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Sun",
      hint: "A star that gives us light and warmth",
      definition: "The star at the center of our solar system",
      pronunciation: "sʌn",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Bicycle",
      hint: "A vehicle with two wheels powered by pedaling",
      definition:
        "A vehicle composed of two wheels held in a frame one behind the other",
      pronunciation: "ˈbaɪ.sɪ.kəl",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Bread",
      hint: "A food made of flour and water, baked in an oven",
      definition: "A baked food made of flour and water",
      pronunciation: "brɛd",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Clock",
      hint: "Shows the time",
      definition: "A device used to tell time",
      pronunciation: "klɒk",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Cup",
      hint: "Used for drinking liquids",
      definition: "A small bowl-shaped container for drinking from",
      pronunciation: "kʌp",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Phone",
      hint: "Used to make calls",
      definition: "A device used for voice communication",
      pronunciation: "fəʊn",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Pizza",
      hint: "A popular Italian dish with cheese and tomato sauce",
      definition:
        "A baked flatbread with toppings, usually cheese and tomatoes",
      pronunciation: "ˈpiːt.sə",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Flower",
      hint: "Often given as a gift and comes in many colors",
      definition: "The reproductive structure of a flowering plant",
      pronunciation: "ˈflaʊ.ər",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Bed",
      hint: "Where you sleep",
      definition: "A piece of furniture used for sleeping on",
      pronunciation: "bɛd",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Bottle",
      hint: "Often holds liquids",
      definition:
        "A container, typically made of glass or plastic, with a narrow neck",
      pronunciation: "ˈbɒt.əl",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Milk",
      hint: "A white liquid often added to cereal",
      definition: "A nutritious liquid produced by mammals",
      pronunciation: "mɪlk",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Door",
      hint: "You open this to enter a room",
      definition:
        "A hinged, sliding, or revolving barrier at the entrance to a room",
      pronunciation: "dɔːr",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Fish",
      hint: "An animal that swims in water",
      definition:
        "A cold-blooded animal that lives in water and has fins and scales",
      pronunciation: "fɪʃ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Egg",
      hint: "Often eaten for breakfast and comes from chickens",
      definition:
        "A round or oval object laid by a female bird, reptile, or fish",
      pronunciation: "ɛɡ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Spoon",
      hint: "Used to eat soup",
      definition: "An eating or cooking utensil with a shallow bowl",
      pronunciation: "spuːn",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Glasses",
      hint: "Help people see better",
      definition: "Optical lenses worn to correct vision",
      pronunciation: "ˈɡlæs.ɪz",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Hat",
      hint: "Worn on the head for style or sun protection",
      definition: "A covering for the head",
      pronunciation: "hæt",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Key",
      hint: "Used to unlock doors",
      definition: "A small piece of shaped metal used in opening locks",
      pronunciation: "kiː",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Bag",
      hint: "Used to carry things",
      definition: "A container made of flexible material",
      pronunciation: "bæɡ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Fan",
      hint: "Keeps you cool on a hot day",
      definition: "A device for creating a current of air",
      pronunciation: "fæn",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Plate",
      hint: "Used to hold food during a meal",
      definition: "A flat dish from which food is eaten",
      pronunciation: "pleɪt",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Complicated",
      hint: "Not simple",
      definition: "Something that is difficult to understand or deal with",
      pronunciation: "ˈkɒm.plɪ.keɪ.tɪd",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Photosynthesis",
      hint: "Process plants use to make food",
      definition:
        "The process by which green plants use sunlight to synthesize foods",
      pronunciation: "ˌfəʊ.təʊˈsɪn.θɪ.sɪs",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Banana",
      hint: "A yellow fruit monkeys love",
      definition: "A long, curved fruit with a soft inside and a yellow peel",
      pronunciation: "bəˈnɑː.nə",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Pencil",
      hint: "Used for writing and can be erased",
      definition:
        "An instrument for writing or drawing, with a thin stick of graphite",
      pronunciation: "ˈpen.səl",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Window",
      hint: "A part of a wall that lets light and air in",
      definition:
        "An opening in a wall or door that allows light and air to enter",
      pronunciation: "ˈwɪn.doʊ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Toy",
      hint: "Children play with this",
      definition: "An object for children to play with",
      pronunciation: "tɔɪ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Camera",
      hint: "Used to take photos",
      definition: "A device for capturing photographs",
      pronunciation: "ˈkæm.rə",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Cloud",
      hint: "Visible in the sky, often white or gray",
      definition: "A mass of condensed water vapor floating in the atmosphere",
      pronunciation: "klaʊd",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Radio",
      hint: "Plays music and news without images",
      definition: "A device that receives and plays sound signals",
      pronunciation: "ˈreɪ.di.oʊ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Desk",
      hint: "A piece of furniture where you work or study",
      definition: "A table used for work or study, often with drawers",
      pronunciation: "dɛsk",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Fridge",
      hint: "Keeps food cold",
      definition: "An appliance used to keep food and drinks cold",
      pronunciation: "frɪdʒ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Grass",
      hint: "A green plant that covers lawns and fields",
      definition: "Plants with narrow leaves that grow close to the ground",
      pronunciation: "ɡræs",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "River",
      hint: "A large natural flow of water",
      definition: "A natural waterway that flows toward an ocean, sea, or lake",
      pronunciation: "ˈrɪv.ər",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Train",
      hint: "Travels on tracks and transports people or goods",
      definition: "A series of connected vehicles traveling on railways",
      pronunciation: "treɪn",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Guitar",
      hint: "A musical instrument with strings",
      definition: "A stringed instrument played by strumming or plucking",
      pronunciation: "ɡɪˈtɑːr",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Bus",
      hint: "A large vehicle for public transport",
      definition:
        "A vehicle for transporting groups of people, usually along a fixed route",
      pronunciation: "bʌs",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Bridge",
      hint: "Connects two points over water or valleys",
      definition: "A structure built to span physical obstacles like rivers",
      pronunciation: "brɪdʒ",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Salt",
      hint: "Often added to food for flavor",
      definition:
        "A white crystalline substance used to season or preserve food",
      pronunciation: "sɔːlt",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Cookie",
      hint: "A sweet baked treat, often with chocolate chips",
      definition:
        "A small sweet cake, typically round, often with additions like chocolate",
      pronunciation: "ˈkʊk.i",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Soap",
      hint: "Used for washing and cleaning",
      definition: "A substance used for cleaning and hygiene",
      pronunciation: "soʊp",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Ice",
      hint: "Frozen water",
      definition: "Water in a solid, frozen state",
      pronunciation: "aɪs",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Glove",
      hint: "Worn on hands for warmth or protection",
      definition:
        "A garment covering the hand, often with separate sections for fingers",
      pronunciation: "ɡlʌv",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Mountain",
      hint: "A large natural elevation of Earth's surface",
      definition: "A natural elevation of the Earth's surface rising steeply",
      pronunciation: "ˈmaʊn.tɪn",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Horse",
      hint: "A large animal people can ride",
      definition: "A large, strong animal used for riding and work",
      pronunciation: "hɔːrs",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Ball",
      hint: "A round object often used in games",
      definition: "A spherical object used in various games and sports",
      pronunciation: "bɔːl",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Laptop",
      hint: "A portable computer",
      definition: "A small, portable personal computer",
      pronunciation: "ˈlæp.tɒp",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Boat",
      hint: "A small vessel for traveling on water",
      definition: "A small watercraft for traveling on water",
      pronunciation: "boʊt",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Map",
      hint: "Shows locations and helps you find places",
      definition: "A visual representation of an area",
      pronunciation: "mæp",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Leaf",
      hint: "Grows on trees and plants, usually green",
      definition: "A flat, green part of a plant, attached to a stem",
      pronunciation: "liːf",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Chicken",
      hint: "A bird commonly raised for its eggs and meat",
      definition: "A domesticated bird raised for meat and eggs",
      pronunciation: "ˈtʃɪk.ɪn",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Sculpture",
      hint: "An artwork made by shaping materials like stone or metal",
      definition: "A three-dimensional work of art made by carving or molding",
      pronunciation: "ˈskʌlp.tʃər",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Planet",
      hint: "A large body orbiting a star, like Earth",
      definition:
        "A celestial body that orbits a star, large enough to have gravity",
      pronunciation: "ˈplæn.ɪt",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Microscope",
      hint: "An instrument for viewing tiny objects",
      definition:
        "A device that magnifies very small objects for closer observation",
      pronunciation: "ˈmaɪ.krəˌskoʊp",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Lantern",
      hint: "A portable light source, often used outdoors",
      definition: "A container that holds and protects a light source",
      pronunciation: "ˈlæn.tərn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Compass",
      hint: "A tool that shows directions",
      definition:
        "An instrument used for navigation and orientation, pointing north",
      pronunciation: "ˈkʌm.pəs",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Meteor",
      hint: "A small body from space that enters Earth’s atmosphere",
      definition:
        "A piece of rock or metal that burns up in the Earth’s atmosphere",
      pronunciation: "ˈmiː.ti.ɔːr",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Chisel",
      hint: "A tool for cutting or carving hard materials",
      definition:
        "A hand tool with a sharp edge used for carving or cutting hard substances",
      pronunciation: "ˈtʃɪz.əl",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Easel",
      hint: "A stand used by artists to hold a canvas",
      definition: "A wooden or metal stand for holding an artist's canvas",
      pronunciation: "ˈiː.zəl",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Lighthouse",
      hint: "A tower with a bright light to guide ships",
      definition:
        "A tower with a light that helps guide ships away from danger",
      pronunciation: "ˈlaɪt.haʊs",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Cactus",
      hint: "A plant often found in deserts, with spines instead of leaves",
      definition:
        "A plant adapted to arid environments, typically with spines and thick skin",
      pronunciation: "ˈkæk.təs",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Oxygen",
      hint: "A gas essential for breathing",
      definition:
        "A colorless, tasteless gas that is part of the air we breathe",
      pronunciation: "ˈɑːk.sɪ.dʒən",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Bouquet",
      hint: "An arrangement of flowers",
      definition: "A bunch of flowers arranged and often given as a gift",
      pronunciation: "buˈkeɪ",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Pendulum",
      hint: "Swings back and forth, used in clocks",
      definition: "A weight that hangs from a point and swings back and forth",
      pronunciation: "ˈpɛn.dʒə.ləm",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Submarine",
      hint: "A watercraft that operates underwater",
      definition:
        "A vessel capable of underwater operation, used in military and research",
      pronunciation: "ˌsʌb.məˈriːn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Telescope",
      hint: "A tool for observing distant objects like stars",
      definition:
        "An instrument used to see distant objects by collecting light",
      pronunciation: "ˈtel.ɪˌskoʊp",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Oasis",
      hint: "A fertile area in a desert with water",
      definition: "A green area in a desert where water is available",
      pronunciation: "oʊˈeɪ.sɪs",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Geyser",
      hint: "A hot spring that occasionally shoots water",
      definition:
        "A natural hot spring that periodically releases steam and hot water",
      pronunciation: "ˈɡaɪ.zər",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Propeller",
      hint: "Rotates to push a vehicle forward, like in a boat or plane",
      definition: "A device with rotating blades that pushes vehicles forward",
      pronunciation: "prəˈpɛl.ər",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Armor",
      hint: "Protective covering worn in battle",
      definition: "A covering, often metal, used to protect the body in combat",
      pronunciation: "ˈɑːr.mər",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Velvet",
      hint: "A soft, luxurious fabric",
      definition: "A rich fabric with a soft, smooth pile",
      pronunciation: "ˈvɛl.vɪt",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Igloo",
      hint: "A dome-shaped shelter made of snow",
      definition:
        "A shelter made from blocks of snow, traditionally built by Inuit",
      pronunciation: "ˈɪɡ.luː",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Acorn",
      hint: "The nut of an oak tree",
      definition: "A small nut produced by oak trees",
      pronunciation: "ˈeɪ.kɔːrn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Satchel",
      hint: "A bag with a long strap, often used for books",
      definition:
        "A small bag with a shoulder strap, often used for carrying books",
      pronunciation: "ˈsætʃ.əl",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Machete",
      hint: "A large knife used to cut through thick vegetation",
      definition: "A broad, heavy knife used as a tool and weapon",
      pronunciation: "məˈʃɛt.i",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Aquarium",
      hint: "A glass tank for keeping fish and aquatic plants",
      definition: "A tank or pool where aquatic animals and plants are kept",
      pronunciation: "əˈkwer.i.əm",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Accordion",
      hint: "A musical instrument with keys and a bellows",
      definition: "A box-shaped musical instrument with keys and bellows",
      pronunciation: "əˈkɔr.di.ən",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Enthusiastic",
      hint: "Very excited about something",
      definition: "Having or showing intense and eager enjoyment or interest",
      pronunciation: "ɪnˌθuː.ziˈæs.tɪk",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Trampoline",
      hint: "A bouncy surface often used for jumping exercises",
      definition: "A strong fabric stretched over a frame, used for bouncing",
      pronunciation: "ˈtræm.pəˌliːn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Harpoon",
      hint: "A long spear used in hunting large sea animals",
      definition:
        "A barbed spear or javelin used to catch large fish or whales",
      pronunciation: "hɑːrˈpuːn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Fountain",
      hint: "A structure that sprays water, often decorative",
      definition:
        "A structure from which water is pumped or flows continuously",
      pronunciation: "ˈfaʊn.tɪn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Subwoofer",
      hint: "A speaker designed for deep bass sounds",
      definition: "A speaker that produces low-pitched audio frequencies",
      pronunciation: "ˈsʌbˌwʊf.ər",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Terrarium",
      hint: "A glass container for growing plants or keeping small animals",
      definition:
        "A container, often glass, for growing plants or keeping small creatures",
      pronunciation: "təˈreə.ri.əm",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Anvil",
      hint: "A heavy iron block used in metalworking",
      definition:
        "A large block of metal used as a surface for hammering metals",
      pronunciation: "ˈæn.vɪl",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Hammock",
      hint: "A hanging bed made from fabric or netting",
      definition: "A swinging bed made of fabric, hung between two supports",
      pronunciation: "ˈhæm.ək",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Catapult",
      hint: "A device used to launch objects over a distance",
      definition: "A machine that hurls objects by releasing stored energy",
      pronunciation: "ˈkæt.ə.pʌlt",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Porcelain",
      hint: "A type of fine, white ceramic material",
      definition:
        "A hard, white, translucent ceramic made by firing a pure clay",
      pronunciation: "ˈpɔːr.səl.ɪn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Violin",
      hint: "A small, stringed instrument played with a bow",
      definition: "A four-stringed musical instrument played with a bow",
      pronunciation: "ˌvaɪəˈlɪn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Igneous",
      hint: "A type of rock formed from cooled magma",
      definition: "A type of rock formed from molten lava or magma",
      pronunciation: "ˈɪɡ.ni.əs",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Parachute",
      hint: "A device that slows descent from a height",
      definition:
        "A large fabric canopy that slows the fall of a person or object",
      pronunciation: "ˈpær.əˌʃuːt",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Gramophone",
      hint: "An old device for playing music from records",
      definition: "A device that plays sound recordings from discs",
      pronunciation: "ˈɡræm.əˌfoʊn",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Carousel",
      hint: "A rotating platform with seats, often at fairs",
      definition: "An amusement ride with rotating seats or figures for riding",
      pronunciation: "ˌkær.əˈsel",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Tornado",
      hint: "A powerful rotating column of air",
      definition:
        "A violent, rotating column of air extending from a thunderstorm",
      pronunciation: "tɔːrˈneɪ.doʊ",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Monument",
      hint: "A structure built to remember a person or event",
      definition: "A structure erected to commemorate people or events",
      pronunciation: "ˈmɒn.jə.mənt",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Whisk",
      hint: "A kitchen tool for mixing or beating",
      definition:
        "A utensil with a long handle and loops, used for mixing or beating",
      pronunciation: "wɪsk",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Thermometer",
      hint: "A device used to measure temperature",
      definition: "An instrument used to measure and display temperature",
      pronunciation: "θərˈmɒm.ɪ.tər",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Pyramid",
      hint: "An ancient structure with a square base and triangular sides",
      definition:
        "A monumental structure with a square base and four triangular sides",
      pronunciation: "ˈpɪr.ə.mɪd",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Vineyard",
      hint: "A field where grapevines are grown",
      definition: "A plantation of grapevines, typically for winemaking",
      pronunciation: "ˈvɪn.jərd",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Gondola",
      hint: "A type of long, narrow boat, often used in Venice",
      definition: "A long, narrow boat used in canals, especially in Venice",
      pronunciation: "ˈɡɒn.də.lə",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Zebra",
      hint: "An African animal with black and white stripes",
      definition:
        "A wild animal known for its distinct black and white striped coat",
      pronunciation: "ˈziː.brə",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Canoe",
      hint: "A narrow boat moved with a paddle",
      definition:
        "A light, narrow boat with pointed ends, propelled by a paddle",
      pronunciation: "kəˈnuː",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Tapestry",
      hint: "A thick fabric with designs, often used as wall art",
      definition: "A decorative woven fabric often used for wall hangings",
      pronunciation: "ˈtæp.ɪ.stri",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Barometer",
      hint: "An instrument used to measure atmospheric pressure",
      definition: "An instrument that measures the pressure of the atmosphere",
      pronunciation: "bəˈrɒm.ɪ.tər",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Fossil",
      hint: "A preserved remain of an ancient organism",
      definition:
        "The remains or impression of a prehistoric organism preserved in rock",
      pronunciation: "ˈfɒs.ɪl",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Ebullient",
      hint: "Overflowing with excitement",
      definition: "Cheerful and full of energy",
      pronunciation: "ɪˈbʌl.i.ənt",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Chandelier",
      hint: "A decorative light fixture suspended from the ceiling",
      definition:
        "An ornate lighting fixture that holds multiple bulbs or candles",
      pronunciation: "ˌʃæn.dəˈlɪər",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Ephemeral",
      hint: "Something lasting a very short time, often seen in nature",
      definition:
        "Anything transient or fleeting, often referring to life cycles",
      pronunciation: "ɪˈfɛm.ər.əl",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Kaleidoscope",
      hint: "An optical device with colorful patterns viewed through a tube",
      definition:
        "A tube with mirrors and colored glass that creates shifting patterns",
      pronunciation: "kəˈlaɪ.də.skoʊp",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Telescope",
      hint: "An instrument for viewing distant objects in space",
      definition:
        "An optical instrument that gathers and magnifies light to observe distant objects",
      pronunciation: "ˈtɛl.ɪˌskoʊp",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Alchemy",
      hint: "An ancient practice aiming to transform base materials into gold",
      definition:
        "A medieval chemical science aiming to convert matter and find the philosopher's stone",
      pronunciation: "ˈæl.kə.mi",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Quasar",
      hint: "An extremely bright and distant celestial object",
      definition:
        "A massive and distant celestial object emitting exceptionally large amounts of energy",
      pronunciation: "ˈkweɪ.zɑːr",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Nebula",
      hint: "A large cloud of gas and dust in space",
      definition:
        "A massive cloud of dust and gas in space, often where stars are born",
      pronunciation: "ˈnɛb.jə.lə",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Pseudonym",
      hint: "A fictitious name used by an author",
      definition: "A name used by an author to conceal their true identity",
      pronunciation: "ˈsuː.də.nɪm",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Vortex",
      hint: "A whirling mass of fluid or air",
      definition:
        "A mass of rotating fluid or air, often creating a spiral motion",
      pronunciation: "ˈvɔːr.tɛks",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Chimera",
      hint: "A mythical creature with parts from different animals",
      definition:
        "A fire-breathing female monster of Greek mythology, often depicted with parts from multiple animals",
      pronunciation: "kaɪˈmɪr.ə",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Fungicide",
      hint: "A chemical used to kill fungi",
      definition: "A substance used to kill fungi or inhibit their growth",
      pronunciation: "ˈfʌn.dʒɪˌsaɪd",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Zephyr",
      hint: "A gentle, mild breeze, often from the west",
      definition: "A soft, gentle breeze, typically associated with springtime",
      pronunciation: "ˈzɛf.ər",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Sculpture",
      hint: "Three-dimensional artwork created by shaping materials",
      definition:
        "A piece of art created by shaping or combining materials into a three-dimensional form",
      pronunciation: "ˈskʌlp.tʃər",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Paradox",
      hint: "A statement that contradicts itself but may still be true",
      definition: "A seemingly contradictory statement that may reveal a truth",
      pronunciation: "ˈpær.ə.dɒks",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Oxygenator",
      hint: "A device used to add oxygen to a liquid",
      definition:
        "A device that infuses oxygen into water or blood to support respiration",
      pronunciation: "ˈɒks.ɪ.dʒə.neɪ.tər",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Mosaic",
      hint: "An art form made from assembling small pieces",
      definition:
        "A picture or pattern created by arranging small colored tiles or stones",
      pronunciation: "moʊˈzeɪ.ɪk",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Meteorite",
      hint: "A solid fragment from space that reaches Earth",
      definition:
        "A fragment of rock or metal from space that survives entry into Earth's atmosphere",
      pronunciation: "ˈmiː.ti.ə.raɪt",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Vaccine",
      hint: "A substance used to stimulate immunity against diseases",
      definition:
        "A biological preparation that provides active acquired immunity to a particular disease",
      pronunciation: "vækˈsiːn",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Incubator",
      hint: "A device used to maintain optimal conditions for growth",
      definition:
        "A device that provides controlled conditions for hatching eggs or supporting premature infants",
      pronunciation: "ˈɪŋ.kjʊ.beɪ.tər",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Chronicle",
      hint: "A detailed account of historical events",
      definition: "A record of events in chronological order, often historical",
      pronunciation: "ˈkrɒn.ɪ.kəl",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Abyss",
      hint: "A deep or seemingly bottomless chasm",
      definition:
        "An immeasurably deep or vast space, often referring to the ocean or space",
      pronunciation: "əˈbɪs",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Cryptography",
      hint: "The practice of secure communication through codes",
      definition:
        "The art of writing or solving codes for secure communication",
      pronunciation: "krɪpˈtɒɡ.rə.fi",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Labyrinth",
      hint: "A complex maze or intricate network",
      definition: "A complicated network of paths or passages; a maze",
      pronunciation: "ˈlæb.ə.rɪnθ",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Archaeology",
      hint: "The study of human history through excavation",
      definition:
        "The study of human history through the excavation of sites and analysis of artifacts",
      pronunciation: "ˌɑːr.kiˈɒl.ə.dʒi",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Chronicler",
      hint: "A person who records events in order",
      definition: "A person who writes down events in chronological order",
      pronunciation: "ˈkrɒn.ɪ.klər",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Biome",
      hint: "A large naturally occurring community of flora and fauna",
      definition:
        "A major ecological community characterized by distinct climate and vegetation types",
      pronunciation: "ˈbaɪ.oʊm",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Vernacular",
      hint: "The language or dialect spoken by ordinary people",
      definition:
        "The everyday language spoken by a specific group of people or region",
      pronunciation: "vɜːrˈnæk.jʊ.lər",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Gargoyle",
      hint: "A carved stone creature often found on buildings",
      definition:
        "A water spout in the form of a grotesque creature, often used in architecture",
      pronunciation: "ˈɡɑːr.ɡɔɪl",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Algorithm",
      hint: "A step-by-step procedure for calculations",
      definition:
        "A set of rules or steps for solving a problem or completing a task, especially in computing",
      pronunciation: "ˈæl.ɡə.rɪ.ðəm",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Hypothesis",
      hint: "A proposed explanation made on limited evidence",
      definition:
        "A supposition or proposed explanation for a phenomenon, serving as a starting point for further investigation",
      pronunciation: "haɪˈpɒθ.ɪ.sɪs",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Fossil",
      hint: "Remains of ancient organisms preserved in rock",
      definition:
        "The preserved remains or traces of an organism that lived in the past",
      pronunciation: "ˈfɒs.əl",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Tsunami",
      hint: "A large ocean wave caused by seismic activity",
      definition:
        "A series of ocean waves caused by disturbances such as earthquakes or volcanic eruptions",
      pronunciation: "tsuːˈnɑː.mi",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Lab Coat",
      hint: "A white coat worn by scientists or doctors",
      definition:
        "A protective garment worn over clothing, typically by scientists or medical personnel",
      pronunciation: "læb koʊt",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Crescent",
      hint: "The shape of the moon in its first or last quarter",
      definition:
        "A shape resembling a segment of a ring tapering to points at the ends, often referring to the moon",
      pronunciation: "ˈkrɛs.ənt",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Silhouette",
      hint: "A dark outline against a lighter background",
      definition:
        "A representation of someone or something showing the shape and outline without detail",
      pronunciation: "ˌsɪl.əˈwɛt",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Tapestry",
      hint: "A piece of fabric with intricate designs, often hung on walls",
      definition:
        "A piece of textile art created by weaving colored threads to produce a design",
      pronunciation: "ˈtæp.ə.stri",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Dodecahedron",
      hint: "A three-dimensional shape with twelve flat faces",
      definition:
        "A polyhedron with twelve flat faces, commonly used in geometry",
      pronunciation: "ˌdoʊ.dɛk.əˈhiː.drən",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Monolith",
      hint: "A large, upright stone or a large structure",
      definition:
        "A large stone or structure that is often part of a monument or landmark",
      pronunciation: "ˈmɒn.ə.lɪθ",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Kinetic",
      hint: "Relating to motion, often used in art or energy",
      definition:
        "Relating to or resulting from motion; often used in reference to energy",
      pronunciation: "kɪˈnɛt.ɪk",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Lichen",
      hint: "A composite organism made from fungi and algae",
      definition:
        "A symbiotic association between fungi and algae, often found on rocks and trees",
      pronunciation: "ˈlaɪ.kən",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Bonsai",
      hint: "A miniature tree cultivated in a pot",
      definition:
        "A Japanese art form that involves growing and shaping small trees in pots",
      pronunciation: "ˈbɒn.saɪ",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Eclipse",
      hint: "An astronomical event where one celestial body obscures another",
      definition:
        "An event where one celestial body moves into the shadow of another, obscuring it temporarily",
      pronunciation: "ɪˈklɪps",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Kaleidoscopic",
      hint: "Relating to changing patterns of colors and shapes",
      definition:
        "Characterized by rapidly changing patterns and colors, like in a kaleidoscope",
      pronunciation: "kəˌlaɪ.dəˈskɒp.ɪk",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Nautical",
      hint: "Relating to ships, sailing, or navigation on water",
      definition:
        "Concerning navigation, shipping, and the sea; often used in maritime contexts",
      pronunciation: "ˈnɔː.tɪ.kəl",
      level: Level.ADVANCED,
      userId: user.id
    },
    {
      word: "Catalyst",
      hint: "A substance that speeds up a chemical reaction without being consumed",
      definition:
        "A substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change",
      pronunciation: "ˈkæt.ə.lɪst",
      level: Level.ADVANCED,
      userId: user.id
    }
  ];

  for (const flashcard of flashcards) {
    await prisma.flashcard.create({
      data: flashcard
    });
  }

  console.log("Database seeded with flashcards.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
