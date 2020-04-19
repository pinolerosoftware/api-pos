const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products')
const upload = require('../helper/upload');
const auth = require('../middlewares/auth');
//const singleUpload = upload.single('image')

/* GET product listing. */
router.get('/', auth, ProductsController.getProducts);

router.get('/:productId', auth, ProductsController.getProduct);

router.post('/', auth, ProductsController.insertProduct);

router.put('/:productId', auth, ProductsController.updateProduct);

router.delete('/:productId', auth, ProductsController.deleteProduct);

// router.post('/upload', function(req, res) {
//     singleUpload(req, res, function(err, some) {
//       if (err) {
//         return res.status(422).send({errors: [{title: 'Error al subir la imagen', detail: err.message}] });
//       }
//       return res.json({'imageUrl': req.file.location});
//     });
// });

module.exports = router;
