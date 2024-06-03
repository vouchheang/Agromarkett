// let params = new URL (document.location).searchParams;
// let category = params.get('category');
// console.log("category", category);


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('categoryid')
console.log(product);

const url =
  `https://colorful-ball-607353d204.strapiapp.com/api/products?populate=*&filters[categoryID][CategoryID][$eq]=${product}`;

  const url1= `https://colorful-ball-607353d204.strapiapp.com/api/products?populate=*&pagination[pageSize]=34`;


async function fetchAllProducts(url) {
  let allProducts = [];
  let nextPageUrl = url;

  while (nextPageUrl) {
    const response = await fetch(nextPageUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    allProducts = allProducts.concat(data.data);

    const pagination = data.meta.pagination;
    if (pagination.page < pagination.pageCount) {
      nextPageUrl = `${url}&pagination[page]=${pagination.page + 1}`;
    } else {
      nextPageUrl = null;
    }
  }

  return allProducts;
}
fetchAllProducts(url)
  .then((products) => {
    const card = document.getElementById("Productlist");

    // Group products by category
    const groupedProducts = {};
    products.forEach((product) => {
      const category = product.attributes.Category;
      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }
      groupedProducts[category].push(product);
    });

    let count = 0;
    let cardhtml = ``;

    for (let i = 0; i < products.length; i++) {
      if (count === 0) {
        cardhtml += `<div class="row">`;
      }

      cardhtml += `
        <div class="col-md-6">
          <div class="box">
            <div class="inner-box">
              <div class="image-box">
              
                <img src="${
                  products[i].attributes.images.data[0]?.attributes.formats
                    .thumbnail.url
                }" class="card-img-top" alt="Image">
                    ${
                      products[i].attributes.Origanic
                        ? '<span class="badge organic-badge" style="position: absolute;  top: 10px;right: 10px;  background-color: #ffd700;  color: #006400;  padding: 5px 10px;border-radius: 5px;">Organic</span>'
                        : ""
                    }
              </div>
              <div class="text-box">
               
                <h2>${products[i].attributes.Name}</h2>
                <p>Price: ${products[i].attributes.Price} $</p>
                <p>Quantity: ${products[i].attributes.Quantity} Kg</p>
                <h5>Province: ${products[i].attributes.OriginProvince}</h5>
              </div>
            </div>
          </div>
        </div>
      `;

      count++;

      if (count === 2) {
        cardhtml += `</div>`;
        count = 0;
      }
    }
    card.innerHTML += cardhtml;
    console.log(products);
  })
  .catch((error) => console.error("Error:", error));



  if(product === 'all'){
  async function fetchAllProducts(url) {
    let allProducts = [];
    let nextPageUrl = url1;
  
    while (nextPageUrl) {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      allProducts = allProducts.concat(data.data);
  
      const pagination = data.meta.pagination;
      if (pagination.page < pagination.pageCount) {
        nextPageUrl = `${url}&pagination[page]=${pagination.page + 1}`;
      } else {
        nextPageUrl = null;
      }
    }
  
    return allProducts;
  }
  fetchAllProducts(url)
    .then((products) => {
      const card = document.getElementById("Productlist");
  
      // Group products by category
      const groupedProducts = {};
      products.forEach((product) => {
        const category = product.attributes.Category;
        if (!groupedProducts[category]) {
          groupedProducts[category] = [];
        }
        groupedProducts[category].push(product);
      });
  
      let count = 0;
      let cardhtml = ``;
   
      for (let i = 0; i < products.length; i++) {
        if (count === 0) {
          cardhtml += `<div class="row">`;
        }
  
        cardhtml += `
          <div class="col-md-6">
            <div class="box">
              <div class="inner-box">
                <div class="image-box">
                
                  <img src="${
                    products[i].attributes.images.data[0]?.attributes.formats
                      .thumbnail.url
                  }" class="card-img-top" alt="Image">
                      ${
                        products[i].attributes.Origanic
                          ? '<span class="badge organic-badge" style="position: absolute;  top: 10px;right: 10px;  background-color: #ffd700;  color: #006400;  padding: 5px 10px;border-radius: 5px;">Organic</span>'
                          : ""
                      }
                </div>
                <div class="text-box">
                 
                  <h2>${products[i].attributes.Name}</h2>
                  <p>Price: ${products[i].attributes.Price} $</p>
                  <p>Quantity: ${products[i].attributes.Quantity} Kg</p>
                  <h5>Province: ${products[i].attributes.OriginProvince}</h5>
                </div>
              </div>
            </div>
          </div>
        `;
  
        count++;
  
        if (count === 2) {
          cardhtml += `</div>`;
          count = 0;
        }
      }
      card.innerHTML += cardhtml;
      console.log(products);
    })
    .catch((error) => console.error("Error:", error));
  }

  const navLinks = document.querySelectorAll('.nav-link');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active' class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});
  