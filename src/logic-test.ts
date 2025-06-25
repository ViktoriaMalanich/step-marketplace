// import { categories, category_props, properties, products, products_props } from "./components/mock-data/data";

// console.log("categories", categories);
// console.log("properties", properties);


// //добавляю характеристики, присущие данной категории из списка properties
// category_props.push({
//     category_id: 1,
//     properties_id: 3,
//     values: []
// });
// category_props.push({
//     category_id: 1,
//     properties_id: 4,
//     values: []
// });
// console.log("category_props", category_props);

// products.push({
//     id: 1,
//     name: "S10",
//     category_id: 1
// })

// products.push({
//     id: 2,
//     name: "S22",
//     category_id: 1
// })

// // products_props.push({
// //     phone_id: 1,
// //     properties_id: 3
// // })
// // products_props.push({
// //     phone_id: 1,
// //     properties_id: 4
// // })

// function addProppsToProduct(product: any, props_id: number, value: string) {
//     console.log("product", product);
//     const result = category_props.find((item: { category_id: number; properties_id: number; }) => item.category_id == product.category_id && item.properties_id == props_id);
//     if (result) {
//         products_props.push({
//             properties_id: props_id,
//             product_id: product.id,
//             value
//         })
//         console.log("result!!!!!!!!!!!!", result);

//         categoryPropsValueUpdate(result.category_id, result.properties_id, value);

//     }
//     console.log("result", result);
// }

// function categoryPropsValueUpdate(category_id: number, props_id: number, value: string) {

//     // console.log("!!!!!!!!!!!!!!!!!", category_id, props_id, value);
//     const idx = category_props.findIndex((item: { category_id: number; properties_id: number; }) => item.category_id == category_id && item.properties_id == props_id);
//     console.log("idx", idx);

//     console.log("category_props[idx]", category_props[idx]);
//     if (!category_props[idx].values.includes(value)) category_props[idx].values.push(value);
//     console.log(category_props[idx].values);
// }


// addProppsToProduct(products[0], 4, "1920x1080");
// addProppsToProduct(products[1], 4, "2K");



// console.log("products_props", products_props);

// const generalObject = {
//     ...categories[0],
//     properties: category_props.map((item: { category_id: any; properties_id: any; values: any; }) => {
//         if (item.category_id == categories[0].id) {
//             const property = properties.find((elem: { id: any; }) => elem.id == item.properties_id)
//             return {
//                 name: property.name,
//                 values: item.values
//             }
//         }
//     })
// }

// console.log(generalObject);



