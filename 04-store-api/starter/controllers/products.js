const product = require('../models/product')

const getAllProductsStatic = async (req, res) =>{
    const products = await product.find({
        name: "vase table"
     })
    res.status(200).json({products,nbHits: products.length})
}

const getAllProducts = async (req, res) =>{
    const { featured,company,name,sort,feild,numericFilter} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = { $regex : name, $options: 'i'}
    }

    if(numericFilter){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq', 
            '<': '$lt',
            '<=': '$lte',
        }

        const regEX = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(
            regEX,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price','rating']
        filters = filters.split(',').forEach((item) =>{
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        })
    }
    let results = product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(" ")
        results = results.sort(sortList)
    }
    else{
        results = results.sort('createdAt')
    }
    if(feild){
        const feildList = feild.split(',').join(" ")
        results = results.select(feildList)
    }

    const products = await results 
    res.status(200).json({products,nbHits: products.length})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}
