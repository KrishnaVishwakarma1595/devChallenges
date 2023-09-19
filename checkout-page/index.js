try {
    class Checkout{
        constructor(){
            this.item1BasePrice = 54.99;
            this.item2BasePrice = 74.99;
            this.totalPrice = this.item1BasePrice + this.item2BasePrice;
            this.allInputs = document.querySelectorAll('input');
            this.countryInput = document.getElementById('country');
            this.dropdownList = document.querySelector('.dropdown-list');
            this.toggleIndicator = document.querySelector('.expand-more');
            this.listItems = document.querySelectorAll('.dropdown-list__item');
            
            this.form = document.getElementById('checkout-form');
            this.item1PriceElem = document.querySelector('.item-1-price');
            this.item2PriceElem = document.querySelector('.item-2-price');
            this.quantLevels = document.querySelectorAll('.quantLevel');
            this.totalElem = document.querySelector('.total_price');
        }

        allowOnlyNumbers = (evt) => {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode < 48 || charCode > 57) {
                evt.preventDefault();
            }
        }

        validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail = re.test(String(email).toLowerCase());
            return isValidEmail
        };

        onFormSubmit = (evt) => {
            let isSubmitted = true;
            evt.preventDefault();

            this.allInputs.forEach((input) => {
                if(input.value === ''){                
                    document.querySelector(`#e-${input.id}`).textContent = "The field is required";
                    document.querySelector(`#e-${input.id}`).style.display = 'block';
                    input.classList.add('error-input');
                    isSubmitted = false;
                }

                if(input.value && input.name === 'email'){
                    const isValid = this.validateEmail(input.value);
                    if(!isValid){ 
                        document.querySelector(`#e-${input.id}`).textContent = "Please, enter valid email id!";
                        document.querySelector(`#e-${input.id}`).style.display = 'block';
                        input.classList.add('error-input');
                        isSubmitted = false; 
                    }
                }

                if(input.value && input.value.length < 10 && input.name === 'phone'){ 
                    document.querySelector(`#e-${input.id}`).textContent = "Please, enter valid phone number!";
                    document.querySelector(`#e-${input.id}`).style.display = 'block';
                    input.classList.add('error-input');
                    isSubmitted = false;                     
                }
            })

            if(isSubmitted){
                console.log('Successfully submitted...');
                document.querySelector('.checkout__form_container').style.display = 'none';
                document.querySelector('.product-cart__section').style.display = 'none';
                document.querySelector('.success_container').style.display = 'flex';
            }
        }

        init(){
            this.toggleIndicator.addEventListener('click', () => {
                this.toggleIndicator.classList.toggle('expand-less');
                this.dropdownList.classList.toggle('d-flex');
            })

            this.listItems.forEach((item) => {
                item.addEventListener('click', () => {
                    this.countryInput.value = item.dataset.value;
                    this.toggleIndicator.classList.remove('expand-less');
                    this.dropdownList.classList.remove('d-flex');
                    document.querySelector(`#e-country`).textContent = "";
                    document.querySelector(`#e-country`).style.display = "none";
                    document.getElementById('country').classList.remove('error-input');
                })
            })

            this.form.addEventListener('submit', this.onFormSubmit);

            if(this.allInputs.length){
                this.allInputs.forEach((input) => {
                    if(input.id !== 'ig_c1'){
                        input.addEventListener('change', (e) => {
                            console.log('input', e.target.id);
                            if(e.target.value){
                                document.querySelector(`#e-${input.id}`).textContent = "";
                                document.querySelector(`#e-${input.id}`).style.display = "none";
                                input.classList.remove('error-input');
                            }
                        })
                    }
                    
                    if(input.id === 'phone' || input.id === 'postalCode'){
                        input.addEventListener('keypress', this.allowOnlyNumbers);
                    }
                })
            }

            if(this.quantLevels){
                this.quantLevels.forEach((level) => {
                    level.addEventListener('click', (e) => {
                        const levelOf = level.dataset.for;
                        const levelAction = level.dataset.action;
                        if(levelOf === 'item1'){
                            if(levelAction === 'plus'){
                                this.item1BasePrice = this.item1BasePrice + 54.99;                               
                                document.querySelector(`.quant_of_${levelOf}`).textContent = Math.abs(parseInt(document.querySelector(`.quant_of_${levelOf}`).textContent) + 1);
                            }else{                                
                                if(this.item1BasePrice <= 0){
                                    this.item1BasePrice = 0;                            
                                }else{
                                    this.item1BasePrice = this.item1BasePrice - 54.99;                                
                                    document.querySelector(`.quant_of_${levelOf}`).textContent = Math.abs(parseInt(document.querySelector(`.quant_of_${levelOf}`).textContent) - 1);
                                }
                            }
                            this.item1PriceElem.textContent = "$" + this.item1BasePrice.toFixed(2);                        
                        }

                        if(levelOf === 'item2'){
                            if(levelAction === 'plus'){

                                this.item2BasePrice = this.item2BasePrice + 74.99;
                                document.querySelector(`.quant_of_${levelOf}`).textContent = Math.abs(parseInt(document.querySelector(`.quant_of_${levelOf}`).textContent) + 1);
                            }else{
                                if(this.item2BasePrice <= 0){
                                    this.item2BasePrice = 0;                                    
                                }else{
                                    this.item2BasePrice = this.item2BasePrice - 74.99;                                    
                                    document.querySelector(`.quant_of_${levelOf}`).textContent = Math.abs(parseInt(document.querySelector(`.quant_of_${levelOf}`).textContent) - 1)
                                }
                            }
                            this.item2PriceElem.textContent = "$" + this.item2BasePrice.toFixed(2); ;
                        }

                        // console.log(this.item1BasePrice, this.item2BasePrice)
                        this.totalPrice = parseFloat(this.item1BasePrice) + parseFloat(this.item2BasePrice) + 19;
                        // console.log(this.item1BasePrice, this.item2BasePrice)
                        this.totalElem.textContent = "$" + this.totalPrice.toFixed(2);

                    })
                })
            }

            document.addEventListener('keydown', (e) => {
                console.log('event', e)
                if(e.key === 'Enter' && e.keyCode === 13){                
                    this.onFormSubmit(e);
                }
            })

        }
    }

    const checkout = new Checkout();
    checkout.init();

} catch (error) {
    console.log('Error detected...', error);
}