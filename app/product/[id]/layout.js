// app/product/[id]/layout.js
// import { getProductForMeta } from '@/lib/server/products'

// export async function generateMetadata({ params }) {
//   const product = await getProductForMeta(params.id)

//   if (!product) {
//     return {
//       title: 'Product Not Found | FibresNFools',
//       description: 'This product does not exist.',
//     }
//   }

//   return {
//     title: `${product.name} | FibresNFools`,
//     description: product.description,
//     openGraph: {
//       title: product.name,
//       description: product.description,
//       images: product.image ? [product.image] : [],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: product.name,
//       description: product.description,
//       images: product.image ? [product.image] : [],
//     },
//   }
// }

// export default function ProductLayout({ children }) {
//   return children
// }
