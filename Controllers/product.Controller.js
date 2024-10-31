const Product = require("../Models/Product");
const productController = async () => {};
const PAGE_SIZE = 1;
let response = { status: "success" };

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;

    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });

    await product.save();
    res.status(200).json({ status: "success", product });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ status: "fail", error: error.message });
  }
};

productController.getProducts = async (req, res) => {
  try {
    const { page, name } = req.query;

    const cond = name ? { name: { $regex: name, $options: "i" } } : {};
    let query = Product.find(cond);

    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      // 최종 몇개 페이지
      // 데이터가 총 몇개 있는지
      const totalItemNum = await Product.countDocuments(cond);

      //데이터 총 개수
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      response.totalPageNum = totalPageNum;
    }

    const productList = await query.exec();
    response.data = productList;

    const products = await Product.find({});
    //console.log(productList);
    //res.status(200).json({ status: "success", data: productList });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = productController;
