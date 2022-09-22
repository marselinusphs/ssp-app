// module.exports = {
//   name: 'products',
//   version: '1.0.0',
//   register: async (server, options) => {
//     const products = options.products;
//     console.log(products);
//     server.route([
//       {
//         method: 'GET',
//         path: '/products',
//         handler: () => {
//           return products;
//         }
//       }
//     ])
//   },
// };