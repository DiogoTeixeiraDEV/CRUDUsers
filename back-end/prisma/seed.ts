import { createHistogram } from 'perf_hooks';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  const hashedPassword = await bcrypt.hash('senhaDoAdmin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@site.com' },
    update: {},
    create: {
      email: 'admin@site.com',
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN'
    },
  });

  console.log('Admin criado:', admin);


    const produtos = [
    { name: 'Produto 1', category: 'categoria', price: 19.9, stock : 30 },
    { name: 'Produto 2', category: 'categoria2', price: 99, stock : 40 },
    { name: 'Produto 3', category: 'categoria3', price: 59.9, stock : 50 },
  ];

  for (const p of produtos) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
    console.log(`Produto criado: ${p.name}`);
  }

}   

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });