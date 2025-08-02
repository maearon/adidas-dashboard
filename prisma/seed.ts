import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

const ALPHA_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const NUMERIC_SIZES = Array.from({ length: 10 }, (_, i) => [
  `${36 + i}`,
  `${36 + i}.5`,
]).flat();
const LOCATIONS = ['US', 'VN'];

async function main() {
  console.log("🧼 Clearing existing data...");
  await prisma.variant_sizes.deleteMany();
  await prisma.variants.deleteMany();
  await prisma.products.deleteMany();
  await prisma.sizes.deleteMany();
  await prisma.tags.deleteMany();
  await prisma.models.deleteMany();
  await prisma.model_bases.deleteMany();
  await prisma.collaborations.deleteMany();

  console.log("📦 Seeding sizes...");
  for (const loc of LOCATIONS) {
    for (const label of ALPHA_SIZES) {
      await prisma.sizes.create({
        data: { label, system: 'alpha', location: loc },
      });
    }
    for (const label of NUMERIC_SIZES) {
      await prisma.sizes.create({
        data: { label, system: 'numeric', location: loc },
      });
    }
  }

  await prisma.sizes.create({
    data: { label: 'One Size', system: 'one_size', location: 'GLOBAL' },
  });

  const sizes = await prisma.sizes.findMany();
  console.log(`✅ Done seeding sizes: ${sizes.length} entries.`);

  console.log("🏷️ Seeding tags...");
  const tagSlugs = [
    'new_arrivals', 'best_sellers', 'prime_delivery', 'liberty_london_florals',
    'fast_delivery', 'soft_lux', 'must_have', 'summer_savings', 'trending_now',
    'disney_collection', 'premium_collaborations', 'release_dates', 'track_pants',
  ];
  for (const slug of tagSlugs) {
    await prisma.tags.create({
      data: { slug, name: faker.word.words(2) },
    });
  }

  console.log("📚 Seeding model bases (collections)...");
  const modelBaseSlugs = [
    'adicolor', 'gazelle', 'samba', 'superstar', 'sportswear', 'supernova', 'terrex',
    'ultraboost', 'y-3', 'zne', 'stella_mccartney', 'originals', 'f50',
    'adizero', '4d', 'five_ten', 'tiro', 'copa',
  ];
  for (const slug of modelBaseSlugs) {
    await prisma.model_bases.create({
      data: { slug, name: slug.replace(/_/g, ' ').toUpperCase() },
    });
  }

  console.log("🤝 Seeding collaborations...");
  const collabs = [
    'Bad Bunny', 'Bape', 'Disney', 'Edison Chen', 'Fear of God Athletics',
    'Pharrell', 'Prada', 'Sporty & Rich', 'Wales Bonner',
  ];
  for (const name of collabs) {
    await prisma.collaborations.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      },
    });
  }

  console.log("👟 Generating sample products...");
  const brands = ['Adidas', 'Originals', 'Athletics', 'Essentials'];
  const sports = ['Running', 'Soccer', 'Basketball', 'Tennis', 'Gym', 'Training', 'Golf', 'Hiking', 'Yoga', 'Football', 'Baseball'];
  const productTypes = ['Sneakers', 'Cleats', 'Sandals', 'Hoodie', 'Pants', 'Shorts', 'Jacket', 'Jersey', 'TShirt', 'TankTop', 'Dress', 'Leggings', 'Tracksuit', 'Bra', 'Coat'];
  const genders = ['Men', 'Women', 'Unisex', 'Kids'];
  const categories = ['Shoes', 'Apparel', 'Accessories'];

  for (let i = 0; i < 95; i++) {
    const brand = faker.helpers.arrayElement(brands);
    const producttype = faker.helpers.arrayElement(productTypes);
    const gender = faker.helpers.arrayElement(genders);
    const category = faker.helpers.arrayElement(categories);
    const sport = faker.helpers.arrayElement(sports);
    const modelNumber = `MOD${i.toString().padStart(4, '0')}`;
    const name = `${brand} ${producttype} ${i + 1}`;

    const modelBase = await prisma.model_bases.findFirst({ orderBy: { id: 'asc' } });
    const model = await prisma.models.create({
      data: {
        name: `${brand} ${producttype} Model ${i + 1}`,
        slug: `model-${i + 1}-${brand.toLowerCase()}-${producttype.toLowerCase()}`.replace(/\s+/g, "-"),
        model_base_id: modelBase?.id!,
      },
    });

    const tagIds = await prisma.tags.findMany({ take: 2 });
    const collab = await prisma.collaborations.findFirst();

    const product = await prisma.products.create({
      data: {
        name,
        gender,
        franchise: 'Tubular',
        product_type: producttype,
        brand,
        category,
        sport,
        model_base_id: modelBase?.id!,
        model_id: model.id,
        collaboration_id: collab?.id!,
        description_h5: `${producttype} for ${sport} by ${brand}`,
        description_p: "Performance-driven product for the modern athlete.",
        care: "Machine wash cold. Tumble dry low.",
        specifications: "Ergonomic, high-performance, breathable, eco-friendly",
        model_number: 'ABC123', // giả sử bạn có hoặc tạo số này
        created_at: new Date(),
        updated_at: new Date()
      },
    });

    const colors = ['Black', 'White', 'Red', 'Blue'];
    for (const color of colors) {
      const variant = await prisma.variants.create({
        data: {
          product_id: product.id,
          color,
          price: +faker.commerce.price({ min: 40, max: 150 }),
          compare_at_price: +faker.commerce.price({ min: 160, max: 250 }),
          variant_code: `VC${i + 1}-${color.slice(0, 2).toUpperCase()}-${faker.string.alphanumeric(4).toUpperCase()}`,
          stock: faker.number.int({ min: 5, max: 30 }),
          created_at: new Date(),
          updated_at: new Date()
        },
      });

      let sizes: any[] = [];
      if (category === 'Shoes') {
        sizes = await prisma.sizes.findMany({ where: { system: 'numeric', location: 'US' } });
      } else if (category === 'Apparel') {
        sizes = await prisma.sizes.findMany({ where: { system: 'alpha', location: 'US' } });
      } else {
        sizes = await prisma.sizes.findMany({ where: { label: 'One Size', location: 'GLOBAL' } });
      }

      for (const size of sizes) {
        await prisma.variant_sizes.create({
          data: {
            variant_id: variant.id,
            size_id: size.id,
            stock: faker.number.int({ min: 1, max: 30 }),
          },
        });
      }
    }

    console.log(`✅ Created product ${i + 1}: ${product.name}`);
  }

  console.log("🎉 Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
