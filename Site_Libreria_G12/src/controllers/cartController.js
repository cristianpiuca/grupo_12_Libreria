const db = require("../database/models");

const getOrder = async (id) => {
  try {
    let order = await db.Order.findOne({
      where: {
        userId: id,
        statusId: 1,
      },
      include: [
        {
          association: "carts",
          attributes: ["id", "quantify"],
          include: [
            {
              association: "product",
              include: ["images"],
              attributes: ["id", "title", "price", "discount"],
            },
          ],
        },
      ],
    });
    return order;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  list: (req, res) => {
    
  },
  addItem: async (req, res) => {
    let product = await db.Product.findByPk(req.body.id);
    if (req.session.userLogin) {
      if (req.session.userLogin.order) {
        let item = req.session.userLogin.order.carts.find(
          (cart) => cart.product.id == product.id
        );
        if (item) {
          await db.Cart.update(
            {
              quantify: item.quantify + 1,
            },
            {
              where: { id: item.id },
            }
          );
        } else {
          await db.Cart.create({
            userId: req.session.userLogin.order.userId,
            productId: product.id,
            quantify: 1,
            orderId: req.session.userLogin.order.id,
          });
        }
      } else {
        let newOrder = await db.Order.create({
          userId: req.session.userLogin.id,
          statusId: 1,
          total: 0,
        });
        await db.Cart.create({
          userId: newOrder.userId,
          productId: product.id,
          quantify: 1,
          orderId: newOrder.id,
        });
      }
      let order = await getOrder(req.session.userLogin.id);
      req.session.userLogin.order = order;
      return res.status(201).json({
        ok: true,
        order: order.id,
        carts: order.carts,
      });
    }
  },
  removeItem:  (req, res) => {
   
  },
  removeAll:  (req, res) => {
  
  },
  removeItemFull:  (req, res) => {
    
  },
};