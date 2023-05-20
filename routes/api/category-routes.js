const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
    //  include: [{model: Product, as: "category_products" }]
     include: [Product]
    })
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
    //  include: [{ model: Product, as: "category_product" }]
        include: [{ model: Product}]
    });
    res.status(200).json(categoryData)

    if (!categoryData) {
      res.status(404).send({ message: "Not Found!"})
    };
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData)
  }
  catch {
    res.status(400).send(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  console.log("Params: ", req.params);
  console.log("Body Data: ", req.body);

  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;
