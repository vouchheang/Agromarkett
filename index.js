// Get the URL parameters


async function fetchProductsByCategory(categoryId) {
  const url = `https://colorful-ball-607353d204.strapiapp.com/api/products?filters[categoryID][CategoryID][$eq]=${categoryId}&pagination[pageSize]=6&populate=*`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    let cards = "";
    let categoryText = "";
    let button = "";

    const products = data.data;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const imageUrl = product.attributes.images.data[0]?.attributes.url;

      cards += `
          <div class="col-md-4 mb-4">
            <div class="card position-relative">
              <a href="./pages/detail/index.html?productid=${product.attributes.ProductID}"><img src="${imageUrl}" class="card-img-top" alt="Image"></a>
              ${
                products[i].attributes.Origanic
                  ? '<span class="organic-badge">Organic</span>'
                  : ""
              }
              <div class="card4-body">
                <h5 class="card4-title">${products[i].attributes.Name}</h5>
                <p class="card4-text">Price: ${
                  products[i].attributes.Price
                } $</p>
                <p class="card4-text">Province: ${
                  products[i].attributes.OriginProvince
                }</p>
              </div>
            </div>
          </div>`;
    }

    // if (products.length > 0) {
      button = `
    <div class="col-12 text-center mt-3">
        <a href="./pages/productbyfilter/index.html?categoryid=${categoryId}" class="btn btn-primary">View All</a>
    </div>`;

    

    return `
        <div class="col-12">
          <h2 class="mt-4">${categoryText}</h2>
        </div>
        <div class="row">
          ${cards}
        </div>
        ${button}`;
  } catch (error) {
    console.error("Error fetching products:", error);
    return `<p>Error loading products for category ${categoryId}</p>`;
  }
}

async function loadProducts() {
  const categories = [1, 2, 3, 4];
  const promises = categories.map(fetchProductsByCategory);
  const results = await Promise.all(promises);
  const element = document.getElementById("display");
  element.innerHTML = results.join("");
}

loadProducts();
