const generateMessage = (data) => ({
  notFound: `${data} not found`,
  alreadyExist: `${data} already exist`,
  created: `${data} created successfully`,
  updated: `${data} updated successfully`,
  deleted: `${data} deleted successfully`,
  failed: `${data} failed`,
}); // return object

export const message = {
  Category: { ...generateMessage('Category') },
  Brand: { ...generateMessage('Brand') },
  product: { ...generateMessage('product') },
  copon: { ...generateMessage('copon') },

  cart: { ...generateMessage('cart') },
};
