const axios = require("axios");
const { Op } = require("sequelize");
const { Product } = require("../models");
const cheerio = require("cheerio");

const categoryMenu = {
  1: "celular",
  2: "geladeira",
  3: "tv",
}

const getMercadoLivreProdutcs = async(categoryId, description) => {
  let results = [];
  return axios.get(`https://lista.mercadolivre.com.br/${categoryMenu[categoryId] + " " + description}`)
		.then((response) => {
      const html = response.data;
			const $ = cheerio.load(html);
      $('.ui-search-result__wrapper').each(function(i, elem) {
				let price_decimal = $(this)
          .find('.ui-search-price.ui-search-price--size-medium > .ui-search-price__second-line')
          .find('.price-tag-fraction').text().trim();
				let price_decimal_separator = $(this)
          .find('.ui-search-price.ui-search-price--size-medium > .ui-search-price__second-line')
          .find('.price-tag-decimal-separator').text().trim();
				let price_cents = $(this)
          .find('.ui-search-price.ui-search-price--size-medium > .ui-search-price__second-line')
          .find('.price-tag-cents').text().trim();
				
				let result = {
          storeId: 1,
          categoryId,
					description: $(this).find('.ui-search-item__title').text().trim(),
					price: Number(price_decimal.replace(".", "")),
					link: $(this).find('a').attr("href"),
					image: $(this).find('.ui-search-result__image').find('img').attr('data-src')
				};
				results.push(result);
			});
      return results
    })
}

const getBuscapeProdutcs = async(categoryId, description) => {
  console.log(categoryMenu[categoryId] + " " + description)
  let results = [];
  const response = await axios.get(`https://www.buscape.com.br/search?q=${categoryMenu[categoryId] + " " + description}`)
		.then((response) => {
      const html = response.data;
			const $ = cheerio.load(html);
      $('.Cell_Cell__1YAxR').each((i, elem) => {
        const priceString = $(elem).find(".CellPrice_MainValue__3s0iP").text().trim()
        const intValue = (priceString).replace("R$ ", "").replace("\.", "").slice(0,-3)
        const cents = priceString.substr(-2)
        const noscript = $(elem).find('.Cell_Body__MIfCb').find("noscript").html()
        const noscriptArry = noscript.split(" ")
        const src = noscriptArry.find((value) => value.startsWith("src="))

				let result = {
          storeId: 2,
          categoryId,
					description: $(elem).find('.Cell_Name__jnsS-').text().trim(),
					price: Number(intValue + "." + cents),
					link: "https://www.buscape.com.br" + $(elem).find('a').attr("href"),
					image: src.replace("src=", "").slice(1, -1)
				};
				results.push(result);
			});
      return results
    })
  return response
}

const createStockItem = async(item) => {
  await Product.create(item)
}

const insertResultResarch = async(productsArray) => {
  productsArray.forEach(item => {
    createStockItem(item);
  });
}

const getProductsRepository = async({ storeId, categoryId, description }) => {
  const products = await Product.findAll(
    { 
      where: { storeId, categoryId, description: { [Op.substring]: description } }
    }
  )

  if (products[0] === undefined) {
    console.log("buscando na loja")
    if (storeId === 1) {
      const result = await getMercadoLivreProdutcs(categoryId, description);
      insertResultResarch(result);
      return result;
    } else if (storeId === 2)  {
      const result = await getBuscapeProdutcs(categoryId, description);
      insertResultResarch(result);
      return result;
    } else {
      return products
    }
  } else {
    return products;
  }
}

module.exports = {
  getProductsRepository
}