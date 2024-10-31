const { PrismaClient, Level } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      password: "securepassword",
      verified: true,
      role: "USER"
    }
  });

  const flashcards = [
    {
      word: "Apple",
      hint: "A fruit often associated with Newton",
      definition: "A round fruit with red, green, or yellow skin",
      pronunciation: "ˈæp.əl",
      image: "/images/apple.jpg",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Complicated",
      hint: "Not simple",
      definition: "Something that is difficult to understand or deal with",
      pronunciation: "ˈkɒm.plɪ.keɪ.tɪd",
      image: "/images/complicated.jpg",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Photosynthesis",
      hint: "Process plants use to make food",
      definition:
        "The process by which green plants use sunlight to synthesize foods",
      pronunciation: "ˌfəʊ.təʊˈsɪn.θɪ.sɪs",
      image: "/images/photosynthesis.jpg",
      level: Level.ADVANCED,
      userId: user.id
    },
    // Additional flashcards for each level
    {
      word: "Banana",
      hint: "A yellow fruit monkeys love",
      definition: "A long, curved fruit with a soft inside and a yellow peel",
      pronunciation: "bəˈnɑː.nə",
      image: "/images/banana.jpg",
      level: Level.BEGINNER,
      userId: user.id
    },
    {
      word: "Enthusiastic",
      hint: "Very excited about something",
      definition: "Having or showing intense and eager enjoyment or interest",
      pronunciation: "ɪnˌθuː.ziˈæs.tɪk",
      image: "/images/enthusiastic.jpg",
      level: Level.INTERMEDIATE,
      userId: user.id
    },
    {
      word: "Ebullient",
      hint: "Overflowing with excitement",
      definition: "Cheerful and full of energy",
      pronunciation: "ɪˈbʌl.i.ənt",
      image: "/images/ebullient.jpg",
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
