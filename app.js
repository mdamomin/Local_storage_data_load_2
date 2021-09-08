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
        let localData = '';
        if(cart=== null){
            localData = {};
            localData[inputFieldValue] = price * quantity;
            const localDataStringify = JSON.stringify(localData);
            localStorage.setItem('cart',localDataStringify);
            emptyContent();
            displayDataOnLoad();  
        }
        else{
            localDataParse = JSON.parse(cart);
                if(localDataParse[inputFieldValue]){
                    localDataParse[inputFieldValue] += price * quantity;
                }
                else{
                    localDataParse[inputFieldValue] = price * quantity;
                }
            const localDataStringify = JSON.stringify(localDataParse);
            localStorage.setItem('cart',localDataStringify);
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
  for (const item in loadDataParse) {
    const displayData = document.getElementById('display_data');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item}</td>
    <td id='${item}'></td>`;
    displayData.appendChild(tr);
    const itemField = document.getElementById(`${item}`);
    const productPriceField = document.getElementById("")
    itemField.innerText = loadDataParse[item];
  }
};
displayDataOnLoad();