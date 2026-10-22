import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";

async function main() {
  const [username, password, ...flags] = process.argv.slice(2);

  if (!username || !password) {
    console.log("Uso: npm run user:password -- <usuario> <nuevaContraseña> [--create]");
    process.exit(1);
  }

  const create = flags.includes("--create");
  const existing = await prisma.user.findUnique({ where: { username } });

  if (!existing && !create) {
    console.error(`El usuario "${username}" no existe. Agrega --create para crearlo.`);
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { username },
    update: { password: hash },
    create: { username, password: hash, role: create ? "Usuario" : undefined },
  });

  console.log(
    `${existing ? "Contraseña actualizada" : "Usuario creado"}: ${user.username} (id ${user.id}, rol ${user.role})`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
