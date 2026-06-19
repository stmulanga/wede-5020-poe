
/* Menu data */
const menuData = {

    bread: [
        { name: 'White Bread',                       price: 15.00,  unit: 'Loaf of 500g' },
        { name: 'Whole Wheat Bread',                  price: 20.00,  unit: 'Loaf of 500g' },
        { name: 'Raisin Loaf',                        price: 32.00,  unit: 'Loaf of 500g' },
        { name: 'Banana Loaf',                        price: 48.00,  unit: 'Loaf of 500g' },
        { name: 'Assorted Crispy Brown Bread Rolls',  price: 34.80,  unit: 'Per pack'      },
        { name: 'Honeycomb & Portuguese Rolls',       price: 37.80,  unit: 'Per pack'      },
        { name: 'Cocktail Bread Rolls (White/Brown)', price: 21.00,  unit: 'Per pack'      },
        { name: 'Footlong Rolls',                     price: 27.00,  unit: 'Per unit'      },
        { name: 'Jumbo Hamburger Buns',               price: 27.00,  unit: 'Per unit'      },
        { name: 'Cheddar Cheese Rolls',               price: 29.10,  unit: 'Per unit'      },
        { name: 'Panini Rolls',                       price: 33.00,  unit: 'Per unit'      },
        { name: 'Multiseed Rolls',                    price: 39.00,  unit: 'Per unit'      }
    ],

    cakes: [
        { name: 'Chocolate Caramel Slice',                  price: 43.99, unit: '100g slice' },
        { name: 'Red Velvet Slice',                         price: 44.99, unit: '100g slice' },
        { name: 'Carrot Cake Slice',                        price: 43.99, unit: '100g slice' },
        { name: 'Hummingbird Cake Slice',                   price: 54.99, unit: '100g slice' },
        { name: 'Lemon Meringue Slice',                     price: 44.99, unit: '100g slice' },
        { name: 'Chocolate Truffle Mousse Slice',           price: 64.99, unit: '100g slice' },
        { name: 'Double Chocolate Baked Cheesecake Slice',  price: 64.99, unit: '100g slice' },
        { name: 'Blueberry & White Chocolate Cheesecake',   price: 69.99, unit: '100g slice' },
        { name: 'Strawberry & Cream Cheese Slice',          price: 54.99, unit: '100g slice' },
        { name: 'Red Velvet Buttermilk Mini Loaf',          price: 99.99, unit: 'Per loaf'   },
        { name: 'Vanilla Funfetti Birthday Cake Mini Loaf', price: 79.99, unit: 'Per loaf'   }
    ],

    doffins: [
        { name: 'Cocktail Long John Donuts', price: 363.00, unit: 'Pack of 12' },
        { name: 'Long John Donuts',          price: 102.00, unit: 'Pack of 12' },
        { name: 'Donut Holes',               price: 128.00, unit: 'Pack of 50' },
        { name: '40g Mini Ring Donuts',      price: 66.00,  unit: 'Pack of 15' },
        { name: '60g Ring Donuts',           price: 89.00,  unit: 'Pack of 12' },
        { name: 'Mini Muffins',              price: 28.00,  unit: 'Pack of 4'  },
        { name: 'Single Muffin',             price: 12.00,  unit: 'Each'       },
        { name: 'Single Savoury Muffin',     price: 18.00,  unit: 'Each'       }
    ],

    drinks: [
        { name: 'Americano',           price: 25.00, unit: 'Per cup' },
        { name: 'Cappuccino',          price: 30.00, unit: 'Per cup' },
        { name: 'Matcha Latte',        price: 55.00, unit: 'Per cup' },
        { name: 'Chai Latte',          price: 40.00, unit: 'Per cup' },
        { name: 'Red Cappuccino',      price: 40.00, unit: 'Per cup' },
        { name: 'Salted Caramel Latte',price: 46.00, unit: 'Per cup' },
        { name: 'Creme Brulee Latte',  price: 44.00, unit: 'Per cup' },
        { name: 'Sweet Espresso Frost',price: 56.00, unit: 'Per cup' }
    ]
};


/* Called when the user changes the category dropdown. */
function updateProductOptions() {
    const category   = document.getElementById('enqCategory').value;
    const productSel = document.getElementById('enqProduct');

    /* Reset product dropdown to empty */
    productSel.innerHTML = '<option value="">-- Select a product --</option>';

    /* If no category selected yet, leaves the dropdown empty */
    if (!category || !menuData[category]) {
        return;
    }

    /* Loop through the products for this category and add each as an option */
    menuData[category].forEach(function(product, index) {
        const option = document.createElement('option');
        option.value = index;          /* index is used to look up price later */
        option.textContent = product.name + ' — R' + product.price.toFixed(2) + ' (' + product.unit + ')';
        productSel.appendChild(option);
    });
}



function setEnqError(spanId, message) {
    document.getElementById(spanId).textContent = message;
}
function clearEnqError(spanId) {
    document.getElementById(spanId).textContent = '';
}


/* Called when the user clicks "Get Quote". */
function submitEnquiry() {

    
    const name      = document.getElementById('enqName').value.trim();
    const email     = document.getElementById('enqEmail').value.trim();
    const phone     = document.getElementById('enqPhone').value.trim();
    const category  = document.getElementById('enqCategory').value;
    const productIdx= document.getElementById('enqProduct').value;
    const qty       = parseInt(document.getElementById('enqQty').value, 10);
    const notes     = document.getElementById('enqNotes').value.trim();

    let isValid = true;

    /*  Validate: Name  */
    if (name.length < 2) {
        setEnqError('enqNameErr', 'Please enter your full name.');
        isValid = false;
    } else { clearEnqError('enqNameErr'); }

    /*  Validate: Email */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setEnqError('enqEmailErr', 'Please enter a valid email address.');
        isValid = false;
    } else { clearEnqError('enqEmailErr'); }

    /*  Validate: Phone (10-digit SA number, optional)  */
    if (phone !== '') {
        const digits = phone.replace(/[\s\-()]/g, '');
        if (!/^0[0-9]{9}$/.test(digits)) {
            setEnqError('enqPhoneErr', 'Please enter a valid 10-digit SA phone number.');
            isValid = false;
        } else { clearEnqError('enqPhoneErr'); }
    } else { clearEnqError('enqPhoneErr'); }

    /*  Validate: Category  */
    if (!category) {
        setEnqError('enqCatErr', 'Please select a product category.');
        isValid = false;
    } else { clearEnqError('enqCatErr'); }

    /*  Validate: Product  */
    if (productIdx === '' || productIdx === null) {
        setEnqError('enqProdErr', 'Please select a product.');
        isValid = false;
    } else { clearEnqError('enqProdErr'); }

    /*  Validate: Quantity (between 1 and 100)  */
    if (isNaN(qty) || qty < 1 || qty > 100) {
        setEnqError('enqQtyErr', 'Please enter a quantity between 1 and 100.');
        isValid = false;
    } else { clearEnqError('enqQtyErr'); }

    /*  Stop if any validation failed  */
    if (!isValid) { return; }

    /*  Look up the selected product from menuData  */
    const product   = menuData[category][parseInt(productIdx, 10)];
    const unitPrice = product.price;
    const total     = unitPrice * qty;

    const responseDiv = document.getElementById('enquiryResponse');
    responseDiv.style.display = 'block';
    responseDiv.innerHTML =
        '<h2>Quote for ' + name + '</h2>' +
        '<p><strong>Product:</strong> ' + product.name + '</p>' +
        '<p><strong>Unit price:</strong> R' + unitPrice.toFixed(2) + ' (' + product.unit + ')</p>' +
        '<p><strong>Quantity:</strong> ' + qty + '</p>' +
        '<p><strong>Estimated total:</strong> R' + total.toFixed(2) + '</p>' +
        (notes ? '<p><strong>Your notes:</strong> ' + notes + '</p>' : '') +
        '<p>Thank you, ' + name + '! We will confirm availability and contact you at <strong>' + email + '</strong> within 24 hours.</p>' +
        '<p><em>Please note: this is an estimate only. Final pricing may vary for custom or bulk orders.</em></p>';

    /* Scroll the response into view so the user sees it */
    responseDiv.scrollIntoView({ behavior: 'smooth' });
}
