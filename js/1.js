const products = [{
        productName: "brush",
        productPrice: 100,
        productQuantity: 1
    },
    {
        productName: "soap",
        productPrice: 30,
        productQuantity: 1
    },
    {
        productName: "milk",
        productPrice: 50,
        productQuantity: 1
    },
    {
        productName: "meat",
        productPrice: 150,
        productQuantity: 2
    },
    {
        productName: "notebook",
        productPrice: 15,
        productQuantity: 1
    }
];



function createRows() {
    let rows = products.map(function (product, productIndex) {

        return `<tr class="text-center">
    <td>${product.productName}</td>
    <td>${product.productPrice}$</td>
    <td><i class="fa-solid fa-plus btn btn-success text-light me-3"
            onclick="addQuantity(${productIndex})"></i>${product.productQuantity}<i
            class="fa-solid fa-minus btn btn-danger text-light ms-3"
            onclick="removeQuantity(${productIndex})"></i></td>
    <td>${products[productIndex].productPrice  * products[productIndex].productQuantity} $
    </td>
    <td><i class="fa-solid fa-trash-can text-danger" onclick="deleteItem(${product.productIndex})"></i></td>
</tr>`;
    })


    let sumTotal = products.reduce(function (acc, curr) {
        return acc + (curr.productQuantity * curr.productPrice)
    }, 0)


    document.querySelector('tbody').innerHTML = rows.join(" ");
    document.querySelector('tfoot').innerHTML = `<tr class="table-danger text-center fw-bold">
                <td colspan="3">Sum</td>
                <td colspan="2">${sumTotal}</td>
            </tr>`;
}

document.getElementById('buttonSearch').addEventListener('click', doSearch);
document.getElementById('keyword').addEventListener('keyup', doSearch);

function doSearch() {
    let keyword = document.getElementById('keyword').value;
    const searchItems = products.filter(function (value) {
        return value.productName.includes(keyword)
    })
    console.log(searchItems)

    let rows = searchItems.map(function (product, productIndex) {

        return `<tr>
                 <td>${product.productName}</td>
                 <td>${product.productPrice}$</td>
                 <td><i class="fa-solid fa-plus btn btn-success text-light me-3"
                         onclick="addQuantity(${productIndex})"></i>${product.productQuantity}<i
                         class="fa-solid fa-minus btn btn-danger text-light ms-3"
                         onclick="removeQuantity(${productIndex})"></i></td>
                 <td>${searchItems[productIndex].productPrice * searchItems[productIndex].productQuantity}
                 </td>
                 <td><i class="fa-solid fa-trash-can text-danger" onclick="deleteItem(${product.productIndex})"></i>
                 </td>
             </tr>`;
    })


    let sumTotal = searchItems.reduce(function (acc, curr) {
        return acc + (curr.productQuantity * curr.productPrice)
    }, 0)


    document.querySelector('tbody').innerHTML = rows.join(" ");
    document.querySelector('tfoot').innerHTML = `<tr class="table-info text-center fw-bold">
                 <td colspan="3">Sum</td>
                 <td colspan="2">${sumTotal}</td>
             </tr>`;
}

function deleteItem(productIndex) {
    products.splice(productIndex, 1);
    createRows()
}


document.getElementsByClassName('fa-solid fa-arrow-down-1-9')[0].addEventListener("click", function () {
    refreshItem(true)
});
document.getElementsByClassName('fa-solid fa-arrow-down-9-1')[0].addEventListener("click", function () {
    refreshItem(false)
});

function refreshItem(event) {

    if (event) {
        products.sort(function (a, b) {
            const nameA = a.productName;
            const nameB = b.productName;
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            if (nameA === nameB) return 0;
        });
        createRows();
        console.log('A to Z')

    } else if (!event) {
        products.reverse();
        createRows();
        console.log('Z to A');
    }
}

function addQuantity(productIndex) {
    products[productIndex].productQuantity += 1;

    createRows()
}

function removeQuantity(productIndex) {
    if (products[productIndex].productQuantity > 1)
        products[productIndex].productQuantity -= 1;
    createRows()
}