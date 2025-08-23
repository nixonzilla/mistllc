import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.song.createMany({
    data: [
      { title: "Drippy", artist: "MISTLLC", duration: "3:15" },
      { title: "Vibes", artist: "MISTLLC", duration: "2:58" },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
