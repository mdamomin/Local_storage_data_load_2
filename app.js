document.getElementById('input_btn').addEventListener('click', function(){
    const inputField = document.getElementById('input_field');
    const inputFieldValue = inputField.value.toUpperCase();
    const priceField = document.getElementById('product_price');    
    const price = parseFloat(priceField.value);
    const quantityField = document.getElementById('product_quantity');
    const quantity = parseFloat(quantityField.value);
    if(inputFieldValue==='' || price <= 0 || quantity <= 0 ){
        return;
    }
    else{     
        let cart = localStorage.getItem('cart');
        if(cart=== null){
            let cart = [];
            let localData = {};
            localData['Product Name'] = inputFieldValue;
            localData['Quantity'] = quantity;
            localData['Product Price'] = price * quantity;
            cart.push(localData);
            const localDataStringify = JSON.stringify(cart);
            localStorage.setItem('cart',localDataStringify);
            emptyContent();
            displayDataOnLoad();  
        }
        else{
            let localDataParse = JSON.parse(localStorage.getItem("cart"));
            let obj = localDataParse.find(o => o['Product Name'] === inputFieldValue);
                if(obj){
                    const index = localDataParse.findIndex(product=>product['Product Name']===inputFieldValue); 
                    obj['Product Name'] = inputFieldValue;
                    obj['Quantity'] += quantity;
                    obj['Product Price'] += price * quantity;
                    localDataParse.splice(index,1,obj);  
                    const localDataStringify = JSON.stringify(localDataParse);
                    localStorage.setItem('cart',localDataStringify);
                }
                else{
                    let newData={};
                    newData['Product Name'] = inputFieldValue;
                    newData['Quantity'] = quantity;
                    newData['Product Price'] = price * quantity;
                    localDataParse.push(newData) ;
                    const localDataStringify = JSON.stringify(localDataParse);
                    localStorage.setItem('cart',localDataStringify);     
                } 
            emptyContent();
            displayDataOnLoad();
        } 
        inputField.value = '';
        priceField.value = '';
        quantityField.value = '';
    }   
});
const emptyContent = () => {
    const displayData = document.getElementById('display_data');
    displayData.textContent="";
}
const displayDataOnLoad = ()=>{
  const loadData =  localStorage.getItem('cart');
  const loadDataParse = JSON.parse(loadData);
  console.log(loadDataParse)
  for (const item1 of loadDataParse) {
    console.log(item1)
    const displayData = document.getElementById('display_data');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item1['Product Name']}</td>
    <td>${item1['Quantity']}</td>
    <td>${item1['Product Price']}</td>`;
    displayData.appendChild(tr);
  }
};
displayDataOnLoad();