import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";

async function main() {
  const password = await bcrypt.hash("Password", 10);

  await prisma.user.upsert({
    where: { username: "Administrador" },
    update: { password },
    create: { username: "Administrador", password, role: "Administrador" },
  });

  console.log("Usuario Administrador creado/actualizado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
