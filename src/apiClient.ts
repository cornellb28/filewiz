import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newUsers = await prisma.user.create({
    data: {
      first_name: "Cornell",
      email: "cornellb28@gmail.com",
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
