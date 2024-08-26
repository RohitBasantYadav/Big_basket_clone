const ProductModel = require("../../models/product.model");

const getSpecificProduct = async(req,res)=>{
    const {id} = req.params;
    
    try {
        const product = await ProductModel.findOne({_id:id});
        if(product){
            res.status(200).json({msg:`This is specific Product`,data:product})
        }
        else{
            res.status(404).json({msg:`Product not found please provide correct Id`})
        }
    } catch (error) {
        res.status(500).json({msg:`Internal server error: ${error}`});
    }
}

module.exports = getSpecificProduct;