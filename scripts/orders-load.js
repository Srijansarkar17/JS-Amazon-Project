import { renderOrdersHTML } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";

async function loadPage() {
        await loadProductsFetch(() => {
            resolve();
        });
        renderOrdersHTML(products);

}
loadPage();